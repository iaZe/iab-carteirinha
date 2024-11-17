from crypt import methods

from flask import request, jsonify

from database.sessao import db
from model.parceiro import Parceiro
from model.beneficio import Beneficio

from settings.token_auth import TokenAuthenticator

def registro_rota_beneficio(app, token_authenticator):
    @app.route('/beneficio/<int:parceiro_id>/cadastrar', methods=['POST'])
    @token_authenticator.token_required
    def cadastrar_beneficio(parceiro_id, user_id=None):
        data = request.get_json()

        parceiro = Parceiro.query.get(parceiro_id)
        if not parceiro:
            return jsonify({'message': 'Parceiro não encontrado.'}), 404

        beneficio = Beneficio(titulo=data['titulo'], descricao=data['descricao'])
        db.session.add(beneficio)
        db.session.flush()

        parceiro.beneficio = beneficio
        db.session.commit()

        return jsonify({'message': 'Benefício cadastrado e associado ao parceiro com sucesso!'}), 201

    @app.route('/beneficio/buscar', methods=['GET'])
    @token_authenticator.token_required
    def buscar_beneficio(user_id=None):

        beneficios = Beneficio.query.all()
        resultados = []
        for beneficio in beneficios:
            result = {
                'id': beneficio.id,
                'titulo': beneficio.titulo,
                'descricao': beneficio.descricao
            }
            resultados.append(result)
        return jsonify(resultados), 200

    @app.route('/beneficio/atualizar/<int:beneficio_id>', methods=['PUT'])
    @token_authenticator.token_required
    def atualizar_beneficio(beneficio_id, user_id=None):
        data = request.get_json()

        beneficio = Beneficio.query.get(beneficio_id)

        if not beneficio:
            return jsonify({'message': 'Benefício não encontrado.'}), 404

        beneficio.titulo = data.get('titulo', beneficio.titulo)
        beneficio.descricao = data.get('descricao', beneficio.descricao)

        db.session.commit()

        return jsonify({'message': 'Benefício atualizado com sucesso!'}), 200

    @app.route('/beneficio/excluir/<int:beneficio_id>', methods=['DELETE'])
    @token_authenticator.token_required
    def excluir_beneficio(beneficio_id, user_id=None):

        beneficio = Beneficio.query.get(beneficio_id)

        db.session.delete(beneficio)
        db.session.commit()

        return jsonify({'message': 'Benefício excluído com sucesso!'})