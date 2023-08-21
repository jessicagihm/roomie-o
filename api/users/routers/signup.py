from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)


from pydantic import BaseModel

from ..queries.users import (
    UserQueries,
    AccountIn,
    AccountOut,
    #AccountOutWithPassword
)

class SignUpForm(BaseModel):
    username: str
    password: str

class HTTPError(BaseModel):
    detail: str



router = APIRouter()


@router.post("/api/users",
             response_model=AccountOut
             )
async def create_user(
    data: AccountIn,
    queries: UserQueries = Depends(),
):
    created_user = queries.create_user(data)
    return created_user
