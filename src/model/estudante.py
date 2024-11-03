from datetime import datetime

from database.sessao import db


class Estudante(db.Model):
    __tablename__ = 'estudantes'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    cpf = db.Column(db.String(11), unique=True, nullable=False)
    celular = db.Column(db.String(15))
    fixo = db.Column(db.String(15))
    data_cadastro = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    endereco_id = db.Column(db.Integer, db.ForeignKey('enderecos.id'))
    endereco = db.relationship('Endereco', backref=db.backref('arquitetos', lazy=True))
    email = db.Column(db.String(255), nullable=False)
    hash = db.Column(db.String(255))
    foto = db.Column(db.String(255))
    instituicao_ensino = db.Column(db.String(255))
    matricula_faculdade = db.Column(db.String(50), nullable=False)
    ano_estimado_conclusao = db.Column(db.Integer)
    fl_ativo = db.Column(db.String(1), nullable=False)