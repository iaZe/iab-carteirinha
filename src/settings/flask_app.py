from flask import Flask

from database.sessao import db
from routes.administrator import register_routes_admin
from routes.architect import register_routes_architect
from routes.login import register_routes_login
from routes.user import register_routes_user
from settings.config import Config

from dotenv import load_dotenv

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
    register_routes_admin(app, token_authenticator)
    register_routes_architect(app, token_authenticator)
    register_routes_user(app, token_authenticator)

    return app
