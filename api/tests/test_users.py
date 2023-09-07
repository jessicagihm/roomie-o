from fastapi.testclient import TestClient
from authenticator import authenticator
from main import app
from users.queries.users import UserQueries


client = TestClient(app)


class EmptyUserQueries:
    def get_users(self):
        return []


def test_get_all_users():

    app.dependency_overrides[UserQueries] = EmptyUserQueries
    app.dependency_overrides[authenticator.try_get_current_account] = EmptyUserQueries
    # ARRANGE

    # ACT
    response = client.get("/api/users")

    app.dependency_overrides = {}
    # ASSERT

    assert response.status_code == 200
    assert response.json() == {"users": []}


def test_init():
    assert 1 == 1
