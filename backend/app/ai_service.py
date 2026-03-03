import os
import time
from dotenv import load_dotenv
from .logger import get_logger

load_dotenv()
logger = get_logger("ai_service")

USE_MOCK = os.getenv("USE_MOCK", "true").lower() == "true"

MOCK_RESPONSES = {
    "Video": {
        "description": (
            "Este vídeo apresenta os conceitos fundamentais do tema de forma "
            "didática e visual, facilitando a compreensão dos alunos. "
            "O conteúdo é organizado em etapas progressivas, partindo do básico "
            "até os conceitos mais avançados. "
            "Ideal para alunos que preferem aprender através de recursos audiovisuais."
        ),
        "tags": ["videoaula", "educação", "aprendizado"],
    },
    "PDF": {
        "description": (
            "Este material em PDF reúne os principais conceitos do tema em um "
            "formato estruturado e de fácil leitura. "
            "O documento conta com exemplos práticos, resumos e exercícios para "
            "fixação do conteúdo. "
            "Recomendado para estudo individual ou como material de apoio em sala de aula."
        ),
        "tags": ["apostila", "leitura", "material-de-apoio"],
    },
    "Link": {
        "description": (
            "Este recurso online oferece acesso a conteúdos interativos e "
            "atualizados sobre o tema. "
            "A plataforma permite que o aluno explore o conteúdo no seu próprio "
            "ritmo, com diferentes formatos de apresentação. "
            "Indicado como complemento às aulas presenciais ou ao ensino à distância."
        ),
        "tags": ["recurso-online", "interativo", "complementar"],
    },
}


def generate_smart_assist(title: str, resource_type: str) -> dict:
    start = time.time()

    if USE_MOCK:
        time.sleep(1.2)
        latency = round(time.time() - start, 2)
        logger.info(
            "AI Request completed (MOCK)",
            extra={
                "title": title,
                "type": resource_type,
                "token_usage": 0,
                "latency_seconds": latency,
            },
        )
        return MOCK_RESPONSES.get(resource_type, MOCK_RESPONSES["Link"])

# ---- Implementação da IA abaixo. Infelizmente a utilização foi pausada pois sempre resultava em excedente de limite do tier grátis ----

# import os
# import time
# import json
# import google.generativeai as genai
# from dotenv import load_dotenv
# from .logger import get_logger

# load_dotenv()
# logger = get_logger("ai_service")

# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# # Prompt Engiineering, para a manipulação da forma como a IA irá responder às chamadas da API.
# SYSTEM_PROMPT = """Você é um Assistente Pedagógico especializado em materiais educacionais.
# Quando receber um título e tipo de recurso, responda APENAS com um JSON válido, sem texto extra, no formato:
# {
#   "description": "descrição clara e útil para alunos em 2-3 frases",
#   "tags": ["tag1", "tag2", "tag3"]
# }
# As tags devem ser palavras-chave relevantes em português, sem # ou espaços."""


# def generate_smart_assist(title: str, resource_type: str) -> dict:
#     start = time.time()

#     model = genai.GenerativeModel(
#         model_name="gemini-2.0-flash",
#         system_instruction=SYSTEM_PROMPT
#     )

#     response = model.generate_content(
#         f'Título: "{title}"\nTipo: {resource_type}',
#         generation_config=genai.GenerationConfig(
#             response_mime_type="application/json",  # força retorno JSON direto
#             max_output_tokens=300, # Economia da API.
#         ),
#     )

#     latency = round(time.time() - start, 2)

#     # Log estruturado (token_usage disponível na resposta do Gemini)
#     token_usage = response.usage_metadata.total_token_count if response.usage_metadata else "N/A"
#     logger.info(
#         "AI Request completed",
#         extra={
#             "title": title,
#             "type": resource_type,
#             "token_usage": token_usage,
#             "latency_seconds": latency
#         }
#     )

#     response_text = response.text.strip()
#     return json.loads(response_text)
