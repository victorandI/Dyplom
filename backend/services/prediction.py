import os
import numpy as np
from utils.image_utils import preprocess_image
from utils.model_utils import load_model, load_class_names
from config import Config
import requests

import tensorflow as tf
import numpy as np
import json
import cv2
import os
import glob
from PIL import Image, ImageEnhance, ImageFilter
import io

current_dir = os.path.dirname(os.path.abspath(__file__))

MODELS_DIR = os.path.join(os.path.dirname(current_dir), 'models')
METADATA_PATH = os.path.join(MODELS_DIR, 'metadata.json')

if not os.path.exists(METADATA_PATH):
    metadata = {"plants": {}}

    tflite_models = glob.glob(os.path.join(MODELS_DIR, '*_model.tflite'))
    mapping_files = glob.glob(os.path.join(MODELS_DIR, '*_mapping.json'))

    for model_path in tflite_models:
        plant_name = os.path.basename(model_path).split('_')[0].capitalize()
        mapping_path = os.path.join(MODELS_DIR, f"{plant_name.lower()}_mapping.json")

        if os.path.exists(mapping_path):
            metadata["plants"][plant_name] = {
                "model_file": os.path.basename(model_path),
                "mapping_file": os.path.basename(mapping_path)
            }

    with open(METADATA_PATH, 'w') as f:
        json.dump(metadata, f, indent=2)

try:
    with open(METADATA_PATH, 'r') as f:
        METADATA = json.load(f)
except Exception as e:
    print(f"Error loading metadata: {e}")
    METADATA = {"plants": {}}

MODEL_CACHE = {}
MAPPING_CACHE = {}

def load_class_mapping(plant_name):

    if plant_name in MAPPING_CACHE:
        return MAPPING_CACHE[plant_name]

    if plant_name not in METADATA["plants"]:
        raise ValueError(f"Plant '{plant_name}' not found in metadata")

    mapping_file = METADATA["plants"][plant_name]["mapping_file"]
    mapping_path = os.path.join(MODELS_DIR, mapping_file)

    try:
        with open(mapping_path, 'r') as f:
            mapping = json.load(f)
        MAPPING_CACHE[plant_name] = mapping
        return mapping
    except Exception as e:
        print(f"Error loading mapping for {plant_name}: {e}")
        raise

def load_tflite_model(plant_name):

    if plant_name in MODEL_CACHE:
        return MODEL_CACHE[plant_name]

    if plant_name not in METADATA["plants"]:
        raise ValueError(f"Plant '{plant_name}' not found in metadata")

    model_file = METADATA["plants"][plant_name]["model_file"]
    model_path = os.path.join(MODELS_DIR, model_file)

    try:
        interpreter = tf.lite.Interpreter(model_path=model_path)
        interpreter.allocate_tensors()
        MODEL_CACHE[plant_name] = interpreter
        return interpreter
    except Exception as e:
        print(f"Error loading TFLite model for {plant_name}: {e}")
        raise

def preprocess_image(image_bytes, target_size=(224, 224)):

    # Перетворення bytes в PIL Image
    image = Image.open(io.BytesIO(image_bytes))

    # Примінення різних фільтрів
    filtered_images = {
        'original': image,
        'grayscale': image.convert('L').convert('RGB'),  # Чорно-біле з конвертацією назад в RGB
    }

    # Збільшення контрасту
    enhancer = ImageEnhance.Contrast(image)
    filtered_images['high_contrast'] = enhancer.enhance(2.0)

    # Збільшення різкості
    filtered_images['sharpened'] = image.filter(ImageFilter.SHARPEN)

    # Виділення країв
    filtered_images['edge_enhanced'] = image.filter(ImageFilter.EDGE_ENHANCE_MORE)

    # Обробка кожного зображення
    processed_images = {}
    for name, img in filtered_images.items():
        # Зміна розміру
        img = img.resize(target_size)

        # Конвертація в numpy array
        img_array = np.array(img, dtype=np.float32)

        # Нормалізація (0-1)
        img_array = img_array / 255.0

        processed_images[name] = img_array

    return processed_images

def predict_with_tflite(interpreter, processed_images):

    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    # Ваги для різних фільтрів
    weights = {
        'original': 0.4,
        'grayscale': 0.15,
        'high_contrast': 0.2,
        'sharpened': 0.15,
        'edge_enhanced': 0.1
    }

    # Обчислення прогнозів для кожного фільтра
    all_predictions = {}
    for filter_name, img_array in processed_images.items():
        input_data = np.expand_dims(img_array, axis=0)

        # Встановлення вхідного тензора
        interpreter.set_tensor(input_details[0]['index'], input_data)

        interpreter.invoke()

        # Отримання вихідного тензора
        output_data = interpreter.get_tensor(output_details[0]['index'])
        all_predictions[filter_name] = output_data[0]

    # Усереднення всіх прогнозів
    avg_prediction = np.zeros_like(all_predictions['original'])
    for filter_name, prediction in all_predictions.items():
        avg_prediction += weights[filter_name] * prediction

    return avg_prediction, all_predictions

def predict_disease(image_bytes, plant_name=None):

    try:
        if not plant_name:
            return {
                "error": "Plant name not provided",
                "details": "Please specify a plant name for disease detection"
            }

        plant_name = plant_name.capitalize()

        # Перевірка наявності моделі для вказаної рослини
        if plant_name not in METADATA["plants"]:
            available_plants = list(METADATA["plants"].keys())
            return {
                "error": f"Plant '{plant_name}' not found",
                "details": f"Available plants: {available_plants}"
            }

        interpreter = load_tflite_model(plant_name)
        mapping = load_class_mapping(plant_name)

        processed_images = preprocess_image(image_bytes)

        avg_prediction, all_predictions = predict_with_tflite(interpreter, processed_images)

        predicted_class_index = np.argmax(avg_prediction)
        confidence = float(avg_prediction[predicted_class_index])

        predicted_class = mapping.get(str(predicted_class_index), "Unknown")

        plant_info, disease_info = parse_class_name(predicted_class)

        result = {
            "plant": {
                "common_name": plant_name,
                "scientific_name": plant_info,
                "identification_confidence": float(confidence * 100),
                "family": ""
            },
            "diseases": [{
                "name": disease_info,
                "confidence": float(confidence * 100),
                "symptoms": "Detected by TFLite model"
            }],
            "overall_analysis_confidence": float(confidence * 100)
        }

        top_diseases = []
        indices = np.argsort(avg_prediction)[-3:][::-1]  # Топ-3 індекси

        for idx in indices:
            if idx == predicted_class_index:
                continue

            class_name = mapping.get(str(idx), "Unknown")
            _, disease_name = parse_class_name(class_name)
            top_diseases.append({
                "name": disease_name,
                "confidence": float(avg_prediction[idx] * 100)
            })

        if top_diseases:
            result["alternative_diseases"] = top_diseases

        result["technical_details"] = {
            "model_type": "TFLite",
            "filter_results": {
                filter_name: {
                    "predicted_class": mapping.get(str(np.argmax(pred)), "Unknown"),
                    "confidence": float(pred[np.argmax(pred)] * 100)
                } for filter_name, pred in all_predictions.items()
            }
        }

        return result

    except Exception as e:
        print(f"Prediction error: {e}")
        import traceback
        traceback.print_exc()
        return {
            "error": str(e),
            "details": "Failed to predict plant disease"
        }

def parse_class_name(class_name):
    """
    Розбиває назву класу на інформацію про рослину та хворобу

    Args:
        class_name: назва класу (наприклад, 'Tomato___Late_blight')

    Returns:
        tuple: (plant_info, disease_info)
    """
    parts = class_name.split('___')
    plant_info = parts[0]

    if len(parts) == 1 or 'healthy' in parts[1].lower():
        disease_info = 'Healthy'
    else:
        disease_info = parts[1].replace('_', ' ')

    return plant_info, disease_info

def get_available_plants():

    return list(METADATA["plants"].keys())

# Чат не пофіксив проблему, а наробив нових... шкода було видаляти)
""" def predict_disease(image_bytes):

    # Preprocess image
    processed_image = preprocess_image(image_bytes)

    # Get model
    model = get_model()

    # Make prediction
    predictions = model.predict(processed_image)[0]

    # Get top 3 predictions
    class_names = get_class_names()
    top_indices = np.argsort(predictions)[-3:][::-1]

    results = []
    for i in top_indices:
        results.append({
            'disease': class_names[i],
            'probability': float(predictions[i])
        })

    return {
        'predictions': results
    }"""
'''
def predict_disease(image_bytes, lang='en'):

    # Стою на плечах у гігантів. Ну так, трішки чітерства
    PLANTNET_API_KEY = '2b10fiz8RZkbggtEv412LZVxe'

    params = {
        'api-key': PLANTNET_API_KEY,
        'lang': lang
    }

    files = {
        'images': ('image.jpg', image_bytes, 'image/jpeg')
    }
    print("PlantNet API Full Request:")
    print(f"Params: {params}")
    print(f"Files: {files}")

    try:
        response = requests.post(
            'https://my-api.plantnet.org/v2/identify/all',
            params=params,
            files=files
        )
        # Супер ЖОСКІ ЛОГИ НЕ ЗАПУСКАТИ
        print("PlantNet API Full Response:")
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {response.headers}")
        print("Response JSON:")
        full_response = response.json()
        import json
        print(json.dumps(full_response, indent=2))

        if response.status_code != 200:
            return {
                "error": "PlantNet API error",
                "status_code": response.status_code,
                "details": response.text
            }

        plantnet_result = response.json()

        if not plantnet_result.get('results'):
            return {
                "error": "No plant identification results",
                "confidence": 0
            }

        top_result = plantnet_result['results'][0]

        plant_details = {
            "scientific_name": top_result.get('species', {}).get('scientificNameWithoutAuthor', ''),
            "common_name": top_result.get('species', {}).get('commonNames', ['Unknown'])[0],
            "family": top_result.get('species', {}).get('family', {}).get('scientificNameWithoutAuthor', ''),
            "identification_confidence": round(top_result.get('score', 0) * 100, 2)
        }

        possible_diseases = _analyze_plant_diseases(plant_details, lang)

        result = {
            "plant": plant_details,
            "diseases": possible_diseases,
            "overall_analysis_confidence": round(
                (plant_details['identification_confidence'] +
                 sum(disease['confidence'] for disease in possible_diseases) / len(possible_diseases)) / 2,
                2
            )
        }

        return result

    except Exception as e:
        return {
            "error": "Processing error",
            "details": str(e)
        }

def _analyze_plant_diseases(plant_details, lang='en'):

    # Умовний словник захворювань (в реальності це має бути моя бд, але мені лінь)
    DISEASE_DATABASE = {
        'en': {
            'Tomato': [
                {"name": "Leaf Spot", "confidence": 65, "symptoms": "Brown spots on leaves"},
                {"name": "Powdery Mildew", "confidence": 45, "symptoms": "White powdery coating"}
            ],
            'default': [
                {"name": "General Leaf Disease", "confidence": 30, "symptoms": "Unusual leaf coloration"}
            ]
        },
        'uk': {
            'Tomato': [
                {"name": "Плямистість листя", "confidence": 65, "symptoms": "Коричневі плями на листі"},
                {"name": "Борошниста роса", "confidence": 45, "symptoms": "Білий порошкоподібний наліт"}
            ],
            'default': [
                {"name": "Загальне захворювання листя", "confidence": 30, "symptoms": "Незвичне забарвлення листя"}
            ]
        }
    }

    #Вибираю захворювання за назвою або беру дефолтні, що не ок
    #Виправлю
    diseases = (
            DISEASE_DATABASE.get(lang, {}).get(plant_details['scientific_name']) or
            DISEASE_DATABASE.get(lang, {}).get('default')
    )

    return diseases
'''
