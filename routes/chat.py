from fastapi import APIRouter
from services.rag_pipeline import rag_chat
from pydantic import BaseModel
router=APIRouter()


class ChatRequest(BaseModel):
    message:str

@router.post("/chat")
def chat(req:ChatRequest):
    return rag_chat(req.message)
