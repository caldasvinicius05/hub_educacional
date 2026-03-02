import logging
import json
from datetime import datetime

class JSONFormatter(logging.Formatter): # Classe para reescrita do formato padrão para JSON
    def format(self, record):
        log_data = { # Dicionário das informações do log.
            "timestamp": datetime.now().isoformat(),
            "level": record.levelname,
            "message": record.getMessage()
        }
        if hasattr(record, "extra"):
            log_data.update(record.extra)
        return json.dumps(log_data)
    
def get_logger(name: str) -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO) # Ignorando logs de nível debug.
    if not logger.handlers:
        handler = logging.StreamHandler()
        handler.setFormatter(JSONFormatter())
        logger.addHandler(handler)
    return logger

