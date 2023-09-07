from fastapi.testclient import TestClient
from authenticator import authenticator
from main import app
from users.queries.users import UserQueries


client = TestClient(app)


class EmptyUserQueries:
    def get_all_users(self):
        return []


def fake_get_current_data():
    return {
        "id": 1,
        "username": "string",
        "password_hash": "string",
        "first": "string",
        "last": "string",
        "age": 1,
        "gender": "string",
        "image": "string",
        "bio": "string",

        }


def test_get_all_users():

    app.dependency_overrides[UserQueries] = EmptyUserQueries
    app.dependency_overrides[authenticator.try_get_current_account_data] = fake_get_current_data
    # ARRANGE

    # ACT
    response = client.get("/api/users")

    app.dependency_overrides = {}
    # ASSERT

    assert response.status_code == 200
    assert response.json() == {"users": []}


def test_init():
    assert 1 == 1
