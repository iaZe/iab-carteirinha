from dotenv import load_dotenv
from flask import Flask
from flask_mail import Mail
from utils.mail import mail, enviar_email_confirmacao_arquiteto

from database.sessao import db
from routes.administrador import registro_rota_administrador
from routes.arquiteto import registro_rota_arquiteto
from routes.estudante import registro_rota_estudante
from routes.login import registro_rota_login
from routes.usuario import registro_rota_usuario
from routes.parceiro import registro_rota_parceiro
from routes.beneficio import registro_rota_beneficio
from routes.carteira import registro_rota_carteira
from settings.config import Config
from settings.jwt_manager import JWTManager
from settings.limiter import RateLimiter
from settings.token_auth import TokenAuthenticator

load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    mail.init_app(app)

    db.init_app(app)
    # Segurança do codigo
    jwt_manager = JWTManager(secret_key=app.config['SECRET_KEY'], expiration_hours=2)
    rate_limiter = RateLimiter(app=app, default_limits=["5 per minute"])
    token_authenticator = TokenAuthenticator(secret_key=app.config['SECRET_KEY'])

    # Registro de rotas
    registro_rota_login(app, jwt_manager, rate_limiter)
    registro_rota_administrador(app, token_authenticator)
    registro_rota_arquiteto(app, token_authenticator)
    registro_rota_usuario(app)
    registro_rota_estudante(app, token_authenticator)
    registro_rota_parceiro(app, token_authenticator)
    registro_rota_beneficio(app, token_authenticator)
    registro_rota_carteira(app, token_authenticator)

    return app
