import tensorflow as tf
import json
import os

# Моделі немає, то на майбутнє
def load_model(model_path):

    return tf.keras.models.load_model(model_path)

def load_class_names(json_path):

    with open(json_path, 'r') as f:
        class_indices = json.load(f)
    class_names = {v: k for k, v in class_indices.items()}
    return class_names