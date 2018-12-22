from rest_framework import serializers
from ..models import Article, Tag, Comment
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class ArticleReadSerializer(serializers.ModelSerializer):
    # user = serializers.StringRelatedField()
    # tag = serializers.StringRelatedField()

    class Meta:
        model = Article
        fields = '__all__'
        depth = 1


class ArticleWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        depth = 1
