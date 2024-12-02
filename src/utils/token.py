from itsdangerous import URLSafeTimedSerializer
from flask import current_app

def gerar_token_confirmacao(email):
    serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
    return serializer.dumps(email, salt='confirmacao-email')

def verificar_token_confirmacao(token, expiration=3600):
    serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
    try:
        email = serializer.loads(token, salt='confirmacao-email', max_age=expiration)
    except Exception as e:
        return None
    return email