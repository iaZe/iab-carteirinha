import jwt
from datetime import datetime, timedelta


class JWTManager:
    def __init__(self, secret_key, expiration_hours=1,
                 refresh_expiration_days=7):
        self.secret_key = secret_key
        self.expiration_hours = expiration_hours
        self.refresh_expiration_days = refresh_expiration_days

    def generate_jwt(self, user_id):
        payload = {
            'exp': datetime.utcnow() + timedelta(hours=self.expiration_hours),
            'iat': datetime.utcnow(),
            'sub': user_id
        }
        return jwt.encode(payload, self.secret_key, algorithm='HS256')
    
    def generate_refresh_token(self, user_id):
        refresh_payload = {
            'exp': datetime.utcnow() + timedelta(days=self.refresh_expiration_days),
            'iat': datetime.utcnow(),
            'sub': user_id,
            'type': 'refresh'
        }
        return jwt.encode(refresh_payload, self.secret_key, algorithm='HS256')

    def decode_jwt(self, token):
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=['HS256'])
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
        
    def decode_refresh_token(self, token):
        try:
            # Verifica se é um token de atualização
            payload = jwt.decode(token, self.secret_key, algorithms=['HS256'])
            if payload.get('type') != 'refresh':
                raise jwt.InvalidTokenError('Refresh token expected')
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
        
    def refresh_access_token(self, refresh_token):
        user_id = self.decode_refresh_token(refresh_token)
        if user_id:
            return self.generate_jwt(user_id)
        return None
