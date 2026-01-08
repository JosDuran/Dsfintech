from django.core.management.base import BaseCommand
from people.models import Person
from faker import Faker

fake = Faker()

class Command(BaseCommand):
    help = 'Llena la base de datos con personas de prueba'

    def handle(self, *args, **options):
        created = 0

        for _ in range(100):
            Person.objects.create(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.unique.email()
            )
            created += 1

        self.stdout.write(
            self.style.SUCCESS(f'✅ {created} personas creadas')
        )
