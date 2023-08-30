from typing import Union
from rooms.queries.rooms import RoomIn, RoomOut, RoomList, RoomQueries, Error
from fastapi import APIRouter, Depends, HTTPException
from authenticator import authenticator


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
        raise HTTPException(
            status_code=404, detail="No room found with id {}".format(room_id)
        )
    else:
        return record


# @router.post("/api/rooms", response_model=RoomOut)
# def create_room(room: RoomIn, queries: RoomQueries = Depends()):
#     created_room = queries.create_room(room)
#     return created_room


@router.post("/api/rooms/create", response_model=RoomOut)
def create_room(
    room: RoomIn,
    queries: RoomQueries = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),

):
    if user:
        result = queries.create_room(room)
        return result
    else:
        raise HTTPException(status_code=401, detail="You must login to continue.")


@router.put("/api/rooms/{room_id}", response_model=Union[Error, RoomOut])
def update_room(
    room_id: int,
    room: RoomIn,
    queries: RoomQueries = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, RoomOut]:
    if user:
        updated_room = queries.update(room_id, room)
        if updated_room is None:
            raise HTTPException(
                status_code=404, detail="No room found with id {}".format(room_id)
            )
        return updated_room
    else:
        raise HTTPException(status_code=401, detail="You must login to continue")


@router.delete("/api/rooms/{room_id}", response_model=bool)
def delete_room(
    room_id: int,
    queries: RoomQueries = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
):
    if user:
        deleted = queries.delete(room_id)
        if not deleted:
            raise HTTPException(
                status_code=404, detail="No room found with id {}".format(room_id)
            )
        return True
    else:
        raise HTTPException(status_code=401, detail="You must login to continue")
