# uvicorn main:app --port 8000 --host 0.0.0.0

from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, Request, HTTPException
from fastapi import FastAPI
import os
# from dotenv import load_dotenv
# load_dotenv("./.env")

allowed_origins = [os.getenv('FRONTEND_URL')]

async def verify_referer(request: Request):
    referer = request.headers.get('referer')
    print(referer)
    if referer and not referer.startswith(allowed_origins[0]):
        raise HTTPException(status_code=403, detail="Access forbidden")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET"],  # Limitar los métodos permitidos
    allow_headers=["*"],
)

@app.middleware("http")
async def custom_origin_middleware(request: Request, call_next):
    await verify_referer(request)
    return await call_next(request)

static_folder = os.getenv('FILE_STORAGE_STATIC_FOLDER')
app.mount("/static", StaticFiles(directory=static_folder), name="static")