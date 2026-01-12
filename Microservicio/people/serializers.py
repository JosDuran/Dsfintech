# serializers.py
from rest_framework import serializers
from .models import Person

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'first_name', 'last_name', 'email', 'created_at']
        read_only_fields = ['id', 'created_at']

    # Validación de first_name
    def validate_first_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("El nombre no puede estar vacío.")
        if len(value) < 2:
            raise serializers.ValidationError("El nombre debe tener al menos 2 caracteres.")
        return value

    # Validación de last_name
    def validate_last_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("El apellido no puede estar vacío.")
        if len(value) < 2:
            raise serializers.ValidationError("El apellido debe tener al menos 2 caracteres.")
        return value

    # Validación de email
    def validate_email(self, value):
        value = value.lower().strip()
        if not value:
            raise serializers.ValidationError("El email es obligatorio.")
        if Person.objects.filter(email=value).exclude(id=self.instance.id if self.instance else None).exists():
            raise serializers.ValidationError("Este email ya está registrado.")
        return value
