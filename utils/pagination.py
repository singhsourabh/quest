from rest_framework import pagination
from rest_framework.response import Response
import math


class CustomPagination(pagination.PageNumberPagination):

    def get_paginated_response(self, data):
        return Response({
            'previous': self.get_previous_link(),
            'current': self.page.number,
            'next': self.get_next_link(),
            'count': math.ceil(self.page.paginator.count/self.page_size),
            'data': data
        })
