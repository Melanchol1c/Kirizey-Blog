from django.urls import path
from django.conf.urls import include
from .routers import router
from .api.views import (ArticleListView, ArticleDetailView, ArticleDeleteView,
                        ArticleCreateView, ArticleUpdateView, UserPostView)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/articles/', ArticleListView.as_view(), name='articles_list'),
    path('api/articles/<int:pk>/',
         ArticleDetailView.as_view(), name='article_detail'),
    path('api/articles/<int:pk>/delete/',
         ArticleDeleteView.as_view(), name='article_delete'),
    path('api/articles/create/', ArticleCreateView.as_view(),
         name='article_create'),
    path('api/articles/<int:pk>/update/', ArticleUpdateView.as_view(),
         name='article_update'),
    path('api/users/<str:username>', UserPostView.as_view(),
         name='article_user')
]
