from pydantic import BaseModel


class UserIn(BaseModel):
    username: str
    password: str
    first: str
    last: str
    age: int
    gender: str
    image: str | None
    bio: str | None


class UserOut(BaseModel):
    id: int
    username: str
    password_hash: str
    first: str
    last: str
    age: int
    gender: str
    image: str | None
    bio: str | None


class UserOutWithPassword(UserOut):
    hashed_password: str
