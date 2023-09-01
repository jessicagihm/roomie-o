from authenticator import authenticator
from fastapi import APIRouter, Depends, HTTPException, Response
from ..queries.prefs import PrefIn, PrefOut, PrefQueries, Error
from typing import Union


router = APIRouter()


# @router.post("/api/preferences", response_model=PrefOut)
# def create_pref(pref: PrefIn, queries: PrefQueries):
#     account_data =dict = Depends(authenticator.get_current_account_data)
#     created_pref = queries.create_pref(pref)
#     return created_pref


@router.get("/api/preferences/{pref_id}", response_model=PrefOut)
def get_pref(
    pref_id: int,
    queries: PrefQueries = Depends(),
    record: dict = Depends(authenticator.get_current_account_data),
):
    record = queries.get_pref(pref_id)
    if record is None:
        raise HTTPException(
            status_code=404,
            detail="No preferences found with that user id {}".format(pref_id),
        )
    else:
        return record


@router.delete("/api/preferences/{pref_id}", response_model=bool)
def delete_pref(
    pref_id: int,
    queries: PrefQueries = Depends(),
) -> bool:
    return queries.delete(pref_id)


@router.post("/api/preferences", response_model=PrefOut)
def create_pref(
    pref: PrefIn,
    response: Response,
    queries: PrefQueries = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
):
    if user:
        response.status_code = 200
        result = queries.create_pref(pref)
        return result
    else:
        raise HTTPException(status_code=401, detail="You must login to continue")


@router.put("/api/preferences/{pref_id}", response_model=Union[Error, PrefOut])
def update_pref(
    pref_id: int,
    pref: PrefIn,
    queries: PrefQueries = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, PrefOut]:
    if user:
        updated_pref = queries.update(pref_id, pref)
        if updated_pref is None:
            raise HTTPException(
                status_code=404, detail="No preferences found with id {}".format(pref_id)
            )
        return updated_pref
    else:
        raise HTTPException(status_code=401, detail="You must login to continue")
