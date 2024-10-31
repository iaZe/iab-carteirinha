from dotenv import load_dotenv
from flask import Flask

from database.sessao import db
from routes.administrator import registrar_rota_administrador
from routes.architect import register_routes_architect
from routes.estudante import registrar_rota_estudante
from routes.login import register_routes_login
from routes.user import register_routes_user
from settings.config import Config
from settings.jwt_manager import JWTManager
from settings.limiter import RateLimiter
from settings.token_auth import TokenAuthenticator

load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    # Segurança do codigo
    jwt_manager = JWTManager(secret_key=app.config['SECRET_KEY'], expiration_hours=2)
    rate_limiter = RateLimiter(app=app, default_limits=["5 per minute"])
    token_authenticator = TokenAuthenticator(secret_key=app.config['SECRET_KEY'])

    # Registro de rotas
    register_routes_login(app, jwt_manager, rate_limiter)
    registrar_rota_administrador(app, token_authenticator)
    register_routes_architect(app, token_authenticator)
    register_routes_user(app)
    registrar_rota_estudante(app, token_authenticator)

    return app
