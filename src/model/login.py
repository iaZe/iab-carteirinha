import bcrypt

from database.sessao import db


class Login(db.Model):
    __tablename__ = 'logins'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    senha = db.Column(db.String(255), nullable=False)

    def set_senha(self, senha):
        self.senha = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt())

    def check_senha(self, senha):
        return bcrypt.checkpw(senha.encode('utf-8'), self.senha)
