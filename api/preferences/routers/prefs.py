from fastapi import APIRouter, Depends, HTTPException
from ..queries.prefs import PrefIn, PrefOut, PrefList, PrefQueries


router = APIRouter()


@router.post("/api/preferences", response_model=PrefOut)
def create_pref(
    pref: PrefIn,
    queries: PrefQueries = Depends()
):
    created_pref = queries.create_pref(pref)
    return created_pref

@router.get("/api/preferences/{pref_id}", response_model=PrefOut)
def get_pref(
    pref_id: int,
    queries: PrefQueries = Depends(),
):
    record = queries.get_pref(pref_id)
    if record is None:
        raise HTTPException(status_code=404, detail="No preferences found with that user id {}".format(pref_id))
    else:
        return record
    