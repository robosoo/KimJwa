"""Context-level completeness audit for DRAM timing evaluations.

No proprietary data, statistical independence claim, or silicon validation is
embedded. Input is a de-identified context-level CSV, one row per split/context.
"""
from __future__ import annotations

import argparse
import csv
import json
from collections import defaultdict
from pathlib import Path
from typing import Iterable, Mapping

EVALUATED = "evaluated"
MISSING = ("no_training_frontier", "selected_timing_unmeasured")
STATUSES = (EVALUATED, *MISSING)
REQUIRED = {"split", "context_id", "status", "false_safe"}


def audit_rows(rows: Iterable[Mapping[str, str]]) -> dict[str, dict]:
    """Summarize mutually exclusive context dispositions; never impute missing."""
    counters: dict[str, dict[str, int]] = defaultdict(
        lambda: {status: 0 for status in STATUSES}
    )
    positives: dict[str, int] = defaultdict(int)
    seen: set[tuple[str, str]] = set()

    for line_number, raw in enumerate(rows, start=2):
        split = str(raw.get("split") or "").strip()
        context = str(raw.get("context_id") or "").strip()
        status = str(raw.get("status") or "").strip()
        label = str(raw.get("false_safe") or "").strip()
        if not split or not context:
            raise ValueError(f"CSV line {line_number}: blank split/context_id")
        if status not in STATUSES:
            raise ValueError(f"CSV line {line_number}: unknown status {status!r}")
        key = (split, context)
        if key in seen:
            raise ValueError(f"CSV line {line_number}: duplicate split/context_id {key!r}")
        seen.add(key)
        if status == EVALUATED:
            if label not in ("0", "1"):
                raise ValueError(f"CSV line {line_number}: evaluated false_safe must be 0 or 1")
            positives[split] += int(label)
        elif label:
            raise ValueError(f"CSV line {line_number}: excluded context cannot have false_safe")
        counters[split][status] += 1

    if not counters:
        raise ValueError("Input contains zero contexts")

    report: dict[str, dict] = {}
    for split in sorted(counters):
        counts = counters[split]
        total = sum(counts.values())
        evaluated = counts[EVALUATED]
        count = positives[split]
        report[split] = {
            "total_contexts": total,
            "evaluated_contexts": evaluated,
            "excluded_contexts": total - evaluated,
            "excluded_reasons": {status: counts[status] for status in MISSING},
            "coverage_fraction": evaluated / total,
            "observed_false_safe": count,
            "conditional_false_safe_fraction": count / evaluated if evaluated else None,
            "interpretation": "Conditional on evaluated contexts only; excluded contexts remain unscored",
        }
    return report


def audit_file(path: str | Path) -> dict[str, dict]:
    with Path(path).open(newline="", encoding="utf-8-sig") as stream:
        reader = csv.DictReader(stream)
        headers = set(reader.fieldnames or [])
        if not REQUIRED.issubset(headers):
            raise ValueError(f"Missing required CSV headers: {sorted(REQUIRED - headers)}")
        return audit_rows(reader)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, help="Context-level CSV to audit")
    parser.add_argument("--output", help="Optional JSON report path")
    args = parser.parse_args()
    report = audit_file(args.input)
    rendered = json.dumps(report, ensure_ascii=False, indent=2, sort_keys=True) + "\n"
    if args.output:
        Path(args.output).write_text(rendered, encoding="utf-8")
    print(rendered, end="")


if __name__ == "__main__":
    main()
