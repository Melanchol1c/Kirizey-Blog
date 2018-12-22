from rest_framework import serializers
from ..models import Article, Tag, Comment
from django.contrib.auth.models import User
# from rest_framework.serializers import (
#     StringRelatedField
# )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        # depth = 1


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    tag = TagSerializer()

    class Meta:
        model = Article
        fields = '__all__'
        # depth = 1

    # def create(self, validated_data):
    #     user_data = validated_data.pop('user')
    #     article = Article.objects.create(**validated_data)
    #     for user_data in user_data:
    #         Article.objects.create(article=article, **user_data)
    #     return article


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        depth = 1
