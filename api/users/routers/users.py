from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
    status,
    Response,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from typing import Union
from pydantic import BaseModel
from ..queries.users import (
    UserQueries,
    UserIn,
    UserOut,
    UserList,
    Error,
    DuplicateAccountError,
    UserUpdate,
)


class SignUpForm(BaseModel):
    username: str
    password: str


class UserToken(Token):
    account: UserOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/api/users", response_model=UserList)
def get_all_users(
    queries: UserQueries = Depends(),
):
    return {"users": queries.get_all_users()}


@router.get("/api/users/{user_id}", response_model=UserOut)
def get_user(
    user_id: int,
    queries: UserQueries = Depends(),
):
    record = queries.get_user(user_id)
    if record is None:
        raise HTTPException(
            status_code=404, detail="No user found with id {}".format(user_id)
        )
    else:
        return record


@router.post("/api/signup", response_model=UserToken | HttpError)
async def create_account(
    info: UserIn,
    request: Request,
    response: Response,
    users: UserQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = users.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )

    form = SignUpForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, users)
    return UserToken(account=account, **token.dict())


@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    account: UserOut = Depends(authenticator.try_get_current_account_data),
) -> UserToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.put("/api/users/{user_id}", response_model=Union[Error, UserOut])
def update_user(
    user_id: int,
    user: UserUpdate,
    queries: UserQueries = Depends(),
    authenticated_user: dict = Depends(authenticator.get_current_account_data),
):
    print(user)
    user_with_hashed_password = user.dict()
    user_with_hashed_password["password_hash"] = authenticator.hash_password(user_with_hashed_password["password_hash"])
    if authenticated_user:
        updated_user = queries.update_user(user_id, UserUpdate(**user_with_hashed_password))
        if updated_user is None:
            raise HTTPException(
                status_code=404, detail="No user found with id {}". format(user_id)
            )
        return updated_user
    else:
        raise HTTPException(status_code=401, detail="You must be logged in")


@router.delete("/api/users/{user_id}", response_model=bool)
def delete_user(
    user_id: int,
    queries: UserQueries = Depends(),
) -> bool:
    return queries.delete(user_id)
