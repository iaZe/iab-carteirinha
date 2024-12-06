import base64, binascii, uuid
from os import urandom
from flask import jsonify
from cryptography.exceptions import InvalidKey, InvalidTag
from cryptography.hazmat.primitives.ciphers.aead import AESGCMSIV


class SecurityManager:

    @classmethod
    def generateUUID(cls):
        return uuid.uuid4()
    
    @classmethod
    def validateUUID(cls, uuid_to_validate):
        try:
            uuid_object = uuid.UUID(uuid_to_validate.hex, version=4)
            return uuid_object == uuid_to_validate
        except Exception:
            return None

    @classmethod
    def generateAdminAuthToken(cls, data: bytes, key: bytes):
        try:
            key = base64.urlsafe_b64decode(key)

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
    def validateAdminAuthToken(cls, token: bytes, key: bytes):
        try:
            key = base64.urlsafe_b64decode(key)

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
