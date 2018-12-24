from rest_framework import routers
from .api.views import (ArticleListView, TagViewSet,
                        UsersViewSet)

router = routers.DefaultRouter()
# router.register(r'articles', ArticleListView, base_name='articles_list')
router.register(r'tag', TagViewSet, base_name='tag_list')
# router.register(r'comment', CommentViewSet, base_name='comment_list')
router.register(r'users', UsersViewSet, base_name='user')
