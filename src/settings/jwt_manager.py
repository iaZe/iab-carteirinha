import jwt
from datetime import datetime, timedelta


class JWTManager:
    def __init__(self, secret_key, expiration_hours=1):
        self.secret_key = secret_key
        self.expiration_hours = expiration_hours

    def generate_jwt(self, user_id):
        payload = {
            'exp': datetime.utcnow() + timedelta(hours=self.expiration_hours),
            'iat': datetime.utcnow(),
            'sub': user_id
        }
        return jwt.encode(payload, self.secret_key, algorithm='HS256')

    def decode_jwt(self, token):
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=['HS256'])
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
