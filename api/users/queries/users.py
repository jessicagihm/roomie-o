import os
from psycopg_pool import ConnectionPool
from ..models import AccountIn, AccountOut #AccountOutWithPassword
pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])



class UserQueries:
    
    def get_user(self, username: str): #-> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM users
                    WHERE users.username = %s
                    """,
                    [username],
                )

                row = cur.fetchone()
                return #AccountOutWithPassword(
                (self.updated_user_record_to_dict(row, cur.description))

    def get_user_info(self, id: int) -> AccountOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT
                    id,
                    username,
                    first,
                    last,
                    age,
                    gender,
                    bio,
                    profile_image
                    FROM users
                    WHERE users.id = %s
                    """,
                    [id]

                )
                row = cur.fetchone()
                return self.updated_user_record_to_dict(
                    row, cur.description
                    )
    
    def create_user(self, data: AccountIn,): #-> AccountOutWithPassword:
        username = None
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
    """
    INSERT INTO users (username, hashed_password, first, last, age, gender, bio)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    RETURNING id
    """,
    [
        data.username, data.hashed_password, data.first, 
        data.last, data.age, data.gender, data.bio
    ],
)
        username = data.username

        if username is not None:
            return self.get_user(username)
        
    def update(self, id: int, data: AccountOut) -> AccountOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE users
                    SET
                        username = %s, 
                        first = %s,
                        last = %s,
                        gender = %s,
                        age = %s,
                        bio = %s,
                        profile_image = %s
                    WHERE id = %s
                    RETURNING *
                    """,
                    [
                        data.username,
                        data.first,
                        data.last,
                        data.gender,
                        data.age,
                        data.bio,
                        data.profile_image,
                        id,
                    ],

                )
                row = cur.fetchone()
                return self.updated_user_record_to_dict(
                    row, cur.description
                )
    def user_record_to_dict(self, row, description):
        user = None
        if row is not None:
            user = {}
            user_fields = [
                "id",
                "username",
                "first",
                "last",
                "age",
                "gender",
                "bio",
                
                
            ]
            for i, column in enumerate(description):
                if column.name in user_fields:
                    user[column.name] = row[i]
        return user
                    
    def updated_user_record_to_dict(self, row, description):
        user = None
        if row is not None:
            user = {}
            user_fields = [
                "id",
                "username",
                "first",
                "last",
                "age",
                "gender",
                "bio",
                "profile_image",
        ]
        for i, column in enumerate(description):
            if column.name in user_fields:
                user[column.name] = row[i]
        return user