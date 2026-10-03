# Batch 2 pre-edit inventory

All 368 variants were inventoried before editing; 240 active variants migrate, 128 inactive variants retain authored hints. The [baseline](../tests/fixtures/batch2-hints-baseline.json) retains complete original questions, choices, answers, explanations and hints. No grouping division or unsupported semantics were found. Arithmetic operands were reviewed against each story and explanation; runtime never parses prose.

## LVL-0021 — enabled

| Challenge / variant | Active | Family / subtype | Presentation / mode | Operands and roles / visual / spelling choices |
|---|---|---|---|---|
| opticsTable / optics-table-1a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 6, 12 |
| opticsTable / optics-table-1b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 7, 13 |
| opticsTable / optics-table-2a | true | bare_division / bare_division | bare / multipleChoice | dividend : divisor: 24, 6 |
| opticsTable / optics-table-2b | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 6, 8 |
| opticsTable / optics-table-3a | true | story_multiplication / story_multiplication | story / open | groups × each: 7, 10 |
| opticsTable / optics-table-3b | true | bare_division / bare_division | bare / open | dividend : divisor: 42, 7 |
| opticsTable / optics-table-4a | true | measurement / addition | story / open | first quantity + added quantity: 28, 17 (onderdelen) |
| opticsTable / optics-table-4b | true | story_division / sharing | story / multipleChoice | undefined: 24, 8 |
| mechanicalModel / mechanical-model-1a | true | story_division / sharing | story / open | undefined: 45, 9 |
| mechanicalModel / mechanical-model-1b | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 8, 9 |
| mechanicalModel / mechanical-model-2a | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 9, 9 |
| mechanicalModel / mechanical-model-2b | true | bare_division / bare_division | bare / multipleChoice | dividend : divisor: 14, 2 |
| mechanicalModel / mechanical-model-3a | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 8, 5 |
| mechanicalModel / mechanical-model-3b | true | story_multiplication / story_multiplication | story / open | groups × each: 9, 7 |
| mechanicalModel / mechanical-model-4a | true | bare_division / bare_division | bare / open | dividend : divisor: 24, 3 |
| mechanicalModel / mechanical-model-4b | true | measurement / subtraction | story / open | start − removed quantity: 64, 19 (cm) |
| centralCodex / central-codex-1a | true | story_division / sharing | story / multipleChoice | undefined: 12, 4 |
| centralCodex / central-codex-1b | true | story_division / sharing | story / open | undefined: 25, 5 |
| centralCodex / central-codex-2a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 2, 3 |
| centralCodex / central-codex-2b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 10, 4 |
| centralCodex / central-codex-3a | true | bare_division / bare_division | bare / multipleChoice | dividend : divisor: 40, 10 |
| centralCodex / central-codex-3b | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 2, 3 |
| centralCodex / central-codex-4a | true | story_multiplication / story_multiplication | story / open | groups × each: 3, 5 |
| centralCodex / central-codex-4b | true | bare_division / bare_division | bare / open | dividend : divisor: 36, 6 |
| engineeringTable / engineering-table-1a | false | measurement / addition | story / open | first quantity + second quantity: 35, 24 cm; inactive |
| engineeringTable / engineering-table-1b | false | story_division / sharing | story / multipleChoice | Inactive: 70 : 7 = 10, want 7 × 10 = 70. |
| engineeringTable / engineering-table-2a | false | story_division / sharing | story / open | Inactive: 24 : 8 = 3, want 8 × 3 = 24. |
| engineeringTable / engineering-table-2b | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 3 × 3 = 9. |
| engineeringTable / engineering-table-3a | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 4 × 3 = 12. |
| engineeringTable / engineering-table-3b | false | bare_division / bare_division | bare / multipleChoice | Inactive: 63 : 9 = 7, want 9 × 7 = 63. |
| engineeringTable / engineering-table-4a | false | story_multiplication / story_multiplication | story / multipleChoice | Inactive: 4 × 9 = 36. |
| engineeringTable / engineering-table-4b | false | story_multiplication / story_multiplication | story / open | Inactive: 5 × 2 = 10. |

## LVL-0022 — disabled

| Challenge / variant | Active | Family / subtype | Presentation / mode | Operands and roles / visual / spelling choices |
|---|---|---|---|---|
| measuringTable / measuring-table-1a | true | bare_division / bare_division | bare / open | dividend : divisor: 20, 2 |
| measuringTable / measuring-table-1b | true | measurement / subtraction | story / open | start − removed quantity: 90, 27 (gram) |
| measuringTable / measuring-table-2a | true | story_division / sharing | story / multipleChoice | undefined: 30, 3 |
| measuringTable / measuring-table-2b | true | story_division / sharing | story / open | undefined: 12, 4 |
| measuringTable / measuring-table-3a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 5, 3 |
| measuringTable / measuring-table-3b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 6, 4 |
| measuringTable / measuring-table-4a | true | bare_division / bare_division | bare / multipleChoice | dividend : divisor: 20, 5 |
| measuringTable / measuring-table-4b | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 10, 10 |
| bridgeModel / bridge-model-1a | true | story_multiplication / story_multiplication | story / open | groups × each: 6, 7 |
| bridgeModel / bridge-model-1b | true | bare_division / bare_division | bare / open | dividend : divisor: 30, 10 |
| bridgeModel / bridge-model-2a | true | measurement / duration_addition | story / open | first duration + second duration: 18, 25 (minuten) |
| bridgeModel / bridge-model-2b | true | story_division / sharing | story / multipleChoice | undefined: 48, 6 |
| bridgeModel / bridge-model-3a | true | story_division / sharing | story / open | undefined: 70, 7 |
| bridgeModel / bridge-model-3b | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 7, 11 |
| bridgeModel / bridge-model-4a | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 8, 11 |
| bridgeModel / bridge-model-4b | true | bare_division / bare_division | bare / multipleChoice | dividend : divisor: 48, 8 |
| wellWinch / well-winch-1a | false | story_multiplication / story_multiplication | story / multipleChoice | Inactive: 7 × 2 = 14. |
| wellWinch / well-winch-1b | false | story_multiplication / story_multiplication | story / open | Inactive: 8 × 4 = 32. |
| wellWinch / well-winch-2a | false | bare_division / bare_division | bare / open | Inactive: 54 : 9 = 6, want 9 × 6 = 54. |
| wellWinch / well-winch-2b | false | measurement / subtraction | story / open | start − removed: 72, 38 cm; inactive |
| wellWinch / well-winch-3a | false | story_division / sharing | story / multipleChoice | Inactive: 16 : 2 = 8, want 2 × 8 = 16. |
| wellWinch / well-winch-3b | false | story_division / sharing | story / open | Inactive: 30 : 3 = 10, want 3 × 10 = 30. |
| wellWinch / well-winch-4a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 9 × 2 = 18. |
| wellWinch / well-winch-4b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 2 × 4 = 8. |
| gateMechanism / gate-mechanism-1a | true | bare_division / bare_division | bare / multipleChoice | dividend : divisor: 8, 4 |
| gateMechanism / gate-mechanism-1b | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 9, 8 |
| gateMechanism / gate-mechanism-2a | true | story_multiplication / story_multiplication | story / open | groups × each: 2, 2 |
| gateMechanism / gate-mechanism-2b | true | bare_division / bare_division | bare / open | dividend : divisor: 25, 5 |
| gateMechanism / gate-mechanism-3a | true | measurement / addition | story / open | first quantity + added quantity: 46, 29 (markeringen) |
| gateMechanism / gate-mechanism-3b | true | story_division / sharing | story / multipleChoice | undefined: 42, 6 |
| gateMechanism / gate-mechanism-4a | true | story_division / sharing | story / open | undefined: 63, 7 |
| gateMechanism / gate-mechanism-4b | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 10, 12 |

## LVL-0023 — enabled

| Challenge / variant | Active | Family / subtype | Presentation / mode | Operands and roles / visual / spelling choices |
|---|---|---|---|---|
| waterLevelPost / water-level-post-1a | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 3, 8 |
| waterLevelPost / water-level-post-1b | true | bare_division / bare_division | bare / multipleChoice | dividend : divisor: 24, 8 |
| waterLevelPost / water-level-post-2a | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 3, 6 |
| waterLevelPost / water-level-post-2b | true | story_multiplication / story_multiplication | story / open | groups × each: 4, 8 |
| waterLevelPost / water-level-post-3a | true | bare_division / bare_division | bare / open | dividend : divisor: 36, 9 |
| waterLevelPost / water-level-post-3b | true | measurement / subtraction | story / open | start − removed quantity: 85, 16 (strepen) |
| waterLevelPost / water-level-post-4a | true | story_division / sharing | story / multipleChoice | undefined: 12, 6 |
| waterLevelPost / water-level-post-4b | true | story_division / sharing | story / open | undefined: 28, 7 |
| valveWheel / valve-wheel-1a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 4 × 5 = 20. |
| valveWheel / valve-wheel-1b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 5 × 6 = 30. |
| valveWheel / valve-wheel-2a | false | bare_division / bare_division | bare / multipleChoice | Inactive: 72 : 8 = 9, want 8 × 9 = 72. |
| valveWheel / valve-wheel-2b | false | story_multiplication / story_multiplication | story / multipleChoice | Inactive: 5 × 3 = 15. |
| valveWheel / valve-wheel-3a | false | story_multiplication / story_multiplication | story / open | Inactive: 10 × 9 = 90. |
| valveWheel / valve-wheel-3b | false | bare_division / bare_division | bare / open | Inactive: 18 : 9 = 2, want 9 × 2 = 18. |
| valveWheel / valve-wheel-4a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 6 × 8 = 48. |
| valveWheel / valve-wheel-4b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 7 × 9 = 63. |
| lockChambers / lock-chambers-1a | true | bare_division / bare_division | bare / multipleChoice | dividend : divisor: 42, 6 |
| lockChambers / lock-chambers-1b | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 6, 6 |
| lockChambers / lock-chambers-2a | true | story_multiplication / story_multiplication | story / open | groups × each: 7, 8 |
| lockChambers / lock-chambers-2b | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 8, 2 |
| lockChambers / lock-chambers-3a | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 9, 3 |
| lockChambers / lock-chambers-3b | true | bare_division / bare_division | bare / multipleChoice | dividend : divisor: 63, 7 |
| lockChambers / lock-chambers-4a | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 8, 10 |
| lockChambers / lock-chambers-4b | true | story_multiplication / story_multiplication | story / open | groups × each: 9, 3 |
| paddleWheel / paddle-wheel-1a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 2 × 9 = 18. |
| paddleWheel / paddle-wheel-1b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 10 × 10 = 100. |
| paddleWheel / paddle-wheel-2a | false | bare_division / bare_division | bare / multipleChoice | Inactive: 32 : 8 = 4, want 8 × 4 = 32. |
| paddleWheel / paddle-wheel-2b | false | story_multiplication / story_multiplication | story / multipleChoice | Inactive: 2 × 6 = 12. |
| paddleWheel / paddle-wheel-3a | false | story_multiplication / story_multiplication | story / open | Inactive: 3 × 8 = 24. |
| paddleWheel / paddle-wheel-3b | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 3 × 12 = 36. |
| paddleWheel / paddle-wheel-4a | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 4 × 12 = 48. |
| paddleWheel / paddle-wheel-4b | false | bare_division / bare_division | bare / multipleChoice | Inactive: 72 : 9 = 8, want 9 × 8 = 72. |
| waterClock / water-clock-1a | true | clock_reading / clock_reading | story / multipleChoice | 2:00 |
| waterClock / water-clock-1b | true | clock_reading / clock_reading | story / multipleChoice | 4:15 |
| waterClock / water-clock-2a | true | clock_reading / clock_reading | story / multipleChoice | 6:30 |
| waterClock / water-clock-2b | true | clock_reading / clock_reading | story / multipleChoice | 8:45 |
| waterClock / water-clock-3a | true | clock_reading / clock_reading | story / multipleChoice | 10:05 |
| waterClock / water-clock-3b | true | clock_reading / clock_reading | story / multipleChoice | 12:20 |
| waterClock / water-clock-4a | true | clock_reading / clock_reading | story / multipleChoice | 3:35 |
| waterClock / water-clock-4b | true | clock_reading / clock_reading | story / multipleChoice | 5:50 |

## LVL-0024 — enabled

| Challenge / variant | Active | Family / subtype | Presentation / mode | Operands and roles / visual / spelling choices |
|---|---|---|---|---|
| wingRack / wing-rack-1a | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 4, 10 |
| wingRack / wing-rack-1b | true | story_multiplication / story_multiplication | story / open | groups × each: 5, 3 |
| wingRack / wing-rack-2a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 5, 13 |
| wingRack / wing-rack-2b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 6, 2 |
| wingRack / wing-rack-3a | true | bare_division / bare_division | bare / multipleChoice | dividend : divisor: 30, 6 |
| wingRack / wing-rack-3b | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 6, 5 |
| wingRack / wing-rack-4a | true | story_multiplication / story_multiplication | story / open | groups × each: 7, 7 |
| wingRack / wing-rack-4b | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 7, 4 |
| counterweights / counterweights-1a | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 8 × 8 = 64. |
| counterweights / counterweights-1b | false | bare_division / bare_division | bare / multipleChoice | Inactive: 49 : 7 = 7, want 7 × 7 = 49. |
| counterweights / counterweights-2a | false | story_multiplication / story_multiplication | story / multipleChoice | Inactive: 8 × 9 = 72. |
| counterweights / counterweights-2b | false | story_multiplication / story_multiplication | story / open | Inactive: 9 × 2 = 18. |
| counterweights / counterweights-3a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 9 × 10 = 90. |
| counterweights / counterweights-3b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 2 × 11 = 22. |
| counterweights / counterweights-4a | false | bare_division / bare_division | bare / multipleChoice | Inactive: 64 : 8 = 8, want 8 × 8 = 64. |
| counterweights / counterweights-4b | false | story_multiplication / story_multiplication | story / multipleChoice | Inactive: 6 × 9 = 54. |
| flightControls / flight-controls-1a | true | clock_reading / clock_reading | story / multipleChoice | 1:10 |
| flightControls / flight-controls-1b | true | clock_reading / clock_reading | story / multipleChoice | 7:25 |
| flightControls / flight-controls-2a | true | clock_reading / clock_reading | story / multipleChoice | 9:40 |
| flightControls / flight-controls-2b | true | clock_reading / clock_reading | story / multipleChoice | 11:55 |
| flightControls / flight-controls-3a | true | clock_reading / clock_reading | story / multipleChoice | 3:00 |
| flightControls / flight-controls-3b | true | clock_reading / clock_reading | story / multipleChoice | 5:15 |
| flightControls / flight-controls-4a | true | clock_reading / clock_reading | story / multipleChoice | 7:30 |
| flightControls / flight-controls-4b | true | clock_reading / clock_reading | story / multipleChoice | 9:45 |
| wingFrame / wing-frame-1a | true | story_multiplication / story_multiplication | story / open | groups × each: 7, 2 |
| wingFrame / wing-frame-1b | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 10, 11 |
| wingFrame / wing-frame-2a | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 3, 11 |
| wingFrame / wing-frame-2b | true | bare_division / bare_division | bare / multipleChoice | dividend : divisor: 27, 9 |
| wingFrame / wing-frame-3a | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 8, 4 |
| wingFrame / wing-frame-3b | true | story_multiplication / story_multiplication | story / open | groups × each: 9, 6 |
| wingFrame / wing-frame-4a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 4, 13 |
| wingFrame / wing-frame-4b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 5, 2 |

## LVL-0025 — disabled

| Challenge / variant | Active | Family / subtype | Presentation / mode | Operands and roles / visual / spelling choices |
|---|---|---|---|---|
| perspectiveFrame / perspective-frame-1a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 6, 11 |
| perspectiveFrame / perspective-frame-1b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 7, 12 |
| perspectiveFrame / perspective-frame-2a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 8, 12 |
| perspectiveFrame / perspective-frame-2b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 9, 13 |
| perspectiveFrame / perspective-frame-3a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 2, 13 |
| perspectiveFrame / perspective-frame-3b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 10, 2 |
| perspectiveFrame / perspective-frame-4a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 3, 2 |
| perspectiveFrame / perspective-frame-4b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 4, 4 |
| geometricFloor / geometric-floor-1a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 5, 4 |
| geometricFloor / geometric-floor-1b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 6, 5 |
| geometricFloor / geometric-floor-2a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 7, 5 |
| geometricFloor / geometric-floor-2b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 8, 5 |
| geometricFloor / geometric-floor-3a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 9, 5 |
| geometricFloor / geometric-floor-3b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 2, 6 |
| geometricFloor / geometric-floor-4a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 10, 6 |
| geometricFloor / geometric-floor-4b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 3, 7 |
| pigmentTable / pigment-table-1a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 4, 2 |
| pigmentTable / pigment-table-1b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 5, 5 |
| pigmentTable / pigment-table-2a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 6, 3 |
| pigmentTable / pigment-table-2b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 7, 6 |
| pigmentTable / pigment-table-3a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 8, 4 |
| pigmentTable / pigment-table-3b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 9, 6 |
| pigmentTable / pigment-table-4a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 2, 5 |
| pigmentTable / pigment-table-4b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 10, 7 |
| pulleyPanel / pulley-panel-1a | true | clock_reading / clock_reading | story / multipleChoice | 11:05 |
| pulleyPanel / pulley-panel-1b | true | clock_reading / clock_reading | story / multipleChoice | 1:20 |
| pulleyPanel / pulley-panel-2a | true | clock_reading / clock_reading | story / multipleChoice | 4:35 |
| pulleyPanel / pulley-panel-2b | true | clock_reading / clock_reading | story / multipleChoice | 6:50 |
| pulleyPanel / pulley-panel-3a | true | clock_reading / clock_reading | story / multipleChoice | 8:10 |
| pulleyPanel / pulley-panel-3b | true | clock_reading / clock_reading | story / multipleChoice | 10:25 |
| pulleyPanel / pulley-panel-4a | true | clock_reading / clock_reading | story / multipleChoice | 12:40 |
| pulleyPanel / pulley-panel-4b | true | clock_reading / clock_reading | story / multipleChoice | 2:55 |

## LVL-0026 — enabled

| Challenge / variant | Active | Family / subtype | Presentation / mode | Operands and roles / visual / spelling choices |
|---|---|---|---|---|
| waterModel / water-model-1a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 3 × 6 = 18. |
| waterModel / water-model-1b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 4 × 7 = 28. |
| waterModel / water-model-2a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 5 × 7 = 35. |
| waterModel / water-model-2b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 6 × 9 = 54. |
| waterModel / water-model-3a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 7 × 8 = 56. |
| waterModel / water-model-3b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 8 × 10 = 80. |
| waterModel / water-model-4a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 9 × 11 = 99. |
| waterModel / water-model-4b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 2 × 10 = 20. |
| opticalTable / optical-table-1a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 6, 6 |
| opticalTable / optical-table-1b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 7, 7 |
| opticalTable / optical-table-2a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 8, 7 |
| opticalTable / optical-table-2b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 9, 8 |
| opticalTable / optical-table-3a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 6, 10 |
| opticalTable / optical-table-3b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 7, 10 |
| opticalTable / optical-table-4a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 8, 13 |
| opticalTable / optical-table-4b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 9, 12 |
| centralCodex / central-codex-1a | true | clock_reading / clock_reading | story / multipleChoice | 4:00 |
| centralCodex / central-codex-1b | true | clock_reading / clock_reading | story / multipleChoice | 6:15 |
| centralCodex / central-codex-2a | true | clock_reading / clock_reading | story / multipleChoice | 8:30 |
| centralCodex / central-codex-2b | true | clock_reading / clock_reading | story / multipleChoice | 10:45 |
| centralCodex / central-codex-3a | true | clock_reading / clock_reading | story / multipleChoice | 12:10 |
| centralCodex / central-codex-3b | true | clock_reading / clock_reading | story / multipleChoice | 2:25 |
| centralCodex / central-codex-4a | true | clock_reading / clock_reading | story / multipleChoice | 5:40 |
| centralCodex / central-codex-4b | true | clock_reading / clock_reading | story / multipleChoice | 7:55 |
| wingConstruction / wing-construction-1a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 6 × 7 = 42. |
| wingConstruction / wing-construction-1b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 7 × 2 = 14. |
| wingConstruction / wing-construction-2a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 8 × 3 = 24. |
| wingConstruction / wing-construction-2b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 9 × 4 = 36. |
| wingConstruction / wing-construction-3a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 6 × 13 = 78. |
| wingConstruction / wing-construction-3b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 7 × 3 = 21. |
| wingConstruction / wing-construction-4a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 8 × 6 = 48. |
| wingConstruction / wing-construction-4b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 9 × 7 = 63. |
| designBoard / design-board-1a | true | clock_reading / clock_reading | story / multipleChoice | 9:00 |
| designBoard / design-board-1b | true | clock_reading / clock_reading | story / multipleChoice | 11:15 |
| designBoard / design-board-2a | true | clock_reading / clock_reading | story / multipleChoice | 1:30 |
| designBoard / design-board-2b | true | clock_reading / clock_reading | story / multipleChoice | 3:45 |
| designBoard / design-board-3a | true | clock_reading / clock_reading | story / multipleChoice | 5:05 |
| designBoard / design-board-3b | true | clock_reading / clock_reading | story / multipleChoice | 7:20 |
| designBoard / design-board-4a | true | clock_reading / clock_reading | story / multipleChoice | 10:35 |
| designBoard / design-board-4b | true | clock_reading / clock_reading | story / multipleChoice | 12:50 |

## LVL-0027 — enabled

| Challenge / variant | Active | Family / subtype | Presentation / mode | Operands and roles / visual / spelling choices |
|---|---|---|---|---|
| anubisStatue / anubis-statue-1a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 2 x 5 = 10. |
| anubisStatue / anubis-statue-1b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 7 x 8 = 56. |
| anubisStatue / anubis-statue-2a | false | story_multiplication / story_multiplication | story / multipleChoice | Inactive: 5 x 6 = 30. |
| anubisStatue / anubis-statue-2b | false | story_multiplication / story_multiplication | story / open | Inactive: 4 x 6 = 24. |
| anubisStatue / anubis-statue-3a | false | bare_division / bare_division | bare / open | Inactive: 42 : 7 = 6, want 7 x 6 = 42. |
| anubisStatue / anubis-statue-3b | false | story_division / sharing | story / multipleChoice | Inactive: 56 : 7 = 8, want 7 x 8 = 56. |
| anubisStatue / anubis-statue-4a | false | spelling / recognition | bare / multipleChoice | Anubis, Anubise, Anubin, An-ubis; answer: Anubis |
| anubisStatue / anubis-statue-4b | false | spelling / recognition | bare / multipleChoice | Sarcofaag, Sarkofaag, Sarcofhaag, Sarcofag; answer: Sarcofaag |
| tabletCase / tablet-case-1a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 7, 5 |
| tabletCase / tablet-case-1b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 3, 4 |
| tabletCase / tablet-case-2a | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 4, 7 |
| tabletCase / tablet-case-2b | true | story_multiplication / story_multiplication | story / open | groups × each: 5, 7 |
| tabletCase / tablet-case-3a | true | bare_division / bare_division | bare / open | dividend : divisor: 48, 8 |
| tabletCase / tablet-case-3b | true | story_division / sharing | story / multipleChoice | undefined: 72, 8 |
| tabletCase / tablet-case-4a | true | spelling / recognition | bare / multipleChoice | Hiëroglief, Hieroglief, Hiëroglyf, Hieroeglief; answer: Hiëroglief |
| tabletCase / tablet-case-4b | true | spelling / recognition | bare / multipleChoice | Tablet, Tablett, Tabelet, Tabblet; answer: Tablet |
| modelBoat / model-boat-1a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 8, 6 |
| modelBoat / model-boat-1b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 9, 5 |
| modelBoat / model-boat-2a | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 10, 8 |
| modelBoat / model-boat-2b | true | story_multiplication / story_multiplication | story / open | groups × each: 6, 8 |
| modelBoat / model-boat-3a | true | bare_division / bare_division | bare / open | dividend : divisor: 20, 4 |
| modelBoat / model-boat-3b | true | story_division / sharing | story / multipleChoice | undefined: 45, 9 |
| modelBoat / model-boat-4a | true | spelling / recognition | bare / multipleChoice | Papyrus, Papirus, Pappyrus, Papyrys; answer: Papyrus |
| modelBoat / model-boat-4b | true | spelling / recognition | bare / multipleChoice | Boot, Bood, Bootte, Boott; answer: Boot |
| reliefPanel / relief-panel-1a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 9 x 7 = 63. |
| reliefPanel / relief-panel-1b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 6 x 6 = 36. |
| reliefPanel / relief-panel-2a | false | story_multiplication / story_multiplication | story / multipleChoice | Inactive: 3 x 9 = 27. |
| reliefPanel / relief-panel-2b | false | story_multiplication / story_multiplication | story / open | Inactive: 7 x 9 = 63. |
| reliefPanel / relief-panel-3a | false | bare_division / bare_division | bare / open | Inactive: 63 : 9 = 7, want 9 x 7 = 63. |
| reliefPanel / relief-panel-3b | false | story_division / sharing | story / multipleChoice | Inactive: 30 : 5 = 6, want 5 x 6 = 30. |
| reliefPanel / relief-panel-4a | false | spelling / recognition | bare / multipleChoice | Reliëf, Relief, Reliëff, Reliéf; answer: Reliëf |
| reliefPanel / relief-panel-4b | false | spelling / recognition | bare / multipleChoice | Farao, Farau, Farrao, Fa-rao; answer: Farao |

## LVL-0028 — enabled

| Challenge / variant | Active | Family / subtype | Presentation / mode | Operands and roles / visual / spelling choices |
|---|---|---|---|---|
| tripodInstrument / tripod-instrument-1a | false | clock_reading / clock_reading | bare / multipleChoice | 3:00 |
| tripodInstrument / tripod-instrument-1b | false | clock_reading / clock_reading | bare / multipleChoice | 6:15 |
| tripodInstrument / tripod-instrument-2a | false | clock_reading / clock_reading | bare / multipleChoice | 7:30 |
| tripodInstrument / tripod-instrument-2b | false | clock_reading / clock_reading | bare / multipleChoice | 4:45 |
| tripodInstrument / tripod-instrument-3a | false | clock_reading / clock_reading | bare / multipleChoice | 2:20 |
| tripodInstrument / tripod-instrument-3b | false | clock_reading / clock_reading | bare / multipleChoice | 8:35 |
| tripodInstrument / tripod-instrument-4a | false | clock_reading / clock_reading | bare / multipleChoice | 10:50 |
| tripodInstrument / tripod-instrument-4b | false | clock_reading / clock_reading | bare / multipleChoice | 12:05 |
| planningTable / planning-table-1a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 10, 5 |
| planningTable / planning-table-1b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 7, 8 |
| planningTable / planning-table-2a | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 5, 6 |
| planningTable / planning-table-2b | true | story_multiplication / story_multiplication | story / open | groups × each: 4, 6 |
| planningTable / planning-table-3a | true | bare_division / bare_division | bare / open | dividend : divisor: 42, 7 |
| planningTable / planning-table-3b | true | story_division / sharing | story / multipleChoice | undefined: 56, 7 |
| planningTable / planning-table-4a | true | spelling / recognition | bare / multipleChoice | Piramide, Pyramide, Piramiede, Pirramide; answer: Piramide |
| planningTable / planning-table-4b | true | spelling / recognition | bare / multipleChoice | Bouwplan, Bouwplaan, Bouplan, Bouw-plan; answer: Bouwplan |
| stoneSled / stone-sled-1a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 7, 5 |
| stoneSled / stone-sled-1b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 4, 5 |
| stoneSled / stone-sled-2a | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 4, 7 |
| stoneSled / stone-sled-2b | true | story_multiplication / story_multiplication | story / open | groups × each: 5, 7 |
| stoneSled / stone-sled-3a | true | bare_division / bare_division | bare / open | dividend : divisor: 48, 8 |
| stoneSled / stone-sled-3b | true | story_division / sharing | story / multipleChoice | undefined: 72, 8 |
| stoneSled / stone-sled-4a | true | spelling / recognition | bare / multipleChoice | Slede, Sleede, Sledde, Sleedeh; answer: Slede |
| stoneSled / stone-sled-4b | true | spelling / recognition | bare / multipleChoice | Steenblok, Steenblock, Steen-blok, Steenblokk; answer: Steenblok |
| craneFrame / crane-frame-1a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 8 x 6 = 48. |
| craneFrame / crane-frame-1b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 9 x 5 = 45. |
| craneFrame / crane-frame-2a | false | story_multiplication / story_multiplication | story / multipleChoice | Inactive: 3 x 5 = 15. |
| craneFrame / crane-frame-2b | false | story_multiplication / story_multiplication | story / open | Inactive: 6 x 8 = 48. |
| craneFrame / crane-frame-3a | false | bare_division / bare_division | bare / open | Inactive: 56 : 7 = 8, want 7 x 8 = 56. |
| craneFrame / crane-frame-3b | false | story_division / sharing | story / multipleChoice | Inactive: 45 : 9 = 5, want 9 x 5 = 45. |
| craneFrame / crane-frame-4a | false | spelling / recognition | bare / multipleChoice | Hijsbalk, Heisbalk, Hijsbalck, Hijs-balk; answer: Hijsbalk |
| craneFrame / crane-frame-4b | false | spelling / recognition | bare / multipleChoice | Touw, Tauw, Tou, Toew; answer: Touw |

## LVL-0029 — enabled

| Challenge / variant | Active | Family / subtype | Presentation / mode | Operands and roles / visual / spelling choices |
|---|---|---|---|---|
| paintedRelief / painted-relief-1a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 5 x 5 = 25. |
| paintedRelief / painted-relief-1b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 6 x 6 = 36. |
| paintedRelief / painted-relief-2a | false | story_multiplication / story_multiplication | story / multipleChoice | Inactive: 3 x 9 = 27. |
| paintedRelief / painted-relief-2b | false | story_multiplication / story_multiplication | story / open | Inactive: 7 x 9 = 63. |
| paintedRelief / painted-relief-3a | false | bare_division / bare_division | bare / open | Inactive: 63 : 9 = 7, want 9 x 7 = 63. |
| paintedRelief / painted-relief-3b | false | story_division / sharing | story / multipleChoice | Inactive: 36 : 6 = 6, want 6 x 6 = 36. |
| paintedRelief / painted-relief-4a | false | spelling / recognition | bare / multipleChoice | Farao, Farau, Farrao, Fa-rao; answer: Farao |
| paintedRelief / painted-relief-4b | false | spelling / recognition | bare / multipleChoice | Reliëf, Relief, Reliëff, Reliéf; answer: Reliëf |
| canopicJars / canopic-jars-1a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 6, 4 |
| canopicJars / canopic-jars-1b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 7, 8 |
| canopicJars / canopic-jars-2a | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 5, 6 |
| canopicJars / canopic-jars-2b | true | story_multiplication / story_multiplication | story / open | groups × each: 4, 6 |
| canopicJars / canopic-jars-3a | true | bare_division / bare_division | bare / open | dividend : divisor: 18, 3 |
| canopicJars / canopic-jars-3b | true | story_division / sharing | story / multipleChoice | undefined: 56, 7 |
| canopicJars / canopic-jars-4a | true | spelling / recognition | bare / multipleChoice | Kruik, Kruijk, Kruiq, Kr-uik; answer: Kruik |
| canopicJars / canopic-jars-4b | true | spelling / recognition | bare / multipleChoice | Kruiken, Kruikenn, Kruijken, Krui-ken; answer: Kruiken |
| treasureChest / treasure-chest-1a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 7 x 5 = 35. |
| treasureChest / treasure-chest-1b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 8 x 9 = 72. |
| treasureChest / treasure-chest-2a | false | story_multiplication / story_multiplication | story / multipleChoice | Inactive: 4 x 7 = 28. |
| treasureChest / treasure-chest-2b | false | story_multiplication / story_multiplication | story / open | Inactive: 5 x 7 = 35. |
| treasureChest / treasure-chest-3a | false | bare_division / bare_division | bare / open | Inactive: 48 : 8 = 6, want 8 x 6 = 48. |
| treasureChest / treasure-chest-3b | false | story_division / sharing | story / multipleChoice | Inactive: 72 : 8 = 9, want 8 x 9 = 72. |
| treasureChest / treasure-chest-4a | false | spelling / recognition | bare / multipleChoice | Schat, Schad, Schatte, Sc-hat; answer: Schat |
| treasureChest / treasure-chest-4b | false | spelling / recognition | bare / multipleChoice | Goud, Gout, Goudt, Go-ud; answer: Goud |
| altarTable / altar-table-1a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 8, 6 |
| altarTable / altar-table-1b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 9, 5 |
| altarTable / altar-table-2a | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 10, 8 |
| altarTable / altar-table-2b | true | story_multiplication / story_multiplication | story / open | groups × each: 6, 8 |
| altarTable / altar-table-3a | true | bare_division / bare_division | bare / open | dividend : divisor: 56, 7 |
| altarTable / altar-table-3b | true | story_division / sharing | story / multipleChoice | undefined: 45, 9 |
| altarTable / altar-table-4a | true | spelling / recognition | bare / multipleChoice | Altaar, Altar, Althaar, Al-taar; answer: Altaar |
| altarTable / altar-table-4b | true | spelling / recognition | bare / multipleChoice | Sarcofaag, Sarkofaag, Sarcofhaag, Sarcofag; answer: Sarcofaag |

## LVL-0030 — enabled

| Challenge / variant | Active | Family / subtype | Presentation / mode | Operands and roles / visual / spelling choices |
|---|---|---|---|---|
| offeringTable / offering-table-1a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 9 x 7 = 63. |
| offeringTable / offering-table-1b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 10 x 3 = 30. |
| offeringTable / offering-table-2a | false | story_multiplication / story_multiplication | story / multipleChoice | Inactive: 3 x 9 = 27. |
| offeringTable / offering-table-2b | false | story_multiplication / story_multiplication | story / open | Inactive: 7 x 9 = 63. |
| offeringTable / offering-table-3a | false | bare_division / bare_division | bare / open | Inactive: 63 : 9 = 7, want 9 x 7 = 63. |
| offeringTable / offering-table-3b | false | story_division / sharing | story / multipleChoice | Inactive: 36 : 6 = 6, want 6 x 6 = 36. |
| offeringTable / offering-table-4a | false | spelling / recognition | bare / multipleChoice | Offer, Ofer, Offur, Of-fer; answer: Offer |
| offeringTable / offering-table-4b | false | spelling / recognition | bare / multipleChoice | Offergave, Offergaave, Ofergave, Offer-gave; answer: Offergave |
| sundial / sundial-1a | true | clock_reading / clock_reading | bare / multipleChoice | 3:00 |
| sundial / sundial-1b | true | clock_reading / clock_reading | bare / multipleChoice | 6:15 |
| sundial / sundial-2a | true | clock_reading / clock_reading | bare / multipleChoice | 7:30 |
| sundial / sundial-2b | true | clock_reading / clock_reading | bare / multipleChoice | 4:45 |
| sundial / sundial-3a | true | clock_reading / clock_reading | bare / multipleChoice | 2:20 |
| sundial / sundial-3b | true | clock_reading / clock_reading | bare / multipleChoice | 8:35 |
| sundial / sundial-4a | true | clock_reading / clock_reading | bare / multipleChoice | 10:50 |
| sundial / sundial-4b | true | clock_reading / clock_reading | bare / multipleChoice | 12:05 |
| carvedRelief / carved-relief-1a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 6 x 4 = 24. |
| carvedRelief / carved-relief-1b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 7 x 8 = 56. |
| carvedRelief / carved-relief-2a | false | story_multiplication / story_multiplication | story / multipleChoice | Inactive: 5 x 6 = 30. |
| carvedRelief / carved-relief-2b | false | story_multiplication / story_multiplication | story / open | Inactive: 4 x 6 = 24. |
| carvedRelief / carved-relief-3a | false | bare_division / bare_division | bare / open | Inactive: 42 : 7 = 6, want 7 x 6 = 42. |
| carvedRelief / carved-relief-3b | false | story_division / sharing | story / multipleChoice | Inactive: 16 : 2 = 8, want 2 x 8 = 16. |
| carvedRelief / carved-relief-4a | false | spelling / recognition | bare / multipleChoice | Tempel, Temppel, Tepmel, Te-mpel; answer: Tempel |
| carvedRelief / carved-relief-4b | false | spelling / recognition | bare / multipleChoice | Reliëf, Relief, Reliëff, Reliéf; answer: Reliëf |
| templePanel / temple-panel-1a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 7, 5 |
| templePanel / temple-panel-1b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 8, 9 |
| templePanel / temple-panel-2a | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 4, 7 |
| templePanel / temple-panel-2b | true | story_multiplication / story_multiplication | story / open | groups × each: 5, 7 |
| templePanel / temple-panel-3a | true | bare_division / bare_division | bare / open | dividend : divisor: 48, 8 |
| templePanel / temple-panel-3b | true | story_division / sharing | story / multipleChoice | undefined: 72, 8 |
| templePanel / temple-panel-4a | true | spelling / recognition | bare / multipleChoice | Scarabee, Skarabee, Scarabe, Scarrabee; answer: Scarabee |
| templePanel / temple-panel-4b | true | spelling / recognition | bare / multipleChoice | Zonnewijzer, Zonneweizer, Zonnewyzer, Zonne-wijzer; answer: Zonnewijzer |

## LVL-0031 — enabled

| Challenge / variant | Active | Family / subtype | Presentation / mode | Operands and roles / visual / spelling choices |
|---|---|---|---|---|
| scarabDisplay / scarab-display-1a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 8, 6 |
| scarabDisplay / scarab-display-1b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 9, 5 |
| scarabDisplay / scarab-display-2a | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 10, 8 |
| scarabDisplay / scarab-display-2b | true | story_multiplication / story_multiplication | story / open | groups × each: 6, 8 |
| scarabDisplay / scarab-display-3a | true | bare_division / bare_division | bare / open | dividend : divisor: 56, 7 |
| scarabDisplay / scarab-display-3b | true | story_division / sharing | story / multipleChoice | undefined: 45, 9 |
| scarabDisplay / scarab-display-4a | true | spelling / recognition | bare / multipleChoice | Scarabee, Skarabee, Scarabe, Scarrabee; answer: Scarabee |
| scarabDisplay / scarab-display-4b | true | spelling / recognition | bare / multipleChoice | Sarcofaag, Sarkofaag, Sarcofhaag, Sarcofag; answer: Sarcofaag |
| centralCase / central-case-1a | false | bare_multiplication / bare_multiplication | bare / multipleChoice | Inactive: 2 x 6 = 12. |
| centralCase / central-case-1b | false | bare_multiplication / bare_multiplication | bare / open | Inactive: 6 x 6 = 36. |
| centralCase / central-case-2a | false | story_multiplication / story_multiplication | story / multipleChoice | Inactive: 3 x 9 = 27. |
| centralCase / central-case-2b | false | story_multiplication / story_multiplication | story / open | Inactive: 7 x 9 = 63. |
| centralCase / central-case-3a | false | bare_division / bare_division | bare / open | Inactive: 63 : 9 = 7, want 9 x 7 = 63. |
| centralCase / central-case-3b | false | story_division / sharing | story / multipleChoice | Inactive: 36 : 6 = 6, want 6 x 6 = 36. |
| centralCase / central-case-4a | false | spelling / recognition | bare / multipleChoice | Vitrine, Vitriene, Vittrine, Vi-trine; answer: Vitrine |
| centralCase / central-case-4b | false | spelling / recognition | bare / multipleChoice | Museum, Museüm, Muzeum, Mu-seum; answer: Museum |
| boatDisplay / boat-display-1a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 6, 4 |
| boatDisplay / boat-display-1b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 7, 8 |
| boatDisplay / boat-display-2a | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 5, 6 |
| boatDisplay / boat-display-2b | true | story_multiplication / story_multiplication | story / open | groups × each: 4, 6 |
| boatDisplay / boat-display-3a | true | bare_division / bare_division | bare / open | dividend : divisor: 42, 7 |
| boatDisplay / boat-display-3b | true | story_division / sharing | story / multipleChoice | undefined: 56, 7 |
| boatDisplay / boat-display-4a | true | spelling / recognition | bare / multipleChoice | Museum, Museüm, Muzeum, Mu-seum; answer: Museum |
| boatDisplay / boat-display-4b | true | spelling / recognition | bare / multipleChoice | Papyrus, Papirus, Pappyrus, Papyrys; answer: Papyrus |
| seatedStatue / seated-statue-1a | true | bare_multiplication / bare_multiplication | bare / multipleChoice | factors / groups × each: 7, 5 |
| seatedStatue / seated-statue-1b | true | bare_multiplication / bare_multiplication | bare / open | factors / groups × each: 8, 9 |
| seatedStatue / seated-statue-2a | true | story_multiplication / story_multiplication | story / multipleChoice | groups × each: 4, 7 |
| seatedStatue / seated-statue-2b | true | story_multiplication / story_multiplication | story / open | groups × each: 5, 7 |
| seatedStatue / seated-statue-3a | true | bare_division / bare_division | bare / open | dividend : divisor: 48, 8 |
| seatedStatue / seated-statue-3b | true | story_division / sharing | story / multipleChoice | undefined: 72, 8 |
| seatedStatue / seated-statue-4a | true | spelling / recognition | bare / multipleChoice | Beeld, Beelt, Beeldt, Be-eld; answer: Beeld |
| seatedStatue / seated-statue-4b | true | spelling / recognition | bare / multipleChoice | Farao, Farau, Farrao, Fa-rao; answer: Farao |
