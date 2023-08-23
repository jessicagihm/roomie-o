# from fastapi import APIRouter, HTTPException
# from jwtdown_fastapi.authentication import Authenticator, Token
# from users.queries.users import UserQueries  
# from pydantic import BaseModel
# import secrets

# def generate_secret_key(length=32):
#     return secrets.token_hex(length)

# secret_key = generate_secret_key

# router = APIRouter()

# class MyAuthenticator(Authenticator):
#     async def get_account_data(self, username, accounts_repo):
#         return accounts_repo.get_user(username)

#     def get_account_getter(self, accounts_repo):
#         return accounts_repo

#     def get_hashed_password(self, account):
#         return account['hashed_password']


# authenticator = MyAuthenticator(secret_key)

# user_queries = UserQueries()  

# class LoginForm(BaseModel):
#     username: str
#     password: str

# @router.post("/login", response_model=Token)
# async def login(form: LoginForm):
#     user = user_queries.get_user(form.username)
#     if user and user_queries.authenticator.verify_password(form.password, user['hashed_password']):
#         return authenticator.create_token({"sub": user['username']})
#     raise HTTPException(status_code=401, detail="Invalid credentials")
