from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
from flask import current_app
from flask_mail import Mail, Message
from pytz import timezone

from database.sessao import db
from model.administrador import Administrador
from model.carteira import Carteira

mail = Mail()


def enviar_email_vencimento_carteiras_para_arquitetos(app):
    with app.app_context():
        vencimento = datetime.utcnow() + timedelta(days=30)
        vencimento = vencimento.replace(hour=0, minute=0, second=0, microsecond=0)
        carteiras = Carteira.query.filter(Carteira.data_validade == vencimento).all()
        for carteira in carteiras:
            email = carteira.arquiteto.email
            nome = carteira.arquiteto.nome
            msg = Message(
                subject="Aviso Importante",
                recipients=[email],
                body=f"Olá {nome}, sua carteira está prestes a vencer em {carteira.data_validade.strftime('%d/%m/%Y')}. Não esqueça de renovar!"
            )
            mail.send(msg)


def enviar_email_vencimento_carteiras_para_administrador(app):
    with app.app_context():
        vencimento = datetime.utcnow() + timedelta(days=30)
        vencimento = vencimento.replace(hour=0, minute=0, second=0, microsecond=0)
        carteiras = Carteira.query.filter(Carteira.data_validade == vencimento).all()

        if carteiras:
            corpo_email = "Olá Administrador,\n\nSegue a lista de carteiras prestes a vencer:\n\n"
            for carteira in carteiras:
                corpo_email += (
                    f"Nome : {carteira.arquiteto.nome}\n"
                    f"Email : {carteira.arquiteto.email}\n"
                    f"Celular : {carteira.arquiteto.celular}\n"
                    f"Data de Vencimento: {carteira.data_validade.strftime('%d/%m/%Y')}\n"
                    f"Matrícula: {carteira.arquiteto.matricula}\n\n"
                )

            corpo_email += "Por favor, entre em contato com os arquitetos para garantir a renovação das carteiras."

            administradores = Administrador.query.filter(Administrador.fl_ativo == '1').all()
            emails_administradores = [admin.email for admin in administradores]

            if emails_administradores:
                msg = Message(
                    subject="Relatório de Carteiras a Vencer",
                    recipients=emails_administradores,
                    body=corpo_email
                )
                mail.send(msg)
            else:
                print("Nenhum administrador ativo encontrado.")
        else:
            print("Nenhuma carteira vence no período especificado.")


def iniciar_agendador(app):
    scheduler = BackgroundScheduler()
    brasil_timezone = timezone('America/Sao_Paulo')

    scheduler.add_job(
        lambda: enviar_email_vencimento_carteiras_para_arquitetos(app),
        'cron', hour=7, minute=0, timezone=brasil_timezone
    )
    scheduler.add_job(
        lambda: enviar_email_vencimento_carteiras_para_administrador(app),
        'cron', hour=7, minute=0, timezone=brasil_timezone
    )

    scheduler.start()
