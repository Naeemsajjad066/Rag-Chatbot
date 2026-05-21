import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from services.vector_store import add_text

add_text("Python is a programming language")
add_text("FastAPI is used for backend APIs")
add_text("React is a frontend JavaScript library")
add_text("Cricket is popular in Pakistan")
print("Data added successfully")