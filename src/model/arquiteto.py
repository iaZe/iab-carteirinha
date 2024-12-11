from datetime import datetime, timedelta
from database.sessao import db

class Arquiteto(db.Model):
    __tablename__ = 'arquitetos'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    cpf = db.Column(db.String(11), unique=True, nullable=False)
    matricula = db.Column(db.String(50), nullable=False)
    celular = db.Column(db.String(15))
    fixo = db.Column(db.String(15))
    data_filiacao = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    data_fim_filiacao = db.Column(db.DateTime, nullable=False, default=datetime.utcnow() + timedelta(days=365))
    endereco_id = db.Column(db.Integer, db.ForeignKey('enderecos.id'))
    endereco = db.relationship('Endereco', backref=db.backref('arquitetos_endereco', lazy=True))
    email = db.Column(db.String(255), nullable=False)
    hash = db.Column(db.String(255))
    foto = db.Column(db.String(255))
    site = db.Column(db.String(255))
    numero_cau = db.Column(db.String(50))
    fl_ativo = db.Column(db.String(1), nullable=False)

    def renovar_carteirinha(self, anos=1):
        if not self.data_fim_filiacao or self.data_fim_filiacao < datetime.utcnow():
            self.data_fim_filiacao = datetime.utcnow() + timedelta(days=365 * anos)
        else:
            self.data_fim_filiacao += timedelta(days=365 * anos)
        db.session.commit()