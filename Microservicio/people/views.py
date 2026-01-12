#views.py
from rest_framework import viewsets, filters, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Person
from .serializers import PersonSerializer

class PersonPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'

class PersonViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Person.objects.all().order_by('-created_at')
    serializer_class = PersonSerializer
    pagination_class = PersonPagination
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['email', 'last_name']
    ordering_fields = ['created_at']

    # Manejo explícito de creación (opcional)
    def perform_create(self, serializer):
        try:
            serializer.save()
        except Exception as e:
            raise serializers.ValidationError({"detail": str(e)})

    # Manejo explícito de actualización (opcional)
    def perform_update(self, serializer):
        try:
            serializer.save()
        except Exception as e:
            raise serializers.ValidationError({"detail": str(e)})
