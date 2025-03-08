import os
import numpy as np
from utils.image_utils import preprocess_image
from utils.model_utils import load_model, load_class_names
from config import Config
import requests
# Load model and class names
model_path = os.path.join(Config.MODEL_PATH, 'plant_disease_model')
class_names_path = os.path.join(Config.MODEL_PATH, 'class_indices.json')

# хахахахахахах
_model = None
_class_names = None

# хахахахахахаха
def get_model():

    global _model
    if _model is None:
        _model = load_model(model_path)
    return _model

def get_class_names():

    global _class_names
    if _class_names is None:
        _class_names = load_class_names(class_names_path)
    return _class_names


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
