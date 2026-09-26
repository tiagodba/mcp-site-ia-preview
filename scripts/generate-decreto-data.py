"""Build readable article data from the MCP decree PDF using pdftotext -raw."""
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / 'MCP_Decreto_44264_Guarulhos_Revisada_Indice_Clicavel.pdf'
raw = subprocess.check_output(['pdftotext', '-raw', str(PDF), '-']).decode('utf-8')
pages = raw.split('\f')[5:]
cleaned = []
for page in pages:
    lines = []
    for line in page.splitlines():
        s = line.strip()
        if not s or s.startswith('MCP CARREIRAS POLICIAIS') or s.startswith('@materiaiscarreiraspoliciais') or s in {'< INDICE', 'voltar ao índice'} or re.fullmatch(r'\d{2}', s):
            continue
        lines.append(s)
    cleaned.append('\n'.join(lines))
text = '\n'.join(cleaned)
heads = list(re.finditer(r'(?m)^ART\.\s*(\d{1,2})(?:º)?\s+([^\n]+)', text))
assert len(heads) == 60, f'Expected 60 article headings, found {len(heads)}'
blocks = [(1, 1, 'Estrutura organizacional'), (2, 16, 'Secretaria, Gabinete, Inteligência e Academia'), (17, 39, 'Gestão administrativa, tecnologia, orçamento e logística'), (40, 44, 'Comando Geral'), (45, 53, 'Subcomando e operação'), (54, 56, 'Corregedoria'), (57, 58, 'Ouvidoria'), (59, 60, 'Disposições finais')]
articles = []
for i, match in enumerate(heads):
    number = int(match.group(1))
    assert number == i + 1, (number, i)
    body = text[match.end():heads[i + 1].start() if i + 1 < len(heads) else len(text)]
    # Ignore page headings and navigation carried over in the source layout.
    body = re.sub(r'(?m)^(?:BLOCO \d+(?: .*)?|ARTIGOS? \d+(?: A \d+)?|ARTIGO \d+ - PARTE \d+ DE \d+|CAPÍTULO [IVX]+.*|Seção [IVX]+.*|ESTRUTURA ORGANIZACIONAL|SECRETARIA, GABINETE, INTELIGÊNCIA E ACADEMIA|GESTÃO ADMINISTRATIVA.*|COMANDO GERAL|SUBCOMANDO E OPERAÇÃO|CORREGEDORIA|OUVIDORIA|DISPOSIÇÕES FINAIS)$', '', body)
    body = re.sub(r'\n{3,}', '\n\n', body).strip()
    title = match.group(2).strip(' -')
    # Some long headings wrap onto a second uppercase line in the PDF.
    while '\n' in body and re.fullmatch(r'[A-ZÁÉÍÓÚÂÊÔÃÕÇ0-9, -]+', body.split('\n', 1)[0]) and body.split('\n', 1)[0] not in {'EM UMA', 'EM UMA FRASE', 'LEI ORGANIZADA'}:
        line, body = body.split('\n', 1)
        title += ' ' + line
    if number == 60:
        body = re.split(r'(?m)^BLOCO 08|^MAPA |^REVISÃO ', body)[0].strip()
    if body.startswith('EM UMA\nFRASE'):
        body = body.replace('EM UMA\nFRASE', 'EM UMA FRASE', 1)
    articles.append({'number': number, 'title': title, 'body': body, 'block': next(j + 1 for j, (lo, hi, _) in enumerate(blocks) if lo <= number <= hi)})
out = {'blocks': [{'number': i+1, 'start': lo, 'end': hi, 'title': title} for i, (lo, hi, title) in enumerate(blocks)], 'articles': articles}
path = ROOT / 'assets' / 'decreto-44264-artigos.json'
path.write_text(json.dumps(out, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
print(f'{len(articles)} artigos; {path.stat().st_size} bytes')
