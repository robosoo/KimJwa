# Research status — 2026-10-09

## Summary

Repository state: INITIALIZED / evidence consolidation. No SCI(E) submission claim is supported.

This page records **prior reports** and **what is newly produced in this repository** separately. The original research archive, full simulation environment, and manuscript have not been executed or independently audited here. Repository status changes require a dated reproducible evidence entry.

### Track A — DRAM timing F1 / transfer methodology

Historical source: Day16_Report.md, 2026-09-07 (source-of-record retained privately).

- Dataset: 11,970 input rows; 445 expanded physical contexts (as reported).
- Leave-one-DIMM: 352 evaluable, 76 without training frontier, 17 without measurement at chosen timing; coverage = 352/445 = 79.10%.
- Leave-one-model: 300 evaluable, 128 without training frontier, 17 without measurement at chosen timing; coverage = 300/445 = 67.42%.
- Leave-one-vendor: 424 evaluable, 4 without training frontier, 17 without measurement at chosen timing; coverage = 424/445 = 95.28%.
- Reported unit/regression suite: 63/63 passed. **Not rerun here.**
- Reported outcomes cannot estimate product failure probabilities, future DIMMs, DDR5 or HBM safety without stronger evidence.
- Prior report says M1-development / GO-AMBER and no SCI(E) candidate. Later scope notes describe a limited M1-complete claim; current code and archive need readback to reconcile these stages.

Next gate: inspect Run47 archive manifests and hashes; re-run the F1 suite in a clean pinned environment, validate leakage and split boundaries, and attach per-context outcome provenance. Missing contexts must remain unscored.

### Track B — HBM native legal trace → waveform / PDN audit

Historical source: DRAM_PDN_Run13_TokenAdmissionClosure_2026-09-24.md.

- Pinned simulator revision reported: Ramulator2 commit 72427a1bba3771564c4fb0e494ba02242fd1eaa7.
- Run13 reported: 50 token policies × 20 discovery seeds = 1,000 native traces; 240,000 requests; 526,946 native commands independently audited.
- Strict feasible interventions under simultaneous throughput/excitation gates: **0/50**. Relaxed sensitivity feasible: **0/50**.
- Excitation-capable candidate: refill 16/capacity 64, worst absolute drain mismatch 8.72% (reported). Not a matched-throughput policy.
- No demonstrated benefit of controller + scheduler co-design on fair-comparison Pareto terms.
- Pinned-public-simulator legality is not silicon/JEDEC certification. No-refresh and normalized electrical current abstractions limit physical inference.

Next gate: inspect Run12 audit and Run13 evidence artifacts; use a genuinely independent timestamped external workload family with preserved addresses and R/W semantics, if license and timing fidelity allow. Otherwise reduce to a narrowly scoped methods case study.

### Track C — Multirate circuit–control / chiplet PDN proposal

Historical source: Working Manuscript v0.1, 2026-09-27, held in private Google Drive.

- Fast electrical PI/current-mode loop; slow constrained thermal/reference/budget MPC.
- AI-assisted multi-fidelity surrogate/active learning remains outside the fast protection loop.
- Claims of improved droop, thermal safety, efficiency, or fidelity: **PRE-RESULTS / TBD**.
- This is a different paper hypothesis; do not merge its results with F1 or HBM Run13.

Next gate: freeze one public open reference plant and baseline, define sample times/actuator limits and validate fast-loop constraint equivalence before testing surrogate savings.

## Priority

1. Reproduce prior results from original archive before extending them.
2. Select a single tractable external-validity bottleneck for Tracks A and B.
3. Write a scoped paper only if an independent, non-tautological contribution survives.
4. Keep Track C separate until an executable model and verifiable results exist.

## Recently completed in THIS repository

- 2026-10-09: Started public-safe evidence hub, separated three research lines, added an independent context-coverage audit utility and synthetic unit tests. See RESEARCH_LOG.md.
- No claims here of rerunning 63 historical tests, all Ramulator2 trials, or any original chiplet simulations.
