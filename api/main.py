from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from users.routers import users
from rooms.routers import rooms
from preferences.routers import prefs
from authenticator import authenticator
import os

app = FastAPI()
app.include_router(users.router)
app.include_router(rooms.router)
app.include_router(prefs.router)
app.include_router(authenticator.router)

origins = [
    "http://localhost3000",
    os.environ.get("CORS_HOST", None),

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "You hit the root path!"}
