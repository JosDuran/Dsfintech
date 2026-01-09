#views.py
from django.shortcuts import render

from rest_framework import viewsets, filters
from rest_framework.pagination import PageNumberPagination
from .models import Person
from .serializers import PersonSerializer

class PersonPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all().order_by('-created_at')
    serializer_class = PersonSerializer
    pagination_class = PersonPagination
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['email', 'last_name']
    ordering_fields = ['created_at']
