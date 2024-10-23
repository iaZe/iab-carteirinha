from flask import request, jsonify
from werkzeug.security import check_password_hash

from database.sessao import db
from model.login import Login
from settings.jwt_manager import JWTManager
from settings.limiter import RateLimiter


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

        #Gera o token JWT
        token = JWTManager(app.config['SECRET_KEY']).generate_jwt(user.id)

        return jsonify({'token': token}), 200
