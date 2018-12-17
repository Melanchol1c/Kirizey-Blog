from django.db import models


class Article(models.Model):
    title = models.CharField(("Title"), max_length=255)
    content = models.TextField(("Content"))

    class Meta:
        verbose_name = ("Article")
        verbose_name_plural = ("Articles")

    def __str__(self):
        return f'{self.title}'
