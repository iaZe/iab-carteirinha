from database.sessao import db

class Beneficio(db.Model):
    __tablename__ = 'beneficios'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255))
    descricao = db.Column(db.String(255))
