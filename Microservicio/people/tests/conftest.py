import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from people.models import Person
from faker import Faker

fake = Faker()

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def create_user(db):
    def make_user(username="user", password="pass1234"):
        user = User.objects.create_user(username=username, password=password)
        return user
    return make_user

@pytest.fixture
def auth_client(api_client, create_user):
    user = create_user()
    from rest_framework_simplejwt.tokens import RefreshToken
    refresh = RefreshToken.for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
    return api_client

@pytest.fixture
def create_person(db):
    def make_person(**kwargs):
        return Person.objects.create(
            first_name=kwargs.get("first_name", fake.first_name()),
            last_name=kwargs.get("last_name", fake.last_name()),
            email=kwargs.get("email", fake.email())
        )
    return make_person
