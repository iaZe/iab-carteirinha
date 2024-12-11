FROM python:3.10

WORKDIR /app/src

RUN python -m venv /app/.venv

COPY requirements.txt /app/
RUN /app/.venv/bin/pip install --upgrade pip && \
    /app/.venv/bin/pip install -r /app/requirements.txt

COPY . /app

# Copiar o arquivo .env para o contêiner "Givaldo"
COPY .env /app/.env

ENV FLASK_APP=src/app.py:create_app
ENV PYTHONPATH=/app/src
ENV PATH="/app/.venv/bin:$PATH"

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]