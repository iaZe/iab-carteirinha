from datetime import datetime

from flask import request, jsonify

from database.sessao import db
from domain.endereco import EnderecoDomain
from model.estudante import Estudante

from settings.token_auth import TokenAuthenticator


def registrar_rota_estudante(app, token_authenticator):
    @app.route('/estudante/cadastrar', methods=['POST'])
    @token_authenticator.token_required
    def cadastrar_estudante(user_id=None):
        data = request.get_json()
        endereco_domain = EnderecoDomain(data.get('endereco'))
        endereco = endereco_domain.save_endereco()
        novo_estudante = Estudante(
            nome=data['nome'],
            cpf=data['cpf'],
            celular=data['celular'],
            fixo=data['fixo'],
            data_cadastro=datetime.now(),
            fl_ativo=1,
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
        return jsonify({'message': 'Estudante cadastrado com sucesso!'}), 201

    @app.route('/estudante/buscar', methods=['GET'])
    @token_authenticator.token_required
    def buscar_estudantes(user_id=None):
        nome = request.args.get('nome')
        cpf = request.args.get('cpf')
        instituicao_ensino = request.args.get('instituicao_ensino')
        email = request.args.get('email')

        query = Estudante.query.filter_by(fl_ativo=1)
        if nome:
            query = query.filter(Estudante.nome.ilike(f'%{nome}%'))
        if cpf:
            query = query.filter_by(cpf=cpf)
        if instituicao_ensino:
            query = query.filter(Estudante.instituicao_ensino.ilike(f'%{instituicao_ensino}%'))
        if email:
            query = query.filter(Estudante.email.ilike(f'%{email}%'))

        estudantes = query.all()
        resultados = []
        for estudante in estudantes:
            endereco = estudante.endereco
            result = {
                'id': estudante.id,
                'nome': estudante.nome,
                'cpf': estudante.cpf,
                'celular': estudante.celular,
                'fixo': estudante.fixo,
                'data_cadastro': estudante.data_cadastro,
                'endereco': {
                    'cep': endereco.cep,
                    'logradouro': endereco.logradouro,
                    'complemento': endereco.complemento,
                    'numero': endereco.numero,
                    'bairro': endereco.bairro,
                    'cidade': endereco.cidade,
                    'estado': endereco.estado
                },
                'email': estudante.email,
                'hash': estudante.hash, #TODO: Verificar se vai listar o hash e se pode atualizar
                'foto': estudante.foto,
                'instituicao_ensino': estudante.instituicao_ensino,
                'matricula_faculdade': estudante.matricula_faculdade,
                'ano_estimado_conclusao': estudante.ano_estimado_conclusao
            }
            resultados.append(result)
        return jsonify(resultados), 200

    @app.route('/estudante/atualizar/<int:id>', methods=['PUT'])
    @token_authenticator.token_required
    def atualizar_estudante(id, user_id=None):
        data = request.get_json()

        estudante = Estudante.query.get(id)

        if not estudante:
            return jsonify({'message': 'Estudante não encontrado.'}), 404

        estudante.nome = data.get('nome', estudante.nome)
        estudante.celular = data.get('celular', estudante.celular)
        estudante.fixo = data.get('fixo', estudante.fixo)
        estudante.email = data.get('email', estudante.email)
        estudante.foto = data.get('foto', estudante.foto)
        estudante.instituicao_ensino = data.get('instituicao_ensino', estudante.instituicao_ensino)
        estudante.matricula_faculdade = data.get('matricula_faculdade', estudante.matricula_faculdade)
        estudante.ano_estimado_conclusao = data.get('ano_estimado_conclusao', estudante.ano_estimado_conclusao)

        if estudante.endereco:
            endereco = estudante.endereco
            endereco.cep = data.get('endereco', {}).get('cep', endereco.cep)
            endereco.logradouro = data.get('endereco', {}).get('logradouro', endereco.logradouro)
            endereco.complemento = data.get('endereco', {}).get('complemento', endereco.complemento)
            endereco.numero = data.get('endereco', {}).get('numero', endereco.numero)
            endereco.bairro = data.get('endereco', {}).get('bairro', endereco.bairro)
            endereco.cidade = data.get('endereco', {}).get('cidade', endereco.cidade)
            endereco.estado = data.get('endereco', {}).get('estado', endereco.estado)

        db.session.commit()

        return jsonify({'message': 'Estudante atualizado com sucesso!'}), 200

    @app.route('/estudante/excluir/<int:id>', methods=['PUT'])
    @token_authenticator.token_required
    def deletar_estudante(id, user_id=None):
        estudante = Estudante.query.get(id)

        if not estudante:
            return jsonify({'message': 'Estudante não encontrado.'}), 404

        estudante.fl_ativo = 0
        db.session.commit()

        return jsonify({'message': 'Estudante inativado com sucesso!'}), 200