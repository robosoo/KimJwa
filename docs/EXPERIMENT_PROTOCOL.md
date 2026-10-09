# Falsification-first experiment protocol

## P0 — Audit old work before adding new curves

1. Inventory the latest historical research ZIP and verify checksums and internal manifest (not yet performed).
2. Identify authoritative F1 dataset, script revisions, test suite and figure generations.
3. Re-run Day16 tests in an isolated environment. Record exact pass/fail, package versions, generated hashes and any deviation.
4. Re-run HBM Run12/Run13 analysis without tuning or changing frozen gates. Record original workload, simulator revision and seed list.
5. Update CLAIM_LEDGER only after independent raw evidence exists.

## Track A: DRAM timing F1 coverage protocol

**Unit:** unique hardware/context under each split, not individual derived timing measurement rows.

Required row fields: split, context_id, status, false_safe.

- split: e.g. leave_one_dimm, leave_one_model, leave_one_vendor
- context_id: stable context key constructed without personal/device identifiers
- status: evaluated, no_training_frontier, or selected_timing_unmeasured
- false_safe: 0/1 only when status is evaluated; blank otherwise

Report:

- total contexts, evaluated contexts, non-evaluable contexts by mutually exclusive reason
- evaluated coverage = evaluated / total
- observed false-safe count and **conditional rate** = false_safe / evaluated
- zero observed false-safe must never imply zero across excluded contexts

The included utility enforces schema, duplicate keys and mutually exclusive missingness. Its synthetic tests establish software behavior only, not original data correctness. Follow-up inference must cluster appropriately by independent DIMM/workload seed; ordinary row-wise confidence intervals would risk pseudoreplication.

Sensitivity tests (after authoritative data is recovered): nominal-row requirement; empirical-safe threshold; coverage by vendor/model/temperature; train/test group overlap; missingness pattern shifts. Do not infer bit-trial denominators or independent Bernoulli error probabilities.

## Track B: HBM PI ranking/fairness protocol

Freeze each comparison before validation:

- identical completed work and original request identity
- independent native command legality replay
- identical physical current/waveform/PDN corners and evaluation horizon
- same realized peak and RMS actuator current, delivered charge, slew, saturation, sensor/actuator delay and energy cost
- explicitly matched drain time/service (predeclared bound, symmetric where used)
- independent seed-level uncertainty intervals and held-out testing
- at least one independently sourced external workload family with usable timestamp/read-write/address fidelity, or explicitly limit the paper to a simulator-specific case study

**Gate:** Retain a co-design superiority claim only if it survives all physical-effort and performance matching and independent seeds. Run13's zero feasible second intervention is a negative result; do not silently relax and call it success.

## Track C: chiplet power delivery, separate proposed study

Proposed fast states: converter inductor current, rail voltage, optional injection state. Fast PI/current-mode loop handles voltage/current protection. Slow MPC controls feasible reference and shared budgets; thermal states are quasi-constant during a fast droop event. An AI surrogate can schedule high-fidelity simulations but cannot replace mandatory validation.

No numerical benefit is currently independently measured. Any pre-registration targets in the working draft are design gates, not observed results.

## Paper readiness

Full paper: rerunnable results + clear nearest-prior-art distinction + independent workload/model family + honest scope.
Scoped paper: rerunnable case study and a nontrivial reproducible method with defensible limitations.
Technical report: robust negative results with insufficient novelty/external validity.
Stop: claim collapses under prior art or cannot be falsified in the available evidence.
