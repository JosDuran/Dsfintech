# docker-compose exec web python manage.py shell
from people.models import Person
from faker import Faker
import uuid

fake = Faker()

for _ in range(100):
    Person.objects.create(
        id=uuid.uuid4(),
        first_name=fake.first_name(),
        last_name=fake.last_name(),
        email=fake.unique.email()
    )

print("✅ 100 personas creadas")
