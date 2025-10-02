#!/usr/bin/env python3
"""Generate a static HTML/CSS site for the Pediatria HRT routines."""

from __future__ import annotations

import html
import os
import re
import unicodedata
from dataclasses import dataclass
from pathlib import Path
from typing import List

ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "attached_assets" / "Rotinas" / "html-output"
TARGET_DIR = ROOT / "site"
ROUTINES_DIR = TARGET_DIR / "rotinas"
CSS_PATH = "assets/css/main.css"

SMALL_WORDS = {
    "de",
    "do",
    "da",
    "das",
    "dos",
    "e",
    "em",
    "no",
    "na",
    "nos",
    "nas",
    "para",
    "por",
    "com",
    "sem",
    "sob",
    "sobre",
    "ao",
    "aos",
    "a",
    "o",
    "os",
    "as",
    "à",
    "às",
    "dum",
    "duma",
    "ou",
}

ACRONYMS = {
    "HRT",
    "RN",
    "UTI",
    "ICC",
    "IVAS",
    "PCR",
    "AVC",
    "DPOC",
    "HV",
    "DVA",
    "VI",
    "IV",
    "AF",
    "AS",
    "AR",
    "CAD",
    "HIV",
    "SUS",
    "UTIN",
    "UTIP",
    "UPA",
    "IRA",
    "IVIG",
    "DM1",
    "DM2",
    "VHS",
    "UTAE",
    "UTI",
}


@dataclass
class RoutineEntry:
    title: str
    display_title: str
    slug: str
    content_html: str
    description: str
    letter: str


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text)
    text = "".join(ch for ch in text if not unicodedata.combining(ch))
    text = re.sub(r"[^a-zA-Z0-9]+", "-", text)
    text = text.strip("-")
    return text.lower() or "rotina"


def format_display_title(raw_heading: str) -> str:
    raw_heading = raw_heading.strip()
    if not raw_heading:
        return "Rotina"

    tokens = re.findall(r"[\wÀ-ÿ]+|[^\wÀ-ÿ]+", raw_heading)
    formatted: List[str] = []

    for index, token in enumerate(tokens):
        if re.fullmatch(r"[\wÀ-ÿ]+", token):
            original = token
            upper = original.upper()
            lower = original.lower()

            if original in ACRONYMS:
                formatted.append(original)
                continue

            if upper == original:
                if lower in SMALL_WORDS and index != 0:
                    formatted.append(lower)
                elif any(char.isdigit() for char in original):
                    formatted.append(original)
                else:
                    formatted.append(original.capitalize())
            else:
                formatted.append(original)
        else:
            formatted.append(token)

    result = "".join(formatted)

    # Final pass for acronyms that may appear in mixed case after formatting.
    for acronym in ACRONYMS:
        pattern = re.compile(rf"\b{acronym.capitalize()}\b")
        result = pattern.sub(acronym, result)

    # Normalise whitespace
    result = " ".join(result.split())
    return result


def strip_surrounding_tags(html_fragment: str) -> str:
    return html_fragment.strip()


def extract_body(html_text: str) -> str:
    body_match = re.search(r"<body[^>]*>(.*)</body>", html_text, re.IGNORECASE | re.DOTALL)
    if not body_match:
        return html_text
    return body_match.group(1).strip()


def remove_first_heading_paragraph(body_html: str, heading_text: str) -> str:
    pattern = re.compile(r"<p[^>]*>(.*?)</p>", re.IGNORECASE | re.DOTALL)
    match = pattern.search(body_html)
    if not match:
        return body_html

    first_para_text = html.unescape(re.sub(r"<[^>]+>", "", match.group(1))).strip()
    normalized_first = " ".join(first_para_text.split()).lower()
    normalized_heading = " ".join(heading_text.split()).lower()

    if normalized_first == normalized_heading:
        start, end = match.span()
        return body_html[:start] + body_html[end:]
    return body_html


def extract_description(body_html: str) -> str:
    text = re.sub(r"<[^>]+>", " ", body_html)
    text = " ".join(text.split())
    return text[:260] + ("…" if len(text) > 260 else "")


def determine_letter(display_title: str) -> str:
    normalized = unicodedata.normalize("NFKD", display_title)
    for char in normalized:
        if char.isalpha():
            return char.upper()
    return "#"


def build_header(base_href: str) -> str:
    return f"""
<header class=\"site-header\">
  <div class=\"site-header-inner\">
    <div class=\"branding\">
      <h1><a href=\"{base_href}index.html\" title=\"Início\">Pediatria HRT</a></h1>
      <span>Rotinas médicas pediátricas</span>
    </div>
    <nav class=\"site-nav\">
      <a href=\"{base_href}index.html#sobre\">Sobre</a>
      <a href=\"{base_href}index.html#rotinas\">Todas as rotinas</a>
    </nav>
  </div>
</header>
"""


def build_footer() -> str:
    return """
<footer class=\"footer\">
  <div class=\"footer-inner\">
    <div>Conteúdo preparado pela equipe de Pediatria do HRT. Última atualização automática deste site estático.</div>
    <div>Para atualizar uma rotina, substitua o arquivo correspondente em <code>site/rotinas</code> e edite o índice.</div>
  </div>
</footer>
"""


def build_routine_page(entry: RoutineEntry) -> str:
    header = build_header("../")
    footer = build_footer()
    breadcrumbs = f"""
    <nav class=\"breadcrumb\" aria-label=\"Breadcrumb\">
      <a href=\"../index.html\">Início</a>
      <span aria-hidden=\"true\">/</span>
      <span>{html.escape(entry.display_title)}</span>
    </nav>
    """

    return f"""<!DOCTYPE html>
<html lang=\"pt-BR\">
<head>
  <meta charset=\"utf-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
  <title>{html.escape(entry.display_title)} • Pediatria HRT</title>
  <meta name=\"description\" content=\"{html.escape(entry.description)}\" />
  <link rel=\"stylesheet\" href=\"../{CSS_PATH}\" />
</head>
<body>
  <div class=\"site-wrapper\">
    {header}
    <main>
      <div class=\"article-wrapper\">
        {breadcrumbs}
        <h1>{html.escape(entry.display_title)}</h1>
        <article>
          {entry.content_html}
        </article>
      </div>
    </main>
    {footer}
  </div>
</body>
</html>
"""


def build_index_page(entries: List[RoutineEntry]) -> str:
    header = build_header("")
    footer = build_footer()

    # Group entries by first letter
    groups: dict[str, List[RoutineEntry]] = {}
    for entry in entries:
        groups.setdefault(entry.letter, []).append(entry)

    for letter_entries in groups.values():
        letter_entries.sort(key=lambda item: item.display_title)

    group_markup = []
    for letter in sorted(groups.keys()):
        letter_entries = groups[letter]
        items_markup = []
        for entry in letter_entries:
            items_markup.append(
                f"<li><a href=\"rotinas/{entry.slug}.html\">{html.escape(entry.display_title)}<span>{html.escape(entry.description[:100])}</span></a></li>"
            )
        group_markup.append(
            f"<section class=\"routine-group\" aria-labelledby=\"grupo-{letter}\">"
            f"<h3 id=\"grupo-{letter}\">{letter}</h3>"
            f"<ul>{''.join(items_markup)}</ul>"
            "</section>"
        )

    groups_html = "".join(group_markup)

    return f"""<!DOCTYPE html>
<html lang=\"pt-BR\">
<head>
  <meta charset=\"utf-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
  <title>Pediatria HRT • Rotinas médicas</title>
  <meta name=\"description\" content=\"Acesso rápido às 77 rotinas médicas pediátricas do HRT em um site estático, sem JavaScript.\" />
  <link rel=\"stylesheet\" href=\"{CSS_PATH}\" />
</head>
<body>
  <div class=\"site-wrapper\">
    {header}
    <main>
      <section class=\"hero\" id=\"sobre\">
        <h2>Biblioteca digital das rotinas do HRT</h2>
        <p>Este site reúne as 77 rotinas médicas pediátricas convertidas para HTML. Todo o conteúdo é acessível sem JavaScript, com foco em leitura confortável, impressão fácil e navegação rápida por qualquer dispositivo.</p>
      </section>
      <section class=\"routine-index\" id=\"rotinas\" aria-label=\"Lista de rotinas\">
        <div class=\"routine-index-header\">
          <h2>Rotinas disponíveis (77)</h2>
          <p>Selecione um tema para abrir a rotina completa. Utilize a impressão do navegador para salvar uma versão em PDF quando necessário.</p>
        </div>
        <div class=\"routine-groups\">
          {groups_html}
        </div>
      </section>
    </main>
    {footer}
  </div>
</body>
</html>
"""


def collect_entries() -> List[RoutineEntry]:
    entries: List[RoutineEntry] = []
    for file_path in sorted(SOURCE_DIR.glob("*.html")):
        if file_path.name.startswith("conversion-report"):
            continue

        raw_html = file_path.read_text(encoding="utf-8")
        body_html = extract_body(raw_html)

        first_para_match = re.search(r"<p[^>]*>(.*?)</p>", body_html, re.IGNORECASE | re.DOTALL)
        title_match = re.search(r"<title>(.*?)</title>", raw_html, re.IGNORECASE | re.DOTALL)
        fallback_title = html.unescape(title_match.group(1)).strip() if title_match else file_path.stem

        if first_para_match:
            candidate_heading = html.unescape(
                re.sub(r"<[^>]+>", "", first_para_match.group(1))
            ).strip()
            normalized_candidate = " ".join(candidate_heading.split())
            starts_with_number = bool(re.match(r"^[0-9]+[\W_]*", normalized_candidate))
            ends_with_colon = normalized_candidate.endswith(":") and len(normalized_candidate.split()) <= 3

            if starts_with_number or ends_with_colon:
                heading_text = fallback_title
            else:
                heading_text = candidate_heading if candidate_heading else fallback_title
        else:
            heading_text = fallback_title

        display_title = format_display_title(heading_text)
        content_html = remove_first_heading_paragraph(body_html, heading_text)
        content_html = strip_surrounding_tags(content_html)
        description = extract_description(content_html)
        slug = slugify(display_title)
        letter = determine_letter(display_title)

        entries.append(
            RoutineEntry(
                title=heading_text,
                display_title=display_title,
                slug=slug,
                content_html=content_html,
                description=description,
                letter=letter,
            )
        )
    return entries


def write_file(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def main() -> None:
    entries = collect_entries()
    print(f"Encontradas {len(entries)} rotinas.")

    # Deduplicate slugs if needed
    seen: dict[str, int] = {}
    for entry in entries:
        count = seen.get(entry.slug, 0)
        if count:
            entry.slug = f"{entry.slug}-{count + 1}"
        seen[entry.slug] = count + 1

    index_html = build_index_page(entries)
    write_file(TARGET_DIR / "index.html", index_html)
    print("Index gerado em site/index.html")

    if ROUTINES_DIR.exists():
        for existing in ROUTINES_DIR.glob("*.html"):
            existing.unlink()

    for entry in entries:
        routine_html = build_routine_page(entry)
        write_file(ROUTINES_DIR / f"{entry.slug}.html", routine_html)
    print("Rotinas atualizadas em site/rotinas")


if __name__ == "__main__":
    main()
