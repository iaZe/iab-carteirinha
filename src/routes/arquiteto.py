from utils.mail import enviar_email_confirmacao
from utils.token import verificar_token_confirmacao
from datetime import datetime

from flask import request, jsonify

from database.sessao import db
from domain.endereco import EnderecoDomain
from model.administrador import Administrador
from model.arquiteto import Arquiteto
from model.endereco import Endereco
from validate_docbr import CPF
import hashlib


def registro_rota_arquiteto(app, token_authenticator):

    @app.route('/arquiteto/cadastrar', methods=['POST'])
    @token_authenticator.token_required
    def cadastrar_arquiteto(user_id=None):
        data = request.get_json()

        cpf_validator = CPF()
        cpf = data.get('cpf')

        if not cpf_validator.validate(cpf):
            return jsonify({'message': 'CPF inválido.'}), 400

        cpf_existente = Arquiteto.query.filter_by(cpf=data['cpf']).first()
        if cpf_existente:
            return jsonify({'message': 'Arquiteto já cadastrado.'}), 400

        email_existente = Arquiteto.query.filter_by(email=data['email']).first()
        if email_existente:
            return jsonify({'message': 'E-mail já cadastrado'}), 400

        endereco_domain = EnderecoDomain(data.get('endereco'))
        endereco = endereco_domain.save_endereco()
        novo_arquiteto = Arquiteto(
            nome=data['nome'],
            cpf=data['cpf'],
            matricula=data['matricula'],
            celular=data['celular'],
            fixo=data['fixo'],
            endereco_id=endereco.id,
            email=data['email'],
            hash= hashlib.sha256(cpf.encode('utf-8')).hexdigest(),
            foto=data['foto'],
            site=data['site'],
            numero_cau=data['numero_cau'],
            fl_ativo=0
        )
        db.session.add(novo_arquiteto)
        db.session.commit()

        try:
            enviar_email_confirmacao(data['email'], data['nome'])
        except Exception as e:
            return jsonify({
                'message': 'Arquiteto criado com sucesso, mas houve um problema ao enviar o email de confirmação.',
                'error': str(e)
            }), 201

        return jsonify({'message': 'Dados salvos, confirme seu cadastro no link enviado por email.'}), 201

    @app.route('/arquiteto/buscar', methods=['GET'])
    @token_authenticator.token_required
    def listar_arquitetos(user_id=None):
        nome = request.args.get('nome')
        cpf = request.args.get('cpf')
        matricula = request.args.get('matricula')
        email = request.args.get('email')
        fl_ativo = request.args.get('fl_ativo')

        query = Arquiteto.query

        if nome:
            query = query.filter(Arquiteto.nome.ilike(f'%{nome}%'))
        if cpf:
            query = query.filter_by(cpf=cpf)
        if matricula:
            query = query.filter_by(matricula=matricula)
        if email:
            query = query.filter(Estudante.email.ilike(f'%{email}%'))
        if fl_ativo:
            query = query.filter_by(fl_ativo=fl_ativo)

        arquitetos = query.all()
        resultados = []
        for arquiteto in arquitetos:
            endereco = arquiteto.endereco
            result = {
                'id': arquiteto.id,
                'nome': arquiteto.nome,
                'cpf': arquiteto.cpf,
                'matricula': arquiteto.matricula,
                'celular': arquiteto.celular,
                'fixo': arquiteto.fixo,
                'data_filiacao': arquiteto.data_filiacao,
                'data_fim_filiacao': arquiteto.data_fim_filiacao,
                'endereco': {
                    'cep': endereco.cep,
                    'logradouro': endereco.logradouro,
                    'complemento': endereco.complemento,
                    'numero': endereco.numero,
                    'bairro': endereco.bairro,
                    'cidade': endereco.cidade,
                    'estado': endereco.estado
                },
                'email': arquiteto.email,
                'hash': arquiteto.hash,
                'foto': arquiteto.foto,
                'site': arquiteto.site,
                'numero_cau': arquiteto.numero_cau,
                'fl_ativo': arquiteto.fl_ativo
            }
            resultados.append(result)
        return jsonify(resultados), 200

    @app.route('/arquiteto/atualizar/<int:id>', methods=['PUT'])
    @token_authenticator.token_required
    def atualizar_arquiteto(id, user_id=None):

        data = request.get_json()

        arquiteto = Arquiteto.query.get(id)

        if not arquiteto:
            return jsonify({'message': 'Arquiteto não encontrado.'}),

        if arquiteto.fl_ativo == '0':
            return jsonify({'message': 'Arquiteto inativo.'}), 400
        else:
            arquiteto.nome = data.get('nome', arquiteto.nome)
            arquiteto.matricula = data.get('matricula', arquiteto.matricula)
            arquiteto.email = data.get('email', arquiteto.email)
            arquiteto.celular = data.get('celular', arquiteto.celular)
            arquiteto.fixo = data.get('fixo', arquiteto.fixo)
            arquiteto.email = data.get('email', arquiteto.email)
            arquiteto.foto = data.get('foto', arquiteto.foto)
            arquiteto.site = data.get('site', arquiteto.site)
            arquiteto.numero_cau = data.get('numero_cau', arquiteto.numero_cau)

            if arquiteto.endereco:
                endereco = arquiteto.endereco
                endereco.cep = data.get('endereco', {}).get('cep', endereco.cep)
                endereco.logradouro = data.get('endereco', {}).get('logradouro', endereco.logradouro)
                endereco.complemento = data.get('endereco', {}).get('complemento', endereco.complemento)
                endereco.numero = data.get('endereco', {}).get('numero', endereco.numero)
                endereco.bairro = data.get('endereco', {}).get('bairro', endereco.bairro)
                endereco.cidade = data.get('endereco', {}).get('cidade', endereco.cidade)
                endereco.estado = data.get('endereco', {}).get('estado', endereco.estado)

            db.session.commit()

            return jsonify({'message': 'Arquiteto atualizado com sucesso!'}), 200

    @app.route('/arquiteto/excluir/<int:id>', methods=['PUT'])
    @token_authenticator.token_required
    def deletar_arquiteto(id, user_id=None):
        arquiteto = Arquiteto.query.get(id)

        if not arquiteto:
            return jsonify({'message': 'Arquiteto não encontrado'}), 404

        arquiteto.fl_ativo = 0
        db.session.commit()

        return jsonify({'message': 'Arquiteto inativado com sucesso!'})

    @app.route('/arquiteto/confirmar/<token>', methods=['GET'])
    def confirmar_email(token):
        email = verificar_token_confirmacao(token)
        if not email:
            return jsonify({'message': 'Token inválido ou expirado.'}), 400

        arquiteto = Arquiteto.query.filter_by(email=email).first()
        if not arquiteto:
            return jsonify({'message': 'Usuário não encontrado.'}), 404

        if arquiteto.fl_ativo == 1:
            return jsonify({'message': 'Usuário já confirmado.'}), 400

        arquiteto.fl_ativo = 1
        db.session.commit()
        return jsonify({'message': 'Cadastro confirmado com sucesso!'}), 200
