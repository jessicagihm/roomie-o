from fastapi.testclient import TestClient
from main import app
from rooms.queries.rooms import RoomQueries

import os
os.environ["DATABASE_URL"] = "postgresql://admin:secret@postgres/meme-team-supreme"

client = TestClient(app)


class EmptyRoomQueries:
    def get_all_rooms(self):
        return []


def test_get_all_rooms():
    app.dependency_overrides[RoomQueries] = EmptyRoomQueries()

    response = client.get("/api/rooms")

    app.dependency_overrides.pop(RoomQueries, None)

    assert response.status_code == 200
