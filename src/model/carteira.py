from datetime import datetime

from database.sessao import db

class Carteira(db.Model):
    __tablename__ = 'carteiras'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    cpf = db.Column(db.String(11), unique=True, nullable=False)
    matricula = db.Column(db.String(50), nullable=False)
    data_filiacao = db.Column(db.DateTime, nullable=False)
    data_validade = db.Column(db.DateTime, nullable=False)
    hash = db.Column(db.String(255), nullable=False)
    foto = db.Column(db.String(255), nullable=False)
    fl_ativo = db.Column(db.String(1), nullable=False)
    arquiteto_id = db.Column(db.Integer, db.ForeignKey('arquitetos.id'), unique=True)
    arquiteto = db.relationship('Arquiteto', backref=db.backref('carteira', uselist=False))