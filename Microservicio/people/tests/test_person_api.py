# test_person_api.py
import pytest
from django.urls import reverse
from people.models import Person

# ----------------------------
# Tests CRUD básicos
# ----------------------------

@pytest.mark.django_db
def test_list_persons(auth_client, create_person):
    create_person()
    create_person()
    
    url = reverse("person-list")
    response = auth_client.get(url)
    
    assert response.status_code == 200
    assert len(response.data['results']) >= 2

@pytest.mark.django_db
def test_create_person(auth_client):
    url = reverse("person-list")
    data = {"first_name": "Jose", "last_name": "Duran", "email": "jd@example.com"}
    response = auth_client.post(url, data, format='json')
    
    assert response.status_code == 201
    assert Person.objects.filter(email="jd@example.com").exists()

@pytest.mark.django_db
def test_update_person(auth_client, create_person):
    person = create_person()
    url = reverse("person-detail", args=[person.id])
    response = auth_client.put(
        url,
        {"first_name": "Juan", "last_name": "Perez", "email": person.email},
        format='json'
    )
    
    assert response.status_code == 200
    person.refresh_from_db()
    assert person.first_name == "Juan"

@pytest.mark.django_db
def test_delete_person(auth_client, create_person):
    person = create_person()
    url = reverse("person-detail", args=[person.id])
    response = auth_client.delete(url)
    
    assert response.status_code == 204
    assert not Person.objects.filter(id=person.id).exists()

# ----------------------------
# Tests adicionales: búsqueda y paginación
# ----------------------------

@pytest.mark.django_db
def test_search_person(auth_client, create_person):
    create_person(first_name="Jose", last_name="Duran", email="jd@example.com")
    create_person(first_name="Ana", last_name="Perez", email="ap@example.com")
    
    url = reverse("person-list")
    response = auth_client.get(url + "?search=jd@example.com")
    assert response.status_code == 200
    assert len(response.data['results']) == 1
    assert response.data['results'][0]['email'] == "jd@example.com"
    
    response = auth_client.get(url + "?search=Perez")
    assert response.status_code == 200
    assert len(response.data['results']) == 1
    assert response.data['results'][0]['last_name'] == "Perez"

@pytest.mark.django_db
def test_pagination_person(auth_client, create_person):
    for i in range(15):
        create_person(email=f"user{i}@example.com")
    
    url = reverse("person-list")
    
    response = auth_client.get(url)
    assert response.status_code == 200
    assert "results" in response.data
    assert len(response.data['results']) == 10
    
    response = auth_client.get(url + "?page=2")
    assert response.status_code == 200
    assert len(response.data['results']) == 5

# ----------------------------
# Tests de validaciones de backend
# ----------------------------

@pytest.mark.django_db
def test_create_person_missing_fields(auth_client):
    url = reverse("person-list")
    
    # Sin first_name
    data = {"last_name": "Duran", "email": "jd2@example.com"}
    response = auth_client.post(url, data, format='json')
    assert response.status_code == 400
    assert "first_name" in response.data
    
    # Sin last_name
    data = {"first_name": "Jose", "email": "jd2@example.com"}
    response = auth_client.post(url, data, format='json')
    assert response.status_code == 400
    assert "last_name" in response.data
    
    # Sin email
    data = {"first_name": "Jose", "last_name": "Duran"}
    response = auth_client.post(url, data, format='json')
    assert response.status_code == 400
    assert "email" in response.data

@pytest.mark.django_db
def test_create_person_duplicate_email(auth_client, create_person):
    # Creamos persona con email
    create_person(email="dup@example.com")
    
    url = reverse("person-list")
    data = {"first_name": "Ana", "last_name": "Perez", "email": "dup@example.com"}
    response = auth_client.post(url, data, format='json')
    
    assert response.status_code == 400
    assert "email" in response.data
