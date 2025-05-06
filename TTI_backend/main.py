# =================== BACKEND (FastAPI) ===================
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for development; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

tokenizer = AutoTokenizer.from_pretrained("tiiuae/falcon-rw-1b")
model = AutoModelForCausalLM.from_pretrained("tiiuae/falcon-rw-1b")

class PromptRequest(BaseModel):
    prompt: str

@app.post("/generate-text/")
def generate_text(request: PromptRequest):
    inputs = tokenizer(request.prompt, return_tensors="pt").to(model.device)

    output = model.generate(
        **inputs,
        max_length=256,
        do_sample=True,
        temperature=0.7,
        top_k=50,
        top_p=0.9,
        pad_token_id=tokenizer.eos_token_id
    )

    response = tokenizer.decode(output[0], skip_special_tokens=True)
    reply = response.replace(request.prompt, "").strip()
    return {"generated_text": reply or "Sorry, I didn't understand that."}