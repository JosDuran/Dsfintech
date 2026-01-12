import os

EXCLUDE_DIRS = {'node_modules', 'extras'}
EXCLUDE_FILES = {'.gitignore', 'README.md', 'app.py'}
EXCLUDE_EXTENSIONS = {'.json'}
OUTPUT_FILE = 'concatenado.txt'

with open(OUTPUT_FILE, 'w', encoding='utf-8') as out:
    for root, dirs, files in os.walk('.'):
        # excluir carpetas que comienzan con . y carpetas explícitas
        dirs[:] = [
            d for d in dirs
            if not d.startswith('.') and d not in EXCLUDE_DIRS
        ]

        for file in files:
            # excluir archivos explícitos
            if file in EXCLUDE_FILES:
                continue

            # excluir por extensión
            if os.path.splitext(file)[1].lower() in EXCLUDE_EXTENSIONS:
                continue

            path = os.path.join(root, file)

            # no incluir el archivo de salida
            if os.path.basename(path) == OUTPUT_FILE:
                continue

            try:
                with open(path, 'r', encoding='utf-8') as f:
                    out.write(f'\n\n===== {path} =====\n\n')
                    out.write(f.read())
            except Exception:
                # ignora binarios o archivos no legibles
                pass
