from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ai_service import generate_reply

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend Running"}

@app.post("/generate-reply")
def reply(email_text: str):

    ai_reply = generate_reply(email_text)

    return {
        "reply": ai_reply
    }