# Plant Disease Detection Using Deep Learning

Project for **DAT255 – Deep Learning Engineering**

A deep learning system that classifies plant leaves as healthy or affected by a a disease. The user uploads a photo of a leaf (must be one of the specified types our model is trained on) and the model predicts the plant species and condition (one of 38 classes). The system consists of a custom CNN trained from scratch on the [New Plant Diseases Dataset](https://www.kaggle.com/datasets/vipoooool/new-plant-diseases-dataset), wrapped in a FastAPI backend and a React/Vite frontend.

**Live demo:** https://planthealthdiagnoser.netlify.app

---

## Project structure

DAT255_project/
├── backend/ # FastAPI inference server (Python, Keras)
│ ├── app/ml_service/
│ │ ├── class_names.json # 38 class labels
│ │ ├── diagnoser.py # high-level prediction wrapper
│ │ ├── model_loader.py # downloads + caches the .keras model
│ │ ├── predict.py # runs inference, returns top-1 class
│ │ └── transforms.py # image preprocessing (resize, batch)
│ ├── main.py # FastAPI app, CORS, /diagnose endpoint
│ ├── requirements.txt
│ ├── Procfile # Railway start command
│ └── runtime.txt # Python version pin
├── frontend/plant-health-app/ # Vite + React + TypeScript SPA
├── notebook/ # Colab notebook used for training

## Reproducing the training

Training was performed in Google Colab. To reproduce:

1. Open `notebook/DAT255_project.ipynb` in Colab
2. Set runtime to T4 GPU
3. Mount Google Drive
4. Place `plant_dataset.zip` (the [Kaggle dataset](https://www.kaggle.com/datasets/vipoooool/new-plant-diseases-dataset)) in `MyDrive/Colab Notebooks/`
5. Run cells in order

Total training time: ~46 minutes for the custom CNN, ~43 minutes for MobileNetV2 (Phase 1 + Phase 2).

## Running the backend locally

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
uvicorn main:app --reload
```

The server runs on `http://localhost:8000`. On first start it downloads the trained model (~5 MB) from the GitHub release and caches it locally.

## Running the frontend locally

```bash
cd frontend/plant-health-app
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and talks to the backend at `http://localhost:8000` by default (or might not anymore after deployment?.. you can change this in api.ts in frontend dir)

## API

| Endpoint    | Method | Purpose                                                      |
| ----------- | ------ | ------------------------------------------------------------ |
| `/ping`     | HEAD   | Lightweight health check for uptime monitors                 |
| `/diagnose` | POST   | Multipart upload of a leaf image; returns class + confidence |

Example response from `/diagnose`:

```json
{
  "diagnosis": {
    "label": "Tomato",
    "healthStatus": "Late_blight",
    "confidence": 76.34
  }
}
```

## Hosting

- Backend deployed on [Railway](https://railway.com) (CPU container, no GPU)
- Frontend deployed on [Netlify](https://netlify.com)
- Trained model file (4.7 MB) hosted as a [GitHub release asset](https://github.com/DevKarl/DAT255_project/releases/tag/v1.0)
- Backend uptime monitored by [UptimeRobot](https://uptimerobot.com) (this is what calls /ping)
