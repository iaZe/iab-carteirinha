import base64, binascii
from os import urandom
from flask import jsonify, current_app
from cryptography.exceptions import InvalidKey, InvalidTag
from cryptography.hazmat.primitives.ciphers.aead import AESGCMSIV


class SecurityManager:

    @classmethod
    def generateAdminAuthToken(cls, data: bytes):
        try:
            key = bytes(current_app.config['SECRET_KEY'], 'utf-8')

            nonce = urandom(12)

            aesgcmsiv = AESGCMSIV(key)

            encrypted = nonce + aesgcmsiv.encrypt(nonce, data, key)

            return base64.urlsafe_b64encode(encrypted)
        except binascii.Error:
            return jsonify({'mensagem': 'Formato base64 da chave é inválido!'}), 400
        except ValueError:
            return jsonify({'mensagem': 'Tamanho da chave é inválido!'}), 400
        except TypeError:
            return jsonify({'mensagem': 'Tipo da chave é inválido!'}), 400

    @classmethod
    def validateAdminAuthToken(cls, token: bytes):
        try:
            key = bytes(current_app.config['SECRET_KEY'], 'utf-8')

            token = base64.urlsafe_b64decode(token)

            nonce, encrypted = token[:12], token[12:]

            aesgcmsiv = AESGCMSIV(key)

            aesgcmsiv.decrypt(nonce, encrypted, key)

            return True
        except InvalidKey:
            return None
        except InvalidTag:
            return None
        except binascii.Error:
            return None
        except ValueError:
            return None
        except TypeError:
            return None
