release: bash ./tasks.sh
web: gunicorn qa.wsgi --log-file -
worker: celery -A qa worker --loglevel=info
