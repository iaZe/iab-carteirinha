import os
import redis

class Config:
    DB_USER = os.environ.get('DB_USER')
    DB_PASSWORD = os.environ.get('DB_PASSWORD')
    DB_HOST = os.environ.get('DB_HOST')
    DB_NAME = os.environ.get('DB_NAME')

    if not all([DB_USER, DB_PASSWORD, DB_NAME]):
        raise ValueError("Variáveis de ambiente do banco de dados não configuradas corretamente.")

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY')

    redis_host = os.environ.get('REDIS_HOST')
    redis_port = int(os.environ.get('REDIS_PORT'))
    redis_password = os.environ.get('REDIS_PASSWORD')

    redis_client = (redis_client = redis.Redis(host=redis_host, port=redis_port, password=redis_password)
