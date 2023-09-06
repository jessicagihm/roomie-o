from pydantic import BaseModel
from queries.pool import pool
from typing import List
from users.models import UserIn, UserOut, UserUpdate
from fastapi.exceptions import HTTPException
from psycopg.rows import dict_row


class DuplicateAccountError(ValueError):
    pass


class Error(BaseModel):
    message: str


class UserList(BaseModel):
    users: List[UserOut]


class UserQueries:

    async def get_hashed_password(self, email: str) -> str:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT password
                    FROM users
                    WHERE username = %s
                    """,
                    [email],
                )
                result = cur.fetchone()
                if result:
                    return result[0]
                return None

    async def get_user_by_email(self, email: str) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id,
                        username,
                        password_hash,
                        first,
                        last,
                        age,
                        gender,
                        image,
                        bio
                    FROM users
                    WHERE username = %s
                    """,
                    [email],
                )
                result = cur.fetchone()
                if result:
                    return UserOut(
                        id=result[0],
                        username=result[1],
                        password_hash=result[2],
                        first=result[3],
                        last=result[4],
                        age=result[5],
                        gender=result[6],
                        image=result[7],
                        bio=result[8],
                    )
            return None

    def get_one(self, user_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id
                            username,
                            hashed_password,
                            first,
                            last,
                            age,
                            gender,
                            image,
                            bio
                        From users
                        WHERE id = %s
                        """,
                        [user_id]
                    )

                return True
        except Exception as e:
            print(e)
            return {"message": "Could not get that user"}

    def get_all_users(self) -> List[UserOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id,
                        username,
                        password_hash,
                        first,
                        last,
                        age,
                        gender,
                        image,
                        bio
                    From users
                    ORDER BY id;
                    """
                )
                results = cur.fetchall()
                user_list = []
                for result in results:
                    user_list.append(
                        UserOut(
                            id=result[0],
                            username=result[1],
                            password_hash=result[2],
                            first=result[3],
                            last=result[4],
                            age=result[5],
                            gender=result[6],
                            image=result[7],
                            bio=result[8],
                        )
                    )
                return user_list

    def get_user(self, id) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id,
                        username,
                        password_hash,
                        first,
                        last,
                        age,
                        gender,
                        image,
                        bio,
                        id
                    From users
                    WHERE id = %s
                    """,
                    [id],
                )
                result = cur.fetchone()
                if result:
                    return UserOut(
                        id=result[0],
                        username=result[1],
                        password_hash=result[2],
                        first=result[3],
                        last=result[4],
                        age=result[5],
                        gender=result[6],
                        image=result[7],
                        bio=result[8],
                    )
            return None

    def create(self, user: UserIn, hashed_password: str) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO users
                    (username, password_hash, first, last, age, gender, image, bio)
                    VALUES
                    (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id, username, password_hash, first, last, age, gender, image, bio;
                    """,
                    (
                        user.username,
                        hashed_password,
                        user.first,
                        user.last,
                        user.age,
                        user.gender,
                        user.image,
                        user.bio,
                    ),
                )
                result = cur.fetchone()
                print("result", result)
                if result:
                    return UserOut(
                        id=result[0],
                        username=result[1],
                        password_hash=result[2],
                        first=result[3],
                        last=result[4],
                        age=result[5],
                        gender=result[6],
                        image=result[7],
                        bio=result[8],
                    )

    def update_user(self, id: int, user: UserUpdate) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET
                            username = %s,
                            password_hash = %s,
                            first = %s,
                            last = %s,
                            age = %s,
                            gender = %s,
                            image = %s,
                            bio = %s
                        WHERE id = %s
                        """,
                        [
                            user.username,
                            user.password_hash,
                            user.first,
                            user.last,
                            user.age,
                            user.gender,
                            user.image,
                            user.bio,
                            id,
                        ],
                    )
                    conn.commit()

                    db.execute(
                        """
                        SELECT id,
                            username,
                            password_hash,
                            first,
                            last,
                            age,
                            gender,
                            image,
                            bio
                        FROM users
                        WHERE id = %s
                        """,
                        [id],
                    )
                    updated_user_data = db.fetchone()
                    if updated_user_data:
                        return UserOut(
                            id=updated_user_data[0],
                            username=updated_user_data[1],
                            password_hash=updated_user_data[2],
                            first=updated_user_data[3],
                            last=updated_user_data[4],
                            age=updated_user_data[5],
                            gender=updated_user_data[6],
                            image=updated_user_data[7],
                            bio=updated_user_data[8],
                        )
                    else:
                        return None
        except Exception as e:
            print(e)
            return {"message": "Could not update user"}

    def delete(self, user_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """,
                        [user_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return {"message": "Could not delete user"}
