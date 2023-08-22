from pydantic import BaseModel
from datetime import date
from queries.pool import pool
from typing import List


class Error(BaseModel):
    message: str


class RoomIn(BaseModel):
    picture: str
    space: str
    user_id: int
    created: date
    city: str
    state: str
    available_rooms: int
    cost: int
    lease_type: str
    description: str
    pets_allowed: bool
    bathrooms: int


class RoomOut(BaseModel):
    picture: str
    space: str
    user_id: int
    created: date
    city: str
    state: str
    available_rooms: int
    cost: int
    lease_type: str
    description: str
    pets_allowed: bool
    bathrooms: int
    room_id: int


class RoomList(BaseModel):
    rooms: List[RoomOut]


class RoomQueries:
    def get_all_rooms(self) -> List[RoomOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT room_id,
                        picture,
                        space,
                        user_id,
                        created,
                        city,
                        state,
                        available_rooms,
                        cost,
                        lease_type,
                        description,
                        pets_allowed,
                        bathrooms,
                        room_id
                    From rooms
                    ORDER BY room_id;
                    """
                )
                results = cur.fetchall()
                room_list = []
                for result in results:
                    room_list.append(
                        RoomOut(
                            room_id=result[0],
                            picture=result[1],
                            space=result[2],
                            user_id=result[3],
                            created=result[4],
                            city=result[5],
                            state=result[6],
                            available_rooms=result[7],
                            cost=result[8],
                            lease_type=result[9],
                            description=result[10],
                            pets_allowed=result[11],
                            bathrooms=result[12]
                        )
                    )
                return room_list

    def get_room(self, room_id) -> RoomOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT room_id,
                        picture,
                        space,
                        user_id,
                        created,
                        city,
                        state,
                        available_rooms,
                        cost,
                        lease_type,
                        description,
                        pets_allowed,
                        bathrooms,
                        room_id
                    From rooms
                    WHERE room_id = %s
                    """,
                    [room_id],
                )
                result = cur.fetchone()
                if result:
                    return RoomOut(
                        room_id=result[0],
                        picture=result[1],
                        space=result[2],
                        user_id=result[3],
                        created=result[4],
                        city=result[5],
                        state=result[6],
                        available_rooms=result[7],
                        cost=result[8],
                        lease_type=result[9],
                        description=result[10],
                        pets_allowed=result[11],
                        bathrooms=result[12]
                    )
                return None

    def create_room(self, room: RoomIn) -> RoomOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO rooms
                    (
                    picture,
                    space,
                    user_id,
                    created,
                    city,
                    state,
                    available_rooms,
                    cost,
                    lease_type,
                    description,
                    pets_allowed,
                    bathrooms
                    )
                    VALUES
                    (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING room_id;
                    """,
                    [
                        room.picture,
                        room.space,
                        room.user_id,
                        room.created,
                        room.city,
                        room.state,
                        room.available_rooms,
                        room.cost,
                        room.lease_type,
                        room.description,
                        room.pets_allowed,
                        room.bathrooms,
                    ],
                )
                id = db.fetchone()[0]
                old_data = room.dict()
                old_data['room_id'] = id
                return RoomOut(**old_data)

    # def delete(self, room_id) -> None:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 db.execute(
    #                     """
    #                     DELETE FROM rooms
    #                     WHERE room_id = %s;
    #                     """,
    #                     [room_id]
    #                 )
    #         return True
    #     except Exception:
    #         return {"message": "Deletion was unsuccessful"}

    # def update(self, room_id: int, room: RoomIn) -> Union[Error, RoomOut]:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 db.execute(
    #                     """
    #                     UPDATE rooms
    #                     SET
    #                         picture = %s,
    #                         space = %s,
    #                         user_id = %s,
    #                         created = %s,
    #                         city = %s,
    #                         state = %s,
    #                         available_rooms = %s,
    #                         cost = %s,
    #                         lease_type = %s,
    #                         description = %s,
    #                         pets_allowed = %s,
    #                         bathrooms = %s
    #                     WHERE room_id = %s
    #                     """,
    #                     [
    #                         room.picture,
    #                         room.space,
    #                         room.user_id,
    #                         room.created,
    #                         room.city,
    #                         room.state,
    #                         room.available_rooms,
    #                         room.cost,
    #                         room.lease_type,
    #                         room.description,
    #                         room.pets_allowed,
    #                         room.bathrooms,
    #                         room_id
    #                     ],
    #                 )
    #                 updated_room = db.fetchone()
    #                 if updated_room is None:
    #                     return None
    #                 return RoomOut(**updated_room)
    #     except Exception as e:
    #         print(e)
    #         return {"message": "Could not update the room"}