import hashlib
import re
from datetime import datetime
from email_validator import validate_email, EmailNotValidError
from flask import request, jsonify
from validate_docbr import CPF

from database.sessao import db
from domain.endereco import EnderecoDomain
from model.estudante import Estudante
from settings.token_auth import TokenAuthenticator
from utils.mail import enviar_email_confirmacao
from utils.token import verificar_token_confirmacao


def registro_rota_estudante(app, token_authenticator):
    @app.route('/estudante/cadastrar', methods=['POST'])
    @token_authenticator.token_required
    def cadastrar_estudante(user_id=None):
        data = request.get_json()

        cpf_validator = CPF()
        cpf = data.get('cpf')

        if not cpf_validator.validate(cpf):
            return jsonify({'message': 'CPF inválido.'}), 400

        cpf_existente = Estudante.query.filter_by(cpf=data['cpf']).first()
        if cpf_existente:
            return jsonify({'message': 'Estudante já cadastrado.'}), 400

        email = data.get('email')
        try:
            valid_email = validate_email(email)
            email_normalizado = valid_email.email
        except EmailNotValidError as e:
            return jsonify({'message': f'E-mail inválido: {str(e)}'}), 400

        email_existente = Estudante.query.filter_by(email=data['email']).first()
        if email_existente:
            return jsonify({'message': 'E-mail já cadastrado'}), 400

        nome = data.get('nome')
        if nome:
            if not re.match(r'^[A-Za-z\s]+$', nome):
                return jsonify({'message': 'O nome deve conter apenas letras.'}), 400

        endereco_domain = EnderecoDomain(data.get('endereco'))
        endereco = endereco_domain.save_endereco()
        novo_estudante = Estudante(
            nome=nome,
            cpf=cpf,
            celular=data['celular'],
            fixo=data['fixo'],
            data_cadastro=datetime.now(),
            fl_ativo=0,
            endereco_id=endereco.id,
            email=email_normalizado,
            hash= hashlib.sha256(cpf.encode('utf-8')).hexdigest(),
            foto=data.get('foto', None),
            instituicao_ensino=data['instituicao_ensino'],
            matricula_faculdade=data['matricula_faculdade'],
            ano_estimado_conclusao=data['ano_estimado_conclusao']
        )
        db.session.add(novo_estudante)
        db.session.commit()

        try:
            enviar_email_confirmacao(data['email'], data['nome'], 'estudante')
        except Exception as e:
            return jsonify({
                'message': 'Estudante criado com sucesso, mas houve um problema ao enviar o email de confirmação.',
                'error': str(e)
            }), 201

        return jsonify({'message': 'Dados salvos, confirme seu cadastro no link enviado por email.'}), 201

    @app.route('/estudante/buscar', methods=['GET'])
    @token_authenticator.token_required
    def buscar_estudantes(user_id=None):
        nome = request.args.get('nome')
        cpf = request.args.get('cpf')
        instituicao_ensino = request.args.get('instituicao_ensino')
        email = request.args.get('email')
        fl_ativo = request.args.get('fl_ativo')

        query = Estudante.query
        if nome:
            query = query.filter(Estudante.nome.ilike(f'%{nome}%'))
        if cpf:
            query = query.filter_by(cpf=cpf)
        if instituicao_ensino:
            query = query.filter(Estudante.instituicao_ensino.ilike(f'%{instituicao_ensino}%'))
        if email:
            query = query.filter(Estudante.email.ilike(f'%{email}%'))
        if fl_ativo:
            query = query.filter_by(fl_ativo=fl_ativo)

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
                'fl_ativo': estudante.fl_ativo,
                'email': estudante.email,
                'hash': estudante.hash,
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

        if estudante.fl_ativo == '0':
            return jsonify({'message': 'Estudante inativo.'}), 400

        email = data.get('email')
        try:
            valid_email = validate_email(email)
            email_normalizado = valid_email.email
        except EmailNotValidError as e:
            return jsonify({'message': f'E-mail inválido: {str(e)}'}), 400

        estudante.nome = data.get('nome', estudante.nome)
        estudante.celular = data.get('celular', estudante.celular)
        estudante.email = data.get('email', estudante.email)
        estudante.fixo = data.get('fixo', estudante.fixo)
        estudante.email = email_normalizado
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
    def excluir_estudante(id, user_id=None):
        estudante = Estudante.query.get(id)

        if not estudante:
            return jsonify({'message': 'Estudante não encontrado.'}), 404

        estudante.fl_ativo = 0
        db.session.commit()

        return jsonify({'message': 'Estudante inativado com sucesso!'}), 200

    @app.route('/estudante/confirmar/<token>', methods=['GET'])
    def confirmar_email_estudante(token):
        email = verificar_token_confirmacao(token)
        if not email:
            return jsonify({'message': 'Token inválido ou expirado.'}), 400

        estudante = Estudante.query.filter_by(email=email).first()
        if not estudante:
            return jsonify({'message': 'Usuário não encontrado.'}), 404

        if estudante.fl_ativo == 1:
            return jsonify({'message': 'Usuário já confirmado.'}), 400

        estudante.fl_ativo = 1
        db.session.commit()
        return jsonify({'message': 'Cadastro confirmado com sucesso!'}), 200