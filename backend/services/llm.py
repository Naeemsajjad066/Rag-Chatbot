from google import genai
from config import GEMINI_API_KEY

client=genai.Client(api_key=GEMINI_API_KEY)

def ask_llm(context:str,question:str):

    prompt=f"""
    Answer the question using the context below

    Context:
    {context}

    Questions:
    {question}

    """

    response=client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text

