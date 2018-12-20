from django.db import models
from django.contrib.auth.models import User


class Tag(models.Model):
    name = models.CharField(("Tag"), max_length=50)

    class Meta:
        verbose_name = ("Tag")
        verbose_name_plural = ("Tags")

    def __str__(self):
        return self.name


class Article(models.Model):
    title = models.CharField(("Title"), max_length=255)
    created_date = models.CharField(
        ("CreationDate"), max_length=50, default='None')
    content = models.TextField(("Content"))
    likes = models.IntegerField(("Likes"), default=0)
    user = models.OneToOneField(User, verbose_name=(
        "User"), related_name="articles", on_delete=models.SET_NULL,
        null=True, blank=True)
    tag = models.ManyToManyField(Tag, verbose_name=("Tag"),
                                 related_name=('tags'), null=True,
                                 blank=True)

    class Meta:
        verbose_name = ("Article")
        verbose_name_plural = ("Articles")

    def __str__(self):
        return f'{self.title}'


class Comment(models.Model):
    content = models.TextField(("Comment"))
    article = models.ForeignKey(Article, verbose_name=(
        "Article"), related_name=('comments'), on_delete=models.SET_NULL,
        null=True, blank=True)

    class Meta:
        verbose_name = ("comment")
        verbose_name_plural = ("comments")

    def __str__(self):
        return f'{self.article} {self.content}'


class UserAccount(models.Model):
    avatar = models.CharField(("Avatar"), max_length=50)
    user = models.OneToOneField(User, verbose_name=("User"),
                                on_delete=models.CASCADE, null=True,
                                blank=True)

    class Meta:
        verbose_name = ("UserAccount")
        verbose_name_plural = ("UserAccounts")

    def __str__(self):
        return f"{self.user}"
