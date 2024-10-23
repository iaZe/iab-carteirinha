from database.sessao import db
from model.endereco import Endereco


class EnderecoDomain:

    def __init__(self, endereco):
        self.endereco = endereco

    def save_endereco(self):
        endereco = Endereco(
            cep=self.endereco['cep'],
            logradouro=self.endereco['logradouro'],
            complemento=self.endereco['complemento'],
            numero=self.endereco['numero'],
            bairro=self.endereco['bairro'],
            cidade=self.endereco['cidade'],
            estado=self.endereco['estado']
        )

        db.session.add(endereco)
        db.session.commit()

        return endereco
