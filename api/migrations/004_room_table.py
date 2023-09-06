steps = [
    [
        """
        CREATE TABLE rooms (
        room_id SERIAL PRIMARY KEY NOT NULL,
        picture VARCHAR(10000) NOT NULL,
        space VARCHAR(255) NOT NULL,
        user_id INT NOT NULL REFERENCES users(id),
        created DATE NOT NULL,
        city VARCHAR(50) NOT NULL,
        state VARCHAR(2) NOT NULL,
        available_rooms INT NOT NULL,
        cost INT NOT NULL,
        lease_type VARCHAR(255) NOT NULL,
        description VARCHAR(500) NOT NULL,
        pets_allowed BOOL NOT NULL,
        bathrooms INT NOT NULL

        );
        """,
        """
        DROP TABLE rooms;
        """
    ]
]

