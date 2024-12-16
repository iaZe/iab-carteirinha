from flask_mail import Mail, Message
from utils.token import gerar_token_confirmacao
from urllib.parse import urlparse
from flask import url_for

import os

mail = Mail()


def enviar_email_confirmacao(email, nome):
 try:
     token = gerar_token_confirmacao(email)
     parsed_url = urlparse(request.base_url)
     path_base = parsed_url.path.split('/')[1]
     dominio = parsed_url.netloc

     link_confirmacao = f"https://{dominio}/{path_base}/confirmar/{token}"

     msg = Message(
         subject="Confirmação de Cadastro",
         recipients=[email],
         body=f"""Olá {nome},

Por favor, clique no link abaixo para confirmar seu cadastro:
{link_confirmacao}

Obrigado por se juntar a nós!
"""
     )
     mail.send(msg)
 except Exception as e:
     print(f"Erro ao enviar email: {e}")

def enviar_email_confirmacao_estudante(email, nome):
 try:
     token = gerar_token_confirmacao(email)
     if os.getenv('FLASK_ENV') == 'production':
         link_confirmacao = f"https://iabapptest1-87j8tiit.b4a.run/estudante/confirmar/{token}"
     else:
         link_confirmacao = f"http://127.0.0.1:5000/estudante/confirmar/{token}"

     msg = Message(
         subject="Confirmação de Cadastro",
         recipients=[email],
         body=f"""Olá {nome},

Por favor, clique no link abaixo para confirmar seu cadastro:
{link_confirmacao}

Obrigado por se juntar a nós!
"""
     )
     mail.send(msg)
 except Exception as e:
     print(f"Erro ao enviar email: {e}")
