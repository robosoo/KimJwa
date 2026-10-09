# KimJwa — DRAM / HBM Research Evidence Hub

Status: research repository initialized 2026-10-09 (KST). Scope: reproducible, public-safe research records.

This repository organizes three **separate** research tracks. Results must not be transferred between tracks, and a result reported by an older research log is not an independently re-executed result.

## Research tracks

| Track | Problem | Verified from previous records | Current gate |
| --- | --- | --- | --- |
| A — DRAM timing F1 | Leakage / holdout / incomplete coverage in hardware transfer evaluation | Day16 report describes 11,970 input rows, 445 contexts, 63/63 tests and split-specific missing evaluations | Scoped methods contribution only; external validity unresolved |
| B — HBM legal trace / PI | Can command-trace, waveform/PDN and fair-effort audits falsify scheduler/controller gains? | Run13 log describes 1,000 token-admission traces; 0/50 strict feasible points | Methodology / negative result; claimed synergy rejected |
| C — Chiplet power-delivery control | Fast electrical control + slow thermal allocation + AI-assisted simulation | Separate working-manuscript v0.1 (pre-results) | Hypothesis only; no performance conclusion |

**Key distinctions**

- Historical Day16/Run13 numbers are **reported in research artifacts**; this repository has not independently executed their full source stacks.
- F1 is about DRAM timing evaluation transfer. Track B is HBM command/PDN falsification. Track C is a separate circuit-control co-design proposal, **not** a completed DRAM result.
- FS-LQR superiority, generic scheduler-injector synergy and silicon-calibrated droop accuracy are **not supported** by the available evidence.
- Publication readiness (SCI/SCIE) is **not established**.

## Where to start

- [Current status](docs/STATUS.md)
- [Claim ledger](docs/CLAIM_LEDGER.md)
- [Research evidence and source inventory](docs/EVIDENCE_INDEX.md)
- [Experiment protocol / next gates](docs/EXPERIMENT_PROTOCOL.md)
- [Change log](docs/RESEARCH_LOG.md)
- [Small coverage-audit utility](tools/coverage_audit.py)
- [Unit tests](tests/test_coverage_audit.py)

Run the local independent utility checks from the repository root:

    python -m unittest discover -s tests -v
    python tools/coverage_audit.py --input path/to/private_context_audit.csv

The coverage tool **does not replicate** F1, Ramulator2, a vendor dataset, or the original paper. It checks a supplied, per-context evaluation ledger, keeps missing evaluations separate from observed zero failures, and exposes denominators. Never label its synthetic unit tests as silicon validation.

## Data access and publication caution

This is a **public repository**. The existing Google Drive working files and research ZIP archives are source-of-record material but are not copied here. Do not commit privately obtained, copyrighted, company-confidential or personally identifying material, proprietary waveforms, API keys, or unlicensed datasets. Promote derived results here only after an explicit redistribution and provenance review.

## Decision rules

1. Every quantitative claim links to a specific source file, code revision, model version, data split, test command and limitations.
2. Preserve negative results and rejected hypotheses.
3. Do not treat a legal trace against a pinned simulator as JEDEC certification.
4. An observed 0 false-safe count on evaluable contexts cannot assert safety of unevaluable contexts.
5. No submission or efficacy claim until clean re-execution, independent data, and nearest-prior-art review pass their gates.
