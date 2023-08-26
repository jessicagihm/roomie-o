import os
from fastapi import Depends, HTTPException, status
from jwtdown_fastapi.authentication import Authenticator
from users.models import UserOut, UserOutWithPassword, UserIn
from users.queries.users import UserQueries


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: UserQueries,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
         
        account = await accounts.get_user_by_email(username)
        return account

    def get_account_getter(
        self,
        accounts: UserQueries = Depends(),
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: UserOut):
        # Return the encrypted password value from your
        # account object
        return account.password_hash

    def get_account_data_for_cookie(self, account: UserIn):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.username, UserOut(**account.dict())

authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
