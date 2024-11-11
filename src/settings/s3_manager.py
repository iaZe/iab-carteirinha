import boto3
from botocore.exceptions import ClientError, NoCredentialsError


class S3Manager():
    def __init__(self, aws_access_id, aws_access_secret_key, 
                 bucket_name, kms_key_id, region_name=None):
        self.s3 = boto3.client('s3', aws_access_id=aws_access_id,
                               aws_access_secret_key=aws_access_secret_key,
                               region_name=region_name)
        self.bucket_name = bucket_name
        self.kms_key_id = kms_key_id
        self.directory_name = 'carteirinha/2024/sept/'

    def upload_file(self, file_name, object_name=None):
        """
        Enviar arquivos para o bucket
        :param file_name: Caminho onde está armazenado o arquivo
        :param object_name: Nome com o qual o arquivo será salvo
        """
        try:
            if not object_name:
                object_name = file_name
            self.s3.upload_file(
                Filename=object_name, Bucket=self.bucket_name,
                Key=f'{self.directory_name}{file_name}',
                ExtraArgs={
                    'ServerSideEncryption': 'aws:kms',
                    'SSEKMSKeyId': self.kms_key_id
                }
            )
            print(f'{repr(file_name)} enviado com sucesso para {self.bucket_name}!')
        except FileNotFoundError as e:
            print('Arquivo não encontrado!')
        except NoCredentialsError as e:
            print('Credenciais inválidas!')
        except ClientError as e:
            print(f'Erro no S3 Client: {e}')
