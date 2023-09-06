from fastapi.testclient import TestClient
from unittest.mock import Mock, patch
from preferences.queries.prefs import PrefIn, PrefOut
from main import app


client = TestClient(app)


def test_create_pref():

    mock_conn = Mock()
    mock_cursor = Mock()

    mock_conn.cursor.return_value = mock_cursor

    mock_cursor.fetchone.return_value = [1]

    pref_in = PrefIn(
        smoker_friendly=True,
        hobbies="Reading",
        pet_friendly=True,
        budget=1000,
        house_pref="Apartment",
        kids=2,
        work_sched="9-5",
        allergies="None",
        looking_for_roomie=True,
        user_id=12345,
        move_in_date="2023-08-31"
    )

    expected_output = PrefOut(
        pref_id=1,
        smoker_friendly=True,
        hobbies="Reading",
        pet_friendly=True,
        budget=1000,
        house_pref="Apartment",
        kids=2,
        work_sched="9-5",
        allergies="None",
        looking_for_roomie=True,
        user_id=12345,
        move_in_date="2023-08-31"
    )

    with patch("DATABASE_URL", return_value=mock_conn):
        queries = PrefIn()
        result = queries.create_pref(pref_in)
        assert result == expected_output
