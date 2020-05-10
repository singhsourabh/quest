from celery import shared_task
from .models import Activity, Post
from django.contrib.auth import get_user_model
import joblib
import os
from django.conf import settings
import spacy

User = get_user_model()
model_path = os.path.join(settings.BASE_DIR, 'utils/ml/toxic/toxic_nlp/')
pipe_path = os.path.join(settings.BASE_DIR, 'utils/ml/toxic/svm_pipe.bin')
nlp = spacy.load(model_path)
svm_model = joblib.load(pipe_path)
labels = ['toxic', 'severe-toxic', 'obscene',
          'threat', 'insult', 'identity-hate']


def cleaner(docs):
    doc_list = []
    for doc in nlp.pipe(docs):
        tokens = [
            str.lower(token.lemma_) for token in doc if not token.is_punct | token.is_space | token.is_stop
        ]
        doc_list.append(' '.join(tokens))
    return doc_list


@shared_task
def check_toxicity(post_id):
    post = Post.objects.get(id=post_id)
    text = cleaner([post.title, post.details])
    result = svm_model.predict(text).toarray()
    toxic_class = set()
    for prediction in result:
        for i, j in enumerate(prediction):
            if(j == 1):
                toxic_class.add(labels[i])
    if len(toxic_class) > 0:
        post.is_toxic = True
        post._toxic_class = ' '.join(toxic_class)
        post.save(update_fields=['is_toxic', '_toxic_class'])
    else:
        post.is_toxic = False
        post.save(update_fields=['is_toxic', ])

    return {'details': "post-toxic-check", 'id': post_id}
