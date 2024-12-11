def gerar_comprovante(arquiteto):
    comprovante_path = f"comprovante_{arquiteto.id}.pdf"
  
    with open(comprovante_path, 'w') as f: # Para fins de teste de conexão com Bucket "Givaldo"
        f.write('Comprovante de renovação de carteirinha')

    print(f'Comprovante gerado: {comprovante_path}')
    return comprovante_path