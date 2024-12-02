from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash

from database.sessao import db
from model.login import Login
from settings.jwt_manager import JWTManager
from settings.limiter import RateLimiter

def registro_rota_login(app, jwt_manager, rate_limiter):
    """User routes register"""
    @app.route('/login', methods=['POST'])
    @rate_limiter.limit("5 per minute")
    def login():
        """Login route"""
        data = request.get_json()

        if not data or not data.get('email') or not data.get('senha'):
            return jsonify({'message': 'Faltam dados obrigatórios!'}), 400

        # Busca o usuário no banco de dados
        user = Login.query.filter_by(email=data['email']).first()

        if not user or not check_password_hash(user.senha, data['senha']):
            return jsonify({'message': 'Credenciais inválidas!'}), 401

        # Verifica se o usuário está ativo
        if not user.ativo:
            return jsonify({'message': 'Login não permitido!'}), 403

        # Gera o token JWT
        access_token = jwt_manager.generate_jwt(user.id)
        refresh_token = jwt_manager.generate_refresh_token(user.id)

        return jsonify({'access_token': access_token, 'refresh_token': refresh_token}), 200

    @app.route('/token/refresh', methods=['POST'])
    @jwt_required(refresh=True)
    def refresh_token():
        """Rota para criar um novo token de acesso usando o refresh token"""
        identity = get_jwt_identity()
        new_access_token = jwt_manager.generate_jwt(identity)

        return jsonify({'access_token': new_access_token}), 200
