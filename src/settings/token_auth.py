from functools import wraps

import jwt
from flask import request, jsonify

from settings.jwt_manager import JWTManager


class TokenAuthenticator:
    def __init__(self, secret_key):
        self.secret_key = secret_key

    def token_required(self, f):
        """Decorator que verifica se um token válido está presente na requisição."""

        @wraps(f)
        def decorated(*args, **kwargs):
            token = None
            if 'Authorization' in request.headers:
                token = request.headers['Authorization'].split(" ")[1]  # Espera-se "Bearer <token>"

            if not token:
                return jsonify({"message": "Token é necessário!"}), 403

            try:
                user_id = JWTManager(self.secret_key).decode_jwt(token)
                if not user_id:
                    return jsonify({"message": "Token inválido!"}), 403
            except:
                return jsonify({"message": "Token inválido!"}), 403

            # Passa o user_id decodificado para a rota
            return f(user_id=user_id, *args, **kwargs)

        return decorated
