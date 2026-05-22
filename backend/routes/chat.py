from fastapi import APIRouter,File,UploadFile
from services.rag_pipeline import rag_chat
from pydantic import BaseModel
import shutil
import os 
from services.vector_store import load_pdf
router=APIRouter()


class ChatRequest(BaseModel):
    message:str

@router.post("/chat")
def chat(req:ChatRequest):
    return rag_chat(req.message)
    
@router.post("/upload-pdf")
def upload_pdf(file: UploadFile = File(...)):

    file_path = f"temp_{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    load_pdf(file_path)

    os.remove(file_path)

    return {"message": "PDF uploaded and processed"}