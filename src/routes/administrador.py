from crypt import methods

from flask import request, jsonify

from database.sessao import db
from domain.endereco import EnderecoDomain
from model.administrador import Administrador
from model.endereco import Endereco
from validate_docbr import CPF


def registro_rota_administrador(app, token_authenticator):
    @app.route('/administrador/cadastrar', methods=['POST'])
    @token_authenticator.token_required
    def cadastrar_administrador(user_id=None):
        data = request.get_json()

        cpf_validator = CPF()
        cpf = data.get('cpf')

        if not cpf_validator.validate(cpf):
            return jsonify({'message': 'CPF inválido.'}), 400

        cpf_existente = Administrador.query.filter_by(cpf=data['cpf']).first()
        if cpf_existente:
            return jsonify({'message': 'Administrador já cadastrado.'}), 400

        email_existente = Administrador.query.filter_by(email=data['email']).first()
        if email_existente:
            return jsonify({'message': 'E-mail já cadastrado'}), 400

        endereco_domain = EnderecoDomain(data.get('endereco'))
        endereco = endereco_domain.save_endereco()

        novo_administrador = Administrador(
            nome=data['nome'],
            cpf=data['cpf'],
            endereco_id=endereco.id,
            email=data['email'],
            fl_ativo=1
        )
        db.session.add(novo_administrador)
        db.session.commit()
        return jsonify({"message": "Administrador criado com sucesso!"}), 201


    @app.route('/administrador/buscar')
    @token_authenticator.token_required
    def buscar_adminstrador(user_id=None):
        nome = request.args.get('nome')
        cpf = request.args.get('cpf')
        email = request.args.get('email')
        fl_ativo = request.args.get('fl_ativo')

        query = Administrador.query

        if nome:
            query = query.filter(Administrador.nome.ilike(f'%{nome}%'))
        if cpf:
            query = query.filter_by(cpf=cpf)
        if email:
            query = query.filter(Administrador.email.ilike(f'%{email}%'))
        if fl_ativo:
            query = query.filter_by(fl_ativo=fl_ativo)

        administradores = query.all()

        resultados = []
        for adminstrador in administradores:
            endereco = adminstrador.endereco
            result = {
                'id': adminstrador.id,
                'nome': adminstrador.nome,
                'cpf': adminstrador.cpf,
                'endereco': {
                    'cep': endereco.cep,
                    'logradouro': endereco.logradouro,
                    'complemento': endereco.complemento,
                    'numero': endereco.numero,
                    'bairro': endereco.bairro,
                    'cidade': endereco.cidade,
                    'estado': endereco.estado
                },
                'email': adminstrador.email,
                'fl_ativo': adminstrador.fl_ativo
            }
            resultados.append(result)
        return jsonify(resultados), 200

    @app.route('/adminstrador/atualizar/<int:id>', methods=['PUT'])
    @token_authenticator.token_required
    def atualizar_administrador(id, user_id=None):
        data = request.get_json()

        administrador = Administrador.query.get(id)

        if not administrador:
            return jsonify({'message': 'Administrador não encontradoo.'}), 404

        administrador.nome = data.get('nome', administrador.nome)
        administrador.email = data.get('email', administrador.email)

        if administrador.endereco:
            endereco = administrador.endereco
            endereco.cep = data.get('endereco', {}).get('cep', endereco.cep)
            endereco.logradouro = data.get('endereco', {}).get('logradouro', endereco.logradouro)
            endereco.complemento = data.get('endereco', {}).get('complemento', endereco.complemento)
            endereco.numero = data.get('endereco', {}).get('numero', endereco.numero)
            endereco.bairro = data.get('endereco', {}).get('bairro', endereco.bairro)
            endereco.cidade = data.get('endereco', {}).get('cidade', endereco.cidade)
            endereco.estado = data.get('endereco', {}).get('estado', endereco.estado)

        db.session.commit()

        return jsonify({'message': 'Administrador atualizado com sucesso!'}), 200

    @app.route('/administrador/excluir/<int:id>', methods = ['PUT'])
    @token_authenticator.token_required
    def excluir_administrador(id, user_id=None):
        administrador = Administrador.query.get(id)

        if not administrador:
            return jsonify({'message': 'Administrador não encontradoo.'}), 404

        administrador.fl_ativo = 0
        db.session.commit()

        return jsonify({'message': 'Administrador inativado com sucesso!'}), 200