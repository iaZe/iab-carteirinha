from settings.flask_app import create_app
from database.sessao import db

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
