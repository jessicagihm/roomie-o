from fastapi import APIRouter, Depends, HTTPException
from queries.rooms import RoomIn, RoomOut, RoomList, RoomQueries
# from typing import Union

router = APIRouter()


@router.get("/api/rooms", response_model=RoomList)
def get_all_rooms(
    queries: RoomQueries = Depends(),
):
    return {"rooms": queries.get_all_rooms()}


@router.get("/api/rooms/{room_id}", response_model=RoomOut)
def get_room(
    room_id: int,
    queries: RoomQueries = Depends(),
):
    record = queries.get_room(room_id)
    if record is None:
        raise HTTPException(status_code=404, detail="No room found with id {}".format(room_id))
    else:
        return record


@router.post("/api/rooms", response_model=RoomOut)
def create_room(
    room: RoomIn,
    queries: RoomQueries = Depends()
 ):
    created_room = queries.create_room(room)
    return created_room


# @router.put("/rooms/{room_id}", response_model=Union[Error, RoomOut])
# def update_room(
#     room_id: int,
#     room: RoomIn,
#     queries: RoomQueries = Depends(),
# ) -> Union[Error, RoomOut]:
#     return queries.update(room_id, room)


# @router.delete("/rooms/{room_id}", response_model=bool)
# def delete_room(
#     room_id: int,
#     queries: RoomQueries = Depends()
# ):
#     queries.delete_room(room_id)
#     return True
