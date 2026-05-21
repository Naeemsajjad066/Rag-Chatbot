import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from services.vector_store import add_text
add_text("""
Naeem Sajjad is a 24-year-old software developer from Hasilpur, Pakistan.
He is a MERN stack and full stack developer who works on modern web applications,
APIs, AI integrations, and chatbot systems. Naeem is passionate about learning
AI engineering, prompt engineering, vector databases, FAISS, RAG systems,
and backend development technologies.
""")

add_text("""
Naeem Sajjad studied at COMSATS University Islamabad, Vehari Campus.
He completed his degree with a CGPA of 3.62. During his academic journey,
he developed strong programming and software engineering skills and gained
experience in web development, backend systems, databases, and frontend technologies.
""")

add_text("""
Naeem Sajjad currently works at Devline Solutions as a Full Stack Developer.
He builds modern applications using technologies like React, FastAPI,
Node.js, Express.js, MongoDB, and AI APIs. He is interested in building
production-level AI systems, chatbots, semantic search engines, and RAG applications.
""")

add_text("""
Naeem Sajjad lives in Hasilpur with his family. His father’s name is Sajjad Hussain.
Naeem also has a brother named Waseem Sajjad, who owns a perfume business.
Naeem enjoys technology, software development, AI learning, and building innovative products.
""")
print("Data added successfully")