"""Image preprocessing for the trained custom CNN.

The model was trained with:
  - input shape 224x224x3
  - pixel values in [0, 1] (Rescaling layer is part of the model)

So in this file we only resize and convert to a numpy array. The model
itself handles the /255 rescaling at inference time.
"""
from io import BytesIO
import numpy as np
from PIL import Image


IMG_SIZE = (224, 224)


def preprocess_image(image: Image.Image) -> np.ndarray:
    """Resize and convert a PIL image to a model-ready numpy array.
    
    Returns:
        A numpy array of shape (1, 224, 224, 3) and dtype float32, with
        pixel values in [0, 255]. The model's built-in Rescaling layer
        scales these to [0, 1] internally.
    """
    image = image.convert("RGB").resize(IMG_SIZE)
    arr = np.asarray(image, dtype=np.float32)
    arr = np.expand_dims(arr, axis=0)  # add batch dimension -> (1, 224, 224, 3)
    return arr