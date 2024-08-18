# uvicorn main:app --port 8000 --host 0.0.0.0

from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv("./.env")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET"],  # Limitar los métodos permitidos
    allow_headers=["*"],
)
static_folder = os.getenv('STATIC_FOLDER')
app.mount("/static", StaticFiles(directory=static_folder), name="static")