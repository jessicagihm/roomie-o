steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(50) NOT NULL UNIQUE,
            hashed_password VARCHAR(1000) NOT NULL,
            first VARCHAR(255) NOT NULL,
            last VARCHAR(255) NOT NULL,
            age INTEGER NOT NULL,
            gender VARCHAR(50) NOT NULL,
            image VARCHAR(1000),
            bio VARCHAR(500) NOT NULL

        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """,
    ]
]
