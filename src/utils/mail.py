from flask_mail import Mail, Message
from utils.token import gerar_token_confirmacao
from urllib.parse import urlparse
from flask import url_for

import os

mail = Mail()

def enviar_email_confirmacao(email, nome, entidade):
 try:
     token = gerar_token_confirmacao(email)

     link_confirmacao = url_for(
         f'confirmar_email_{entidade}',
         token=token,
         _external=True
     )
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
