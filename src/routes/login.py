from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, create_refresh_token
from werkzeug.security import check_password_hash

from database.sessao import db
from model.login import Login
from settings.jwt_manager import JWTManager
from settings.limiter import RateLimiter
from datetime import timedelta


def register_routes_login(app, jwt_manager, rate_limiter):
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

        # Gera o token JWT
        token = JWTManager(app.config['SECRET_KEY']).generate_jwt(user.id)

        return jsonify({'token': token}), 200

    @app.route('/token/refresh', methods=['POST'])
    @jwt_required(refresh=True)
    def refresh_token():
        """Rota para a criação de um token de acesso"""
        identity = get_jwt_identity()
        access_token = create_refresh_token(identity=identity, expires_delta=timedelta(days=30))

        return jsonify({'refresh': access_token}), 200
