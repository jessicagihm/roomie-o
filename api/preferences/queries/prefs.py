from pydantic import BaseModel
from datetime import date
from queries.pool import pool
from typing import List


class Error(BaseModel):
    message: str


class PrefIn(BaseModel):
    smoker_friendly: bool
    hobbies: str
    pet_friendly: bool
    budget: int
    house_pref: str
    kids: int
    work_sched: str
    allergies: str
    looking_for_roomie: bool
    user_id: int
    move_in_date: date | None


class PrefOut(BaseModel):
    smoker_friendly: bool
    hobbies: str
    pet_friendly: bool
    budget: int
    house_pref: str
    kids: int
    work_sched: str
    allergies: str
    looking_for_roomie: bool
    user_id: int
    move_in_date: date | None
    pref_id: int


class PrefList(BaseModel):
    prefs: List[PrefOut]


class PrefQueries:
    def get_pref(self, pref_id) -> PrefOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT pref_id,
                        smoker_friendly,
                        hobbies,
                        pet_friendly,
                        budget,
                        house_pref,
                        kids,
                        work_sched,
                        allergies,
                        looking_for_roomie,
                        user_id,
                        move_in_date,
                        pref_id
                    From preferences
                    WHERE pref_id = %s
                    """,
                    [pref_id],
                )
                result = cur.fetchone()
                if result:
                    return PrefOut(
                        pref_id=result[0],
                        smoker_friendly=result[1],
                        hobbies=result[2],
                        pet_friendly=result[3],
                        budget=result[4],
                        house_pref=result[5],
                        kids=result[6],
                        work_sched=result[7],
                        allergies=result[8],
                        looking_for_roomie=result[9],
                        user_id=result[10],
                        move_in_date=result[11],
                    )
                return None

    def create_pref(self, pref: PrefIn) -> PrefOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO preferences
                    (
                    smoker_friendly,
                    hobbies,
                    pet_friendly,
                    budget,
                    house_pref,
                    kids,
                    work_sched,
                    allergies,
                    looking_for_roomie,
                    user_id,
                    move_in_date
                    )
                    VALUES
                    (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING pref_id;
                    """,
                    [
                        pref.smoker_friendly,
                        pref.hobbies,
                        pref.pet_friendly,
                        pref.budget,
                        pref.house_pref,
                        pref.kids,
                        pref.work_sched,
                        pref.allergies,
                        pref.looking_for_roomie,
                        pref.user_id,
                        pref.move_in_date,

                    ],
                )
                id = db.fetchone()[0]
                old_data = pref.dict()
                old_data["pref_id"] = id
                return PrefOut(**old_data)

    def delete(self, pref_id: int) -> None:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM preferences
                        WHERE pref_id = %s
                        """,
                        [pref_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return {"message": "Could not delete preferences"}

    # def update_pref(self, pref_id: int, pref: PrefIn) -> Union[Error, PrefOut]:
