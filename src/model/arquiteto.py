from datetime import datetime

from database.sessao import db


class Arquiteto(db.Model):
    __tablename__ = 'arquitetos'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    cpf = db.Column(db.String(11), unique=True, nullable=False)
    uf_documento = db.Column(db.String(2), nullable=False)
    matricula = db.Column(db.String(50), nullable=False)
    celular = db.Column(db.String(15))
    fixo = db.Column(db.String(15))
    data_filiacao = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    data_fim_filiacao = db.Column(db.DateTime)
    endereco_id = db.Column(db.Integer, db.ForeignKey('enderecos.id'))
    endereco = db.relationship('Endereco', backref=db.backref('arquitetos', lazy=True))
    email = db.Column(db.String(255), nullable=False)
    hash = db.Column(db.String(255))
    foto = db.Column(db.String(255))
