from datetime import datetime

from flask import request, jsonify

from database.sessao import db
from domain.endereco import EnderecoDomain
from model.estudante import Estudante

#TODO: Alterar rotas para português ou inglês
def registrar_rota_estudante(app):
    """Architect routes register"""

    @app.route('/estudante', methods=['POST'])
    def cadastrar_estudante():
        """Create a new architect."""
        data = request.get_json()
        endereco_domain = EnderecoDomain(data.get('endereco'))
        endereco = endereco_domain.save_endereco()
        novo_estudante = Estudante(
            nome=data['nome'],
            cpf=data['cpf'],
            celular=data['celular'],
            fixo=data['fixo'],
            data_cadastro=datetime.strptime(data['data_cadastro'], '%Y-%m-%d'),
            endereco_id=endereco.id,
            email=data['email'],
            hash=data['hash'],
            foto=data.get('foto', None),
            instituicao_ensino=data['instituicao_ensino'],
            matricula_faculdade=data['matricula_faculdade'],
            ano_estimado_conclusao=data['ano_estimado_conclusao']
        )
        db.session.add(novo_estudante)
        db.session.commit()
        return jsonify({"message": "Estudante cadastrado com sucesso!"}), 201
