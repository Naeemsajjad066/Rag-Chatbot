from services.vector_store import search
from services.llm import ask_llm


def rag_chat(question: str):
    results = search(question)
    context = "\n".join(results)
    answer = ask_llm(context, question)

    return {
        "Question": question,
        "Context": context,
        "Answer": answer
    }
