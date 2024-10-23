from flask import request, jsonify
from werkzeug.security import generate_password_hash

from database.sessao import db
from model.login import Login


def register_routes_user(app, token_authenticator):
    """User routes register"""
    @app.route('/user', methods=['POST'])
    @token_authenticator.token_required
    def create_login():
        """Creates a new user"""
        data = request.get_json()

        if not data or not data.get('email') or not data.get('senha'):
            return jsonify({'message': 'Faltam dados obrigatórios!'}), 400

        # Verifica se o usuário já existe
        if Login.query.filter_by(email=data['email']).first():
            return jsonify({'message': 'Usuário já existe!'}), 400

        # Criptografa a senha
        hashed_password = generate_password_hash(data['senha'], method='sha256')

        # Cria o usuário no banco de dados
        novo_login = Login(email=data['email'], senha=hashed_password)
        db.session.add(novo_login)
        db.session.commit()

        return jsonify({'message': 'Usuário criado com sucesso!'}), 201
