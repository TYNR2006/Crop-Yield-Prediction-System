import csv
from datetime import datetime
from pathlib import Path

LOG_DIR = Path(__file__).resolve().parent / "logs"
LOG_FILE = str(LOG_DIR / "query_logs.csv")


def _ensure_log_file() -> None:
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    log_path = Path(LOG_FILE)
    if not log_path.is_file():
        with log_path.open("w", newline="", encoding="utf-8") as handle:
            writer = csv.writer(handle)
            writer.writerow(["timestamp", "query", "advisory"])


def log_query(query: str, advisory: str) -> None:
    _ensure_log_file()
    with Path(LOG_FILE).open("a", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle)
        writer.writerow([datetime.now().isoformat(), query, advisory])
