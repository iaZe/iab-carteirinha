from flask import request, jsonify
from werkzeug.security import generate_password_hash
from sqlalchemy.exc import SQLAlchemyError

from database.sessao import db
from model.login import Login

def registro_rota_usuario(app):
    """User routes register"""
    @app.route('/usuario/cadastrar', methods=['POST'])
    def criar_login():
        """Creates a new user"""
        try:
            data = request.get_json()

            if not data or not data.get('email') or not data.get('senha'):
                return jsonify({'message': 'Faltam dados obrigatórios!'}), 400

            if Login.query.filter_by(email=data['email']).first():
                return jsonify({'message': 'Usuário já existe!'}), 400

            hashed_password = generate_password_hash(data['senha'], method='pbkdf2:sha256')
            novo_login = Login(email=data['email'], senha=hashed_password)
            db.session.add(novo_login)
            db.session.commit()

            return jsonify({'message': 'Usuário criado com sucesso!'}), 201

        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'message': 'Erro no banco de dados', 'error': str(e)}), 500

        except Exception as e:
            return jsonify({'message': 'Erro interno no servidor', 'error': str(e)}), 500

    @app.route('/usuario/desativar/<int:id>', methods=['PUT'])
    def desativar_usuario(id):
        """Deactivate a user"""
        try:
            usuario = Login.query.get(id)
            if not usuario:
                return jsonify({'message': 'Usuário não encontrado!'}), 404

            usuario.ativo = False
            db.session.commit()
            return jsonify({'message': 'Usuário desativado com sucesso!'}), 200

        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'message': 'Erro no banco de dados', 'error': str(e)}), 500

        except Exception as e:
            return jsonify({'message': 'Erro interno no servidor', 'error': str(e)}), 500

    @app.route('/usuario/ativar/<int:id>', methods=['PUT'])
    def ativar_usuario(id):
        """Activate a user"""
        try:
            usuario = Login.query.get(id)
            if not usuario:
                return jsonify({'message': 'Usuário não encontrado!'}), 404

            usuario.ativo = True
            db.session.commit()
            return jsonify({'message': 'Usuário ativado com sucesso!'}), 200

        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'message': 'Erro no banco de dados', 'error': str(e)}), 500

        except Exception as e:
            return jsonify({'message': 'Erro interno no servidor', 'error': str(e)}), 500

    @app.route('/usuario/alterar_senha/<int:id>', methods=['PUT'])
    def alterar_senha(id):
        """Change user password"""
        try:
            data = request.get_json()
            nova_senha = data.get('nova_senha')

            if not nova_senha:
                return jsonify({'message': 'Nova senha não fornecida!'}), 400

            usuario = Login.query.get(id)
            if not usuario:
                return jsonify({'message': 'Usuário não encontrado!'}), 404

            usuario.senha = generate_password_hash(nova_senha, method='pbkdf2:sha256')
            db.session.commit()
            return jsonify({'message': 'Senha alterada com sucesso!'}), 200

        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'message': 'Erro no banco de dados', 'error': str(e)}), 500

        except Exception as e:
            return jsonify({'message': 'Erro interno no servidor', 'error': str(e)}), 500