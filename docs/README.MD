## Roomie-O

* Danielle Chang
* Hudson Quitter
* Jessica Gihm
* Leon Mun

Find Your Perfect Roommate!

## Design

* [API Design](http://localhost:8000/docs)
* [Database model](data-model.MD)
* [GHI](ghi.MD)

## Intended Market

We are targeting consumers that are looking to find an ideal roommate and those consumers also looking to fill their space with a new roommate. Consumers wil be able to connect with a list of potential roommates and listings to find their next roommate.

## Functionality

- Consumers will sign up for an account to create a their preferences
- Once a user has an account, they will be able to login to view other roommates and rooms listing
- As a logged in user:
    - I can access all features of the site (finding roommates and or spaces for rent)
    - View a list of roommates
    - I can access a list of potential roommates in my desired area.
    - I can access a list of rooms available in my desired area.
    - I can list a room for rent in my area.
    - I can fill out a bio portion on my profile for other users to see about me
    - Be able to create and delete a room listing

Contacting Potential Roommates:
- A user can contact other potential roommates with by email (as their username is their email)

## Project Initialization

1. Fork this respository
2. Clone the repository https://gitlab.com/meme-team-supreme/roomie-o.git down onto your local machine
3. CD into the  new project directory
5. Run docker volume create pg-admin
6. Run docker volume create postgres-data
7. Run docker compose build
8. Run docker compose up
9. http://localhost:3000
