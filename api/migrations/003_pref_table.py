steps = [
    [
        """
        CREATE TABLE preferences (
        pref_id SERIAL PRIMARY KEY NOT NULL,
        smoker_friendly BOOL NOT NULL,
        hobbies VARCHAR(500) NOT NULL,
        pet_friendly BOOL NOT NULL,
        budget INT NOT NULL,
        house_pref VARCHAR NOT NULL,
        kids INT NOT NULL,
        work_sched VARCHAR(250) NOT NULL,
        allergies VARCHAR(250) NOT NULL,
        looking_for_roomie BOOL NOT NULL,
        user_id INT NOT NULL REFERENCES users(id),
        move_in_date DATE


        );
        """,
        """
        DROP TABLE preferences;
        """,
    ]
]
