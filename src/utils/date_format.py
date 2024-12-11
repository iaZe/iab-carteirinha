from datetime import datetime

def formatar_data(data):
    return data.strftime('%d/%m/%Y')

def parse_data(data_str):
    return datetime.strptime(data_str, '%d/%m/%Y')