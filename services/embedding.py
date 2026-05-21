from google import genai
from config import GEMINI_API_KEY
import numpy as np 

client=genai.Client(api_key=GEMINI_API_KEY)

def getEmbedding(text:str):
    response=client.models.embed_content(
        model="gemini-embedding-001",
        contents=text
    )

    vector=np.array(
        response.embeddings[0].values,
        dtype="float32"
    )

    return vector