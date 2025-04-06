from fastapi import FastAPI, Request
from transformers import pipeline

app = FastAPI()

# Load the model
classifier = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment")

@app.post("/analyze")
async def analyze_sentiment(request: Request):
    data = await request.json()
    text = data.get("text", "")
    if not text:
        return {"error": "No text provided"}

    result = classifier(text)
    return {"sentiment": result[0]['label']}
