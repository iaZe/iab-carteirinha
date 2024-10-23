from datetime import datetime

from flask import request, jsonify

from database.sessao import db
from domain.endereco import EnderecoDomain
from model.administrador import Administrador
from model.arquiteto import Arquiteto
from model.endereco import Endereco


def register_routes_architect(app, token_authenticator):
    """Architect routes register"""

    @app.route('/architect', methods=['POST'])
    @token_authenticator.token_required
    def create_architect():
        """Create a new architect."""
        data = request.get_json()
        endereco_domain = EnderecoDomain(data.get('endereco'))
        endereco = endereco_domain.save_endereco()
        novo_arquiteto = Arquiteto(
            nome=data['nome'],
            cpf=data['cpf'],
            uf_documento=data['uf_documento'],
            matricula=data['matricula'],
            celular=data['celular'],
            fixo=data['fixo'],
            data_filiacao=datetime.strptime(data['data_filiacao'], '%Y-%m-%d'),
            data_fim_filiacao=datetime.strptime(data['data_fim_filiacao'], '%Y-%m-%d') if data.get(
                'data_fim_filiacao') else None,
            endereco_id=endereco.id,
            email=data['email'],
            hash=data['hash'],
            foto=data.get('foto', None)
        )
        db.session.add(novo_arquiteto)
        db.session.commit()
        return jsonify({"message": "Arquiteto criado com sucesso!"}), 201

