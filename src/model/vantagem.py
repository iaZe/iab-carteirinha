from database.sessao import db

class Vantagem(db.Model):
    __tablename__ = 'vantagens'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255))
    descricao = db.Column(db.String(255))
