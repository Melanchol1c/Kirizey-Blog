from rest_framework import routers
from .api.views import (ArticleViewSet, TagViewSet, CommentViewSet,
                        UsersViewSet)

router = routers.DefaultRouter()
router.register(r'article', ArticleViewSet, base_name='article_list')
router.register(r'tag', TagViewSet, base_name='tag_list')
router.register(r'comment', CommentViewSet, base_name='comment_list')
router.register(r'users', UsersViewSet, base_name='user')
