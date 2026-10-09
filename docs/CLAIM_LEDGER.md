# Research claim ledger

All figures below are **reported by prior research artifacts**, not independently replicated in this new repository. A claim changes from reported to independently reproduced only with code, data license, environment pin, hashes, stdout/logs, and passing acceptance tests.

| ID | Track | Claim | Decision | Evidence / required follow-up |
| --- | --- | --- | --- | --- |
| F1-01 | A | Random-row timing validation is interchangeable with unseen-DIMM, model or vendor transfer | REJECTED | Historical Day16 F1 split/coverage audit. Hardware-level holdout must be evaluated separately. |
| F1-02 | A | 0 observed false-safe in evaluated model/vendor contexts establishes safety across all 445 contexts | REJECTED | Day16 documents 145 unevaluable model contexts and 21 unevaluable vendor contexts. |
| F1-03 | A | The F1 split/leakage/coverage audit can support a narrowly scoped DRAM methodology case study | OPEN / AMBER | Requires independent regeneration of results, external validity assessment, and comparison against FLY-DRAM/DIVA-DRAM and general data leakage methodology. |
| F1-04 | A | Aggregate BER = 0 guarantees a small failure probability | UNSUPPORTED | Bit-trial denominators, dependence structure, silicon validation not established. |
| HBM-01 | B | A 4-bit command-preview controller or FS-LQR inherently beats realistic baseline controls | REJECTED / NOT DEMONSTRATED | Prior comparative and nearest-prior-art reviews. Equal actuator-effort and held-out comparisons are necessary. |
| HBM-02 | B | Token-based admission produced an independently valid second matched-throughput intervention | REJECTED | Run13 0/50 strict and 0/50 relaxed feasible points on reported discovery conditions. |
| HBM-03 | B | Native legal trace, immutable workload, independent timing replay and fair-effort audits can expose false controller/scheduler gains | SCOPED SUPPORT (prior reports) | Run12/Run13 case studies. Must independently reproduce and test external workloads to establish broader generality. |
| HBM-04 | B | Normalized command current predicts actual HBM IDD and die/package droop | UNSUPPORTED | Public calibrated current waveforms, PDN impedance, measurement ground truth and uncertainty needed. |
| CHIP-01 | C | Slow thermal allocation improves fast nanosecond droop events directly | REJECTED AS HYPOTHESIS | Thermal and electrical timescales differ; manuscript keeps separate fast/slow loops. |
| CHIP-02 | C | Hierarchical PI/MPC plus surrogate reduces high-fidelity simulation costs while maintaining limits | HYPOTHESIS / PRE-RESULTS | Baselines, held-out corners, solver costs, sampled waveforms and independent validation missing. |

## Non-negotiable guardrails

- Rejected hypotheses stay visible and cannot be resurrected by post-hoc threshold or seed selection.
- Prior result counts are accompanied by their source and limitations; a previously reported test pass is not marked as rerun.
- Conditional evaluation metrics always expose denominator and nonevaluable status counts.
- No claim of new optimal-control theorem, real DRAM silicon safety, absolute droop accuracy, or SCI(E) acceptance without independent evidence.
