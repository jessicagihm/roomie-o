from fastapi.testclient import TestClient
from fastapi import FastAPI, Depends, HTTPException, APIRouter, Response
from authenticator import authenticator
from typing import Union
from preferences.queries.prefs import PrefQueries, PrefIn, PrefOut, Error


app = FastAPI()


router = APIRouter()


class MockPrefQueries:
    def create_pref(self, pref: PrefIn) -> Union[PrefOut, Error]:
        return PrefOut(**pref.dict(), pref_id=1)


def mock_get_current_account_data():
    return {"user_id": 1, "username": "test_user"}


@router.post("/api/preferences", response_model=PrefOut)
def create_pref_route(
    pref: PrefIn,
    response: Response,
    queries: PrefQueries = Depends(),
    user: dict = Depends(mock_get_current_account_data)
):
    if user:
        response.status_code = 200
        result = queries.create_pref(pref)
        return result
    else:
        raise HTTPException(status_code=401, detail="You must login to continue")


app.include_router(router)


client = TestClient(app)


def test_create_pref():
    app.dependency_overrides[PrefQueries] = MockPrefQueries
    app.dependency_overrides[authenticator.get_current_account_data] = mock_get_current_account_data

    test_pref_data = {
        "smoker_friendly": True,
        "hobbies": "Reading",
        "pet_friendly": False,
        "budget": 1000,
        "house_pref": "Apartment",
        "kids": 0,
        "work_sched": "9-5",
        "allergies": "None",
        "looking_for_roomie": True,
        "user_id": 1,
        "move_in_date": "2023-10-01"
    }
    response = client.post("/api/preferences", json=test_pref_data)

    assert response.status_code == 200
    expected_data = {"pref_id": 1, **test_pref_data}
    assert response.json() == expected_data

    # added by Hudson and merged by Jess
