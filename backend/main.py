"""FastAPI server for the plant disease diagnosis app."""
from io import BytesIO
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.ml_service.diagnoser import Diagnoser


app = FastAPI(title="Plant Disease Diagnoser")
diagnoser = Diagnoser()

origins = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:3000",  # Optional fallback
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"status": "ok", "service": "plant-disease-diagnoser"}


@app.post("/diagnose")
async def diagnose(file: UploadFile = File(...)):
    contents = await file.read()
    image_bytes = BytesIO(contents)
    label, health_status, confidence = diagnoser.diagnose(image_bytes)

    return JSONResponse(content={
        "diagnosis": {
            "label": label,
            "healthStatus": health_status,
            "confidence": round(confidence * 100, 2),
        }
    })