from database.sessao import db

class Desconto(db.Model):
    __tablename__ = 'descontos'
    id = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.String(255))