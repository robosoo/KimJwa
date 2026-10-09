"""Synthetic software tests only; these do not re-execute DRAM experiments."""
import csv
import tempfile
import unittest
from pathlib import Path

from tools.coverage_audit import audit_file, audit_rows


def row(split, context, status, label=""):
    return {"split": split, "context_id": context, "status": status, "false_safe": label}


class ContextCoverageTest(unittest.TestCase):
    def test_reported_day16_denominator_arithmetic_on_synthetic_rows(self):
        # Synthetic counts reproduce arithmetic ONLY, not Day16 observations.
        scenarios = {
            "dimm": (352, 76, 17),
            "model": (300, 128, 17),
            "vendor": (424, 4, 17),
        }
        rows = []
        for split, (evaluated, no_frontier, unmeasured) in scenarios.items():
            rows += [row(split, f"e{i}", "evaluated", "0") for i in range(evaluated)]
            rows += [row(split, f"nf{i}", "no_training_frontier") for i in range(no_frontier)]
            rows += [row(split, f"um{i}", "selected_timing_unmeasured") for i in range(unmeasured)]
        report = audit_rows(rows)
        self.assertEqual({key: value["total_contexts"] for key, value in report.items()},
                         {"dimm": 445, "model": 445, "vendor": 445})
        self.assertAlmostEqual(report["dimm"]["coverage_fraction"], 352 / 445)
        self.assertAlmostEqual(report["model"]["coverage_fraction"], 300 / 445)
        self.assertAlmostEqual(report["vendor"]["coverage_fraction"], 424 / 445)
        self.assertEqual(report["model"]["excluded_contexts"], 145)
        self.assertEqual(report["vendor"]["excluded_contexts"], 21)
        self.assertEqual(report["vendor"]["observed_false_safe"], 0)
        self.assertEqual(report["vendor"]["interpretation"],
                         "Conditional on evaluated contexts only; excluded contexts remain unscored")

    def test_zero_evaluable_is_unscored_not_safe(self):
        report = audit_rows([row("vendor", "x", "no_training_frontier")])
        self.assertIsNone(report["vendor"]["conditional_false_safe_fraction"])
        self.assertEqual(report["vendor"]["coverage_fraction"], 0.0)

    def test_positive_false_safe_is_conditional(self):
        report = audit_rows([row("model", "a", "evaluated", "1"),
                             row("model", "b", "evaluated", "0"),
                             row("model", "c", "selected_timing_unmeasured")])
        self.assertEqual(report["model"]["observed_false_safe"], 1)
        self.assertEqual(report["model"]["conditional_false_safe_fraction"], 0.5)
        self.assertAlmostEqual(report["model"]["coverage_fraction"], 2 / 3)

    def test_duplicate_context_rejected(self):
        with self.assertRaisesRegex(ValueError, "duplicate"):
            audit_rows([row("vendor", "x", "evaluated", "0"),
                        row("vendor", "x", "evaluated", "1")])

    def test_unscored_context_with_label_rejected(self):
        with self.assertRaisesRegex(ValueError, "excluded context"):
            audit_rows([row("vendor", "x", "no_training_frontier", "0")])

    def test_unrecognized_missingness_rejected(self):
        with self.assertRaisesRegex(ValueError, "unknown status"):
            audit_rows([row("vendor", "x", "missing", "")])

    def test_evaluated_requires_binary_label(self):
        with self.assertRaisesRegex(ValueError, "must be 0 or 1"):
            audit_rows([row("vendor", "x", "evaluated", "")])

    def test_csv_header_validation(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "bad.csv"
            path.write_text("split,context_id,status\nv,x,evaluated\n", encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "Missing required CSV headers"):
                audit_file(path)

    def test_csv_file_round_trip(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "data.csv"
            with path.open("w", encoding="utf-8", newline="") as f:
                writer = csv.DictWriter(f, fieldnames=["split", "context_id", "status", "false_safe"])
                writer.writeheader()
                writer.writerows([row("v", "x", "evaluated", "1"),
                                  row("v", "y", "selected_timing_unmeasured")])
            self.assertEqual(audit_file(path)["v"]["observed_false_safe"], 1)


if __name__ == "__main__":
    unittest.main()
