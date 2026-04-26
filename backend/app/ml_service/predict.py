"""Run inference and pick the top-1 class."""
import json
import os
import numpy as np


# Load class names from the JSON file we generated during training.
# This file lives next to this Python file in the deployed app.
_THIS_DIR = os.path.dirname(os.path.abspath(__file__))
_CLASS_NAMES_PATH = os.path.join(_THIS_DIR, "class_names.json")

with open(_CLASS_NAMES_PATH, "r") as f:
    LABELS: list[str] = json.load(f)


def predict_label(model, image_array: np.ndarray) -> tuple[str, float]:
    """Run the model and return (class_name, confidence)."""
    probs = model.predict(image_array, verbose=0)[0]  # shape: (38,)
    predicted_idx = int(np.argmax(probs))
    confidence = float(probs[predicted_idx])
    label = LABELS[predicted_idx] if predicted_idx < len(LABELS) else "Unknown"
    return label, confidence