import boto3
from botocore.exceptions import NoCredentialsError, ClientError
import os
from dotenv import load_dotenv

load_dotenv()

def upload_comprovante(comprovante_path):
    aws_access_key_id = os.getenv('AWS_ACCESS_KEY_ID')
    aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')
    print(f'AWS_ACCESS_KEY_ID: {aws_access_key_id}')
    print(f'AWS_SECRET_ACCESS_KEY: {aws_secret_access_key}')
    s3 = boto3.client('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)
    bucket_name = 'iab-se-backend-prod-bucket'
    directory_name = 'carteirinha/2024/sept/'
    try:
        print(f'Tentando fazer upload de {comprovante_path} para {bucket_name}/{directory_name}')
        s3.upload_file(
            Filename=comprovante_path,
            Bucket=bucket_name,
            Key=f'{directory_name}{comprovante_path}'
        )
        print(f'{comprovante_path} carregado com sucesso para {bucket_name}')
        return f"https://{bucket_name}.s3.amazonaws.com/{directory_name}{comprovante_path}"
    except FileNotFoundError:
        print('O arquivo não foi encontrado')
        return None
    except NoCredentialsError:
        print('Credenciais não disponíveis')
        return None
    except ClientError as e:
        print(f'Erro ao carregar o arquivo: {e}')
        return None