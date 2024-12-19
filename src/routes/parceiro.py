import re
from email_validator import validate_email, EmailNotValidError
from flask import request, jsonify
from validate_docbr import CNPJ

from database.sessao import db
from domain.endereco import EnderecoDomain
from model.parceiro import Parceiro
from settings.token_auth import TokenAuthenticator
from utils.mail import enviar_email_confirmacao
from utils.token import verificar_token_confirmacao


def registro_rota_parceiro(app, token_authenticator):
    @app.route('/parceiro/cadastrar', methods=['POST'])
    @token_authenticator.token_required
    def cadastrar_parceiro(user_id=None):
        data = request.get_json()

        cnpj_validator = CNPJ()
        cnpj = data.get("cnpj")

        if not cnpj_validator.validate(cnpj):
            return jsonify({'message': 'CNPJ inválido.'}), 400

        cnpj_existente = Parceiro.query.filter_by(cnpj=data['cnpj']).first()
        if cnpj_existente:
            return jsonify({'message': 'Parceiro já cadastrado.'}), 400

        email = data.get('email')
        try:
            valid_email = validate_email(email)
            email_normalizado = valid_email.email
        except EmailNotValidError as e:
            return jsonify({'message': f'E-mail inválido: {str(e)}'}), 400

        email_existente = Parceiro.query.filter_by(email=data['email']).first()
        if email_existente:
            return jsonify({'message': 'E-mail já cadastrado'}), 400

        nome = data.get('nome')
        if nome:
            if not re.match(r'^[A-Za-z\s]+$', nome):
                return jsonify({'message': 'O nome deve conter apenas letras.'}), 400

        endereco_domain = EnderecoDomain(data.get('endereco'))
        endereco = endereco_domain.save_endereco()

        novo_parceiro = Parceiro(
            nome=nome,
            cnpj=cnpj,
            endereco_id=endereco.id,
            celular=data['celular'],
            email=email_normalizado,
            site=data['site'],
            fl_ativo=0
        )
        db.session.add(novo_parceiro)
        db.session.commit()

        try:
            enviar_email_confirmacao(data['email'], data['nome'], 'parceiro')
        except Exception as e:
            return jsonify({
                'message': 'Parceiro cadastrado com sucesso, mas houve um problema ao enviar o email de confirmação.',
                'error': str(e)
            }), 201

        return jsonify({'message': 'Dados salvos, confirme seu cadastro no link enviado por email.'}), 201

    @app.route('/parceiro/buscar', methods=['GET'])
    @token_authenticator.token_required
    def buscar_parceiros(user_id=None):
        nome = request.args.get('nome')
        cnpj = request.args.get('cnpj')
        email = request.args.get('email')

        query = Parceiro.query
        if nome:
            query = query.filter(Parceiro.nome.ilike(f'%{nome}%'))
        if cnpj:
            query = query.filter_by(cnpj=cnpj)
        if email:
            query = query.filter(Parceiro.email.ilike(f'%{email}%'))

        parceiros = query.all()
        resultados = []
        for parceiro in parceiros:
            endereco = parceiro.endereco
            result = {
                'id': parceiro.id,
                'nome': parceiro.nome,
                'cnpj': parceiro.cnpj,
                'celular': parceiro.celular,
                'email': parceiro.email,
                'site': parceiro.site,
                'endereco': {
                    'cep': endereco.cep,
                    'logradouro': endereco.logradouro,
                    'complemento': endereco.complemento,
                    'numero': endereco.numero,
                    'bairro': endereco.bairro,
                    'cidade': endereco.cidade,
                    'estado': endereco.estado
                },
                'fl_ativo': parceiro.fl_ativo
            }
            resultados.append(result)
            return jsonify(resultados), 200

    @app.route('/parceiro/atualizar/<int:id>', methods=['PUT'])
    @token_authenticator.token_required
    def atualizar_parceiro(id, user_id=None):
        data = request.get_json()

        parceiro = Parceiro.query.get(id)

        if not parceiro:
            return jsonify({'message': 'Parceiro não encontrado.'}), 404

        parceiro.nome = data.get('nome', parceiro.nome)
        parceiro.celular = data.get('celular', parceiro.celular)
        parceiro.site = data.get('site', parceiro.site)
        parceiro.email = data.get('email', parceiro.email)

        if parceiro.endereco:
            endereco = parceiro.endereco
            endereco.cep = data.get('endereco', {}).get('cep', endereco.cep)
            endereco.logradouro = data.get('endereco', {}).get('logradouro', endereco.logradouro)
            endereco.complemento = data.get('endereco', {}).get('complemento', endereco.complemento)
            endereco.numero = data.get('endereco', {}).get('numero', endereco.numero)
            endereco.bairro = data.get('endereco', {}).get('bairro', endereco.bairro)
            endereco.cidade = data.get('endereco', {}).get('cidade', endereco.cidade)
            endereco.estado = data.get('endereco', {}).get('estado', endereco.estado)

        db.session.commit()

        return jsonify({'message': 'Parceiro atualizado com sucesso!'}), 200

    @app.route('/parceiro/excluir/<int:id>', methods=['PUT'])
    @token_authenticator.token_required
    def excluir_parceiro(id, user_id=None):
        parceiro = Parceiro.query.get(id)

        if not parceiro:
            return jsonify({'message': 'Parceiro não encontrado.'}), 404

        parceiro.fl_ativo = '0'
        db.session.commit()

        return jsonify({'message': 'Parceiro inativado com sucesso!'}), 200

    @app.route('/parceiro/confirmar/<token>', methods=['GET'])
    def confirmar_email_parceiro(token):
        email = verificar_token_confirmacao(token)
        if not email:
            return jsonify({'message': 'Token inválido ou expirado.'}), 400

        parceiro = Parceiro.query.filter_by(email=email).first()
        if not parceiro:
            return jsonify({'message': 'Usuário não encontrado.'}), 404

        if parceiro.fl_ativo == 1:
            return jsonify({'message': 'Usuário já confirmado.'}), 400

        parceiro.fl_ativo = 1
        db.session.commit()
        return jsonify({'message': 'Cadastro confirmado com sucesso!'}), 200
