from database.sessao import db


class Endereco(db.Model):
    __tablename__ = 'enderecos'
    id = db.Column(db.Integer, primary_key=True)
    cep = db.Column(db.String(9), nullable=False)
    logradouro = db.Column(db.String(255), nullable=False)
    complemento = db.Column(db.String(255))
    numero = db.Column(db.Integer, nullable=False)
    bairro = db.Column(db.String(100), nullable=False)
    cidade = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.String(2), nullable=False)
    