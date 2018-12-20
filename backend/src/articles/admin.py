from django.contrib import admin

from .models import Article, Tag, Comment, UserAccount

admin.site.register(Article)
admin.site.register(Tag)
admin.site.register(Comment)
admin.site.register(UserAccount)
