# Flask-Database

## Descrição

Este é um projeto básico de gerenciamento de banco de dados usando Flask, 
estruturado de forma modular para fácil manutenção e escalabilidade. 

## Pré-requisitos

Docker Desktop

## Configuração do Ambiente

Siga os passos abaixo para configurar o ambiente e executar o projeto localmente.

### 1. Clonar o Repositório

````
git clone https://github.com/user/repositorio.git
cd repositorio
````
### 2. Docker

No terminal da sua IDE:

````
docker-compose up --build
````
Subir o projeto e buildar a imagem do docker, para somente subir usar `docker-compose up`.

````
docker-compose down
````
Para e remove o container. Observação: se desejar remover tudo, inclusive os dados persistidos do banco usar `docker-compose down -v`

**Obs: Sempre que o arquivo docker-compose ou Dockerfile for alterado faz-se necessário rebuildar o container.**

A aplicação estará disponível em http://127.0.0.1:5000/.


## Estrutura do Projeto

* database/: Configurações do banco de dados e sessão.

* model/: Modelos de dados, definindo a estrutura das entidades do banco.

* routes/: Definição das rotas (endpoints) da aplicação.

* settings/: Configurações do Flask e da aplicação.

* main.py: Ponto de entrada da aplicação.

## Testes

Para rodar os testes (se houverem), utilize o comando:

````
pytest
````

## Contribuições

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (git checkout -b feature/nome-da-feature).
3. Faça commit de suas alterações (git commit -m 'Adiciona nova feature').
4. Envie para a branch original (git push origin feature/nome-da-feature).
5. Crie um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.
