from model.arquiteto import Arquiteto
from database.sessao import db

def renovar_carteirinha(arquiteto_id, anos=1):
    arquiteto = Arquiteto.query.get(arquiteto_id)
    if not arquiteto:
        return None, "Arquiteto não encontrado"
    
    arquiteto.renovar_carteirinha(anos)
    return arquiteto, f"Carteirinha renovada com sucesso."