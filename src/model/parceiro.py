from database.sessao import db

class Parceiro(db.Model):
    __tablename__ = 'parceiros'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    cnpj = db.Column(db.String(14), unique=True, nullable=False)
    celular = db.Column(db.String(15))
    email = db.Column(db.String(255), nullable=False)
    endereco_id = db.Column(db.Integer, db.ForeignKey('enderecos.id'))
    endereco = db.relationship('Endereco', backref=db.backref('parceiros', lazy=True))
    beneficio_id = db.Column(db.Integer, db.ForeignKey('beneficios.id'))
    beneficio = db.relationship('Beneficio', backref=db.backref('parceiros', lazy=True))
    site = db.Column(db.String(255))
    fl_ativo = db.Column(db.String(1), nullable=False)
