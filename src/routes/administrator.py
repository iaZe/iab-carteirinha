from flask import request, jsonify

from database.sessao import db
from domain.endereco import EnderecoDomain
from model.administrador import Administrador
from model.endereco import Endereco


def register_routes_admin(app, token_authenticator):
    """Administrator routes register"""
    @app.route('/administrator', methods=['POST'])
    @token_authenticator.token_required
    def create_administrator():
        """Administrator routes create."""
        data = request.get_json()
        endereco_domain = EnderecoDomain(data.get('endereco'))
        endereco = endereco_domain.save_endereco()

        novo_administrador = Administrador(
            nome=data['nome'],
            cpf=data['cpf'],
            cargo=data['cargo'],
            endereco_id=endereco.id,
            email=data['email']
        )
        db.session.add(novo_administrador)
        db.session.commit()
        return jsonify({"message": "Administrador criado com sucesso!"}), 201
