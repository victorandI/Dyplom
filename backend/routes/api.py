from flask import Blueprint, request, jsonify
import time  # Додайте цей імпорт
import os
from werkzeug.utils import secure_filename
from services.prediction import predict_disease, get_available_plants

api_bp = Blueprint('api', __name__)

# Конфігурація
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@api_bp.route('/predict', methods=['POST'])
def predict():
    """
        - field 'image': файл зображення
        - field 'plant_name': назва рослини

    Повертає:
        - JSON
    """
    start_time = time.time()

    if 'image' not in request.files:
        return jsonify({
            'error': 'No image provided',
            'details': 'Please upload an image file'
        }), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({
            'error': 'No image selected',
            'details': 'Please select an image file'
        }), 400

    plant_name = request.form.get('plant_name')

    try:

        image_bytes = file.read()


        result = predict_disease(image_bytes, plant_name)


        processing_time = time.time() - start_time
        result['processing_time_ms'] = int(processing_time * 1000)

        return jsonify(result)

    except Exception as e:
        return jsonify({
            'error': str(e),
            'details': 'Error processing the image'
        }), 500

@api_bp.route('/plants', methods=['GET'])
def plants():
    """
    доступні рослини

    Повертає:
        - JSON
    """
    try:
        available_plants = get_available_plants()
        return jsonify({
            'plants': available_plants,
            'count': len(available_plants)
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'details': 'Error retrieving available plants'
        }), 500

@api_bp.route('/health', methods=['GET'])
def health():

    return jsonify({
        'status': 'ok',
        'service': 'Plant Disease Detector API',
        'version': '2.0.0'
    })
'''
@api_bp.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': 'File type not allowed'}), 400

    try:
        image_bytes = file.read()

        results = predict_disease(image_bytes)

        return results

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200
'''