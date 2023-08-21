from pydantic import BaseModel

class AccountIn(BaseModel):
    username: str # will be email
    hashed_password: str
    first: str
    last: str
    age: int
    gender: str
    bio: str
    

class AccountOut(BaseModel):
    id: int
    username: str # will be email
    password: str
    first: str
    last: str
    age: int
    gender: str
    bio: str | None
    profile_image: str | None
    


#class AccountOutWithPassword(AccountOut):
    #double_hashed_password: str

