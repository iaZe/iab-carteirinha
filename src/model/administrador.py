from database.sessao import db


class Administrador(db.Model):
    __tablename__ = 'administradores'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    cpf = db.Column(db.String(11), unique=True, nullable=False)
    endereco_id = db.Column(db.Integer, db.ForeignKey('enderecos.id'))
    endereco = db.relationship('Endereco', backref=db.backref('administradores', lazy=True))
    email = db.Column(db.String(255), unique=True, nullable=False)
    