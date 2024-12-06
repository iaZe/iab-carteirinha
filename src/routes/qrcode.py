import segno, io
from flask import send_file, request, jsonify


def registro_rota_qrcode(app, token_authenticator, rate_limiter):

    @app.route('/carteira/gerarQrCode', methods=['POST'])
    @rate_limiter.limit("5 per minute")
    @token_authenticator.token_required
    def gerar_qrcode(user_id=None):
        data = request.get_json()

        QRhash = data.get('hash', None)
        
        if not QRhash:
            return jsonify({'mensagem': 'Nenhuma hash fornecida!'}), 400

        buffer = io.BytesIO() # Buffer onde será armazenado os dados do código QR

        qr = segno.make_qr(QRhash)

        qr.save(buffer, kind='png', scale=5, border=1)

        buffer.seek(0) # Movendo o indicador do buffer para ler os dados a partir do início

        return send_file(buffer, mimetype='image/png', as_attachment=False), 200
