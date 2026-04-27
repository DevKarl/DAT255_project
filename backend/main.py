"""FastAPI server for the plant disease diagnosis app."""
from io import BytesIO
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.ml_service.diagnoser import Diagnoser


app = FastAPI(title="Plant Disease Diagnoser")
diagnoser = Diagnoser()

# Allow all origins for the public demo deployment.
# allow_credentials must be False when allow_origins is ["*"] (CORS spec).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"status": "ok", "service": "plant-disease-diagnoser"}


@app.api_route("/ping", methods=["GET", "HEAD"])
async def ping():
    """Health check endpoint to keep the container warm.
    Accepts HEAD so free-tier uptime monitors (like UptimeRobot) work."""
    return JSONResponse(status_code=200, content={"status": "ok"})


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