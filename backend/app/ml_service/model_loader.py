"""Load the trained Keras model.

The model is hosted as a binary asset on the project's GitHub release.
On the first server start we download it to a local cache directory;
subsequent restarts reuse the cached file.
"""
import os
import requests
from keras.models import load_model


# TODO before pushing to GitHub: update this URL after creating the release.
MODEL_URL="https://github.com/DevKarl/DAT255_project/releases/download/v2/custom_cnn_v2_best.keras"

# Local cache path
_CACHE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "model_cache")
_LOCAL_MODEL_PATH = os.path.join(_CACHE_DIR, "custom_cnn_best.keras")


class ModelLoader:
    @staticmethod
    def load_model():
        os.makedirs(_CACHE_DIR, exist_ok=True)

        if not os.path.exists(_LOCAL_MODEL_PATH):
            print(f"Downloading model from {MODEL_URL} ...")
            response = requests.get(MODEL_URL, stream=True)
            response.raise_for_status()
            with open(_LOCAL_MODEL_PATH, "wb") as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            print(f"Saved model to {_LOCAL_MODEL_PATH}")
        else:
            print(f"Loading cached model from {_LOCAL_MODEL_PATH}")

        model = load_model(_LOCAL_MODEL_PATH)
        print("Model loaded.")
        return model
