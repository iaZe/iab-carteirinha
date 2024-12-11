from flask import jsonify, request
from datetime import datetime, timedelta
from database.sessao import db
from model.carteira import Carteira
from model.arquiteto import Arquiteto
from utils.upload import upload_comprovante
from utils.comprovante import gerar_comprovante
from utils.date_format import formatar_data
import hashlib

def registro_rota_carteira(app, token_authenticator):
    @app.route('/carteira/emitir/<int:arquiteto_id>', methods=['POST'])
    @token_authenticator.token_required
    def emitir_documento(arquiteto_id, user_id=None):
        data = request.get_json()

        arquiteto = Arquiteto.query.get(arquiteto_id)
        if not arquiteto:
            return jsonify({'message': 'Arquiteto não encontrado.'}), 404

        if arquiteto.carteira:
            return jsonify({'message': 'O arquiteto já possui uma carteira emitida.'}), 400

        try:
            data_filiacao = datetime.strptime(data['data_filiacao'], '%d-%m-%Y')
            nova_carteira = Carteira(
                nome=data['nome'],
                cpf=data['cpf'],
                matricula=data['matricula'],
                data_filiacao=data_filiacao,
                data_validade=data_filiacao + timedelta(days=365),
                hash=hashlib.sha256(data['cpf'].encode('utf-8')).hexdigest(),
                foto=data['foto'],
                fl_ativo='1',
                arquiteto_id=arquiteto_id
            )

            db.session.add(nova_carteira)
            db.session.commit()

            return jsonify({'message': 'Documento emitido com sucesso!'}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': 'Erro ao emitir o documento.', 'error': str(e)}), 500

    @app.route('/carteira/buscar', methods=['GET'])
    @token_authenticator.token_required
    def listar_carteiras(user_id=None):
        nome = request.args.get('nome')
        cpf = request.args.get('cpf')
        matricula = request.args.get('matricula')
        fl_ativo = request.args.get('fl_ativo')

        query = Carteira.query

        if nome:
            query = query.filter(Carteira.nome.ilike(f'%{nome}%'))
        if cpf:
            query = query.filter_by(cpf=cpf)
        if matricula:
            query = query.filter_by(matricula=matricula)
        if fl_ativo:
            query = query.filter_by(fl_ativo=fl_ativo)

        carteiras = query.all()
        resultados = []
        for carteira in carteiras:
            result = {
                'id': carteira.id,
                'nome': carteira.nome,
                'cpf': carteira.cpf,
                'matricula': carteira.matricula,
                'data_filiacao': carteira.data_filiacao,
                'data_validade': carteira.data_validade,
                'hash': carteira.hash,
                'foto': carteira.foto,
                'fl_ativo': carteira.fl_ativo
            }
            resultados.append(result)

            return jsonify(resultados), 200

    @app.route('/carteira/atualizar/<int:id>', methods=['PUT'])
    @token_authenticator.token_required
    def atualizar_carteira(id, user_id=None):
        data = request.get_json()

        carteira = Carteira.query.get(id)

        if not carteira:
            return jsonify({'message': 'Carteira não encontrada.'}), 404

        if carteira.fl_ativo == '0':
            return jsonify({'message': 'Carteira inativa.'}), 400

        carteira.nome = data.get('nome', carteira.nome)
        carteira.matricula = data.get('matricula', carteira.matricula)
        carteira.foto = data.get('foto', carteira.foto)

        data_filiacao = data.get('data_filiacao')
        if data_filiacao:
            carteira.data_filiacao = datetime.strptime(data_filiacao, '%d-%m-%Y')
            carteira.data_validade = carteira.data_filiacao + timedelta(days=365)

        db.session.commit()

        return jsonify({'message': 'Carteira atualizada com sucesso!'}), 200

    @app.route('/carteira/excluir/<int:id>', methods=['PUT'])
    @token_authenticator.token_required
    def excluir_carteira(id, user_id=None):
        carteira = Carteira.query.get(id)

        if not carteira:
            return jsonify({'message': 'Carteira não encontrada.'}), 404

        carteira.fl_ativo = '0'
        db.session.commit()

        return jsonify({'message': 'Carteira inativada com sucesso!'}), 200

    @app.route('/carteira/ativar/<int:id>', methods=['PUT'])
    @token_authenticator.token_required
    def ativar_carteira(id, user_id=None):
        carteira = Carteira.query.get(id)

        if not carteira:
            return jsonify({'message': 'Carteira não encontrada.'}), 404

        carteira.fl_ativo = '1'
        db.session.commit()

        return jsonify({'message': 'Carteira ativada com sucesso!'}), 200

    @app.route('/carteira/renovar/<int:arquiteto_id>', methods=['POST'])
    @token_authenticator.token_required
    def renovar_carteirinha_route(arquiteto_id, user_id=None):
        print("Rota /carteira/renovar chamada")
        anos = request.json.get('anos', 1)
        arquiteto = Arquiteto.query.get(arquiteto_id)
        if not arquiteto:
            return jsonify({'erro': 'Arquiteto não encontrado.'}), 404

        # Validação para renovar apenas se a data atual for maior que a data de fim de afiliação "Givaldo"
        if arquiteto.data_fim_filiacao and arquiteto.data_fim_filiacao >= datetime.utcnow():
            return jsonify({'erro': 'A carteirinha só pode ser renovada após a data fim da afiliação.'}), 400

        arquiteto.renovar_carteirinha(anos)
        comprovante = gerar_comprovante(arquiteto)
        comprovante_url = upload_comprovante(comprovante)

        return jsonify({
            'mensagem': 'Carteirinha renovada com sucesso!',
            'data_fim_filiacao': formatar_data(arquiteto.data_fim_filiacao),
            'comprovante': comprovante_url
        })