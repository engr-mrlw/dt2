from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

security = HTTPBearer()

API_TOKEN = "MY_SECRET_TOKEN"

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials.credentials != API_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid or missing token")
    return True

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Server(BaseModel):
    serial: str

class PDU(BaseModel):
    serial: Optional[str] = None
    mac: Optional[str] = None
    ru: Optional[str] = None

class Switch(BaseModel):
    serial: Optional[str] = None
    mac: Optional[str] = None
    ru: Optional[str] = None

class JBOG(BaseModel):
    serial: str

class Entry(BaseModel):
    timestamp: str
    rackSerial: str
    floor: str
    servers: List[Server]
    pdus: List[PDU]
    switches: List[Switch]
    jbogs: List[JBOG]

db_entries: List[Entry] = []

@app.get("/entries", response_model=List[Entry])
def get_entries(auth: bool = Depends(verify_token)):
    return db_entries

@app.post("/entries")
def save_entries(entries: List[Entry], auth: bool = Depends(verify_token)):
    global db_entries
    db_entries = entries
    return {"status": "ok", "count": len(db_entries)}
