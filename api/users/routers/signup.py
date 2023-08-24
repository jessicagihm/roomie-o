from fastapi import Depends, HTTPException, APIRouter
from typing import Union
from pydantic import BaseModel
from ..queries.users import (
    UserQueries,
    UserIn,
    UserOut,
    UserList,
    Error

)


class SignUpForm(BaseModel):
    username: str
    password: str


class HTTPError(BaseModel):
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
        raise HTTPException(status_code=404, detail="No user found with id {}".format(user_id))
    else:
        return record


@router.post("/api/signup", response_model=UserOut)
def create_user(
    user: UserIn,
    queries: UserQueries = Depends(),
 ):
    created_user = queries.create(user)
    return created_user


@router.put("/api/users/{user_id}", response_model=Union[Error, UserOut])
def update_user(
    user_id: int,
    user: UserIn,
    queries: UserQueries = Depends(),
) -> Union[Error, UserOut]:
    return queries.update(user_id, user)



@router.delete("/api/users/{user_id}", response_model=bool)
def delete_user(
    user_id: int,
    queries: UserQueries = Depends(),
) -> bool:
    return queries.delete(user_id)
