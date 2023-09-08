from fastapi.testclient import TestClient
from main import app
from rooms.queries.rooms import RoomQueries
from authenticator import authenticator

client = TestClient(app)


class EmptyRoomQueries:
    def get_all_rooms(self):
        return []


def fake_get_current_account_data():
    return {
        "picture": "string",
        "space": "string",
        "user_id": 1,
        "created": "2023-09-07",
        "city": "string",
        "state": "ca",
        "available_rooms": 0,
        "cost": 0,
        "lease_type": "string",
        "description": "string",
        "pets_allowed": True,
        "bathrooms": 0
    }


def test_get_all_rooms():
    app.dependency_overrides[RoomQueries] = EmptyRoomQueries
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

    response = client.get("/api/rooms")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {"rooms": []}
