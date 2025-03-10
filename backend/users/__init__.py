from os import path
from pathlib import Path

_BASE_DIR = Path(__file__).resolve().parents[1]
_ENV_PATH = path.join(_BASE_DIR, ".env")
