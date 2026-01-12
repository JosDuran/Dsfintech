import pytest
from django.urls import reverse
from people.models import Person

# ----------------------------
# Tests CRUD básicos
# ----------------------------

@pytest.mark.django_db
def test_list_persons(auth_client, create_person):
    # Creamos 2 personas
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
    # Creamos personas con emails y apellidos distintos
    create_person(first_name="Jose", last_name="Duran", email="jd@example.com")
    create_person(first_name="Ana", last_name="Perez", email="ap@example.com")
    
    url = reverse("person-list")
    
    # Buscamos por email
    response = auth_client.get(url + "?search=jd@example.com")
    assert response.status_code == 200
    assert len(response.data['results']) == 1
    assert response.data['results'][0]['email'] == "jd@example.com"
    
    # Buscamos por last_name
    response = auth_client.get(url + "?search=Perez")
    assert response.status_code == 200
    assert len(response.data['results']) == 1
    assert response.data['results'][0]['last_name'] == "Perez"

@pytest.mark.django_db
def test_pagination_person(auth_client, create_person):
    # Creamos más personas que el page_size
    for i in range(15):
        create_person(email=f"user{i}@example.com")
    
    url = reverse("person-list")
    
    # Primera página
    response = auth_client.get(url)
    assert response.status_code == 200
    assert "results" in response.data
    assert len(response.data['results']) == 10  # page_size=10
    
    # Segunda página
    response = auth_client.get(url + "?page=2")
    assert response.status_code == 200
    assert len(response.data['results']) == 5  # 15 total - 10 primera página = 5
