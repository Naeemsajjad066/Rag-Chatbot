import faiss
import os
import numpy as np
import json
from services.embedding import getEmbedding
from services.pdf_loader import extract_text_from_pdf
from utils.chunking import chunk_text

DIMENSIONS = 3072

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
Text_Path = os.path.join(BASE_DIR, "data", "text.json")
Index_Path = os.path.join(BASE_DIR, "data", "vector.index")

if os.path.exists(Index_Path):
    index = faiss.read_index(Index_Path)
    with open(Text_Path, "r") as f:
        texts = json.load(f)
else:
    index = faiss.IndexFlatL2(DIMENSIONS)
    texts = []


def save_data():
    faiss.write_index(index, Index_Path)
    with open(Text_Path, "w") as f:
        json.dump(texts, f)


def add_text(text: str):
    vector = getEmbedding(text)
    vector = np.expand_dims(vector, axis=0)
    index.add(vector)
    texts.append(text)
    save_data()


def search(query: str, k=3):
    vector = getEmbedding(query)
    vector = np.expand_dims(vector, axis=0)
    distances, indices = index.search(vector, k)
    results = []

    for i in indices[0]:
        if i != -1:
            results.append(texts[i])

    return results


def load_pdf(file_path: str):
    text = extract_text_from_pdf(file_path)
    chunks = chunk_text(text)

    for chunk in chunks:
        add_text(chunk)
