# Production M6 — full audit export before the 6 October quality correction

Historical snapshot: this export predates the approved content-quality correction. See [the current bank contract](M6_CONTENT_BANK.md) and `npm run audit:m6` for current counts and content. The snapshot below is intentionally not rewritten.

Export date: **2026-10-06 (Europe/Berlin)**. Read-only snapshot of the current local runtime bank, loaded directly from `src/content/m6/index.js` and resolved through `bank.recover(questionId, surfaceId)`. No old Markdown source bundle or test fixture is used. No educational review, correction or recommendation is included.

**Total questions:** 99 (original 24: 24; expansion 75: 75).  
**Questions with multiple narrative surfaces:** 34.  
**Total surfaces:** 133.  
**Difficulty totals:** 1 — 46; 2 — 34; 3 — 19.

Domain counts below preserve the actual `educationalDomain` keys. They are not merged or renamed; the broader `domain` field is `math` for every record. Section titles reuse each current `reportLabel`, because production records have no separate short-title field.

### Counts per domain

| Domain | Questions |
| --- | --- |
| addition-subtraction | 6 |
| additionSubtraction | 8 |
| dataPatterns | 6 |
| fractions | 6 |
| fractionsRatios | 10 |
| measurementGeometry | 7 |
| money | 14 |
| multiplicationDivision | 10 |
| numberSense | 8 |
| time | 24 |

## Question inventory — 99 rows

| ID | Domain | Objective | Difficulty | Surfaces | Answer mode | Visual |
| --- | --- | --- | --- | --- | --- | --- |
| RP-M6-BR-001 | fractions | De helft van een hoeveelheid bepalen. | 1 | 1 | open | fractionStrip |
| RP-M6-BR-002 | fractions | Een kwart van een hoeveelheid bepalen. | 1 | 1 | open | fractionStrip |
| RP-M6-BR-003 | fractions | Driekwart van een hoeveelheid bepalen via één kwart. | 2 | 1 | open | fractionStrip |
| RP-M6-BR-004 | fractions | Twee derde van een lengte bepalen via één derde. | 2 | 1 | open | fractionStrip |
| RP-M6-BR-005 | fractions | Een breuk van een hoeveelheid berekenen en bepalen hoeveel overblijft. | 3 | 1 | open | fractionStrip |
| RP-M6-BR-006 | fractions | Een breuk van een hoeveelheid berekenen en bepalen hoeveel overblijft. | 3 | 1 | open | fractionStrip |
| RP-M6-OP-001 | addition-subtraction | Honderdtallen en tientallen optellen zonder een tiental of honderdtal te overschrijden. | 1 | 1 | open | calculationSteps |
| RP-M6-OP-002 | addition-subtraction | Een eenvoudige toevoegingssituatie vertalen naar optellen en het tweede getal opdelen in honderdtallen en tientallen. | 1 | 1 | open | calculationSteps |
| RP-M6-OP-003 | addition-subtraction | Een driecijferig getal optellen door het tweede getal te splitsen en bij een deelsprong het volgende honderdtal te passeren. | 2 | 1 | open | calculationSteps |
| RP-M6-OP-004 | addition-subtraction | Een driecijferige optelsom oplossen met afzonderlijke stappen over een honderdtal en een tiental. | 2 | 1 | open | calculationSteps |
| RP-M6-OP-005 | addition-subtraction | Een viercijferig en driecijferig getal optellen, met stappen voorbij een duizendtal en een honderdtal. | 3 | 1 | open | calculationSteps |
| RP-M6-OP-006 | addition-subtraction | Een toevoegingssituatie met duizendtallen oplossen door het tweede getal te splitsen en het totaal over getalgrenzen heen bij te houden. | 3 | 1 | open | calculationSteps |
| RP-M6-GE-001 | money | Wisselgeld bepalen door een prijs met halve euro’s aan te vullen tot de volgende hele euro. | 1 | 1 | open | moneyReceipt |
| RP-M6-GE-002 | money | Wisselgeld in tientallen centen bepalen door aan te vullen tot de volgende hele euro. | 1 | 1 | open | moneyReceipt |
| RP-M6-GE-003 | money | Wisselgeld bepalen in twee stukken: centen tot de volgende hele euro en daarna hele euro’s tot het betaalde bedrag. | 2 | 1 | open | moneyReceipt |
| RP-M6-GE-004 | money | Wisselgeld met euro’s en centen berekenen door via de volgende hele euro aan te vullen. | 2 | 1 | open | moneyReceipt |
| RP-M6-GE-005 | money | Twee prijzen met centen optellen en vervolgens het wisselgeld bepalen. | 3 | 1 | open | moneyReceipt |
| RP-M6-GE-006 | money | Twee bedragen met euro’s en centen optellen, over een hele euro gaan en het wisselgeld berekenen. | 3 | 1 | open | moneyReceipt |
| RP-M6-TI-001 | time | Een tijdsduur binnen hetzelfde uur bepalen. | 1 | 1 | open | timeLine |
| RP-M6-TI-002 | time | Een tijdsduur binnen hetzelfde uur bepalen met een combinatie van tientallen en vijf minuten. | 1 | 1 | open | timeLine |
| RP-M6-TI-003 | time | Een tijdsduur berekenen die over een heel uur heen gaat. | 2 | 1 | open | timeLine |
| RP-M6-TI-004 | time | Een tijdsduur over het middaguur berekenen. | 2 | 1 | open | timeLine |
| RP-M6-TI-005 | time | Een eindtijd bepalen bij een gegeven begintijd en duur van meer dan een uur. | 3 | 1 | multipleChoice | timeLine |
| RP-M6-TI-006 | time | Een begintijd bepalen door een duur van meer dan een uur terug te rekenen vanaf een eindtijd. | 3 | 1 | multipleChoice | timeLine |
| M6-NS-001 | numberSense | spoken_number_to_digits | 1 | 1 | multipleChoice | none |
| M6-NS-002 | numberSense | order_digits_largest_number | 1 | 1 | multipleChoice | none |
| M6-NS-003 | numberSense | place_value | 1 | 1 | multipleChoice | none |
| M6-NS-004 | numberSense | number_sequence_constant_step | 1 | 1 | open | numberLine |
| M6-NS-005 | numberSense | round_to_nearest_hundred | 2 | 1 | multipleChoice | numberLine |
| M6-NS-006 | numberSense | round_to_nearest_thousand | 2 | 1 | open | numberLine |
| M6-NS-007 | numberSense | closest_value_to_target | 2 | 1 | multipleChoice | numberLine |
| M6-NS-008 | numberSense | compose_number_from_place_values | 3 | 1 | open | calculationSteps |
| M6-AS-001 | additionSubtraction | add_hundreds_tens | 1 | 2 | open | calculationSteps |
| M6-AS-002 | additionSubtraction | find_difference | 1 | 2 | open | numberLine |
| M6-AS-003 | additionSubtraction | bridge_to_round_number | 1 | 2 | open | numberLine |
| M6-AS-004 | additionSubtraction | add_three_digit_context | 1 | 2 | open | calculationSteps |
| M6-AS-005 | additionSubtraction | add_three_digit_crossing | 2 | 2 | open | calculationSteps |
| M6-AS-006 | additionSubtraction | subtract_three_digit_crossing | 2 | 2 | open | calculationSteps |
| M6-AS-007 | additionSubtraction | add_four_digit_and_three_digit | 2 | 2 | open | calculationSteps |
| M6-AS-008 | additionSubtraction | subtract_four_digit_crossing | 3 | 2 | open | calculationSteps |
| M6-MD-001 | multiplicationDivision | multiply_one_digit_two_digit | 1 | 2 | open | calculationSteps |
| M6-MD-002 | multiplicationDivision | division_grouping | 1 | 2 | open | calculationSteps |
| M6-MD-003 | multiplicationDivision | multiply_by_twenty_context | 1 | 2 | open | calculationSteps |
| M6-MD-004 | multiplicationDivision | division_sharing | 1 | 2 | open | calculationSteps |
| M6-MD-005 | multiplicationDivision | multiply_by_multiple_of_ten | 1 | 2 | open | calculationSteps |
| M6-MD-006 | multiplicationDivision | divide_three_digit_by_one_digit | 2 | 2 | open | calculationSteps |
| M6-MD-007 | multiplicationDivision | multiply_one_digit_two_digit_crossing | 2 | 2 | open | calculationSteps |
| M6-MD-008 | multiplicationDivision | division_grouping_context | 2 | 2 | open | calculationSteps |
| M6-MD-009 | multiplicationDivision | division_remainder_round_up_context | 3 | 2 | open | calculationSteps |
| M6-MD-010 | multiplicationDivision | multiply_two_layers_context | 3 | 2 | open | calculationSteps |
| M6-FR-001 | fractionsRatios | identify_fraction_from_visual | 1 | 1 | multipleChoice | fractionStrip |
| M6-FR-002 | fractionsRatios | fraction_of_quantity_half | 1 | 2 | open | fractionStrip |
| M6-FR-003 | fractionsRatios | fraction_of_quantity_quarter | 1 | 2 | open | fractionStrip |
| M6-FR-004 | fractionsRatios | scale_ratio_double | 1 | 2 | open | calculationSteps |
| M6-FR-005 | fractionsRatios | ratio_find_unit | 1 | 2 | open | calculationSteps |
| M6-FR-006 | fractionsRatios | fraction_of_quantity_multiple_parts | 2 | 2 | open | fractionStrip |
| M6-FR-007 | fractionsRatios | find_whole_from_unit_fraction | 2 | 2 | open | fractionStrip |
| M6-FR-008 | fractionsRatios | ratio_scale_via_unit | 2 | 2 | open | calculationSteps |
| M6-FR-009 | fractionsRatios | find_whole_from_nonunit_fraction | 3 | 2 | open | fractionStrip |
| M6-FR-010 | fractionsRatios | ratio_scale_via_unit_multistep | 3 | 2 | open | calculationSteps |
| M6-MO-001 | money | count_currency_visual | 1 | 1 | open | currency |
| M6-MO-002 | money | count_currency_visual_mixed_cents | 1 | 1 | open | currency |
| M6-MO-003 | money | calculate_change_to_next_euro | 1 | 2 | open | moneyReceipt |
| M6-MO-004 | money | compose_exact_currency_amount | 1 | 1 | currencyCompose | currency |
| M6-MO-005 | money | compose_exact_currency_amount | 2 | 1 | currencyCompose | currency |
| M6-MO-006 | money | calculate_change_mixed_euros_cents | 2 | 2 | open | moneyReceipt |
| M6-MO-007 | money | add_prices_then_calculate_change | 2 | 2 | open | moneyReceipt |
| M6-MO-008 | money | compose_change_amount | 3 | 1 | currencyCompose | currency |
| M6-TI-001 | time | analogue_clock_to_spoken_time_quarter_past | 1 | 1 | multipleChoice | analogueClock |
| M6-TI-002 | time | analogue_clock_to_spoken_time_half | 1 | 1 | multipleChoice | analogueClock |
| M6-TI-003 | time | analogue_clock_to_spoken_time_before_half | 1 | 1 | multipleChoice | analogueClock |
| M6-TI-004 | time | analogue_clock_to_spoken_time_after_half | 2 | 1 | multipleChoice | analogueClock |
| M6-TI-005 | time | digital_clock_to_spoken_time_quarter_past | 1 | 1 | multipleChoice | digitalClock |
| M6-TI-006 | time | digital_clock_to_spoken_time_half | 1 | 1 | multipleChoice | digitalClock |
| M6-TI-007 | time | digital_clock_to_spoken_time_before_half | 2 | 1 | multipleChoice | digitalClock |
| M6-TI-008 | time | digital_clock_to_spoken_time_after_half | 2 | 1 | multipleChoice | digitalClock |
| M6-TI-009 | time | elapsed_time_same_hour | 1 | 2 | open | timeLine |
| M6-TI-010 | time | elapsed_time_half_hour | 1 | 1 | open | timeLine |
| M6-TI-011 | time | elapsed_time_cross_hour | 2 | 1 | open | timeLine |
| M6-TI-012 | time | elapsed_time_cross_hour_nonround | 2 | 1 | open | timeLine |
| M6-TI-013 | time | find_end_time_simple | 1 | 1 | multipleChoice | timeLine |
| M6-TI-014 | time | find_end_time_hours_minutes | 3 | 1 | multipleChoice | timeLine |
| M6-TI-015 | time | find_start_time_minutes | 2 | 1 | multipleChoice | timeLine |
| M6-TI-016 | time | find_start_time_hours_minutes | 3 | 1 | multipleChoice | timeLine |
| M6-TI-017 | time | time_until_event | 1 | 1 | open | timeLine |
| M6-TI-018 | time | multistep_schedule_end_time | 3 | 1 | multipleChoice | timeLine |
| M6-ME-001 | measurementGeometry | convert_cm_to_m_exact | 1 | 1 | open | measurement |
| M6-ME-002 | measurementGeometry | convert_m_to_dm | 1 | 1 | open | measurement |
| M6-ME-003 | measurementGeometry | convert_m_to_mm_unit_fact | 1 | 1 | multipleChoice | measurement |
| M6-ME-004 | measurementGeometry | combine_grams_to_kilogram | 1 | 2 | open | measurement |
| M6-ME-005 | measurementGeometry | convert_mixed_length_to_cm | 2 | 1 | open | measurement |
| M6-ME-006 | measurementGeometry | multiply_equal_weights | 2 | 2 | open | measurement |
| M6-ME-007 | measurementGeometry | add_mixed_lengths_convert_to_cm | 3 | 2 | open | measurement |
| M6-DP-001 | dataPatterns | sequence_plus_ten | 1 | 1 | open | numberLine |
| M6-DP-002 | dataPatterns | sequence_plus_twenty_five | 1 | 1 | open | numberLine |
| M6-DP-003 | dataPatterns | read_single_table_value | 1 | 1 | open | compactDataTable |
| M6-DP-004 | dataPatterns | compare_table_values_difference | 2 | 1 | open | compactDataTable |
| M6-DP-005 | dataPatterns | extend_ratio_table | 2 | 1 | open | compactDataTable |
| M6-DP-006 | dataPatterns | sequence_increasing_step | 2 | 1 | multipleChoice | calculationSteps |

## Difficulty by domain

| Domain | 1 — Instap | 2 — Normaal | 3 — Uitdagend | Total |
| --- | --- | --- | --- | --- |
| addition-subtraction | 2 | 2 | 2 | 6 |
| additionSubtraction | 4 | 3 | 1 | 8 |
| dataPatterns | 3 | 3 | 0 | 6 |
| fractions | 2 | 2 | 2 | 6 |
| fractionsRatios | 5 | 3 | 2 | 10 |
| measurementGeometry | 4 | 2 | 1 | 7 |
| money | 6 | 5 | 3 | 14 |
| multiplicationDivision | 5 | 3 | 2 | 10 |
| numberSense | 4 | 3 | 1 | 8 |
| time | 11 | 8 | 5 | 24 |

## Objective counts

| Objective (exact runtime metadata) | Questions |
| --- | --- |
| add_four_digit_and_three_digit | 1 |
| add_hundreds_tens | 1 |
| add_mixed_lengths_convert_to_cm | 1 |
| add_prices_then_calculate_change | 1 |
| add_three_digit_context | 1 |
| add_three_digit_crossing | 1 |
| analogue_clock_to_spoken_time_after_half | 1 |
| analogue_clock_to_spoken_time_before_half | 1 |
| analogue_clock_to_spoken_time_half | 1 |
| analogue_clock_to_spoken_time_quarter_past | 1 |
| bridge_to_round_number | 1 |
| calculate_change_mixed_euros_cents | 1 |
| calculate_change_to_next_euro | 1 |
| closest_value_to_target | 1 |
| combine_grams_to_kilogram | 1 |
| compare_table_values_difference | 1 |
| compose_change_amount | 1 |
| compose_exact_currency_amount | 2 |
| compose_number_from_place_values | 1 |
| convert_cm_to_m_exact | 1 |
| convert_m_to_dm | 1 |
| convert_m_to_mm_unit_fact | 1 |
| convert_mixed_length_to_cm | 1 |
| count_currency_visual | 1 |
| count_currency_visual_mixed_cents | 1 |
| De helft van een hoeveelheid bepalen. | 1 |
| digital_clock_to_spoken_time_after_half | 1 |
| digital_clock_to_spoken_time_before_half | 1 |
| digital_clock_to_spoken_time_half | 1 |
| digital_clock_to_spoken_time_quarter_past | 1 |
| divide_three_digit_by_one_digit | 1 |
| division_grouping | 1 |
| division_grouping_context | 1 |
| division_remainder_round_up_context | 1 |
| division_sharing | 1 |
| Driekwart van een hoeveelheid bepalen via één kwart. | 1 |
| Een begintijd bepalen door een duur van meer dan een uur terug te rekenen vanaf een eindtijd. | 1 |
| Een breuk van een hoeveelheid berekenen en bepalen hoeveel overblijft. | 2 |
| Een driecijferig getal optellen door het tweede getal te splitsen en bij een deelsprong het volgende honderdtal te passeren. | 1 |
| Een driecijferige optelsom oplossen met afzonderlijke stappen over een honderdtal en een tiental. | 1 |
| Een eenvoudige toevoegingssituatie vertalen naar optellen en het tweede getal opdelen in honderdtallen en tientallen. | 1 |
| Een eindtijd bepalen bij een gegeven begintijd en duur van meer dan een uur. | 1 |
| Een kwart van een hoeveelheid bepalen. | 1 |
| Een tijdsduur berekenen die over een heel uur heen gaat. | 1 |
| Een tijdsduur binnen hetzelfde uur bepalen met een combinatie van tientallen en vijf minuten. | 1 |
| Een tijdsduur binnen hetzelfde uur bepalen. | 1 |
| Een tijdsduur over het middaguur berekenen. | 1 |
| Een toevoegingssituatie met duizendtallen oplossen door het tweede getal te splitsen en het totaal over getalgrenzen heen bij te houden. | 1 |
| Een viercijferig en driecijferig getal optellen, met stappen voorbij een duizendtal en een honderdtal. | 1 |
| elapsed_time_cross_hour | 1 |
| elapsed_time_cross_hour_nonround | 1 |
| elapsed_time_half_hour | 1 |
| elapsed_time_same_hour | 1 |
| extend_ratio_table | 1 |
| find_difference | 1 |
| find_end_time_hours_minutes | 1 |
| find_end_time_simple | 1 |
| find_start_time_hours_minutes | 1 |
| find_start_time_minutes | 1 |
| find_whole_from_nonunit_fraction | 1 |
| find_whole_from_unit_fraction | 1 |
| fraction_of_quantity_half | 1 |
| fraction_of_quantity_multiple_parts | 1 |
| fraction_of_quantity_quarter | 1 |
| Honderdtallen en tientallen optellen zonder een tiental of honderdtal te overschrijden. | 1 |
| identify_fraction_from_visual | 1 |
| multiply_by_multiple_of_ten | 1 |
| multiply_by_twenty_context | 1 |
| multiply_equal_weights | 1 |
| multiply_one_digit_two_digit | 1 |
| multiply_one_digit_two_digit_crossing | 1 |
| multiply_two_layers_context | 1 |
| multistep_schedule_end_time | 1 |
| number_sequence_constant_step | 1 |
| order_digits_largest_number | 1 |
| place_value | 1 |
| ratio_find_unit | 1 |
| ratio_scale_via_unit | 1 |
| ratio_scale_via_unit_multistep | 1 |
| read_single_table_value | 1 |
| round_to_nearest_hundred | 1 |
| round_to_nearest_thousand | 1 |
| scale_ratio_double | 1 |
| sequence_increasing_step | 1 |
| sequence_plus_ten | 1 |
| sequence_plus_twenty_five | 1 |
| spoken_number_to_digits | 1 |
| subtract_four_digit_crossing | 1 |
| subtract_three_digit_crossing | 1 |
| time_until_event | 1 |
| Twee bedragen met euro’s en centen optellen, over een hele euro gaan en het wisselgeld berekenen. | 1 |
| Twee derde van een lengte bepalen via één derde. | 1 |
| Twee prijzen met centen optellen en vervolgens het wisselgeld bepalen. | 1 |
| Wisselgeld bepalen door een prijs met halve euro’s aan te vullen tot de volgende hele euro. | 1 |
| Wisselgeld bepalen in twee stukken: centen tot de volgende hele euro en daarna hele euro’s tot het betaalde bedrag. | 1 |
| Wisselgeld in tientallen centen bepalen door aan te vullen tot de volgende hele euro. | 1 |
| Wisselgeld met euro’s en centen berekenen door via de volgende hele euro aan te vullen. | 1 |

## Runtime interpretation

Eligibility is taken from the current `positionDomain` / `selectPosition` / central-bank selector. Explicit clock/time positions select only domain `time`; normal/generic positions exclude it. Recent-history exhaustion stays inside the eligible domain and difficulty set. There are no level/world-specific restrictions on these records. Difficulty availability is additionally constrained by the current slider policy below. The default is 90% E5 / 10% M6.

| M6 slider percentage | Difficulty 1 % | Difficulty 2 % | Difficulty 3 % |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 10 | 100 | 0 | 0 |
| 20 | 100 | 0 | 0 |
| 30 | 100 | 0 | 0 |
| 40 | 85 | 15 | 0 |
| 50 | 75 | 25 | 0 |
| 60 | 65 | 35 | 0 |
| 70 | 65 | 30 | 5 |
| 80 | 60 | 30 | 10 |
| 90 | 55 | 35 | 10 |
| 100 | 50 | 35 | 15 |

The planner uses a separate 20-M6-request difficulty sequence. Zero-weight difficulties are excluded. Within the eligible set the selector prefers exact/nearest difficulty, with the easier difficulty winning a tie; it considers unused IDs before reusing an exhausted bucket. E5 fallback remains available when no eligible M6 record exists. These notes describe runtime selection; they do not reclassify any question.

### How to read the content and visual data

All Question/Minnie/Moose/Full explanation fields below are resolved runtime strings, including the recent narrative-context substitutions. Authored emphasis and paragraph order are preserved. Fraction rich-text is represented by its exact plain-text fraction in prose; its resolved rich parts are also included when configured, so the stacked rendering can be inspected. Question tables remain in their exact plain-text Markdown plus their resolved rich parts. Choices are in authored order, before the once-per-question browser shuffle.

The automatic flow is question → first valid wrong answer: Minnie → second valid wrong answer: Moose → third valid wrong answer: full explanation. There is no direct explanation action. Invalid/empty input does not advance this sequence. Revealing an explanation does not itself complete the question. The selected surface remains stable during rerenders and same-run reopening.

Every surface includes the exact JSON for all four visual frames. Values such as `targetCents` configure interactions and are not automatically drawn as answers. The renderer uses explicit labels/notes/equations. Authoring-only `visual.instructions` are not learner-visible and are intentionally excluded; the actual `visual.stages` are the authority here. A question-stage frame with `inPrompt:true` is shown as part of the rich question table, not rendered a second time. `none` and empty calculation frames render no separate visual.

Currency denominations, targets and prices are integer cents. Count frames show the configured assets/counts. Compose/change controls remain available alongside the question; stage visuals show only configured labels, highlighted denominations and notes. Assets use `assets/ui/currency/<denomination>.png`. Measurement targets without `targetLabel` show `?`. Digital clocks use zero-padded 24-hour digits; analogue frames position the hands at the configured hour/minute. Fraction/quantity geometry and highlighted indices are exported unchanged.

Full explanations are shown as the exact ordered `explanationSteps`. Existing interleaving configuration is exported per surface: group/step indices are zero-based. Where none exists, the complete explanation visual follows the final explanation step.

### Answer-contract interpretation

Each question includes the exact resolved contract JSON and its correct answer. No units are inferred where `answerSpec.unit` is absent; the exact prompt/visual may still name a unit. Multiple-choice grading compares the selected authored value to the canonical answer; the authored choice set and any rich choice presentation are exported.

Whole-number input is trimmed. Ungrouped syntax is `^(?:0|[1-9]\d*)# Current production M6 — full audit export

Export date: **2026-10-06 (Europe/Berlin)**. Read-only snapshot of the current local runtime bank, loaded directly from `src/content/m6/index.js` and resolved through `bank.recover(questionId, surfaceId)`. No old Markdown source bundle or test fixture is used. No educational review, correction or recommendation is included.

**Total questions:** 99 (original 24: 24; expansion 75: 75).  
**Questions with multiple narrative surfaces:** 34.  
**Total surfaces:** 133.  
**Difficulty totals:** 1 — 46; 2 — 34; 3 — 19.

Domain counts below preserve the actual `educationalDomain` keys. They are not merged or renamed; the broader `domain` field is `math` for every record. Section titles reuse each current `reportLabel`, because production records have no separate short-title field.

### Counts per domain

| Domain | Questions |
| --- | --- |
| addition-subtraction | 6 |
| additionSubtraction | 8 |
| dataPatterns | 6 |
| fractions | 6 |
| fractionsRatios | 10 |
| measurementGeometry | 7 |
| money | 14 |
| multiplicationDivision | 10 |
| numberSense | 8 |
| time | 24 |

## Question inventory — 99 rows

| ID | Domain | Objective | Difficulty | Surfaces | Answer mode | Visual |
| --- | --- | --- | --- | --- | --- | --- |
| RP-M6-BR-001 | fractions | De helft van een hoeveelheid bepalen. | 1 | 1 | open | fractionStrip |
| RP-M6-BR-002 | fractions | Een kwart van een hoeveelheid bepalen. | 1 | 1 | open | fractionStrip |
| RP-M6-BR-003 | fractions | Driekwart van een hoeveelheid bepalen via één kwart. | 2 | 1 | open | fractionStrip |
| RP-M6-BR-004 | fractions | Twee derde van een lengte bepalen via één derde. | 2 | 1 | open | fractionStrip |
| RP-M6-BR-005 | fractions | Een breuk van een hoeveelheid berekenen en bepalen hoeveel overblijft. | 3 | 1 | open | fractionStrip |
| RP-M6-BR-006 | fractions | Een breuk van een hoeveelheid berekenen en bepalen hoeveel overblijft. | 3 | 1 | open | fractionStrip |
| RP-M6-OP-001 | addition-subtraction | Honderdtallen en tientallen optellen zonder een tiental of honderdtal te overschrijden. | 1 | 1 | open | calculationSteps |
| RP-M6-OP-002 | addition-subtraction | Een eenvoudige toevoegingssituatie vertalen naar optellen en het tweede getal opdelen in honderdtallen en tientallen. | 1 | 1 | open | calculationSteps |
| RP-M6-OP-003 | addition-subtraction | Een driecijferig getal optellen door het tweede getal te splitsen en bij een deelsprong het volgende honderdtal te passeren. | 2 | 1 | open | calculationSteps |
| RP-M6-OP-004 | addition-subtraction | Een driecijferige optelsom oplossen met afzonderlijke stappen over een honderdtal en een tiental. | 2 | 1 | open | calculationSteps |
| RP-M6-OP-005 | addition-subtraction | Een viercijferig en driecijferig getal optellen, met stappen voorbij een duizendtal en een honderdtal. | 3 | 1 | open | calculationSteps |
| RP-M6-OP-006 | addition-subtraction | Een toevoegingssituatie met duizendtallen oplossen door het tweede getal te splitsen en het totaal over getalgrenzen heen bij te houden. | 3 | 1 | open | calculationSteps |
| RP-M6-GE-001 | money | Wisselgeld bepalen door een prijs met halve euro’s aan te vullen tot de volgende hele euro. | 1 | 1 | open | moneyReceipt |
| RP-M6-GE-002 | money | Wisselgeld in tientallen centen bepalen door aan te vullen tot de volgende hele euro. | 1 | 1 | open | moneyReceipt |
| RP-M6-GE-003 | money | Wisselgeld bepalen in twee stukken: centen tot de volgende hele euro en daarna hele euro’s tot het betaalde bedrag. | 2 | 1 | open | moneyReceipt |
| RP-M6-GE-004 | money | Wisselgeld met euro’s en centen berekenen door via de volgende hele euro aan te vullen. | 2 | 1 | open | moneyReceipt |
| RP-M6-GE-005 | money | Twee prijzen met centen optellen en vervolgens het wisselgeld bepalen. | 3 | 1 | open | moneyReceipt |
| RP-M6-GE-006 | money | Twee bedragen met euro’s en centen optellen, over een hele euro gaan en het wisselgeld berekenen. | 3 | 1 | open | moneyReceipt |
| RP-M6-TI-001 | time | Een tijdsduur binnen hetzelfde uur bepalen. | 1 | 1 | open | timeLine |
| RP-M6-TI-002 | time | Een tijdsduur binnen hetzelfde uur bepalen met een combinatie van tientallen en vijf minuten. | 1 | 1 | open | timeLine |
| RP-M6-TI-003 | time | Een tijdsduur berekenen die over een heel uur heen gaat. | 2 | 1 | open | timeLine |
| RP-M6-TI-004 | time | Een tijdsduur over het middaguur berekenen. | 2 | 1 | open | timeLine |
| RP-M6-TI-005 | time | Een eindtijd bepalen bij een gegeven begintijd en duur van meer dan een uur. | 3 | 1 | multipleChoice | timeLine |
| RP-M6-TI-006 | time | Een begintijd bepalen door een duur van meer dan een uur terug te rekenen vanaf een eindtijd. | 3 | 1 | multipleChoice | timeLine |
| M6-NS-001 | numberSense | spoken_number_to_digits | 1 | 1 | multipleChoice | none |
| M6-NS-002 | numberSense | order_digits_largest_number | 1 | 1 | multipleChoice | none |
| M6-NS-003 | numberSense | place_value | 1 | 1 | multipleChoice | none |
| M6-NS-004 | numberSense | number_sequence_constant_step | 1 | 1 | open | numberLine |
| M6-NS-005 | numberSense | round_to_nearest_hundred | 2 | 1 | multipleChoice | numberLine |
| M6-NS-006 | numberSense | round_to_nearest_thousand | 2 | 1 | open | numberLine |
| M6-NS-007 | numberSense | closest_value_to_target | 2 | 1 | multipleChoice | numberLine |
| M6-NS-008 | numberSense | compose_number_from_place_values | 3 | 1 | open | calculationSteps |
| M6-AS-001 | additionSubtraction | add_hundreds_tens | 1 | 2 | open | calculationSteps |
| M6-AS-002 | additionSubtraction | find_difference | 1 | 2 | open | numberLine |
| M6-AS-003 | additionSubtraction | bridge_to_round_number | 1 | 2 | open | numberLine |
| M6-AS-004 | additionSubtraction | add_three_digit_context | 1 | 2 | open | calculationSteps |
| M6-AS-005 | additionSubtraction | add_three_digit_crossing | 2 | 2 | open | calculationSteps |
| M6-AS-006 | additionSubtraction | subtract_three_digit_crossing | 2 | 2 | open | calculationSteps |
| M6-AS-007 | additionSubtraction | add_four_digit_and_three_digit | 2 | 2 | open | calculationSteps |
| M6-AS-008 | additionSubtraction | subtract_four_digit_crossing | 3 | 2 | open | calculationSteps |
| M6-MD-001 | multiplicationDivision | multiply_one_digit_two_digit | 1 | 2 | open | calculationSteps |
| M6-MD-002 | multiplicationDivision | division_grouping | 1 | 2 | open | calculationSteps |
| M6-MD-003 | multiplicationDivision | multiply_by_twenty_context | 1 | 2 | open | calculationSteps |
| M6-MD-004 | multiplicationDivision | division_sharing | 1 | 2 | open | calculationSteps |
| M6-MD-005 | multiplicationDivision | multiply_by_multiple_of_ten | 1 | 2 | open | calculationSteps |
| M6-MD-006 | multiplicationDivision | divide_three_digit_by_one_digit | 2 | 2 | open | calculationSteps |
| M6-MD-007 | multiplicationDivision | multiply_one_digit_two_digit_crossing | 2 | 2 | open | calculationSteps |
| M6-MD-008 | multiplicationDivision | division_grouping_context | 2 | 2 | open | calculationSteps |
| M6-MD-009 | multiplicationDivision | division_remainder_round_up_context | 3 | 2 | open | calculationSteps |
| M6-MD-010 | multiplicationDivision | multiply_two_layers_context | 3 | 2 | open | calculationSteps |
| M6-FR-001 | fractionsRatios | identify_fraction_from_visual | 1 | 1 | multipleChoice | fractionStrip |
| M6-FR-002 | fractionsRatios | fraction_of_quantity_half | 1 | 2 | open | fractionStrip |
| M6-FR-003 | fractionsRatios | fraction_of_quantity_quarter | 1 | 2 | open | fractionStrip |
| M6-FR-004 | fractionsRatios | scale_ratio_double | 1 | 2 | open | calculationSteps |
| M6-FR-005 | fractionsRatios | ratio_find_unit | 1 | 2 | open | calculationSteps |
| M6-FR-006 | fractionsRatios | fraction_of_quantity_multiple_parts | 2 | 2 | open | fractionStrip |
| M6-FR-007 | fractionsRatios | find_whole_from_unit_fraction | 2 | 2 | open | fractionStrip |
| M6-FR-008 | fractionsRatios | ratio_scale_via_unit | 2 | 2 | open | calculationSteps |
| M6-FR-009 | fractionsRatios | find_whole_from_nonunit_fraction | 3 | 2 | open | fractionStrip |
| M6-FR-010 | fractionsRatios | ratio_scale_via_unit_multistep | 3 | 2 | open | calculationSteps |
| M6-MO-001 | money | count_currency_visual | 1 | 1 | open | currency |
| M6-MO-002 | money | count_currency_visual_mixed_cents | 1 | 1 | open | currency |
| M6-MO-003 | money | calculate_change_to_next_euro | 1 | 2 | open | moneyReceipt |
| M6-MO-004 | money | compose_exact_currency_amount | 1 | 1 | currencyCompose | currency |
| M6-MO-005 | money | compose_exact_currency_amount | 2 | 1 | currencyCompose | currency |
| M6-MO-006 | money | calculate_change_mixed_euros_cents | 2 | 2 | open | moneyReceipt |
| M6-MO-007 | money | add_prices_then_calculate_change | 2 | 2 | open | moneyReceipt |
| M6-MO-008 | money | compose_change_amount | 3 | 1 | currencyCompose | currency |
| M6-TI-001 | time | analogue_clock_to_spoken_time_quarter_past | 1 | 1 | multipleChoice | analogueClock |
| M6-TI-002 | time | analogue_clock_to_spoken_time_half | 1 | 1 | multipleChoice | analogueClock |
| M6-TI-003 | time | analogue_clock_to_spoken_time_before_half | 1 | 1 | multipleChoice | analogueClock |
| M6-TI-004 | time | analogue_clock_to_spoken_time_after_half | 2 | 1 | multipleChoice | analogueClock |
| M6-TI-005 | time | digital_clock_to_spoken_time_quarter_past | 1 | 1 | multipleChoice | digitalClock |
| M6-TI-006 | time | digital_clock_to_spoken_time_half | 1 | 1 | multipleChoice | digitalClock |
| M6-TI-007 | time | digital_clock_to_spoken_time_before_half | 2 | 1 | multipleChoice | digitalClock |
| M6-TI-008 | time | digital_clock_to_spoken_time_after_half | 2 | 1 | multipleChoice | digitalClock |
| M6-TI-009 | time | elapsed_time_same_hour | 1 | 2 | open | timeLine |
| M6-TI-010 | time | elapsed_time_half_hour | 1 | 1 | open | timeLine |
| M6-TI-011 | time | elapsed_time_cross_hour | 2 | 1 | open | timeLine |
| M6-TI-012 | time | elapsed_time_cross_hour_nonround | 2 | 1 | open | timeLine |
| M6-TI-013 | time | find_end_time_simple | 1 | 1 | multipleChoice | timeLine |
| M6-TI-014 | time | find_end_time_hours_minutes | 3 | 1 | multipleChoice | timeLine |
| M6-TI-015 | time | find_start_time_minutes | 2 | 1 | multipleChoice | timeLine |
| M6-TI-016 | time | find_start_time_hours_minutes | 3 | 1 | multipleChoice | timeLine |
| M6-TI-017 | time | time_until_event | 1 | 1 | open | timeLine |
| M6-TI-018 | time | multistep_schedule_end_time | 3 | 1 | multipleChoice | timeLine |
| M6-ME-001 | measurementGeometry | convert_cm_to_m_exact | 1 | 1 | open | measurement |
| M6-ME-002 | measurementGeometry | convert_m_to_dm | 1 | 1 | open | measurement |
| M6-ME-003 | measurementGeometry | convert_m_to_mm_unit_fact | 1 | 1 | multipleChoice | measurement |
| M6-ME-004 | measurementGeometry | combine_grams_to_kilogram | 1 | 2 | open | measurement |
| M6-ME-005 | measurementGeometry | convert_mixed_length_to_cm | 2 | 1 | open | measurement |
| M6-ME-006 | measurementGeometry | multiply_equal_weights | 2 | 2 | open | measurement |
| M6-ME-007 | measurementGeometry | add_mixed_lengths_convert_to_cm | 3 | 2 | open | measurement |
| M6-DP-001 | dataPatterns | sequence_plus_ten | 1 | 1 | open | numberLine |
| M6-DP-002 | dataPatterns | sequence_plus_twenty_five | 1 | 1 | open | numberLine |
| M6-DP-003 | dataPatterns | read_single_table_value | 1 | 1 | open | compactDataTable |
| M6-DP-004 | dataPatterns | compare_table_values_difference | 2 | 1 | open | compactDataTable |
| M6-DP-005 | dataPatterns | extend_ratio_table | 2 | 1 | open | compactDataTable |
| M6-DP-006 | dataPatterns | sequence_increasing_step | 2 | 1 | multipleChoice | calculationSteps |

## Difficulty by domain

| Domain | 1 — Instap | 2 — Normaal | 3 — Uitdagend | Total |
| --- | --- | --- | --- | --- |
| addition-subtraction | 2 | 2 | 2 | 6 |
| additionSubtraction | 4 | 3 | 1 | 8 |
| dataPatterns | 3 | 3 | 0 | 6 |
| fractions | 2 | 2 | 2 | 6 |
| fractionsRatios | 5 | 3 | 2 | 10 |
| measurementGeometry | 4 | 2 | 1 | 7 |
| money | 6 | 5 | 3 | 14 |
| multiplicationDivision | 5 | 3 | 2 | 10 |
| numberSense | 4 | 3 | 1 | 8 |
| time | 11 | 8 | 5 | 24 |

## Objective counts

| Objective (exact runtime metadata) | Questions |
| --- | --- |
| add_four_digit_and_three_digit | 1 |
| add_hundreds_tens | 1 |
| add_mixed_lengths_convert_to_cm | 1 |
| add_prices_then_calculate_change | 1 |
| add_three_digit_context | 1 |
| add_three_digit_crossing | 1 |
| analogue_clock_to_spoken_time_after_half | 1 |
| analogue_clock_to_spoken_time_before_half | 1 |
| analogue_clock_to_spoken_time_half | 1 |
| analogue_clock_to_spoken_time_quarter_past | 1 |
| bridge_to_round_number | 1 |
| calculate_change_mixed_euros_cents | 1 |
| calculate_change_to_next_euro | 1 |
| closest_value_to_target | 1 |
| combine_grams_to_kilogram | 1 |
| compare_table_values_difference | 1 |
| compose_change_amount | 1 |
| compose_exact_currency_amount | 2 |
| compose_number_from_place_values | 1 |
| convert_cm_to_m_exact | 1 |
| convert_m_to_dm | 1 |
| convert_m_to_mm_unit_fact | 1 |
| convert_mixed_length_to_cm | 1 |
| count_currency_visual | 1 |
| count_currency_visual_mixed_cents | 1 |
| De helft van een hoeveelheid bepalen. | 1 |
| digital_clock_to_spoken_time_after_half | 1 |
| digital_clock_to_spoken_time_before_half | 1 |
| digital_clock_to_spoken_time_half | 1 |
| digital_clock_to_spoken_time_quarter_past | 1 |
| divide_three_digit_by_one_digit | 1 |
| division_grouping | 1 |
| division_grouping_context | 1 |
| division_remainder_round_up_context | 1 |
| division_sharing | 1 |
| Driekwart van een hoeveelheid bepalen via één kwart. | 1 |
| Een begintijd bepalen door een duur van meer dan een uur terug te rekenen vanaf een eindtijd. | 1 |
| Een breuk van een hoeveelheid berekenen en bepalen hoeveel overblijft. | 2 |
| Een driecijferig getal optellen door het tweede getal te splitsen en bij een deelsprong het volgende honderdtal te passeren. | 1 |
| Een driecijferige optelsom oplossen met afzonderlijke stappen over een honderdtal en een tiental. | 1 |
| Een eenvoudige toevoegingssituatie vertalen naar optellen en het tweede getal opdelen in honderdtallen en tientallen. | 1 |
| Een eindtijd bepalen bij een gegeven begintijd en duur van meer dan een uur. | 1 |
| Een kwart van een hoeveelheid bepalen. | 1 |
| Een tijdsduur berekenen die over een heel uur heen gaat. | 1 |
| Een tijdsduur binnen hetzelfde uur bepalen met een combinatie van tientallen en vijf minuten. | 1 |
| Een tijdsduur binnen hetzelfde uur bepalen. | 1 |
| Een tijdsduur over het middaguur berekenen. | 1 |
| Een toevoegingssituatie met duizendtallen oplossen door het tweede getal te splitsen en het totaal over getalgrenzen heen bij te houden. | 1 |
| Een viercijferig en driecijferig getal optellen, met stappen voorbij een duizendtal en een honderdtal. | 1 |
| elapsed_time_cross_hour | 1 |
| elapsed_time_cross_hour_nonround | 1 |
| elapsed_time_half_hour | 1 |
| elapsed_time_same_hour | 1 |
| extend_ratio_table | 1 |
| find_difference | 1 |
| find_end_time_hours_minutes | 1 |
| find_end_time_simple | 1 |
| find_start_time_hours_minutes | 1 |
| find_start_time_minutes | 1 |
| find_whole_from_nonunit_fraction | 1 |
| find_whole_from_unit_fraction | 1 |
| fraction_of_quantity_half | 1 |
| fraction_of_quantity_multiple_parts | 1 |
| fraction_of_quantity_quarter | 1 |
| Honderdtallen en tientallen optellen zonder een tiental of honderdtal te overschrijden. | 1 |
| identify_fraction_from_visual | 1 |
| multiply_by_multiple_of_ten | 1 |
| multiply_by_twenty_context | 1 |
| multiply_equal_weights | 1 |
| multiply_one_digit_two_digit | 1 |
| multiply_one_digit_two_digit_crossing | 1 |
| multiply_two_layers_context | 1 |
| multistep_schedule_end_time | 1 |
| number_sequence_constant_step | 1 |
| order_digits_largest_number | 1 |
| place_value | 1 |
| ratio_find_unit | 1 |
| ratio_scale_via_unit | 1 |
| ratio_scale_via_unit_multistep | 1 |
| read_single_table_value | 1 |
| round_to_nearest_hundred | 1 |
| round_to_nearest_thousand | 1 |
| scale_ratio_double | 1 |
| sequence_increasing_step | 1 |
| sequence_plus_ten | 1 |
| sequence_plus_twenty_five | 1 |
| spoken_number_to_digits | 1 |
| subtract_four_digit_crossing | 1 |
| subtract_three_digit_crossing | 1 |
| time_until_event | 1 |
| Twee bedragen met euro’s en centen optellen, over een hele euro gaan en het wisselgeld berekenen. | 1 |
| Twee derde van een lengte bepalen via één derde. | 1 |
| Twee prijzen met centen optellen en vervolgens het wisselgeld bepalen. | 1 |
| Wisselgeld bepalen door een prijs met halve euro’s aan te vullen tot de volgende hele euro. | 1 |
| Wisselgeld bepalen in twee stukken: centen tot de volgende hele euro en daarna hele euro’s tot het betaalde bedrag. | 1 |
| Wisselgeld in tientallen centen bepalen door aan te vullen tot de volgende hele euro. | 1 |
| Wisselgeld met euro’s en centen berekenen door via de volgende hele euro aan te vullen. | 1 |

## Runtime interpretation

Eligibility is taken from the current `positionDomain` / `selectPosition` / central-bank selector. Explicit clock/time positions select only domain `time`; normal/generic positions exclude it. Recent-history exhaustion stays inside the eligible domain and difficulty set. There are no level/world-specific restrictions on these records. Difficulty availability is additionally constrained by the current slider policy below. The default is 90% E5 / 10% M6.

| M6 slider percentage | Difficulty 1 % | Difficulty 2 % | Difficulty 3 % |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 10 | 100 | 0 | 0 |
| 20 | 100 | 0 | 0 |
| 30 | 100 | 0 | 0 |
| 40 | 85 | 15 | 0 |
| 50 | 75 | 25 | 0 |
| 60 | 65 | 35 | 0 |
| 70 | 65 | 30 | 5 |
| 80 | 60 | 30 | 10 |
| 90 | 55 | 35 | 10 |
| 100 | 50 | 35 | 15 |

The planner uses a separate 20-M6-request difficulty sequence. Zero-weight difficulties are excluded. Within the eligible set the selector prefers exact/nearest difficulty, with the easier difficulty winning a tie; it considers unused IDs before reusing an exhausted bucket. E5 fallback remains available when no eligible M6 record exists. These notes describe runtime selection; they do not reclassify any question.

### How to read the content and visual data

All Question/Minnie/Moose/Full explanation fields below are resolved runtime strings, including the recent narrative-context substitutions. Authored emphasis and paragraph order are preserved. Fraction rich-text is represented by its exact plain-text fraction in prose; its resolved rich parts are also included when configured, so the stacked rendering can be inspected. Question tables remain in their exact plain-text Markdown plus their resolved rich parts. Choices are in authored order, before the once-per-question browser shuffle.

The automatic flow is question → first valid wrong answer: Minnie → second valid wrong answer: Moose → third valid wrong answer: full explanation. There is no direct explanation action. Invalid/empty input does not advance this sequence. Revealing an explanation does not itself complete the question. The selected surface remains stable during rerenders and same-run reopening.

Every surface includes the exact JSON for all four visual frames. Values such as `targetCents` configure interactions and are not automatically drawn as answers. The renderer uses explicit labels/notes/equations. Authoring-only `visual.instructions` are not learner-visible and are intentionally excluded; the actual `visual.stages` are the authority here. A question-stage frame with `inPrompt:true` is shown as part of the rich question table, not rendered a second time. `none` and empty calculation frames render no separate visual.

Currency denominations, targets and prices are integer cents. Count frames show the configured assets/counts. Compose/change controls remain available alongside the question; stage visuals show only configured labels, highlighted denominations and notes. Assets use `assets/ui/currency/<denomination>.png`. Measurement targets without `targetLabel` show `?`. Digital clocks use zero-padded 24-hour digits; analogue frames position the hands at the configured hour/minute. Fraction/quantity geometry and highlighted indices are exported unchanged.

Full explanations are shown as the exact ordered `explanationSteps`. Existing interleaving configuration is exported per surface: group/step indices are zero-based. Where none exists, the complete explanation visual follows the final explanation step.

### Answer-contract interpretation

Each question includes the exact resolved contract JSON and its correct answer. No units are inferred where `answerSpec.unit` is absent; the exact prompt/visual may still name a unit. Multiple-choice grading compares the selected authored value to the canonical answer; the authored choice set and any rich choice presentation are exported.

Whole-number input is trimmed. Ungrouped syntax is . Grouped syntax is allowed when `grouping:true` or a declared allowed form demonstrates thousands grouping; it requires groups of three digits with a consistent dot or space separator. Parsed values must be safe integers. Correctness requires equality to the canonical answer and, unless `grouping:true`, membership in the exact `allowedForms` list. With `grouping:true`, valid numeric equivalence is sufficient.

M6 open-euro input uses separate digit-only `euros` and `cents` fields: euro digits may be empty; cents may contain zero, one or two digits; both empty is invalid. The canonical value is `100 × euros + cents`, a non-negative safe integer. One cent digit means that many cents; a blank part is zero when the other part is entered. The € prefix and comma are fixed UI. The legacy `allowedForms` remain exported verbatim as stored metadata, but typed punctuation is not used or graded by this M6 control.

Currency composition accepts any nonzero valid combination whose sum equals the configured target, or `paidCents − priceCents` for change. Only the configured denominations are allowed. Controls use integer counts 0–99; the parser accepts one-to-three-digit strings with numeric value at most 99, treating omitted allowed keys as zero. Empty/zero-only totals and malformed counts are invalid. There is no single mandatory denomination combination.

### Snapshot provenance

Runtime source SHA-256 hashes (read only):

| Runtime source | SHA-256 |
| --- | --- |
| src/app.js | 4fa98648642e215ad966bb8147738f3452c75e93820ea388dea555002db2c463 |
| src/challenge-capabilities.js | 3daaca130acf4e8e1a8d85b1662f16ea811e35258d13e6609a0a2d3d690c4218 |
| src/challenge-explanation-layouts.js | 6348fdd9cd29729c98507d35bff880590257fd578332577c4c76df86c3edadf7 |
| src/challenge-support.js | 5d7559d5b7790680e594ea17843eb3a37a29cd0aed99efcf5472c52c5a2466f5 |
| src/content/m6/addition-subtraction.js | 4a31356f7540942ac24c0193e8ca89bd1eff2f369eabd266adcfce10e9d86dec |
| src/content/m6/expansion/addition-subtraction.js | efacfed73db49872912f23f74259cad46d6fa41b5d4d830e7896ae0444bdbdeb |
| src/content/m6/expansion/data-patterns.js | 9ef3f1085889280a72c3bdcce55eafc4d69cda2a82eed739d6a14f57644c1f74 |
| src/content/m6/expansion/fractions-ratios.js | 517d00b62e2d7ec42804f0878cfc2c3dd860092e1ef23080488e1e1fb50af337 |
| src/content/m6/expansion/measurement.js | 8a2d91cf77b1324830a7ff2d85100103e13dca2b92112257073fd872ae62b383 |
| src/content/m6/expansion/money.js | 280c5f6982ba799391b91c13fe3e0fd2bb78c58d09dc768752354705b9daa667 |
| src/content/m6/expansion/multiplication-division.js | 6ffe19c23abfa5c3202ad3feacf6467e50da3ffc0360f443807a945908c2dccb |
| src/content/m6/expansion/number-sense.js | 1adf65de207325b3fe253219320a9d670681ab000c56cd3d5f1d8a1855f5f68c |
| src/content/m6/expansion/time.js | 5bb9b01f375339bac4d3b665e54f2dbd886958e170ca05a6aa69d67d0243c9c2 |
| src/content/m6/fractions-ratios.js | 39158f25ff086e074fbe8d5fc13abbe1ed3643419262bf65829126d2aefe717e |
| src/content/m6/index.js | 34439ec5350903ea7f5dfa09c7b81bd22e669d5ee860b0942f2f213bd1d6282d |
| src/content/m6/money.js | 39f53bc9d05bba7f5706cdefb0ba54c521879ef35d4d51136983126644c1cafb |
| src/content/m6/time.js | bf8f6756d0d8255ffc186abc9e00ed2a5a61326438f84c08749f6c855430939e |
| src/learning-levels.js | 5aef69b9f69f0cc1a6cf5b699f60f82338ba21c2a247b0f35ca12278a4e2a4ef |
| src/m6-bank.js | 8248f565f645255fb57ec8ce4da67ca1c07e53f3a2a930f33e7543af05872465 |

Resolved surface snapshot SHA-256: `ac14f969cec3c791f8710be546046c834900f28f10bc6934ba715f1244c649a3`.

## RP-M6-BR-001 — Breuken · Eén gelijk deel berekenen

**Source:** original 24  
**Domain:** fractions  
**Objective:** De helft van een hoeveelheid bepalen.  
**Difficulty:** 1  
**Report label:** Breuken · Eén gelijk deel berekenen  
**Answer mode:** open  
**Visual/presentation:** fractionStrip / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "total": 12,
    "fraction": {
      "numerator": 1,
      "denominator": 2
    },
    "remainder": false
  },
  "question": {
    "answer": 6,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "6"
      ],
      "unit": "schilden"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `6`.
- Answer display: `"6 schilden"`.
- Contract type: `wholeNumber`.
- Units: `"schilden"`.

**Stored allowed forms:**

```json
[
  "6"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 6,
  "answerDisplay": "6 schilden",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "6"
    ],
    "unit": "schilden"
  }
}
```

### Surface: original

**Question**

Er liggen 12 schilden klaar. De helft krijgt een rode rand. Hoeveel schilden krijgen een rode rand?

**Minnie**

De helft betekent één van twee gelijke delen. Verdeel de 12 schilden eerlijk over twee groepjes.

**Moose**

Verdeel eerst 10 schilden: 5 in elk groepje. Verdeel daarna de laatste 2 schilden ook eerlijk. Hoeveel schilden zitten er dan in elk groepje?

**Full explanation**

We zoeken de helft van 12. Daarom maken we twee even grote groepjes.

Van de eerste 10 schilden krijgt elk groepje er 5: 10 : 2 = 5.

Van de laatste 2 schilden krijgt elk groepje er nog 1: 2 : 2 = 1.

Elk groepje heeft dus 5 + 1 = 6 schilden. Dat is één helft van de 12.

6 schilden krijgen een rode rand.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We zoeken de helft van 12. Daarom maken we twee even grote groepjes.",
  "Van de eerste 10 schilden krijgt elk groepje er 5: 10 : 2 = 5.",
  "Van de laatste 2 schilden krijgt elk groepje er nog 1: 2 : 2 = 1.",
  "Elk groepje heeft dus 5 + 1 = 6 schilden. Dat is één helft van de 12.",
  "6 schilden krijgen een rode rand."
]
```

### Visual stages

**Visual type:** `fractionStrip`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "totalLabel": "12 schilden samen",
  "segments": [
    {
      "selected": true
    },
    {
      "selected": false
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 1,
      "label": "rode rand"
    }
  ]
}
```

**Minnie stage**

```json
{
  "totalLabel": "12 schilden samen",
  "segments": [
    {
      "selected": true
    },
    {
      "selected": false
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 1,
      "label": "rode rand"
    }
  ],
  "focus": [
    0
  ],
  "notes": [
    "twee gelijke delen"
  ]
}
```

**Moose stage**

```json
{
  "totalLabel": "12 schilden samen",
  "segments": [
    {
      "selected": true,
      "symbols": 5
    },
    {
      "selected": false,
      "symbols": 5
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 1,
      "label": "rode rand"
    }
  ],
  "symbol": "shield",
  "outsideSymbols": 2
}
```

**Explanation stage**

```json
{
  "totalLabel": "12 schilden samen",
  "segments": [
    {
      "selected": true,
      "symbols": 6,
      "label": "6 schilden"
    },
    {
      "selected": false,
      "symbols": 6,
      "label": "6 schilden"
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 1,
      "label": "rode rand"
    }
  ],
  "symbol": "shield"
}
```

**Explanation visual placement:**

```json
{
  "shared": 3
}
```

## RP-M6-BR-002 — Breuken · Eén gelijk deel berekenen

**Source:** original 24  
**Domain:** fractions  
**Objective:** Een kwart van een hoeveelheid bepalen.  
**Difficulty:** 1  
**Report label:** Breuken · Eén gelijk deel berekenen  
**Answer mode:** open  
**Visual/presentation:** fractionStrip / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "total": 20,
    "fraction": {
      "numerator": 1,
      "denominator": 4
    },
    "remainder": false
  },
  "question": {
    "answer": 5,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "5"
      ],
      "unit": "stenen"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `5`.
- Answer display: `"5 stenen"`.
- Contract type: `wholeNumber`.
- Units: `"stenen"`.

**Stored allowed forms:**

```json
[
  "5"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 5,
  "answerDisplay": "5 stenen",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "5"
    ],
    "unit": "stenen"
  }
}
```

### Surface: original

**Question**

Een bouwer heeft 20 stenen. Hij gebruikt een kwart van de stenen voor een muurtje. Hoeveel stenen gebruikt hij?

**Minnie**

Een kwart betekent één van vier gelijke delen. Verdeel de 20 stenen in vier even grote groepjes.

**Moose**

Je zoekt hoeveel stenen in één groepje komen. Reken 20 : 4. Welke keersom met 4 komt uit op 20?

**Full explanation**

Een kwart schrijven we als ¼. De 4 vertelt dat we vier gelijke delen maken. De 1 vertelt dat we één deel nemen.

We verdelen de 20 stenen over vier gelijke groepjes: 20 : 4 = 5.

Dat klopt, want vier groepjes van 5 zijn samen 20: 4 × 5 = 20.

De bouwer gebruikt één groepje. Hij gebruikt dus 5 stenen.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Een kwart schrijven we als ¼. De 4 vertelt dat we vier gelijke delen maken. De 1 vertelt dat we één deel nemen.",
  "We verdelen de 20 stenen over vier gelijke groepjes: 20 : 4 = 5.",
  "Dat klopt, want vier groepjes van 5 zijn samen 20: 4 × 5 = 20.",
  "De bouwer gebruikt één groepje. Hij gebruikt dus 5 stenen."
]
```

### Visual stages

**Visual type:** `fractionStrip`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "totalLabel": "20 stenen samen",
  "segments": [
    {
      "selected": true
    },
    {
      "selected": false
    },
    {
      "selected": false
    },
    {
      "selected": false
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 1,
      "label": "voor het muurtje"
    }
  ]
}
```

**Minnie stage**

```json
{
  "totalLabel": "20 stenen samen",
  "segments": [
    {
      "selected": true
    },
    {
      "selected": false
    },
    {
      "selected": false
    },
    {
      "selected": false
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 1,
      "label": "voor het muurtje"
    }
  ],
  "focus": [
    0
  ]
}
```

**Moose stage**

```json
{
  "totalLabel": "20 stenen samen",
  "segments": [
    {
      "selected": true
    },
    {
      "selected": false
    },
    {
      "selected": false
    },
    {
      "selected": false
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 1,
      "label": "voor het muurtje"
    }
  ],
  "notes": [
    "20 : 4 = ?"
  ]
}
```

**Explanation stage**

```json
{
  "totalLabel": "20 stenen samen",
  "segments": [
    {
      "selected": true,
      "symbols": 5
    },
    {
      "selected": false,
      "symbols": 5
    },
    {
      "selected": false,
      "symbols": 5
    },
    {
      "selected": false,
      "symbols": 5
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 1,
      "label": "5 stenen voor het muurtje"
    }
  ],
  "symbol": "stone"
}
```

**Explanation visual placement:**

```json
{
  "shared": 1
}
```

## RP-M6-BR-003 — Breuken · Meerdere gelijke delen berekenen

**Source:** original 24  
**Domain:** fractions  
**Objective:** Driekwart van een hoeveelheid bepalen via één kwart.  
**Difficulty:** 2  
**Report label:** Breuken · Meerdere gelijke delen berekenen  
**Answer mode:** open  
**Visual/presentation:** fractionStrip / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "total": 20,
    "fraction": {
      "numerator": 3,
      "denominator": 4
    },
    "remainder": false
  },
  "question": {
    "answer": 15,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "15"
      ],
      "unit": "schilden"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `15`.
- Answer display: `"15 schilden"`.
- Contract type: `wholeNumber`.
- Units: `"schilden"`.

**Stored allowed forms:**

```json
[
  "15"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 15,
  "answerDisplay": "15 schilden",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "15"
    ],
    "unit": "schilden"
  }
}
```

### Surface: original

**Question**

Voor de schildenmuur zijn 20 schilden gemaakt. Driekwart krijgt een blauwe rand. Hoeveel schilden krijgen een blauwe rand?

**Minnie**

Driekwart betekent drie van vier gelijke delen. Reken eerst uit hoeveel schilden in één van die vier delen zitten.

**Moose**

20 : 4 = 5, dus één kwart is 5 schilden. Je hebt drie van die delen nodig. Reken nu 3 × 5.

**Full explanation**

We zoeken ¾ van 20 schilden. De 4 vertelt dat we vier gelijke delen maken; de 3 vertelt dat we drie delen nemen.

Eerst één deel: 20 : 4 = 5 schilden.

Daarna drie delen: 3 × 5 = 15 schilden.

15 schilden krijgen een blauwe rand.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We zoeken ¾ van 20 schilden. De 4 vertelt dat we vier gelijke delen maken; de 3 vertelt dat we drie delen nemen.",
  "Eerst één deel: 20 : 4 = 5 schilden.",
  "Daarna drie delen: 3 × 5 = 15 schilden.",
  "15 schilden krijgen een blauwe rand."
]
```

### Visual stages

**Visual type:** `fractionStrip`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "totalLabel": "20 schilden samen",
  "segments": [
    {
      "selected": true
    },
    {
      "selected": true
    },
    {
      "selected": true
    },
    {
      "selected": false
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 3,
      "label": "blauwe rand"
    }
  ]
}
```

**Minnie stage**

```json
{
  "totalLabel": "20 schilden samen",
  "segments": [
    {
      "selected": true
    },
    {
      "selected": true
    },
    {
      "selected": true
    },
    {
      "selected": false
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 3,
      "label": "blauwe rand"
    }
  ],
  "focus": [
    0
  ]
}
```

**Moose stage**

```json
{
  "totalLabel": "20 schilden samen",
  "segments": [
    {
      "selected": true,
      "label": "5 schilden"
    },
    {
      "selected": true
    },
    {
      "selected": true
    },
    {
      "selected": false
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 3,
      "label": "blauwe rand"
    }
  ]
}
```

**Explanation stage**

```json
{
  "totalLabel": "20 schilden samen",
  "segments": [
    {
      "selected": true,
      "label": "5"
    },
    {
      "selected": true,
      "label": "5"
    },
    {
      "selected": true,
      "label": "5"
    },
    {
      "selected": false,
      "label": "5"
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 3,
      "label": "15 schilden"
    }
  ]
}
```

**Explanation visual placement:**

```json
{
  "shared": 2
}
```

## RP-M6-BR-004 — Breuken · Meerdere gelijke delen berekenen

**Source:** original 24  
**Domain:** fractions  
**Objective:** Twee derde van een lengte bepalen via één derde.  
**Difficulty:** 2  
**Report label:** Breuken · Meerdere gelijke delen berekenen  
**Answer mode:** open  
**Visual/presentation:** fractionStrip / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "total": 18,
    "fraction": {
      "numerator": 2,
      "denominator": 3
    },
    "remainder": false
  },
  "question": {
    "answer": 12,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "12"
      ],
      "unit": "meter"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `12`.
- Answer display: `"12 meter"`.
- Contract type: `wholeNumber`.
- Units: `"meter"`.

**Stored allowed forms:**

```json
[
  "12"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 12,
  "answerDisplay": "12 meter",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "12"
    ],
    "unit": "meter"
  }
}
```

### Surface: original

**Question**

Een touw is 18 meter lang. Eivar gebruikt twee derde van het touw om het schip vast te maken. Hoeveel meter touw gebruikt hij?

**Minnie**

Twee derde betekent twee van drie gelijke delen. Verdeel de 18 meter eerst in drie stukken die even lang zijn.

**Moose**

18 : 3 = 6, dus elk stuk is 6 meter. Eivar gebruikt twee van die stukken. Reken nu 2 × 6.

**Full explanation**

We zoeken ⅔ van 18 meter. De 3 vertelt dat we drie gelijke delen maken. De 2 vertelt dat we twee delen nemen.

Eerst de lengte van één deel: 18 : 3 = 6 meter.

Daarna de lengte van twee delen: 2 × 6 = 12 meter.

Eivar gebruikt 12 meter touw.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We zoeken ⅔ van 18 meter. De 3 vertelt dat we drie gelijke delen maken. De 2 vertelt dat we twee delen nemen.",
  "Eerst de lengte van één deel: 18 : 3 = 6 meter.",
  "Daarna de lengte van twee delen: 2 × 6 = 12 meter.",
  "Eivar gebruikt 12 meter touw."
]
```

### Visual stages

**Visual type:** `fractionStrip`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "totalLabel": "18 meter",
  "segments": [
    {
      "selected": true
    },
    {
      "selected": true
    },
    {
      "selected": false
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 2,
      "label": "gebruikt"
    }
  ],
  "texture": "rope"
}
```

**Minnie stage**

```json
{
  "totalLabel": "18 meter",
  "segments": [
    {
      "selected": true
    },
    {
      "selected": true
    },
    {
      "selected": false
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 2,
      "label": "gebruikt"
    }
  ],
  "texture": "rope",
  "focus": [
    0,
    1,
    2
  ]
}
```

**Moose stage**

```json
{
  "totalLabel": "18 meter",
  "segments": [
    {
      "selected": true,
      "label": "6 meter"
    },
    {
      "selected": true
    },
    {
      "selected": false
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 2,
      "label": "gebruikt"
    }
  ],
  "texture": "rope"
}
```

**Explanation stage**

```json
{
  "totalLabel": "18 meter",
  "segments": [
    {
      "selected": true,
      "label": "6 meter"
    },
    {
      "selected": true,
      "label": "6 meter"
    },
    {
      "selected": false,
      "label": "6 meter"
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 2,
      "label": "12 meter"
    }
  ],
  "texture": "rope"
}
```

**Explanation visual placement:**

```json
{
  "shared": 2
}
```

## RP-M6-BR-005 — Breuken · Resterende hoeveelheid berekenen

**Source:** original 24  
**Domain:** fractions  
**Objective:** Een breuk van een hoeveelheid berekenen en bepalen hoeveel overblijft.  
**Difficulty:** 3  
**Report label:** Breuken · Resterende hoeveelheid berekenen  
**Answer mode:** open  
**Visual/presentation:** fractionStrip / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "total": 35,
    "fraction": {
      "numerator": 2,
      "denominator": 5
    },
    "remainder": true
  },
  "question": {
    "answer": 21,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "21"
      ],
      "unit": "kratten"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `21`.
- Answer display: `"21 kratten"`.
- Contract type: `wholeNumber`.
- Units: `"kratten"`.

**Stored allowed forms:**

```json
[
  "21"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 21,
  "answerDisplay": "21 kratten",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "21"
    ],
    "unit": "kratten"
  }
}
```

### Surface: original

**Question**

Er moeten 35 kratten aan boord. Twee vijfde van de kratten is al ingeladen. Hoeveel kratten staan nog op de kade?

**Minnie**

Je zoekt de kratten die nog op de kade staan. Reken eerst uit hoeveel er al aan boord zijn: twee van vijf gelijke delen van 35.

**Moose**

35 : 5 = 7 kratten per deel. Twee delen zijn 2 × 7 = 14 kratten aan boord. Trek die 14 af van de 35 kratten.

**Full explanation**

Van de 35 kratten is ⅖ al aan boord. We zoeken de kratten die nog niet zijn ingeladen.

Eerst één vijfde: 35 : 5 = 7 kratten.

Twee vijfde is 2 × 7 = 14 kratten. Die zijn al aan boord.

Trek de ingeladen kratten van het totaal af: 35 − 14 = 21.

Er staan nog 21 kratten op de kade.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Van de 35 kratten is ⅖ al aan boord. We zoeken de kratten die nog niet zijn ingeladen.",
  "Eerst één vijfde: 35 : 5 = 7 kratten.",
  "Twee vijfde is 2 × 7 = 14 kratten. Die zijn al aan boord.",
  "Trek de ingeladen kratten van het totaal af: 35 − 14 = 21.",
  "Er staan nog 21 kratten op de kade."
]
```

### Visual stages

**Visual type:** `fractionStrip`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "totalLabel": "35 kratten samen",
  "segments": [
    {
      "selected": true
    },
    {
      "selected": true
    },
    {
      "selected": false
    },
    {
      "selected": false
    },
    {
      "selected": false
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 2,
      "label": "aan boord"
    },
    {
      "from": 2,
      "count": 3,
      "label": "nog op de kade"
    }
  ]
}
```

**Minnie stage**

```json
{
  "totalLabel": "35 kratten samen",
  "segments": [
    {
      "selected": true
    },
    {
      "selected": true
    },
    {
      "selected": false
    },
    {
      "selected": false
    },
    {
      "selected": false
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 2,
      "label": "aan boord"
    },
    {
      "from": 2,
      "count": 3,
      "label": "nog op de kade"
    }
  ],
  "focus": [
    0,
    1
  ]
}
```

**Moose stage**

```json
{
  "totalLabel": "35 kratten samen",
  "segments": [
    {
      "selected": true,
      "label": "7"
    },
    {
      "selected": true,
      "label": "7"
    },
    {
      "selected": false,
      "label": "7"
    },
    {
      "selected": false,
      "label": "7"
    },
    {
      "selected": false,
      "label": "7"
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 2,
      "label": "14"
    },
    {
      "from": 2,
      "count": 3,
      "label": "nog op de kade"
    }
  ]
}
```

**Explanation stage**

```json
{
  "totalLabel": "35 kratten samen",
  "segments": [
    {
      "selected": true,
      "label": "7"
    },
    {
      "selected": true,
      "label": "7"
    },
    {
      "selected": false,
      "label": "7"
    },
    {
      "selected": false,
      "label": "7"
    },
    {
      "selected": false,
      "label": "7"
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 2,
      "label": "14"
    },
    {
      "from": 2,
      "count": 3,
      "label": "21 kratten op de kade"
    }
  ]
}
```

**Explanation visual placement:**

```json
{
  "shared": 3
}
```

## RP-M6-BR-006 — Breuken · Resterende hoeveelheid berekenen

**Source:** original 24  
**Domain:** fractions  
**Objective:** Een breuk van een hoeveelheid berekenen en bepalen hoeveel overblijft.  
**Difficulty:** 3  
**Report label:** Breuken · Resterende hoeveelheid berekenen  
**Answer mode:** open  
**Visual/presentation:** fractionStrip / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "total": 40,
    "fraction": {
      "numerator": 3,
      "denominator": 8
    },
    "remainder": true
  },
  "question": {
    "answer": 25,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "25"
      ],
      "unit": "houtblokken"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `25`.
- Answer display: `"25 houtblokken"`.
- Contract type: `wholeNumber`.
- Units: `"houtblokken"`.

**Stored allowed forms:**

```json
[
  "25"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 25,
  "answerDisplay": "25 houtblokken",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "25"
    ],
    "unit": "houtblokken"
  }
}
```

### Surface: original

**Question**

Voor de vuurschaal liggen 40 houtblokken klaar. De tempelwachter gebruikt drie achtste van de houtblokken. Hoeveel houtblokken blijven over?

**Minnie**

Drie achtste betekent drie van acht gelijke delen. Zoek eerst hoeveel houtblokken worden gebruikt. Daarna kun je bepalen hoeveel er overblijven.

**Moose**

40 : 8 = 5 houtblokken per deel. Er worden 3 × 5 = 15 houtblokken gebruikt. Trek die 15 af van de 40 houtblokken.

**Full explanation**

De tempelwachter gebruikt ⅜ van de 40 houtblokken. We zoeken hoeveel houtblokken daarna overblijven.

Eerst één achtste: 40 : 8 = 5 houtblokken.

Drie achtste is 3 × 5 = 15 houtblokken. Die worden gebruikt.

Trek het gebruikte aantal van het totaal af: 40 − 15 = 25.

Er blijven 25 houtblokken over.

**Exact explanation step boundaries (runtime order):**

```json
[
  "De tempelwachter gebruikt ⅜ van de 40 houtblokken. We zoeken hoeveel houtblokken daarna overblijven.",
  "Eerst één achtste: 40 : 8 = 5 houtblokken.",
  "Drie achtste is 3 × 5 = 15 houtblokken. Die worden gebruikt.",
  "Trek het gebruikte aantal van het totaal af: 40 − 15 = 25.",
  "Er blijven 25 houtblokken over."
]
```

### Visual stages

**Visual type:** `fractionStrip`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "totalLabel": "40 houtblokken samen",
  "segments": [
    {
      "selected": true
    },
    {
      "selected": true
    },
    {
      "selected": true
    },
    {
      "selected": false
    },
    {
      "selected": false
    },
    {
      "selected": false
    },
    {
      "selected": false
    },
    {
      "selected": false
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 3,
      "label": "gebruikt"
    },
    {
      "from": 3,
      "count": 5,
      "label": "over"
    }
  ]
}
```

**Minnie stage**

```json
{
  "totalLabel": "40 houtblokken samen",
  "segments": [
    {
      "selected": true
    },
    {
      "selected": true
    },
    {
      "selected": true
    },
    {
      "selected": false
    },
    {
      "selected": false
    },
    {
      "selected": false
    },
    {
      "selected": false
    },
    {
      "selected": false
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 3,
      "label": "gebruikt"
    },
    {
      "from": 3,
      "count": 5,
      "label": "over"
    }
  ],
  "focus": [
    0,
    1,
    2
  ]
}
```

**Moose stage**

```json
{
  "totalLabel": "40 houtblokken samen",
  "segments": [
    {
      "selected": true,
      "label": "5"
    },
    {
      "selected": true
    },
    {
      "selected": true
    },
    {
      "selected": false
    },
    {
      "selected": false
    },
    {
      "selected": false
    },
    {
      "selected": false
    },
    {
      "selected": false
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 3,
      "label": "15"
    },
    {
      "from": 3,
      "count": 5,
      "label": "over"
    }
  ]
}
```

**Explanation stage**

```json
{
  "totalLabel": "40 houtblokken samen",
  "segments": [
    {
      "selected": true,
      "label": "5"
    },
    {
      "selected": true,
      "label": "5"
    },
    {
      "selected": true,
      "label": "5"
    },
    {
      "selected": false,
      "label": "5"
    },
    {
      "selected": false,
      "label": "5"
    },
    {
      "selected": false,
      "label": "5"
    },
    {
      "selected": false,
      "label": "5"
    },
    {
      "selected": false,
      "label": "5"
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 3,
      "label": "15"
    },
    {
      "from": 3,
      "count": 5,
      "label": "25 houtblokken over"
    }
  ]
}
```

**Explanation visual placement:**

```json
{
  "shared": 3
}
```

## RP-M6-OP-001 — Optellen · Honderdtallen en tientallen

**Source:** original 24  
**Domain:** addition-subtraction  
**Objective:** Honderdtallen en tientallen optellen zonder een tiental of honderdtal te overschrijden.  
**Difficulty:** 1  
**Report label:** Optellen · Honderdtallen en tientallen  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / bare  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "operation": "addition",
    "operands": [
      240,
      130
    ]
  },
  "question": {
    "answer": 370,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "370"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `370`.
- Answer display: `"370"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "370"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 370,
  "answerDisplay": "370",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "370"
    ]
  }
}
```

### Surface: original

**Question**

240 + 130 = ?

**Minnie**

Je hoeft 130 niet in één keer erbij te tellen. Splits 130 in 100 en 30. Begin met de 100.

**Moose**

240 + 100 = 340. Er moeten nog 30 bij. Dat zijn drie tientallen. Tel vanaf 340 drie keer 10 verder.

**Full explanation**

130 bestaat uit 100 en 30. We tellen die twee stukken na elkaar bij 240 op.

Eerst 100 erbij: 240 + 100 = 340.

Dan 30 erbij, in drie sprongen van 10: 340 → 350 → 360 → 370.

We hebben precies 130 toegevoegd: eerst 100 en daarna 30. Dus 240 + 130 = 370.

**Exact explanation step boundaries (runtime order):**

```json
[
  "130 bestaat uit 100 en 30. We tellen die twee stukken na elkaar bij 240 op.",
  "Eerst 100 erbij: 240 + 100 = 340.",
  "Dan 30 erbij, in drie sprongen van 10: 340 → 350 → 360 → 370.",
  "We hebben precies 130 toegevoegd: eerst 100 en daarna 30. Dus 240 + 130 = 370."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "130 = 100 + 30"
      ]
    },
    {
      "label": "",
      "nodes": [
        "+100",
        "+30"
      ],
      "jumps": [
        ""
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "130 = 100 + 30"
      ]
    },
    {
      "lines": [
        "240 + 100 = 340"
      ]
    },
    {
      "label": "+30",
      "nodes": [
        "340",
        "?",
        "?",
        "?"
      ],
      "jumps": [
        "+10",
        "+10",
        "+10"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "130 = 100 + 30"
      ]
    },
    {
      "lines": [
        "240 + 100 = 340"
      ]
    },
    {
      "label": "+30",
      "nodes": [
        "340",
        "350",
        "360",
        "370"
      ],
      "jumps": [
        "+10",
        "+10",
        "+10"
      ]
    },
    {
      "lines": [
        "240 + 130 = 370"
      ]
    }
  ]
}
```

**Explanation visual placement:**

```json
{
  "groups": [
    0,
    1,
    2,
    3
  ]
}
```

## RP-M6-OP-002 — Optellen · Honderdtallen en tientallen

**Source:** original 24  
**Domain:** addition-subtraction  
**Objective:** Een eenvoudige toevoegingssituatie vertalen naar optellen en het tweede getal opdelen in honderdtallen en tientallen.  
**Difficulty:** 1  
**Report label:** Optellen · Honderdtallen en tientallen  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "operation": "addition",
    "operands": [
      320,
      250
    ]
  },
  "question": {
    "answer": 570,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "570"
      ],
      "unit": "planken"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `570`.
- Answer display: `"570 planken"`.
- Contract type: `wholeNumber`.
- Units: `"planken"`.

**Stored allowed forms:**

```json
[
  "570"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 570,
  "answerDisplay": "570 planken",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "570"
    ],
    "unit": "planken"
  }
}
```

### Surface: original

**Question**

Op de kade liggen 320 planken. Een schip brengt nog 250 planken. Hoeveel planken liggen er nu op de kade?

**Minnie**

Er komen planken bij, dus je telt op. Je hoeft 250 niet in één keer erbij te doen: splits het in 200 en 50.

**Moose**

320 + 200 = 520. Van de 250 nieuwe planken zijn er nu 200 meegeteld. Tel de laatste 50 erbij.

**Full explanation**

We zoeken hoeveel planken er samen liggen. Daarom rekenen we 320 + 250.

Verdeel de 250 nieuwe planken in 200 en 50.

Tel eerst 200 erbij: 320 + 200 = 520.

Tel daarna de laatste 50 erbij: 520 + 50 = 570.

Er liggen nu 570 planken op de kade.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We zoeken hoeveel planken er samen liggen. Daarom rekenen we 320 + 250.",
  "Verdeel de 250 nieuwe planken in 200 en 50.",
  "Tel eerst 200 erbij: 320 + 200 = 520.",
  "Tel daarna de laatste 50 erbij: 520 + 50 = 570.",
  "Er liggen nu 570 planken op de kade."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "label": "nieuwe planken",
      "lines": [
        "250 = 200 + 50"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "250 = 200 + 50"
      ]
    },
    {
      "lines": [
        "320 + 200 = 520"
      ]
    },
    {
      "lines": [
        "520 + 50 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "250 = 200 + 50"
      ]
    },
    {
      "lines": [
        "320 + 200 = 520"
      ]
    },
    {
      "lines": [
        "520 + 50 = 570"
      ]
    },
    {
      "lines": [
        "570 planken samen"
      ]
    }
  ]
}
```

**Explanation visual placement:**

```json
{
  "groups": [
    1,
    2,
    3,
    4
  ]
}
```

## RP-M6-OP-003 — Optellen · Over een tiental of honderdtal

**Source:** original 24  
**Domain:** addition-subtraction  
**Objective:** Een driecijferig getal optellen door het tweede getal te splitsen en bij een deelsprong het volgende honderdtal te passeren.  
**Difficulty:** 2  
**Report label:** Optellen · Over een tiental of honderdtal  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / bare  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "operation": "addition",
    "operands": [
      368,
      247
    ]
  },
  "question": {
    "answer": 615,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "615"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `615`.
- Answer display: `"615"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "615"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 615,
  "answerDisplay": "615",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "615"
    ]
  }
}
```

### Surface: original

**Question**

368 + 247 = ?

**Minnie**

Je kunt 247 opdelen in 200, 40 en 7. Tel die stukken één voor één bij 368 op.

**Moose**

368 + 200 = 568. Tel 40 erbij in vier sprongen van 10: 578, 588, 598, 608. Tel nu nog de laatste 7 erbij.

**Full explanation**

We splitsen 247 in 200, 40 en 7. Zo tellen we steeds één stuk erbij.

Eerst 200 erbij: 368 + 200 = 568.

Dan 40 erbij. Dat zijn vier tientallen: 568 → 578 → 588 → 598 → 608.

Nu nog 7. Van 608 naar 610 is 2. Van de 7 blijven dan nog 5 over: 610 + 5 = 615.

We hebben alle stukken van 247 toegevoegd. Dus 368 + 247 = 615.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen 247 in 200, 40 en 7. Zo tellen we steeds één stuk erbij.",
  "Eerst 200 erbij: 368 + 200 = 568.",
  "Dan 40 erbij. Dat zijn vier tientallen: 568 → 578 → 588 → 598 → 608.",
  "Nu nog 7. Van 608 naar 610 is 2. Van de 7 blijven dan nog 5 over: 610 + 5 = 615.",
  "We hebben alle stukken van 247 toegevoegd. Dus 368 + 247 = 615."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "247 = 200 + 40 + 7"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "247 = 200 + 40 + 7"
      ]
    },
    {
      "lines": [
        "368 + 200 = 568"
      ]
    },
    {
      "label": "+40",
      "nodes": [
        "568",
        "578",
        "588",
        "598",
        "608"
      ],
      "jumps": [
        "+10",
        "+10",
        "+10",
        "+10"
      ]
    },
    {
      "lines": [
        "608 + 7 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "247 = 200 + 40 + 7"
      ]
    },
    {
      "lines": [
        "368 + 200 = 568"
      ]
    },
    {
      "label": "+40",
      "nodes": [
        "568",
        "578",
        "588",
        "598",
        "608"
      ],
      "jumps": [
        "+10",
        "+10",
        "+10",
        "+10"
      ]
    },
    {
      "label": "+7",
      "lines": [
        "608 + 2 = 610",
        "610 + 5 = 615"
      ]
    },
    {
      "lines": [
        "368 + 247 = 615"
      ]
    }
  ]
}
```

**Explanation visual placement:**

```json
{
  "groups": [
    0,
    1,
    2,
    3,
    4
  ]
}
```

## RP-M6-OP-004 — Optellen · Over een tiental of honderdtal

**Source:** original 24  
**Domain:** addition-subtraction  
**Objective:** Een driecijferige optelsom oplossen met afzonderlijke stappen over een honderdtal en een tiental.  
**Difficulty:** 2  
**Report label:** Optellen · Over een tiental of honderdtal  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "operation": "addition",
    "operands": [
      475,
      168
    ]
  },
  "question": {
    "answer": 643,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "643"
      ],
      "unit": "spijkers"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `643`.
- Answer display: `"643 spijkers"`.
- Contract type: `wholeNumber`.
- Units: `"spijkers"`.

**Stored allowed forms:**

```json
[
  "643"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 643,
  "answerDisplay": "643 spijkers",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "643"
    ],
    "unit": "spijkers"
  }
}
```

### Surface: original

**Question**

De scheepsbouwer heeft 475 spijkers. Hij krijgt er nog 168 bij. Hoeveel spijkers heeft hij nu?

**Minnie**

Je telt de spijkers bij elkaar op. Splits de 168 nieuwe spijkers in 100, 60 en 8.

**Moose**

475 + 100 = 575. Met 60 erbij kom je op 635. Nu nog 8: tel eerst 5 tot 640 en daarna de overige 3.

**Full explanation**

Er komen 168 spijkers bij. We delen 168 op in 100, 60 en 8.

Tel eerst 100 erbij: 475 + 100 = 575.

Tel dan 60 erbij. Dat zijn zes tientallen: 575 → 585 → 595 → 605 → 615 → 625 → 635.

Nu de laatste 8. Tel eerst 5 tot 640 en daarna nog 3: 635 + 5 = 640 en 640 + 3 = 643.

De scheepsbouwer heeft nu 643 spijkers.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Er komen 168 spijkers bij. We delen 168 op in 100, 60 en 8.",
  "Tel eerst 100 erbij: 475 + 100 = 575.",
  "Tel dan 60 erbij. Dat zijn zes tientallen: 575 → 585 → 595 → 605 → 615 → 625 → 635.",
  "Nu de laatste 8. Tel eerst 5 tot 640 en daarna nog 3: 635 + 5 = 640 en 640 + 3 = 643.",
  "De scheepsbouwer heeft nu 643 spijkers."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "168 = 100 + 60 + 8"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "168 = 100 + 60 + 8"
      ]
    },
    {
      "lines": [
        "475 + 100 = 575"
      ]
    },
    {
      "lines": [
        "575 + 60 = 635"
      ]
    },
    {
      "label": "+8 = +5 +3",
      "lines": [
        "635 + 5 = 640",
        "640 + 3 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "168 = 100 + 60 + 8"
      ]
    },
    {
      "lines": [
        "475 + 100 = 575"
      ]
    },
    {
      "label": "+60",
      "nodes": [
        "575",
        "585",
        "595",
        "605",
        "615",
        "625",
        "635"
      ],
      "jumps": [
        "+10",
        "+10",
        "+10",
        "+10",
        "+10",
        "+10"
      ]
    },
    {
      "label": "+8",
      "lines": [
        "635 + 5 = 640",
        "640 + 3 = 643"
      ]
    }
  ]
}
```

**Explanation visual placement:**

```json
{
  "groups": [
    0,
    1,
    2,
    3
  ]
}
```

## RP-M6-OP-005 — Optellen · Duizendtallen en overschrijdingen

**Source:** original 24  
**Domain:** addition-subtraction  
**Objective:** Een viercijferig en driecijferig getal optellen, met stappen voorbij een duizendtal en een honderdtal.  
**Difficulty:** 3  
**Report label:** Optellen · Duizendtallen en overschrijdingen  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / bare  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "operation": "addition",
    "operands": [
      1475,
      638
    ]
  },
  "question": {
    "answer": 2113,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "2113",
        "2.113",
        "2 113"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `2113`.
- Answer display: `"2.113"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "2113",
  "2.113",
  "2 113"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 2113,
  "answerDisplay": "2.113",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "2113",
      "2.113",
      "2 113"
    ]
  }
}
```

### Surface: original

**Question**

1.475 + 638 = ?

**Minnie**

Je hoeft 638 niet in één keer toe te voegen. Splits 638 in 600, 30 en 8 en begin met de 600.

**Moose**

Reken eerst 1.475 + 500 = 1.975 en tel nog 100 erbij: 2.075. Daarmee heb je 600 toegevoegd. Tel nu nog 30 en 8 erbij.

**Full explanation**

We splitsen 638 in 600, 30 en 8.

Voeg 600 toe in twee sprongen: 1.475 + 500 = 1.975 en 1.975 + 100 = 2.075. Die 500 en 100 zijn samen 600.

Dan 30 erbij: 2.075 + 30 = 2.105. Je telt daarbij verder voorbij 2.100.

Ten slotte 8 erbij: 2.105 + 8 = 2.113.

We hebben alle 638 toegevoegd. Dus 1.475 + 638 = 2.113.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen 638 in 600, 30 en 8.",
  "Voeg 600 toe in twee sprongen: 1.475 + 500 = 1.975 en 1.975 + 100 = 2.075. Die 500 en 100 zijn samen 600.",
  "Dan 30 erbij: 2.075 + 30 = 2.105. Je telt daarbij verder voorbij 2.100.",
  "Ten slotte 8 erbij: 2.105 + 8 = 2.113.",
  "We hebben alle 638 toegevoegd. Dus 1.475 + 638 = 2.113."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "label": "+600",
      "lines": [
        "638 = 600 + 30 + 8"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "638 = 600 + 30 + 8"
      ]
    },
    {
      "label": "+600",
      "lines": [
        "600 = 500 + 100",
        "1.475 + 500 = 1.975",
        "1.975 + 100 = 2.075"
      ]
    },
    {
      "lines": [
        "2.075 + 30 = ?"
      ]
    },
    {
      "lines": [
        "Daarna nog +8"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "638 = 600 + 30 + 8"
      ]
    },
    {
      "label": "+600",
      "lines": [
        "600 = 500 + 100",
        "1.475 + 500 = 1.975",
        "1.975 + 100 = 2.075"
      ]
    },
    {
      "lines": [
        "2.075 + 30 = 2.105"
      ]
    },
    {
      "lines": [
        "2.105 + 8 = 2.113"
      ]
    },
    {
      "lines": [
        "1.475 + 638 = 2.113"
      ]
    }
  ]
}
```

**Explanation visual placement:**

```json
{
  "groups": [
    0,
    1,
    2,
    3,
    4
  ]
}
```

## RP-M6-OP-006 — Optellen · Duizendtallen en overschrijdingen

**Source:** original 24  
**Domain:** addition-subtraction  
**Objective:** Een toevoegingssituatie met duizendtallen oplossen door het tweede getal te splitsen en het totaal over getalgrenzen heen bij te houden.  
**Difficulty:** 3  
**Report label:** Optellen · Duizendtallen en overschrijdingen  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "operation": "addition",
    "operands": [
      2687,
      756
    ]
  },
  "question": {
    "answer": 3443,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "3443",
        "3.443",
        "3 443"
      ],
      "unit": "stenen"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `3443`.
- Answer display: `"3.443 stenen"`.
- Contract type: `wholeNumber`.
- Units: `"stenen"`.

**Stored allowed forms:**

```json
[
  "3443",
  "3.443",
  "3 443"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 3443,
  "answerDisplay": "3.443 stenen",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "3443",
      "3.443",
      "3 443"
    ],
    "unit": "stenen"
  }
}
```

### Surface: original

**Question**

Voor de tempel zijn al 2.687 stenen geleverd. Er komen nog 756 stenen bij. Hoeveel stenen zijn er dan in totaal geleverd?

**Minnie**

Je telt de nieuwe stenen bij de al geleverde stenen op. Verdeel 756 in 700, 50 en 6.

**Moose**

2.687 + 700 = 3.387. Met 50 erbij kom je op 3.437. Je moet nog 6 erbij tellen. Ga eerst 3 verder tot 3.440 en tel daarna de laatste 3 erbij.

**Full explanation**

We tellen de 756 nieuwe stenen bij 2.687 op. Splits 756 in 700, 50 en 6.

Eerst 700 erbij: 2.687 + 700 = 3.387. Zevenhonderd erbij brengt je dus voorbij 3.000.

Daarna 50 erbij: 3.387 + 50 = 3.437.

Nu nog 6. Van 3.437 naar 3.440 is 3. Tel daarna de laatste 3 erbij: 3.440 + 3 = 3.443.

Er zijn in totaal 3.443 stenen geleverd.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We tellen de 756 nieuwe stenen bij 2.687 op. Splits 756 in 700, 50 en 6.",
  "Eerst 700 erbij: 2.687 + 700 = 3.387. Zevenhonderd erbij brengt je dus voorbij 3.000.",
  "Daarna 50 erbij: 3.387 + 50 = 3.437.",
  "Nu nog 6. Van 3.437 naar 3.440 is 3. Tel daarna de laatste 3 erbij: 3.440 + 3 = 3.443.",
  "Er zijn in totaal 3.443 stenen geleverd."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "756 = 700 + 50 + 6"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "756 = 700 + 50 + 6"
      ]
    },
    {
      "lines": [
        "2.687 + 700 = 3.387"
      ]
    },
    {
      "lines": [
        "3.387 + 50 = 3.437"
      ]
    },
    {
      "label": "+6",
      "lines": [
        "3.437 + 3 = 3.440",
        "3.440 + 3 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "756 = 700 + 50 + 6"
      ]
    },
    {
      "lines": [
        "2.687 + 700 = 3.387"
      ]
    },
    {
      "lines": [
        "3.387 + 50 = 3.437"
      ]
    },
    {
      "label": "+6",
      "lines": [
        "3.437 + 3 = 3.440",
        "3.440 + 3 = 3.443"
      ]
    },
    {
      "lines": [
        "3.443 stenen"
      ]
    }
  ]
}
```

**Explanation visual placement:**

```json
{
  "groups": [
    0,
    1,
    2,
    3,
    4
  ]
}
```

## RP-M6-GE-001 — Geld · Aanvullen tot de volgende euro

**Source:** original 24  
**Domain:** money  
**Objective:** Wisselgeld bepalen door een prijs met halve euro’s aan te vullen tot de volgende hele euro.  
**Difficulty:** 1  
**Report label:** Geld · Aanvullen tot de volgende euro  
**Answer mode:** open  
**Visual/presentation:** moneyReceipt / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "pricesCents": [
      150
    ],
    "paidCents": 200
  },
  "question": {
    "answer": 50,
    "answerSpec": {
      "type": "euro",
      "allowedForms": [
        "0,50",
        "0,5",
        "0.50",
        "0.5"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `50`.
- Answer display: `"€0,50"`.
- Contract type: `euro`.
- Units: integer cents (displayed as euro amounts).

**Stored allowed forms (legacy metadata; structured input is used):**

```json
[
  "0,50",
  "0,5",
  "0.50",
  "0.5"
]
```

**Accepted input:** structured digit fields `euros` and `cents`, using the rule above. Correct when canonical cents equal 50.

**Exact resolved answer contract:**

```json
{
  "answer": 50,
  "answerDisplay": "€0,50",
  "answerMode": "open",
  "answerSpec": {
    "type": "euro",
    "allowedForms": [
      "0,50",
      "0,5",
      "0.50",
      "0.5"
    ]
  }
}
```

### Surface: original

**Question**

Een kaartje met een Vikingtekening kost €1,50. Je betaalt met €2. Hoeveel geld krijg je terug?

**Minnie**

Wisselgeld is het bedrag dat je terugkrijgt omdat je meer betaalt dan iets kost. Vul de prijs van €1,50 aan tot €2.

**Moose**

€1,50 is 1 euro en 50 cent. Een hele euro is 100 cent. Hoeveel cent moet er bij die 50 cent om bij €2 te komen? Reken 100 − 50.

**Full explanation**

Je betaalt meer dan de prijs. Het verschil tussen €1,50 en €2 krijg je terug.

Vul €1,50 aan tot €2. Daarvoor vul je de 50 cent aan tot een hele euro van 100 cent.

Er moet 100 − 50 = 50 cent bij.

50 cent schrijf je als €0,50. Je krijgt dus €0,50 terug.

Controle: €1,50 + €0,50 = €2,00. De prijs en het wisselgeld zijn samen precies wat je betaalde.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Je betaalt meer dan de prijs. Het verschil tussen €1,50 en €2 krijg je terug.",
  "Vul €1,50 aan tot €2. Daarvoor vul je de 50 cent aan tot een hele euro van 100 cent.",
  "Er moet 100 − 50 = 50 cent bij.",
  "50 cent schrijf je als €0,50. Je krijgt dus €0,50 terug.",
  "Controle: €1,50 + €0,50 = €2,00. De prijs en het wisselgeld zijn samen precies wat je betaalde."
]
```

### Visual stages

**Visual type:** `moneyReceipt`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "items": [
    {
      "label": "Vikingkaartje",
      "amount": "€1,50"
    }
  ],
  "paid": "€2,00"
}
```

**Minnie stage**

```json
{
  "items": [
    {
      "label": "Vikingkaartje",
      "amount": "€1,50"
    }
  ],
  "paid": "€2,00",
  "groups": [
    {
      "label": "prijs → betaald",
      "nodes": [
        "€1,50",
        "€2,00"
      ],
      "jumps": [
        "+ ?"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "items": [
    {
      "label": "Vikingkaartje",
      "amount": "€1,50"
    }
  ],
  "paid": "€2,00",
  "groups": [
    {
      "label": "prijs → betaald",
      "nodes": [
        "€1,50",
        "€2,00"
      ],
      "jumps": [
        "+ ?"
      ]
    },
    {
      "lines": [
        "1 euro = 100 cent"
      ]
    },
    {
      "lines": [
        "100 − 50 = ? cent"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "items": [
    {
      "label": "Vikingkaartje",
      "amount": "€1,50"
    }
  ],
  "paid": "€2,00",
  "groups": [
    {
      "label": "prijs → betaald",
      "nodes": [
        "€1,50",
        "€2,00"
      ],
      "jumps": [
        "+ 50 cent"
      ]
    },
    {
      "lines": [
        "50 cent = €0,50"
      ]
    },
    {
      "lines": [
        "€1,50 + €0,50 = €2,00"
      ]
    }
  ]
}
```

**Explanation visual placement:**

```json
{
  "receipt": 0,
  "groups": [
    2,
    3,
    4
  ]
}
```

## RP-M6-GE-002 — Geld · Aanvullen tot de volgende euro

**Source:** original 24  
**Domain:** money  
**Objective:** Wisselgeld in tientallen centen bepalen door aan te vullen tot de volgende hele euro.  
**Difficulty:** 1  
**Report label:** Geld · Aanvullen tot de volgende euro  
**Answer mode:** open  
**Visual/presentation:** moneyReceipt / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "pricesCents": [
      320
    ],
    "paidCents": 400
  },
  "question": {
    "answer": 80,
    "answerSpec": {
      "type": "euro",
      "allowedForms": [
        "0,80",
        "0,8",
        "0.80",
        "0.8"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `80`.
- Answer display: `"€0,80"`.
- Contract type: `euro`.
- Units: integer cents (displayed as euro amounts).

**Stored allowed forms (legacy metadata; structured input is used):**

```json
[
  "0,80",
  "0,8",
  "0.80",
  "0.8"
]
```

**Accepted input:** structured digit fields `euros` and `cents`, using the rule above. Correct when canonical cents equal 80.

**Exact resolved answer contract:**

```json
{
  "answer": 80,
  "answerDisplay": "€0,80",
  "answerMode": "open",
  "answerSpec": {
    "type": "euro",
    "allowedForms": [
      "0,80",
      "0,8",
      "0.80",
      "0.8"
    ]
  }
}
```

### Surface: original

**Question**

Een vel runenstickers kost €3,20. Je betaalt met €4. Hoeveel geld krijg je terug?

**Minnie**

Wisselgeld vind je door de prijs aan te vullen tot wat je betaalt. Vul €3,20 aan tot €4.

**Moose**

€3,20 is 3 euro en 20 cent. Om bij €4 te komen, vul je de 20 cent aan tot een hele euro van 100 cent. Reken 100 − 20.

**Full explanation**

We zoeken het verschil tussen de prijs van €3,20 en de betaling van €4.

Vul de 20 cent aan tot een hele euro van 100 cent: 100 − 20 = 80 cent. Zo kom je van €3,20 bij €4.

80 cent schrijf je als €0,80. Je krijgt dus €0,80 terug.

Controle: €3,20 + €0,80 = €4,00.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We zoeken het verschil tussen de prijs van €3,20 en de betaling van €4.",
  "Vul de 20 cent aan tot een hele euro van 100 cent: 100 − 20 = 80 cent. Zo kom je van €3,20 bij €4.",
  "80 cent schrijf je als €0,80. Je krijgt dus €0,80 terug.",
  "Controle: €3,20 + €0,80 = €4,00."
]
```

### Visual stages

**Visual type:** `moneyReceipt`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "items": [
    {
      "label": "Runenstickers",
      "amount": "€3,20"
    }
  ],
  "paid": "€4,00"
}
```

**Minnie stage**

```json
{
  "items": [
    {
      "label": "Runenstickers",
      "amount": "€3,20"
    }
  ],
  "paid": "€4,00",
  "groups": [
    {
      "label": "prijs → betaald",
      "nodes": [
        "€3,20",
        "€4,00"
      ],
      "jumps": [
        "+ ?"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "items": [
    {
      "label": "Runenstickers",
      "amount": "€3,20"
    }
  ],
  "paid": "€4,00",
  "groups": [
    {
      "label": "prijs → betaald",
      "nodes": [
        "€3,20",
        "€4,00"
      ],
      "jumps": [
        "+ ?"
      ]
    },
    {
      "lines": [
        "1 euro = 100 cent"
      ]
    },
    {
      "lines": [
        "100 − 20 = ? cent"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "items": [
    {
      "label": "Runenstickers",
      "amount": "€3,20"
    }
  ],
  "paid": "€4,00",
  "groups": [
    {
      "label": "prijs → betaald",
      "nodes": [
        "€3,20",
        "€4,00"
      ],
      "jumps": [
        "+ 80 cent"
      ]
    },
    {
      "lines": [
        "80 cent = €0,80"
      ]
    },
    {
      "lines": [
        "€3,20 + €0,80 = €4,00"
      ]
    }
  ]
}
```

**Explanation visual placement:**

```json
{
  "receipt": 0,
  "groups": [
    1,
    2,
    3
  ]
}
```

## RP-M6-GE-003 — Geld · Wisselgeld met euro’s en centen

**Source:** original 24  
**Domain:** money  
**Objective:** Wisselgeld bepalen in twee stukken: centen tot de volgende hele euro en daarna hele euro’s tot het betaalde bedrag.  
**Difficulty:** 2  
**Report label:** Geld · Wisselgeld met euro’s en centen  
**Answer mode:** open  
**Visual/presentation:** moneyReceipt / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "pricesCents": [
      675
    ],
    "paidCents": 1000
  },
  "question": {
    "answer": 325,
    "answerSpec": {
      "type": "euro",
      "allowedForms": [
        "3,25",
        "3.25"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `325`.
- Answer display: `"€3,25"`.
- Contract type: `euro`.
- Units: integer cents (displayed as euro amounts).

**Stored allowed forms (legacy metadata; structured input is used):**

```json
[
  "3,25",
  "3.25"
]
```

**Accepted input:** structured digit fields `euros` and `cents`, using the rule above. Correct when canonical cents equal 325.

**Exact resolved answer contract:**

```json
{
  "answer": 325,
  "answerDisplay": "€3,25",
  "answerMode": "open",
  "answerSpec": {
    "type": "euro",
    "allowedForms": [
      "3,25",
      "3.25"
    ]
  }
}
```

### Surface: original

**Question**

Een klein Vikingschip als souvenir kost €6,75. Je betaalt met €10. Hoeveel geld krijg je terug?

**Minnie**

Vul €6,75 eerst aan tot €7 en daarna tot €10. Alles wat je erbij telt, is samen je wisselgeld.

**Moose**

Van €6,75 naar €7 is 25 cent, want 75 + 25 = 100. Reken nu hoeveel euro er nog bij moet van €7 tot €10 en tel beide stukken samen.

**Full explanation**

We vullen de prijs van €6,75 aan tot de betaling van €10. De bedragen die we erbij tellen, vormen samen het wisselgeld.

Eerst naar €7: 100 − 75 = 25 cent. Dus €6,75 + €0,25 = €7,00.

Daarna van €7 naar €10: €10 − €7 = €3.

Samen is dat 3 euro en 25 cent: €3 + €0,25 = €3,25.

Je krijgt €3,25 terug. Controle: €6,75 + €3,25 = €10,00.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We vullen de prijs van €6,75 aan tot de betaling van €10. De bedragen die we erbij tellen, vormen samen het wisselgeld.",
  "Eerst naar €7: 100 − 75 = 25 cent. Dus €6,75 + €0,25 = €7,00.",
  "Daarna van €7 naar €10: €10 − €7 = €3.",
  "Samen is dat 3 euro en 25 cent: €3 + €0,25 = €3,25.",
  "Je krijgt €3,25 terug. Controle: €6,75 + €3,25 = €10,00."
]
```

### Visual stages

**Visual type:** `moneyReceipt`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "items": [
    {
      "label": "Vikingschip",
      "amount": "€6,75"
    }
  ],
  "paid": "€10,00"
}
```

**Minnie stage**

```json
{
  "items": [
    {
      "label": "Vikingschip",
      "amount": "€6,75"
    }
  ],
  "paid": "€10,00",
  "groups": [
    {
      "label": "",
      "nodes": [
        "€6,75",
        "€7,00",
        "€10,00"
      ],
      "jumps": [
        "+ ?",
        "+ ?"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "items": [
    {
      "label": "Vikingschip",
      "amount": "€6,75"
    }
  ],
  "paid": "€10,00",
  "groups": [
    {
      "label": "",
      "nodes": [
        "€6,75",
        "€7,00",
        "€10,00"
      ],
      "jumps": [
        "+ €0,25",
        "+ ? euro"
      ]
    },
    {
      "lines": [
        "Wisselgeld = beide sprongen samen"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "items": [
    {
      "label": "Vikingschip",
      "amount": "€6,75"
    }
  ],
  "paid": "€10,00",
  "groups": [
    {
      "label": "",
      "nodes": [
        "€6,75",
        "€7,00",
        "€10,00"
      ],
      "jumps": [
        "+ €0,25",
        "+ €3"
      ]
    },
    {
      "lines": [
        "€0,25 + €3 = €3,25"
      ]
    },
    {
      "lines": [
        "€6,75 + €3,25 = €10,00"
      ]
    }
  ]
}
```

**Explanation visual placement:**

```json
{
  "receipt": 0,
  "groups": [
    2,
    3,
    4
  ]
}
```

## RP-M6-GE-004 — Geld · Wisselgeld met euro’s en centen

**Source:** original 24  
**Domain:** money  
**Objective:** Wisselgeld met euro’s en centen berekenen door via de volgende hele euro aan te vullen.  
**Difficulty:** 2  
**Report label:** Geld · Wisselgeld met euro’s en centen  
**Answer mode:** open  
**Visual/presentation:** moneyReceipt / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "pricesCents": [
      1240
    ],
    "paidCents": 2000
  },
  "question": {
    "answer": 760,
    "answerSpec": {
      "type": "euro",
      "allowedForms": [
        "7,60",
        "7,6",
        "7.60",
        "7.6"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `760`.
- Answer display: `"€7,60"`.
- Contract type: `euro`.
- Units: integer cents (displayed as euro amounts).

**Stored allowed forms (legacy metadata; structured input is used):**

```json
[
  "7,60",
  "7,6",
  "7.60",
  "7.6"
]
```

**Accepted input:** structured digit fields `euros` and `cents`, using the rule above. Correct when canonical cents equal 760.

**Exact resolved answer contract:**

```json
{
  "answer": 760,
  "answerDisplay": "€7,60",
  "answerMode": "open",
  "answerSpec": {
    "type": "euro",
    "allowedForms": [
      "7,60",
      "7,6",
      "7.60",
      "7.6"
    ]
  }
}
```

### Surface: original

**Question**

Een kaartje voor een boottocht kost €12,40. Je betaalt met €20. Hoeveel geld krijg je terug?

**Minnie**

Vul €12,40 eerst aan tot €13 en daarna tot €20. Tel de twee bedragen die erbij moeten bij elkaar op.

**Moose**

Van €12,40 naar €13 is 60 cent: 40 + 60 = 100. Reken nu het verschil tussen €13 en €20. Die euro’s en de 60 cent krijg je samen terug.

**Full explanation**

Je krijgt het verschil tussen €12,40 en €20 terug. We rekenen eerst tot €13 en daarna tot €20.

Van €12,40 naar €13 is 100 − 40 = 60 cent. Dat is €0,60.

Van €13 naar €20 is €20 − €13 = €7.

Tel de twee stukken samen: €7 + €0,60 = €7,60.

Je krijgt €7,60 terug. Controle: €12,40 + €7,60 = €20,00.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Je krijgt het verschil tussen €12,40 en €20 terug. We rekenen eerst tot €13 en daarna tot €20.",
  "Van €12,40 naar €13 is 100 − 40 = 60 cent. Dat is €0,60.",
  "Van €13 naar €20 is €20 − €13 = €7.",
  "Tel de twee stukken samen: €7 + €0,60 = €7,60.",
  "Je krijgt €7,60 terug. Controle: €12,40 + €7,60 = €20,00."
]
```

### Visual stages

**Visual type:** `moneyReceipt`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "items": [
    {
      "label": "Boottocht",
      "amount": "€12,40"
    }
  ],
  "paid": "€20,00"
}
```

**Minnie stage**

```json
{
  "items": [
    {
      "label": "Boottocht",
      "amount": "€12,40"
    }
  ],
  "paid": "€20,00",
  "groups": [
    {
      "label": "",
      "nodes": [
        "€12,40",
        "€13,00",
        "€20,00"
      ],
      "jumps": [
        "+ ?",
        "+ ?"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "items": [
    {
      "label": "Boottocht",
      "amount": "€12,40"
    }
  ],
  "paid": "€20,00",
  "groups": [
    {
      "label": "",
      "nodes": [
        "€12,40",
        "€13,00",
        "€20,00"
      ],
      "jumps": [
        "+ €0,60",
        "+ ? euro"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "items": [
    {
      "label": "Boottocht",
      "amount": "€12,40"
    }
  ],
  "paid": "€20,00",
  "groups": [
    {
      "label": "",
      "nodes": [
        "€12,40",
        "€13,00",
        "€20,00"
      ],
      "jumps": [
        "+ €0,60",
        "+ €7"
      ]
    },
    {
      "lines": [
        "€0,60 + €7 = €7,60"
      ]
    },
    {
      "lines": [
        "€12,40 + €7,60 = €20,00"
      ]
    }
  ]
}
```

**Explanation visual placement:**

```json
{
  "receipt": 0,
  "groups": [
    2,
    3,
    4
  ]
}
```

## RP-M6-GE-005 — Geld · Twee aankopen en wisselgeld

**Source:** original 24  
**Domain:** money  
**Objective:** Twee prijzen met centen optellen en vervolgens het wisselgeld bepalen.  
**Difficulty:** 3  
**Report label:** Geld · Twee aankopen en wisselgeld  
**Answer mode:** open  
**Visual/presentation:** moneyReceipt / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "pricesCents": [
      475,
      350
    ],
    "paidCents": 1000
  },
  "question": {
    "answer": 175,
    "answerSpec": {
      "type": "euro",
      "allowedForms": [
        "1,75",
        "1.75"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `175`.
- Answer display: `"€1,75"`.
- Contract type: `euro`.
- Units: integer cents (displayed as euro amounts).

**Stored allowed forms (legacy metadata; structured input is used):**

```json
[
  "1,75",
  "1.75"
]
```

**Accepted input:** structured digit fields `euros` and `cents`, using the rule above. Correct when canonical cents equal 175.

**Exact resolved answer contract:**

```json
{
  "answer": 175,
  "answerDisplay": "€1,75",
  "answerMode": "open",
  "answerSpec": {
    "type": "euro",
    "allowedForms": [
      "1,75",
      "1.75"
    ]
  }
}
```

### Surface: original

**Question**

Je koopt een boekje over Vikingen voor €4,75 en een vel runenstickers voor €3,50. Je betaalt met €10. Hoeveel geld krijg je terug?

**Minnie**

Je koopt twee dingen. Tel eerst de twee prijzen op. Vul het totaal daarna aan tot de €10 waarmee je betaalt.

**Moose**

€4,75 + €3,50 = €8,25. Van €8,25 naar €9 is 75 cent. Reken nu hoeveel er nog bij moet tot €10 en tel dat bij die 75 cent.

**Full explanation**

Eerst zoeken we wat het boekje en de stickers samen kosten. Pas daarna rekenen we het wisselgeld uit.

Tel bij €4,75 eerst de 3 euro van €3,50 op: €4,75 + €3 = €7,75.

Nu nog 50 cent. Met 25 cent erbij kom je op €8. Met de andere 25 cent erbij kom je op €8,25. De twee aankopen kosten samen €8,25.

Vul €8,25 aan tot €9: dat is 75 cent. Van €9 tot €10 moet er nog €1 bij.

Het wisselgeld is €0,75 + €1 = €1,75. Je krijgt dus €1,75 terug.

Controle: de totale prijs van €8,25 en het wisselgeld van €1,75 zijn samen €10,00.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Eerst zoeken we wat het boekje en de stickers samen kosten. Pas daarna rekenen we het wisselgeld uit.",
  "Tel bij €4,75 eerst de 3 euro van €3,50 op: €4,75 + €3 = €7,75.",
  "Nu nog 50 cent. Met 25 cent erbij kom je op €8. Met de andere 25 cent erbij kom je op €8,25. De twee aankopen kosten samen €8,25.",
  "Vul €8,25 aan tot €9: dat is 75 cent. Van €9 tot €10 moet er nog €1 bij.",
  "Het wisselgeld is €0,75 + €1 = €1,75. Je krijgt dus €1,75 terug.",
  "Controle: de totale prijs van €8,25 en het wisselgeld van €1,75 zijn samen €10,00."
]
```

### Visual stages

**Visual type:** `moneyReceipt`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "items": [
    {
      "label": "Boekje",
      "amount": "€4,75"
    },
    {
      "label": "Runenstickers",
      "amount": "€3,50"
    }
  ],
  "paid": "€10,00"
}
```

**Minnie stage**

```json
{
  "items": [
    {
      "label": "Boekje",
      "amount": "€4,75"
    },
    {
      "label": "Runenstickers",
      "amount": "€3,50"
    }
  ],
  "paid": "€10,00",
  "groups": [
    {
      "lines": [
        "1. Samen: €4,75 + €3,50 = ?"
      ]
    },
    {
      "lines": [
        "2. Vul het totaal aan tot €10"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "items": [
    {
      "label": "Boekje",
      "amount": "€4,75"
    },
    {
      "label": "Runenstickers",
      "amount": "€3,50"
    }
  ],
  "paid": "€10,00",
  "groups": [
    {
      "label": "Samen",
      "lines": [
        "€4,75 + €3,50 = €8,25"
      ]
    },
    {
      "label": "Wisselgeld",
      "nodes": [
        "€8,25",
        "€9,00",
        "€10,00"
      ],
      "jumps": [
        "+ €0,75",
        "+ ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "items": [
    {
      "label": "Boekje",
      "amount": "€4,75"
    },
    {
      "label": "Runenstickers",
      "amount": "€3,50"
    }
  ],
  "paid": "€10,00",
  "groups": [
    {
      "label": "Samen",
      "lines": [
        "€4,75 + €3 = €7,75"
      ]
    },
    {
      "label": "+€0,50",
      "nodes": [
        "€7,75",
        "€8,00",
        "€8,25"
      ],
      "jumps": [
        "+€0,25",
        "+€0,25"
      ]
    },
    {
      "label": "Wisselgeld",
      "nodes": [
        "€8,25",
        "€9,00",
        "€10,00"
      ],
      "jumps": [
        "+€0,75",
        "+€1"
      ]
    },
    {
      "lines": [
        "€1,75"
      ]
    },
    {
      "lines": [
        "€8,25 + €1,75 = €10,00"
      ]
    }
  ]
}
```

**Explanation visual placement:**

```json
{
  "receipt": 0,
  "groups": [
    1,
    2,
    3,
    4,
    5
  ]
}
```

## RP-M6-GE-006 — Geld · Twee aankopen en wisselgeld

**Source:** original 24  
**Domain:** money  
**Objective:** Twee bedragen met euro’s en centen optellen, over een hele euro gaan en het wisselgeld berekenen.  
**Difficulty:** 3  
**Report label:** Geld · Twee aankopen en wisselgeld  
**Answer mode:** open  
**Visual/presentation:** moneyReceipt / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "pricesCents": [
      680,
      765
    ],
    "paidCents": 2000
  },
  "question": {
    "answer": 555,
    "answerSpec": {
      "type": "euro",
      "allowedForms": [
        "5,55",
        "5.55"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `555`.
- Answer display: `"€5,55"`.
- Contract type: `euro`.
- Units: integer cents (displayed as euro amounts).

**Stored allowed forms (legacy metadata; structured input is used):**

```json
[
  "5,55",
  "5.55"
]
```

**Accepted input:** structured digit fields `euros` and `cents`, using the rule above. Correct when canonical cents equal 555.

**Exact resolved answer contract:**

```json
{
  "answer": 555,
  "answerDisplay": "€5,55",
  "answerMode": "open",
  "answerSpec": {
    "type": "euro",
    "allowedForms": [
      "5,55",
      "5.55"
    ]
  }
}
```

### Surface: original

**Question**

Je koopt een bouwpakket van een Vikingschip voor €6,80 en verf voor €7,65. Je betaalt met €20. Hoeveel geld krijg je terug?

**Minnie**

Tel eerst de prijs van het bouwpakket en de prijs van de verf bij elkaar op. Vul dat totaal daarna aan tot €20.

**Moose**

€6,80 + €7,65 = €14,45. Vul €14,45 aan tot €15: dat is 55 cent. Hoeveel euro moet er daarna nog bij tot €20? Tel beide stukken samen.

**Full explanation**

We zoeken eerst de totale prijs van het bouwpakket en de verf.

Tel bij €6,80 eerst 7 euro op: €6,80 + €7 = €13,80.

Nu nog 65 cent. Tel eerst 20 cent tot €14. Van de 65 cent blijven dan nog 45 cent over. Met die 45 cent erbij is de totale prijs €14,45.

Vul €14,45 aan tot €15. Er moet 100 − 45 = 55 cent bij, dus €0,55.

Van €15 naar €20 moet er nog €5 bij. Het wisselgeld is €0,55 + €5 = €5,55.

Je krijgt €5,55 terug. Controle: €14,45 + €5,55 = €20,00.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We zoeken eerst de totale prijs van het bouwpakket en de verf.",
  "Tel bij €6,80 eerst 7 euro op: €6,80 + €7 = €13,80.",
  "Nu nog 65 cent. Tel eerst 20 cent tot €14. Van de 65 cent blijven dan nog 45 cent over. Met die 45 cent erbij is de totale prijs €14,45.",
  "Vul €14,45 aan tot €15. Er moet 100 − 45 = 55 cent bij, dus €0,55.",
  "Van €15 naar €20 moet er nog €5 bij. Het wisselgeld is €0,55 + €5 = €5,55.",
  "Je krijgt €5,55 terug. Controle: €14,45 + €5,55 = €20,00."
]
```

### Visual stages

**Visual type:** `moneyReceipt`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "items": [
    {
      "label": "Bouwpakket",
      "amount": "€6,80"
    },
    {
      "label": "Verf",
      "amount": "€7,65"
    }
  ],
  "paid": "€20,00"
}
```

**Minnie stage**

```json
{
  "items": [
    {
      "label": "Bouwpakket",
      "amount": "€6,80"
    },
    {
      "label": "Verf",
      "amount": "€7,65"
    }
  ],
  "paid": "€20,00",
  "groups": [
    {
      "lines": [
        "1. Samen: €6,80 + €7,65 = ?"
      ]
    },
    {
      "lines": [
        "2. Vul het totaal aan tot €20"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "items": [
    {
      "label": "Bouwpakket",
      "amount": "€6,80"
    },
    {
      "label": "Verf",
      "amount": "€7,65"
    }
  ],
  "paid": "€20,00",
  "groups": [
    {
      "label": "Samen",
      "lines": [
        "€6,80 + €7,65 = €14,45"
      ]
    },
    {
      "label": "Wisselgeld",
      "nodes": [
        "€14,45",
        "€15,00",
        "€20,00"
      ],
      "jumps": [
        "+€0,55",
        "+? euro"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "items": [
    {
      "label": "Bouwpakket",
      "amount": "€6,80"
    },
    {
      "label": "Verf",
      "amount": "€7,65"
    }
  ],
  "paid": "€20,00",
  "groups": [
    {
      "label": "Samen",
      "lines": [
        "€6,80 + €7 = €13,80"
      ]
    },
    {
      "label": "+€0,65",
      "nodes": [
        "€13,80",
        "€14,00",
        "€14,45"
      ],
      "jumps": [
        "+€0,20",
        "+€0,45"
      ]
    },
    {
      "label": "Wisselgeld",
      "nodes": [
        "€14,45",
        "€15,00",
        "€20,00"
      ],
      "jumps": [
        "+€0,55",
        "+€5"
      ]
    },
    {
      "lines": [
        "€5,55"
      ]
    },
    {
      "lines": [
        "€14,45 + €5,55 = €20,00"
      ]
    }
  ]
}
```

**Explanation visual placement:**

```json
{
  "receipt": 0,
  "groups": [
    1,
    2,
    4,
    4,
    5
  ]
}
```

## RP-M6-TI-001 — Tijd · Tijdsduur binnen één uur

**Source:** original 24  
**Domain:** time  
**Objective:** Een tijdsduur binnen hetzelfde uur bepalen.  
**Difficulty:** 1  
**Report label:** Tijd · Tijdsduur binnen één uur  
**Answer mode:** open  
**Visual/presentation:** timeLine / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "start": "09:20",
    "end": "09:50"
  },
  "question": {
    "answer": 30,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "30"
      ],
      "unit": "minuten"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `30`.
- Answer display: `"30 minuten"`.
- Contract type: `wholeNumber`.
- Units: `"minuten"`.

**Stored allowed forms:**

```json
[
  "30"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 30,
  "answerDisplay": "30 minuten",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "30"
    ],
    "unit": "minuten"
  }
}
```

### Surface: original

**Question**

Het laden van het schip begint om 09:20 en is klaar om 09:50. Hoeveel minuten duurt het laden?

**Minnie**

Begin bij 09:20 en tel vooruit naar 09:50. Je kunt dat in stappen van 10 minuten doen.

**Moose**

Van 09:20 tot 09:40 zijn twee stappen van 10 minuten, dus 20 minuten. Hoeveel minuten komen er daarna nog bij tot 09:50?

**Full explanation**

We zoeken hoeveel tijd er ligt tussen **09:20 en 09:50**.

Van 09:20 naar 09:30 is **10 minuten**.

Van 09:30 naar 09:40 is nog **10 minuten**.

Van 09:40 naar 09:50 is nog **10 minuten**.

Samen is dat **10 + 10 + 10 = 30 minuten**.

**Het laden duurt 30 minuten.**

**Exact explanation step boundaries (runtime order):**

```json
[
  "We zoeken hoeveel tijd er ligt tussen **09:20 en 09:50**.",
  "Van 09:20 naar 09:30 is **10 minuten**.",
  "Van 09:30 naar 09:40 is nog **10 minuten**.",
  "Van 09:40 naar 09:50 is nog **10 minuten**.",
  "Samen is dat **10 + 10 + 10 = 30 minuten**.",
  "**Het laden duurt 30 minuten.**"
]
```

### Visual stages

**Visual type:** `timeLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "nodes": [
    "09:20",
    "09:50"
  ],
  "jumps": [],
  "notes": [],
  "direction": "forward"
}
```

**Minnie stage**

```json
{
  "nodes": [
    "09:20",
    "09:30",
    "09:40",
    "09:50"
  ],
  "jumps": [],
  "notes": [],
  "direction": "forward"
}
```

**Moose stage**

```json
{
  "nodes": [
    "09:20",
    "09:40",
    "09:50"
  ],
  "jumps": [
    "20 minuten",
    ""
  ],
  "notes": [],
  "direction": "forward"
}
```

**Explanation stage**

```json
{
  "nodes": [
    "09:20",
    "09:30",
    "09:40",
    "09:50"
  ],
  "jumps": [
    "10 minuten",
    "10 minuten",
    "10 minuten"
  ],
  "notes": [
    "30 minuten"
  ],
  "direction": "forward"
}
```

**Explanation visual placement:**

```json
{
  "shared": 4
}
```

## RP-M6-TI-002 — Tijd · Tijdsduur binnen één uur

**Source:** original 24  
**Domain:** time  
**Objective:** Een tijdsduur binnen hetzelfde uur bepalen met een combinatie van tientallen en vijf minuten.  
**Difficulty:** 1  
**Report label:** Tijd · Tijdsduur binnen één uur  
**Answer mode:** open  
**Visual/presentation:** timeLine / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "start": "10:10",
    "end": "10:35"
  },
  "question": {
    "answer": 25,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "25"
      ],
      "unit": "minuten"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `25`.
- Answer display: `"25 minuten"`.
- Contract type: `wholeNumber`.
- Units: `"minuten"`.

**Stored allowed forms:**

```json
[
  "25"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 25,
  "answerDisplay": "25 minuten",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "25"
    ],
    "unit": "minuten"
  }
}
```

### Surface: original

**Question**

De vuurschaal wordt aangestoken om 10:10. Om 10:35 wordt het vuur gedoofd. Hoeveel minuten brandt de vuurschaal?

**Minnie**

Reken vooruit vanaf 10:10. Ga eerst naar 10:30 en kijk daarna hoeveel minuten er nog over zijn tot 10:35.

**Moose**

Van 10:10 tot 10:30 is 20 minuten. Van 10:30 tot 10:35 komt er nog een klein stukje bij. Hoeveel minuten is dat?

**Full explanation**

We zoeken de tijd van **10:10 tot 10:35**.

Van 10:10 naar 10:30 is **20 minuten**.

Van 10:30 naar 10:35 is **5 minuten**.

Tel de twee stukken bij elkaar op: **20 + 5 = 25 minuten**.

**De vuurschaal brandt 25 minuten.**

**Exact explanation step boundaries (runtime order):**

```json
[
  "We zoeken de tijd van **10:10 tot 10:35**.",
  "Van 10:10 naar 10:30 is **20 minuten**.",
  "Van 10:30 naar 10:35 is **5 minuten**.",
  "Tel de twee stukken bij elkaar op: **20 + 5 = 25 minuten**.",
  "**De vuurschaal brandt 25 minuten.**"
]
```

### Visual stages

**Visual type:** `timeLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "nodes": [
    "10:10",
    "10:35"
  ],
  "jumps": [],
  "notes": [],
  "direction": "forward"
}
```

**Minnie stage**

```json
{
  "nodes": [
    "10:10",
    "10:30",
    "10:35"
  ],
  "jumps": [],
  "notes": [],
  "direction": "forward"
}
```

**Moose stage**

```json
{
  "nodes": [
    "10:10",
    "10:30",
    "10:35"
  ],
  "jumps": [
    "20 minuten",
    ""
  ],
  "notes": [],
  "direction": "forward"
}
```

**Explanation stage**

```json
{
  "nodes": [
    "10:10",
    "10:30",
    "10:35"
  ],
  "jumps": [
    "20 minuten",
    "5 minuten"
  ],
  "notes": [
    "20 + 5 = 25 minuten"
  ],
  "direction": "forward"
}
```

**Explanation visual placement:**

```json
{
  "shared": 3
}
```

## RP-M6-TI-003 — Tijd · Tijdsduur over het hele uur

**Source:** original 24  
**Domain:** time  
**Objective:** Een tijdsduur berekenen die over een heel uur heen gaat.  
**Difficulty:** 2  
**Report label:** Tijd · Tijdsduur over het hele uur  
**Answer mode:** open  
**Visual/presentation:** timeLine / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "start": "14:35",
    "end": "15:10"
  },
  "question": {
    "answer": 35,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "35"
      ],
      "unit": "minuten"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `35`.
- Answer display: `"35 minuten"`.
- Contract type: `wholeNumber`.
- Units: `"minuten"`.

**Stored allowed forms:**

```json
[
  "35"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 35,
  "answerDisplay": "35 minuten",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "35"
    ],
    "unit": "minuten"
  }
}
```

### Surface: original

**Question**

Een boot vertrekt om 14:35 en komt om 15:10 terug. Hoeveel minuten duurt de tocht?

**Minnie**

De tocht gaat over 15:00 heen. Reken daarom eerst van 14:35 tot 15:00 en daarna van 15:00 tot 15:10.

**Moose**

Een uur heeft 60 minuten. Van 14:35 tot 15:00 is 60 − 35 = 25 minuten. Tel daar de minuten na 15:00 nog bij.

**Full explanation**

We delen de tocht op bij het hele uur **15:00**.

Van 14:35 tot 15:00 is **25 minuten**, want **60 − 35 = 25**.

Van 15:00 tot 15:10 is nog **10 minuten**.

Samen duurt de tocht **25 + 10 = 35 minuten**.

**De tocht duurt 35 minuten.**

**Exact explanation step boundaries (runtime order):**

```json
[
  "We delen de tocht op bij het hele uur **15:00**.",
  "Van 14:35 tot 15:00 is **25 minuten**, want **60 − 35 = 25**.",
  "Van 15:00 tot 15:10 is nog **10 minuten**.",
  "Samen duurt de tocht **25 + 10 = 35 minuten**.",
  "**De tocht duurt 35 minuten.**"
]
```

### Visual stages

**Visual type:** `timeLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "nodes": [
    "14:35",
    "15:10"
  ],
  "jumps": [],
  "notes": [],
  "direction": "forward"
}
```

**Minnie stage**

```json
{
  "nodes": [
    "14:35",
    "15:00",
    "15:10"
  ],
  "jumps": [],
  "notes": [],
  "direction": "forward"
}
```

**Moose stage**

```json
{
  "nodes": [
    "14:35",
    "15:00",
    "15:10"
  ],
  "jumps": [
    "25 minuten",
    ""
  ],
  "notes": [],
  "direction": "forward"
}
```

**Explanation stage**

```json
{
  "nodes": [
    "14:35",
    "15:00",
    "15:10"
  ],
  "jumps": [
    "25 minuten",
    "10 minuten"
  ],
  "notes": [
    "25 + 10 = 35 minuten"
  ],
  "direction": "forward"
}
```

**Explanation visual placement:**

```json
{
  "shared": 3
}
```

## RP-M6-TI-004 — Tijd · Tijdsduur over het hele uur

**Source:** original 24  
**Domain:** time  
**Objective:** Een tijdsduur over het middaguur berekenen.  
**Difficulty:** 2  
**Report label:** Tijd · Tijdsduur over het hele uur  
**Answer mode:** open  
**Visual/presentation:** timeLine / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "start": "11:45",
    "end": "12:25"
  },
  "question": {
    "answer": 40,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "40"
      ],
      "unit": "minuten"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `40`.
- Answer display: `"40 minuten"`.
- Contract type: `wholeNumber`.
- Units: `"minuten"`.

**Stored allowed forms:**

```json
[
  "40"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 40,
  "answerDisplay": "40 minuten",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "40"
    ],
    "unit": "minuten"
  }
}
```

### Surface: original

**Question**

De wachtdienst bij de tempel begint om 11:45 en eindigt om 12:25. Hoeveel minuten duurt de wachtdienst?

**Minnie**

Reken eerst van 11:45 tot 12:00. Reken daarna van 12:00 tot 12:25. Tel die twee tijden bij elkaar op.

**Moose**

Van 11:45 tot 12:00 is 15 minuten. Na 12:00 duurt de wachtdienst nog 25 minuten. Welke optelsom geeft de totale duur?

**Full explanation**

We gebruiken **12:00** als handig tussenpunt.

Van 11:45 tot 12:00 duurt **15 minuten**.

Van 12:00 tot 12:25 duurt **25 minuten**.

Tel beide stukken op: **15 + 25 = 40 minuten**.

**De wachtdienst duurt 40 minuten.**

**Exact explanation step boundaries (runtime order):**

```json
[
  "We gebruiken **12:00** als handig tussenpunt.",
  "Van 11:45 tot 12:00 duurt **15 minuten**.",
  "Van 12:00 tot 12:25 duurt **25 minuten**.",
  "Tel beide stukken op: **15 + 25 = 40 minuten**.",
  "**De wachtdienst duurt 40 minuten.**"
]
```

### Visual stages

**Visual type:** `timeLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "nodes": [
    "11:45",
    "12:25"
  ],
  "jumps": [],
  "notes": [],
  "direction": "forward"
}
```

**Minnie stage**

```json
{
  "nodes": [
    "11:45",
    "12:00",
    "12:25"
  ],
  "jumps": [],
  "notes": [],
  "direction": "forward"
}
```

**Moose stage**

```json
{
  "nodes": [
    "11:45",
    "12:00",
    "12:25"
  ],
  "jumps": [
    "15 minuten",
    "25 minuten"
  ],
  "notes": [
    "15 + 25 = ?"
  ],
  "direction": "forward"
}
```

**Explanation stage**

```json
{
  "nodes": [
    "11:45",
    "12:00",
    "12:25"
  ],
  "jumps": [
    "15 minuten",
    "25 minuten"
  ],
  "notes": [
    "15 + 25 = 40 minuten"
  ],
  "direction": "forward"
}
```

**Explanation visual placement:**

```json
{
  "shared": 3
}
```

## RP-M6-TI-005 — Tijd · Eindtijd berekenen

**Source:** original 24  
**Domain:** time  
**Objective:** Een eindtijd bepalen bij een gegeven begintijd en duur van meer dan een uur.  
**Difficulty:** 3  
**Report label:** Tijd · Eindtijd berekenen  
**Answer mode:** multipleChoice  
**Visual/presentation:** timeLine / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "start": "13:50",
    "durationMinutes": 85
  },
  "question": {
    "answer": "15:15",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "14:25",
      "15:05",
      "15:15",
      "15:25"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"15:15"`.
- Answer display: `"15:15"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "14:25",
  "15:05",
  "15:15",
  "15:25"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "15:15",
  "answerDisplay": "15:15",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "14:25",
    "15:05",
    "15:15",
    "15:25"
  ]
}
```

### Surface: original

**Question**

Eivar vertrekt om 13:50. De tocht duurt 1 uur en 25 minuten. Hoe laat komt hij terug?

**Minnie**

Tel de duur in handige stukken op. Ga eerst van 13:50 naar het hele uur 14:00. Houd daarna bij hoeveel tijd van de 1 uur en 25 minuten nog over is.

**Moose**

Van 13:50 tot 14:00 gebruik je 10 minuten. Van de 1 uur en 25 minuten blijven dan 1 uur en 15 minuten over. Tel eerst dat hele uur vanaf 14:00 erbij.

**Full explanation**

De tocht duurt **1 uur en 25 minuten** en begint om **13:50**.

Ga eerst 10 minuten vooruit naar het volgende hele uur: **13:50 → 14:00**.

Van de 1 uur en 25 minuten hebben we nu 10 minuten gebruikt. Er blijft **1 uur en 15 minuten** over.

Tel eerst het hele uur erbij: **14:00 → 15:00**.

Daarna nog 15 minuten: **15:00 → 15:15**.

**Eivar komt om 15:15 terug.**

**Exact explanation step boundaries (runtime order):**

```json
[
  "De tocht duurt **1 uur en 25 minuten** en begint om **13:50**.",
  "Ga eerst 10 minuten vooruit naar het volgende hele uur: **13:50 → 14:00**.",
  "Van de 1 uur en 25 minuten hebben we nu 10 minuten gebruikt. Er blijft **1 uur en 15 minuten** over.",
  "Tel eerst het hele uur erbij: **14:00 → 15:00**.",
  "Daarna nog 15 minuten: **15:00 → 15:15**.",
  "**Eivar komt om 15:15 terug.**"
]
```

### Visual stages

**Visual type:** `timeLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "nodes": [
    "13:50",
    "?"
  ],
  "jumps": [],
  "notes": [
    "duur: 1 uur 25 minuten"
  ],
  "direction": "forward"
}
```

**Minnie stage**

```json
{
  "nodes": [
    "13:50",
    "14:00",
    "?"
  ],
  "jumps": [
    "10 minuten",
    ""
  ],
  "notes": [
    "duur: 1 uur 25 minuten",
    "resterend: 1 uur 15 minuten"
  ],
  "direction": "forward"
}
```

**Moose stage**

```json
{
  "nodes": [
    "13:50",
    "14:00",
    "15:00",
    "?"
  ],
  "jumps": [
    "10 minuten",
    "1 uur",
    "15 minuten"
  ],
  "notes": [
    "duur: 1 uur 25 minuten"
  ],
  "direction": "forward"
}
```

**Explanation stage**

```json
{
  "nodes": [
    "13:50",
    "14:00",
    "15:00",
    "15:15"
  ],
  "jumps": [
    "10 minuten",
    "1 uur",
    "15 minuten"
  ],
  "notes": [
    "duur: 1 uur 25 minuten"
  ],
  "direction": "forward"
}
```

**Explanation visual placement:**

```json
{
  "shared": 4
}
```

## RP-M6-TI-006 — Tijd · Begintijd berekenen

**Source:** original 24  
**Domain:** time  
**Objective:** Een begintijd bepalen door een duur van meer dan een uur terug te rekenen vanaf een eindtijd.  
**Difficulty:** 3  
**Report label:** Tijd · Begintijd berekenen  
**Answer mode:** multipleChoice  
**Visual/presentation:** timeLine / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 0.1

### Educational core

```json
{
  "values": {
    "end": "16:20",
    "durationMinutes": 95
  },
  "question": {
    "answer": "14:45",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "14:45",
      "14:55",
      "15:05",
      "15:45"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"14:45"`.
- Answer display: `"14:45"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "14:45",
  "14:55",
  "15:05",
  "15:45"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "14:45",
  "answerDisplay": "14:45",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "14:45",
    "14:55",
    "15:05",
    "15:45"
  ]
}
```

### Surface: original

**Question**

Het schip komt om 16:20 terug in de haven. De tocht duurde 1 uur en 35 minuten. Hoe laat vertrok het schip?

**Minnie**

Nu reken je terug vanaf 16:20. Ga eerst terug naar het hele uur 16:00 en houd bij hoeveel van de 1 uur en 35 minuten daarna nog terug moet.

**Moose**

Van 16:20 terug naar 16:00 is 20 minuten. Van de 1 uur en 35 minuten blijft nog 1 uur en 15 minuten over. Ga eerst dat hele uur terug naar 15:00.

**Full explanation**

Het schip komt om **16:20** terug en de tocht duurde **1 uur en 35 minuten**.

Reken eerst 20 minuten terug: **16:20 → 16:00**.

Van de totale duur blijft dan **1 uur en 15 minuten** over.

Ga één heel uur terug: **16:00 → 15:00**.

Ga daarna nog 15 minuten terug: **15:00 → 14:45**.

**Het schip vertrok om 14:45.**

**Exact explanation step boundaries (runtime order):**

```json
[
  "Het schip komt om **16:20** terug en de tocht duurde **1 uur en 35 minuten**.",
  "Reken eerst 20 minuten terug: **16:20 → 16:00**.",
  "Van de totale duur blijft dan **1 uur en 15 minuten** over.",
  "Ga één heel uur terug: **16:00 → 15:00**.",
  "Ga daarna nog 15 minuten terug: **15:00 → 14:45**.",
  "**Het schip vertrok om 14:45.**"
]
```

### Visual stages

**Visual type:** `timeLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "nodes": [
    "?",
    "16:20"
  ],
  "jumps": [],
  "notes": [
    "duur: 1 uur 35 minuten"
  ],
  "direction": "backward"
}
```

**Minnie stage**

```json
{
  "nodes": [
    "?",
    "16:00",
    "16:20"
  ],
  "jumps": [
    "",
    "20 minuten"
  ],
  "notes": [
    "duur: 1 uur 35 minuten",
    "nog terug: 1 uur 15 minuten"
  ],
  "direction": "backward"
}
```

**Moose stage**

```json
{
  "nodes": [
    "?",
    "15:00",
    "16:00",
    "16:20"
  ],
  "jumps": [
    "15 minuten",
    "1 uur",
    "20 minuten"
  ],
  "notes": [
    "duur: 1 uur 35 minuten"
  ],
  "direction": "backward"
}
```

**Explanation stage**

```json
{
  "nodes": [
    "14:45",
    "15:00",
    "16:00",
    "16:20"
  ],
  "jumps": [
    "15 minuten",
    "1 uur",
    "20 minuten"
  ],
  "notes": [
    "duur: 1 uur 35 minuten"
  ],
  "direction": "backward"
}
```

**Explanation visual placement:**

```json
{
  "shared": 4
}
```

## M6-NS-001 — Getalbegrip · Getalwoorden

**Source:** expansion 75  
**Domain:** numberSense  
**Objective:** spoken_number_to_digits  
**Difficulty:** 1  
**Report label:** Getalbegrip · Getalwoorden  
**Answer mode:** multipleChoice  
**Visual/presentation:** none / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "Welk getal wordt bedoeld met **zesduizend tweehonderd zevenenveertig**?"
  },
  "question": {
    "answer": "6.247",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "6.247",
      "6.274",
      "6.427",
      "6.240"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"6.247"`.
- Answer display: `"6.247"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "6.247",
  "6.274",
  "6.427",
  "6.240"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "6.247",
  "answerDisplay": "6.247",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "6.247",
    "6.274",
    "6.427",
    "6.240"
  ]
}
```

### Surface: original

**Question**

Welk getal wordt bedoeld met **zesduizend tweehonderd zevenenveertig**?

**Minnie**

Zoek eerst hoeveel duizenden en honderden je hoort. Kijk daarna naar het laatste getal: zevenenveertig.

**Moose**

Zesduizend is 6.000 en tweehonderd is 200. Zevenenveertig is 47. Welk getal krijg je als je die delen samenvoegt?

**Full explanation**

Het getal bestaat uit drie delen.

**Zesduizend = 6.000.**

**Tweehonderd = 200.**

**Zevenenveertig = 47.**

Samen is dat **6.000 + 200 + 47 = 6.247**.

Dus het juiste getal is **6.247**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Het getal bestaat uit drie delen.",
  "**Zesduizend = 6.000.**",
  "**Tweehonderd = 200.**",
  "**Zevenenveertig = 47.**",
  "Samen is dat **6.000 + 200 + 47 = 6.247**.",
  "Dus het juiste getal is **6.247**."
]
```

### Visual stages

**Visual type:** `none`. All four frames below belong to surface `original`.

**Question stage**

```json
{}
```

**Minnie stage**

```json
{}
```

**Moose stage**

```json
{}
```

**Explanation stage**

```json
{}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-NS-002 — Getalbegrip · Cijfers ordenen

**Source:** expansion 75  
**Domain:** numberSense  
**Objective:** order_digits_largest_number  
**Difficulty:** 1  
**Report label:** Getalbegrip · Cijfers ordenen  
**Answer mode:** multipleChoice  
**Visual/presentation:** none / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "Je mag de cijfers **3, 8, 5 en 7** elk één keer gebruiken. Welk is het grootste getal dat je kunt maken?"
  },
  "question": {
    "answer": "8.753",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "8.753",
      "8.735",
      "7.853",
      "8.573"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"8.753"`.
- Answer display: `"8.753"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "8.753",
  "8.735",
  "7.853",
  "8.573"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "8.753",
  "answerDisplay": "8.753",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "8.753",
    "8.735",
    "7.853",
    "8.573"
  ]
}
```

### Surface: original

**Question**

Je mag de cijfers **3, 8, 5 en 7** elk één keer gebruiken. Welk is het grootste getal dat je kunt maken?

**Minnie**

Voor het grootste getal zet je het grootste cijfer op de plek met de grootste waarde: helemaal links.

**Moose**

Van 3, 8, 5 en 7 is 8 het grootst. Daarna komt 7, daarna 5 en daarna 3. Zet ze in die volgorde.

**Full explanation**

Bij een viercijferig getal is de eerste plek het belangrijkst.

Het grootste cijfer is **8**, dus dat wordt het duizendtal.

Daarna komt **7** bij de honderdtallen, **5** bij de tientallen en **3** bij de eenheden.

Zo krijg je **8.753**.

Dus **8.753** is het grootste getal dat je met deze vier cijfers kunt maken.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Bij een viercijferig getal is de eerste plek het belangrijkst.",
  "Het grootste cijfer is **8**, dus dat wordt het duizendtal.",
  "Daarna komt **7** bij de honderdtallen, **5** bij de tientallen en **3** bij de eenheden.",
  "Zo krijg je **8.753**.",
  "Dus **8.753** is het grootste getal dat je met deze vier cijfers kunt maken."
]
```

### Visual stages

**Visual type:** `none`. All four frames below belong to surface `original`.

**Question stage**

```json
{}
```

**Minnie stage**

```json
{}
```

**Moose stage**

```json
{}
```

**Explanation stage**

```json
{}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-NS-003 — Getalbegrip · Plaatswaarde

**Source:** expansion 75  
**Domain:** numberSense  
**Objective:** place_value  
**Difficulty:** 1  
**Report label:** Getalbegrip · Plaatswaarde  
**Answer mode:** multipleChoice  
**Visual/presentation:** none / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "Kijk naar het getal **5.684**. Welke waarde heeft de **6**?"
  },
  "question": {
    "answer": "600",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "6",
      "60",
      "600",
      "6.000"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"600"`.
- Answer display: `"600"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "6",
  "60",
  "600",
  "6.000"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "600",
  "answerDisplay": "600",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "6",
    "60",
    "600",
    "6.000"
  ]
}
```

### Surface: original

**Question**

Kijk naar het getal **5.684**. Welke waarde heeft de **6**?

**Minnie**

Kijk op welke plek de 6 staat. Van rechts naar links heb je eenheden, tientallen, honderdtallen en duizendtallen.

**Moose**

In 5.684 staat de 4 bij de eenheden, de 8 bij de tientallen en de 6 bij de honderdtallen. Wat is 6 honderdtallen waard?

**Full explanation**

Het getal is **5.684**.

De **4** betekent 4 eenheden.

De **8** betekent 8 tientallen: 80.

De **6** staat bij de honderdtallen. Zes honderdtallen zijn **6 × 100 = 600**.

Dus de 6 heeft de waarde **600**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Het getal is **5.684**.",
  "De **4** betekent 4 eenheden.",
  "De **8** betekent 8 tientallen: 80.",
  "De **6** staat bij de honderdtallen. Zes honderdtallen zijn **6 × 100 = 600**.",
  "Dus de 6 heeft de waarde **600**."
]
```

### Visual stages

**Visual type:** `none`. All four frames below belong to surface `original`.

**Question stage**

```json
{}
```

**Minnie stage**

```json
{}
```

**Moose stage**

```json
{}
```

**Explanation stage**

```json
{}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-NS-004 — Getalbegrip · Getallenreeksen

**Source:** expansion 75  
**Domain:** numberSense  
**Objective:** number_sequence_constant_step  
**Difficulty:** 1  
**Report label:** Getalbegrip · Getallenreeksen  
**Answer mode:** open  
**Visual/presentation:** numberLine / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "Welk getal ontbreekt?\n\n**7.420 → 7.430 → ? → 7.450 → 7.460**"
  },
  "question": {
    "answer": 7440,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "7440",
        "7.440",
        "7 440"
      ],
      "grouping": true
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `7440`.
- Answer display: `"7.440"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "7440",
  "7.440",
  "7 440"
]
```

**Accepted input:** whole-number rule above; `grouping` is `true` (numeric equivalence).

**Exact resolved answer contract:**

```json
{
  "answer": 7440,
  "answerDisplay": "7.440",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "7440",
      "7.440",
      "7 440"
    ],
    "grouping": true
  }
}
```

### Surface: original

**Question**

Welk getal ontbreekt?

**7.420 → 7.430 → ? → 7.450 → 7.460**

**Minnie**

Vergelijk de eerste twee getallen. Hoeveel komt er bij van 7.420 naar 7.430?

**Moose**

Van 7.420 naar 7.430 komt er **10** bij. Doe vanaf 7.430 precies dezelfde sprong.

**Full explanation**

De reeks gaat steeds met **10 omhoog**.

7.420 + 10 = **7.430**.

Daarna komt weer 10 erbij:

7.430 + 10 = **7.440**.

Dan volgen 7.450 en 7.460.

Het ontbrekende getal is dus **7.440**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "De reeks gaat steeds met **10 omhoog**.",
  "7.420 + 10 = **7.430**.",
  "Daarna komt weer 10 erbij:",
  "7.430 + 10 = **7.440**.",
  "Dan volgen 7.450 en 7.460.",
  "Het ontbrekende getal is dus **7.440**."
]
```

### Visual stages

**Visual type:** `numberLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "min": 7420,
  "max": 7460,
  "markers": [
    {
      "value": 7420,
      "label": "7.420",
      "focus": false,
      "lane": 0
    },
    {
      "value": 7430,
      "label": "7.430",
      "focus": false,
      "lane": 0
    },
    {
      "value": 7440,
      "label": "?",
      "focus": false,
      "lane": 0
    },
    {
      "value": 7450,
      "label": "7.450",
      "focus": false,
      "lane": 0
    },
    {
      "value": 7460,
      "label": "7.460",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": []
}
```

**Minnie stage**

```json
{
  "min": 7420,
  "max": 7460,
  "markers": [
    {
      "value": 7420,
      "label": "7.420",
      "focus": true,
      "lane": 0
    },
    {
      "value": 7430,
      "label": "7.430",
      "focus": true,
      "lane": 0
    },
    {
      "value": 7440,
      "label": "?",
      "focus": false,
      "lane": 0
    },
    {
      "value": 7450,
      "label": "7.450",
      "focus": false,
      "lane": 0
    },
    {
      "value": 7460,
      "label": "7.460",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [
    {
      "from": 7420,
      "to": 7430,
      "label": ""
    }
  ],
  "notes": []
}
```

**Moose stage**

```json
{
  "min": 7420,
  "max": 7460,
  "markers": [
    {
      "value": 7420,
      "label": "7.420",
      "focus": false,
      "lane": 0
    },
    {
      "value": 7430,
      "label": "7.430",
      "focus": false,
      "lane": 0
    },
    {
      "value": 7440,
      "label": "?",
      "focus": false,
      "lane": 0
    },
    {
      "value": 7450,
      "label": "7.450",
      "focus": false,
      "lane": 0
    },
    {
      "value": 7460,
      "label": "7.460",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [
    {
      "from": 7420,
      "to": 7430,
      "label": "+10"
    },
    {
      "from": 7430,
      "to": 7440,
      "label": "+10"
    }
  ],
  "notes": []
}
```

**Explanation stage**

```json
{
  "min": 7420,
  "max": 7460,
  "markers": [
    {
      "value": 7420,
      "label": "7.420",
      "focus": false,
      "lane": 0
    },
    {
      "value": 7430,
      "label": "7.430",
      "focus": false,
      "lane": 0
    },
    {
      "value": 7440,
      "label": "7.440",
      "focus": true,
      "lane": 0
    },
    {
      "value": 7450,
      "label": "7.450",
      "focus": false,
      "lane": 0
    },
    {
      "value": 7460,
      "label": "7.460",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [
    {
      "from": 7420,
      "to": 7430,
      "label": "+10"
    },
    {
      "from": 7430,
      "to": 7440,
      "label": "+10"
    },
    {
      "from": 7440,
      "to": 7450,
      "label": "+10"
    },
    {
      "from": 7450,
      "to": 7460,
      "label": "+10"
    }
  ],
  "notes": []
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-NS-005 — Getalbegrip · Afronden

**Source:** expansion 75  
**Domain:** numberSense  
**Objective:** round_to_nearest_hundred  
**Difficulty:** 2  
**Report label:** Getalbegrip · Afronden  
**Answer mode:** multipleChoice  
**Visual/presentation:** numberLine / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "Rond **6.451** af op het dichtstbijzijnde honderdtal."
  },
  "question": {
    "answer": "6.500",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "6.400",
      "6.450",
      "6.500",
      "6.600"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"6.500"`.
- Answer display: `"6.500"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "6.400",
  "6.450",
  "6.500",
  "6.600"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "6.500",
  "answerDisplay": "6.500",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "6.400",
    "6.450",
    "6.500",
    "6.600"
  ]
}
```

### Surface: original

**Question**

Rond **6.451** af op het dichtstbijzijnde honderdtal.

**Minnie**

6.451 ligt tussen 6.400 en 6.500. Kijk waar het midden tussen die twee honderdtallen ligt.

**Moose**

Het midden is **6.450**. Het getal 6.451 ligt net boven dat middenpunt en dus aan de kant van 6.500.

**Full explanation**

6.451 ligt tussen **6.400** en **6.500**.

Precies in het midden ligt **6.450**.

Getallen van 6.450 en hoger ronden we bij deze twee honderdtallen naar **6.500** af.

6.451 ligt één boven het middenpunt.

Daarom wordt **6.451 afgerond naar 6.500**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "6.451 ligt tussen **6.400** en **6.500**.",
  "Precies in het midden ligt **6.450**.",
  "Getallen van 6.450 en hoger ronden we bij deze twee honderdtallen naar **6.500** af.",
  "6.451 ligt één boven het middenpunt.",
  "Daarom wordt **6.451 afgerond naar 6.500**."
]
```

### Visual stages

**Visual type:** `numberLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "min": 6400,
  "max": 6500,
  "markers": [
    {
      "value": 6400,
      "label": "6.400",
      "focus": false,
      "lane": 0
    },
    {
      "value": 6451,
      "label": "6.451",
      "focus": true,
      "lane": 0
    },
    {
      "value": 6500,
      "label": "6.500",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": []
}
```

**Minnie stage**

```json
{
  "min": 6400,
  "max": 6500,
  "markers": [
    {
      "value": 6400,
      "label": "6.400",
      "focus": false,
      "lane": 0
    },
    {
      "value": 6450,
      "label": "6.450",
      "focus": false,
      "lane": 1
    },
    {
      "value": 6451,
      "label": "6.451",
      "focus": true,
      "lane": 0
    },
    {
      "value": 6500,
      "label": "6.500",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": []
}
```

**Moose stage**

```json
{
  "min": 6400,
  "max": 6500,
  "markers": [
    {
      "value": 6400,
      "label": "6.400",
      "focus": false,
      "lane": 0
    },
    {
      "value": 6450,
      "label": "6.450",
      "focus": false,
      "lane": 1
    },
    {
      "value": 6451,
      "label": "6.451",
      "focus": true,
      "lane": 0
    },
    {
      "value": 6500,
      "label": "6.500",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": [
    "6.451 = 6.450 + 1"
  ]
}
```

**Explanation stage**

```json
{
  "min": 6400,
  "max": 6500,
  "markers": [
    {
      "value": 6400,
      "label": "6.400",
      "focus": false,
      "lane": 0
    },
    {
      "value": 6450,
      "label": "6.450",
      "focus": false,
      "lane": 1
    },
    {
      "value": 6451,
      "label": "6.451",
      "focus": false,
      "lane": 0
    },
    {
      "value": 6500,
      "label": "6.500",
      "focus": true,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": []
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-NS-006 — Getalbegrip · Afronden

**Source:** expansion 75  
**Domain:** numberSense  
**Objective:** round_to_nearest_thousand  
**Difficulty:** 2  
**Report label:** Getalbegrip · Afronden  
**Answer mode:** open  
**Visual/presentation:** numberLine / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "Rond **8.620** af op het dichtstbijzijnde duizendtal."
  },
  "question": {
    "answer": 9000,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "9000",
        "9.000",
        "9 000"
      ],
      "grouping": true
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `9000`.
- Answer display: `"9.000"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "9000",
  "9.000",
  "9 000"
]
```

**Accepted input:** whole-number rule above; `grouping` is `true` (numeric equivalence).

**Exact resolved answer contract:**

```json
{
  "answer": 9000,
  "answerDisplay": "9.000",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "9000",
      "9.000",
      "9 000"
    ],
    "grouping": true
  }
}
```

### Surface: original

**Question**

Rond **8.620** af op het dichtstbijzijnde duizendtal.

**Minnie**

8.620 ligt tussen 8.000 en 9.000. Zoek eerst het midden tussen die twee duizendtallen.

**Moose**

Het midden is **8.500**. 8.620 ligt boven 8.500, dus het ligt aan de kant van 9.000.

**Full explanation**

Het dichtstbijzijnde lagere duizendtal is **8.000**.

Het dichtstbijzijnde hogere duizendtal is **9.000**.

Het midden is **8.500**.

Omdat **8.620 groter is dan 8.500**, ligt het dichter bij 9.000.

Dus **8.620 rond je af naar 9.000**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Het dichtstbijzijnde lagere duizendtal is **8.000**.",
  "Het dichtstbijzijnde hogere duizendtal is **9.000**.",
  "Het midden is **8.500**.",
  "Omdat **8.620 groter is dan 8.500**, ligt het dichter bij 9.000.",
  "Dus **8.620 rond je af naar 9.000**."
]
```

### Visual stages

**Visual type:** `numberLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "min": 8000,
  "max": 9000,
  "markers": [
    {
      "value": 8000,
      "label": "8.000",
      "focus": false,
      "lane": 0
    },
    {
      "value": 8620,
      "label": "8.620",
      "focus": false,
      "lane": 0
    },
    {
      "value": 9000,
      "label": "9.000",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": []
}
```

**Minnie stage**

```json
{
  "min": 8000,
  "max": 9000,
  "markers": [
    {
      "value": 8000,
      "label": "8.000",
      "focus": false,
      "lane": 0
    },
    {
      "value": 8500,
      "label": "8.500",
      "focus": false,
      "lane": 1
    },
    {
      "value": 8620,
      "label": "8.620",
      "focus": false,
      "lane": 0
    },
    {
      "value": 9000,
      "label": "9.000",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": []
}
```

**Moose stage**

```json
{
  "min": 8000,
  "max": 9000,
  "markers": [
    {
      "value": 8000,
      "label": "8.000",
      "focus": false,
      "lane": 0
    },
    {
      "value": 8500,
      "label": "8.500",
      "focus": false,
      "lane": 1
    },
    {
      "value": 8620,
      "label": "8.620",
      "focus": true,
      "lane": 0
    },
    {
      "value": 9000,
      "label": "9.000",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [
    {
      "from": 8000,
      "to": 8620,
      "label": ""
    },
    {
      "from": 8620,
      "to": 9000,
      "label": ""
    }
  ],
  "notes": []
}
```

**Explanation stage**

```json
{
  "min": 8000,
  "max": 9000,
  "markers": [
    {
      "value": 8000,
      "label": "8.000",
      "focus": false,
      "lane": 0
    },
    {
      "value": 8500,
      "label": "8.500",
      "focus": false,
      "lane": 1
    },
    {
      "value": 8620,
      "label": "8.620",
      "focus": false,
      "lane": 0
    },
    {
      "value": 9000,
      "label": "9.000",
      "focus": true,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": []
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-NS-007 — Getalbegrip · Afstand tot doelgetal

**Source:** expansion 75  
**Domain:** numberSense  
**Objective:** closest_value_to_target  
**Difficulty:** 2  
**Report label:** Getalbegrip · Afstand tot doelgetal  
**Answer mode:** multipleChoice  
**Visual/presentation:** numberLine / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "Welk getal ligt het dichtst bij **10.000**?"
  },
  "question": {
    "answer": "10.140",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "9.760",
      "10.140",
      "9.590",
      "10.420"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"10.140"`.
- Answer display: `"10.140"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "9.760",
  "10.140",
  "9.590",
  "10.420"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "10.140",
  "answerDisplay": "10.140",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "9.760",
    "10.140",
    "9.590",
    "10.420"
  ]
}
```

### Surface: original

**Question**

Welk getal ligt het dichtst bij **10.000**?

**Minnie**

Kijk niet alleen of een getal boven of onder 10.000 ligt. Vergelijk hoeveel het van 10.000 verschilt.

**Moose**

10.140 ligt **140** boven 10.000.  
9.760 ligt **240** onder 10.000.  
Welke van deze twee ligt dichterbij?

**Full explanation**

We vergelijken de afstand van ieder getal tot 10.000.

9.760 ligt **240** van 10.000 af.

10.140 ligt **140** van 10.000 af.

9.590 ligt **410** van 10.000 af.

10.420 ligt **420** van 10.000 af.

De kleinste afstand is **140**.

Dus **10.140** ligt het dichtst bij 10.000.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We vergelijken de afstand van ieder getal tot 10.000.",
  "9.760 ligt **240** van 10.000 af.",
  "10.140 ligt **140** van 10.000 af.",
  "9.590 ligt **410** van 10.000 af.",
  "10.420 ligt **420** van 10.000 af.",
  "De kleinste afstand is **140**.",
  "Dus **10.140** ligt het dichtst bij 10.000."
]
```

### Visual stages

**Visual type:** `numberLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "min": 9590,
  "max": 10420,
  "markers": [
    {
      "value": 9590,
      "label": "9.590",
      "focus": false,
      "lane": 0
    },
    {
      "value": 9760,
      "label": "9.760",
      "focus": false,
      "lane": 1
    },
    {
      "value": 10000,
      "label": "10.000",
      "focus": true,
      "lane": 0
    },
    {
      "value": 10140,
      "label": "10.140",
      "focus": false,
      "lane": 1
    },
    {
      "value": 10420,
      "label": "10.420",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": []
}
```

**Minnie stage**

```json
{
  "min": 9590,
  "max": 10420,
  "markers": [
    {
      "value": 9590,
      "label": "9.590",
      "focus": false,
      "lane": 0
    },
    {
      "value": 9760,
      "label": "9.760",
      "focus": false,
      "lane": 1
    },
    {
      "value": 10000,
      "label": "10.000",
      "focus": true,
      "lane": 0
    },
    {
      "value": 10140,
      "label": "10.140",
      "focus": false,
      "lane": 1
    },
    {
      "value": 10420,
      "label": "10.420",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [
    {
      "from": 9590,
      "to": 10000,
      "label": ""
    },
    {
      "from": 9760,
      "to": 10000,
      "label": ""
    },
    {
      "from": 10000,
      "to": 10140,
      "label": ""
    },
    {
      "from": 10000,
      "to": 10420,
      "label": ""
    }
  ],
  "notes": []
}
```

**Moose stage**

```json
{
  "min": 9590,
  "max": 10420,
  "markers": [
    {
      "value": 9590,
      "label": "9.590",
      "focus": false,
      "lane": 0
    },
    {
      "value": 9760,
      "label": "9.760",
      "focus": false,
      "lane": 1
    },
    {
      "value": 10000,
      "label": "10.000",
      "focus": true,
      "lane": 0
    },
    {
      "value": 10140,
      "label": "10.140",
      "focus": false,
      "lane": 1
    },
    {
      "value": 10420,
      "label": "10.420",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": [
    "10.140 → 140 boven 10.000",
    "9.760 → 240 onder 10.000"
  ]
}
```

**Explanation stage**

```json
{
  "min": 9590,
  "max": 10420,
  "markers": [
    {
      "value": 9590,
      "label": "9.590",
      "focus": false,
      "lane": 0
    },
    {
      "value": 9760,
      "label": "9.760",
      "focus": false,
      "lane": 1
    },
    {
      "value": 10000,
      "label": "10.000",
      "focus": true,
      "lane": 0
    },
    {
      "value": 10140,
      "label": "10.140",
      "focus": false,
      "lane": 1
    },
    {
      "value": 10420,
      "label": "10.420",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": [
    "9.760 → 240",
    "10.140 → 140",
    "9.590 → 410",
    "10.420 → 420"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-NS-008 — Getalbegrip · Plaatswaarde

**Source:** expansion 75  
**Domain:** numberSense  
**Objective:** compose_number_from_place_values  
**Difficulty:** 3  
**Report label:** Getalbegrip · Plaatswaarde  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "Welk getal bestaat uit:\n\n**5 duizendtallen, 2 honderdtallen, 7 tientallen en 4 eenheden?**"
  },
  "question": {
    "answer": 5274,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "5274",
        "5.274",
        "5 274"
      ],
      "grouping": true
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `5274`.
- Answer display: `"5.274"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "5274",
  "5.274",
  "5 274"
]
```

**Accepted input:** whole-number rule above; `grouping` is `true` (numeric equivalence).

**Exact resolved answer contract:**

```json
{
  "answer": 5274,
  "answerDisplay": "5.274",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "5274",
      "5.274",
      "5 274"
    ],
    "grouping": true
  }
}
```

### Surface: original

**Question**

Welk getal bestaat uit:

**5 duizendtallen, 2 honderdtallen, 7 tientallen en 4 eenheden?**

**Minnie**

Zet elk deel eerst om naar zijn echte waarde: duizendtallen, honderdtallen, tientallen en eenheden.

**Moose**

5 duizendtallen zijn 5.000, 2 honderdtallen zijn 200, 7 tientallen zijn 70 en 4 eenheden zijn 4. Zet die vier waarden bij elkaar.

**Full explanation**

5 duizendtallen zijn **5.000**.

2 honderdtallen zijn **200**.

7 tientallen zijn **70**.

4 eenheden zijn **4**.

Samen krijg je:

**5.000 + 200 + 70 + 4 = 5.274**.

Het gezochte getal is dus **5.274**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "5 duizendtallen zijn **5.000**.",
  "2 honderdtallen zijn **200**.",
  "7 tientallen zijn **70**.",
  "4 eenheden zijn **4**.",
  "Samen krijg je:",
  "**5.000 + 200 + 70 + 4 = 5.274**.",
  "Het gezochte getal is dus **5.274**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "5 duizendtallen",
        "2 honderdtallen",
        "7 tientallen",
        "4 eenheden"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "5 — duizendtallen",
        "2 — honderdtallen",
        "7 — tientallen",
        "4 — eenheden"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "5.000 + 200 + 70 + 4 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "5.000 + 200 + 70 + 4 = 5.274"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-AS-001 — Optellen · Honderdtallen en tientallen

**Source:** expansion 75  
**Domain:** additionSubtraction  
**Objective:** add_hundreds_tens  
**Difficulty:** 1  
**Report label:** Optellen · Honderdtallen en tientallen  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 2

### Educational core

```json
{
  "values": {
    "authored": "**430 + 260 = 690**"
  },
  "question": {
    "answer": 690,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "690"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `690`.
- Answer display: `"690"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "690"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 690,
  "answerDisplay": "690",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "690"
    ]
  }
}
```

### Surface: bare

**Question**

430 + 260 = ?

**Minnie**

Splits 260 in **200 en 60**. Tel die twee stukken één voor één bij 430 op.

**Moose**

430 + 200 = **630**. Er moet nog 60 bij. Dat zijn zes tientallen.

**Full explanation**

We splitsen **260 in 200 en 60**.

Eerst tellen we 200 bij 430 op:

**430 + 200 = 630**.

Daarna tellen we nog 60 erbij:

**630 + 60 = 690**.

Dus **430 + 260 = 690**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen **260 in 200 en 60**.",
  "Eerst tellen we 200 bij 430 op:",
  "**430 + 200 = 630**.",
  "Daarna tellen we nog 60 erbij:",
  "**630 + 60 = 690**.",
  "Dus **430 + 260 = 690**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `bare`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "260 = 200 + 60"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "430 + 200 = 630",
        "630 + 60 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "430 + 200 = 630",
        "630 + 60 = 690"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: supplies

**Question**

In een voorraad liggen 430 onderdelen. Er komen 260 onderdelen bij. Hoeveel onderdelen zijn er nu?

**Minnie**

Splits 260 in **200 en 60**. Tel die twee stukken één voor één bij 430 op.

**Moose**

430 + 200 = **630**. Er moet nog 60 bij. Dat zijn zes tientallen.

**Full explanation**

We splitsen **260 in 200 en 60**.

Eerst tellen we 200 bij 430 op:

**430 + 200 = 630**.

Daarna tellen we nog 60 erbij:

**630 + 60 = 690**.

Dus **430 + 260 = 690**.

Er zijn dus **690 onderdelen**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen **260 in 200 en 60**.",
  "Eerst tellen we 200 bij 430 op:",
  "**430 + 200 = 630**.",
  "Daarna tellen we nog 60 erbij:",
  "**630 + 60 = 690**.",
  "Dus **430 + 260 = 690**.",
  "Er zijn dus **690 onderdelen**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `supplies`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "260 = 200 + 60"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "430 + 200 = 630",
        "630 + 60 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "430 + 200 = 630",
        "630 + 60 = 690"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-AS-002 — Aftrekken · Verschil bepalen

**Source:** expansion 75  
**Domain:** additionSubtraction  
**Objective:** find_difference  
**Difficulty:** 1  
**Report label:** Aftrekken · Verschil bepalen  
**Answer mode:** open  
**Visual/presentation:** numberLine / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**1.642 − 1.633 = 9**"
  },
  "question": {
    "answer": 9,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "9"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `9`.
- Answer display: `"9"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "9"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 9,
  "answerDisplay": "9",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "9"
    ]
  }
}
```

### Surface: scores

**Question**

Twee spelers halen 1.642 en 1.633 punten. Hoeveel punten verschil is er?

**Minnie**

Bij een verschil kun je van het kleinste getal naar het grootste tellen. Zoek eerst een handig tussenpunt.

**Moose**

Van 1.633 naar 1.640 is **7**. Van 1.640 naar 1.642 is nog **2**. Tel die twee stukjes bij elkaar op.

**Full explanation**

We zoeken het verschil tussen **1.633 en 1.642**.

Van 1.633 naar 1.640 is **7**.

Van 1.640 naar 1.642 is **2**.

Samen:

**7 + 2 = 9**.

Het verschil is dus **9**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We zoeken het verschil tussen **1.633 en 1.642**.",
  "Van 1.633 naar 1.640 is **7**.",
  "Van 1.640 naar 1.642 is **2**.",
  "Samen:",
  "**7 + 2 = 9**.",
  "Het verschil is dus **9**."
]
```

### Visual stages

**Visual type:** `numberLine`. All four frames below belong to surface `scores`.

**Question stage**

```json
{
  "min": 1633,
  "max": 1642,
  "markers": [
    {
      "value": 1633,
      "label": "1.633",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1642,
      "label": "1.642",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": []
}
```

**Minnie stage**

```json
{
  "min": 1633,
  "max": 1642,
  "markers": [
    {
      "value": 1633,
      "label": "1.633",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1640,
      "label": "1.640",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1642,
      "label": "1.642",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": []
}
```

**Moose stage**

```json
{
  "min": 1633,
  "max": 1642,
  "markers": [
    {
      "value": 1633,
      "label": "1.633",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1640,
      "label": "1.640",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1642,
      "label": "1.642",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [
    {
      "from": 1633,
      "to": 1640,
      "label": "+7"
    },
    {
      "from": 1640,
      "to": 1642,
      "label": "+2"
    }
  ],
  "notes": []
}
```

**Explanation stage**

```json
{
  "min": 1633,
  "max": 1642,
  "markers": [
    {
      "value": 1633,
      "label": "1.633",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1640,
      "label": "1.640",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1642,
      "label": "1.642",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [
    {
      "from": 1633,
      "to": 1640,
      "label": "+7"
    },
    {
      "from": 1640,
      "to": 1642,
      "label": "+2"
    }
  ],
  "notes": [
    "7 + 2 = 9"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: counters

**Question**

Twee tellers staan op 1.642 en 1.633. Hoe groot is het verschil tussen de twee waarden?

**Minnie**

Bij een verschil kun je van het kleinste getal naar het grootste tellen. Zoek eerst een handig tussenpunt.

**Moose**

Van 1.633 naar 1.640 is **7**. Van 1.640 naar 1.642 is nog **2**. Tel die twee stukjes bij elkaar op.

**Full explanation**

We zoeken het verschil tussen **1.633 en 1.642**.

Van 1.633 naar 1.640 is **7**.

Van 1.640 naar 1.642 is **2**.

Samen:

**7 + 2 = 9**.

Het verschil is dus **9**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We zoeken het verschil tussen **1.633 en 1.642**.",
  "Van 1.633 naar 1.640 is **7**.",
  "Van 1.640 naar 1.642 is **2**.",
  "Samen:",
  "**7 + 2 = 9**.",
  "Het verschil is dus **9**."
]
```

### Visual stages

**Visual type:** `numberLine`. All four frames below belong to surface `counters`.

**Question stage**

```json
{
  "min": 1633,
  "max": 1642,
  "markers": [
    {
      "value": 1633,
      "label": "1.633",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1642,
      "label": "1.642",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": []
}
```

**Minnie stage**

```json
{
  "min": 1633,
  "max": 1642,
  "markers": [
    {
      "value": 1633,
      "label": "1.633",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1640,
      "label": "1.640",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1642,
      "label": "1.642",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": []
}
```

**Moose stage**

```json
{
  "min": 1633,
  "max": 1642,
  "markers": [
    {
      "value": 1633,
      "label": "1.633",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1640,
      "label": "1.640",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1642,
      "label": "1.642",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [
    {
      "from": 1633,
      "to": 1640,
      "label": "+7"
    },
    {
      "from": 1640,
      "to": 1642,
      "label": "+2"
    }
  ],
  "notes": []
}
```

**Explanation stage**

```json
{
  "min": 1633,
  "max": 1642,
  "markers": [
    {
      "value": 1633,
      "label": "1.633",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1640,
      "label": "1.640",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1642,
      "label": "1.642",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [
    {
      "from": 1633,
      "to": 1640,
      "label": "+7"
    },
    {
      "from": 1640,
      "to": 1642,
      "label": "+2"
    }
  ],
  "notes": [
    "7 + 2 = 9"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-AS-003 — Optellen · Aanvullen tot rond getal

**Source:** expansion 75  
**Domain:** additionSubtraction  
**Objective:** bridge_to_round_number  
**Difficulty:** 1  
**Report label:** Optellen · Aanvullen tot rond getal  
**Answer mode:** open  
**Visual/presentation:** numberLine / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**3.760 + ? = 4.000**"
  },
  "question": {
    "answer": 240,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "240"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `240`.
- Answer display: `"240"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "240"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 240,
  "answerDisplay": "240",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "240"
    ]
  }
}
```

### Surface: bare

**Question**

Hoeveel moet er bij **3.760** om op **4.000** te komen?

**Minnie**

Ga eerst van 3.760 naar een handig rond getal. **3.800** ligt dichtbij.

**Moose**

Van 3.760 naar 3.800 is **40**. Van 3.800 naar 4.000 is nog **200**. Tel die twee stukken bij elkaar op.

**Full explanation**

We vullen 3.760 aan tot 4.000.

Van **3.760 naar 3.800** is **40**.

Van **3.800 naar 4.000** is **200**.

Samen is dat:

**40 + 200 = 240**.

Er moet dus **240** bij.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We vullen 3.760 aan tot 4.000.",
  "Van **3.760 naar 3.800** is **40**.",
  "Van **3.800 naar 4.000** is **200**.",
  "Samen is dat:",
  "**40 + 200 = 240**.",
  "Er moet dus **240** bij."
]
```

### Visual stages

**Visual type:** `numberLine`. All four frames below belong to surface `bare`.

**Question stage**

```json
{
  "min": 3760,
  "max": 4000,
  "markers": [
    {
      "value": 3760,
      "label": "3.760",
      "focus": false,
      "lane": 0
    },
    {
      "value": 4000,
      "label": "4.000",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": []
}
```

**Minnie stage**

```json
{
  "min": 3760,
  "max": 4000,
  "markers": [
    {
      "value": 3760,
      "label": "3.760",
      "focus": false,
      "lane": 0
    },
    {
      "value": 3800,
      "label": "3.800",
      "focus": false,
      "lane": 1
    },
    {
      "value": 4000,
      "label": "4.000",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": []
}
```

**Moose stage**

```json
{
  "min": 3760,
  "max": 4000,
  "markers": [
    {
      "value": 3760,
      "label": "3.760",
      "focus": false,
      "lane": 0
    },
    {
      "value": 3800,
      "label": "3.800",
      "focus": false,
      "lane": 1
    },
    {
      "value": 4000,
      "label": "4.000",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [
    {
      "from": 3760,
      "to": 3800,
      "label": "+40"
    },
    {
      "from": 3800,
      "to": 4000,
      "label": "+200"
    }
  ],
  "notes": []
}
```

**Explanation stage**

```json
{
  "min": 3760,
  "max": 4000,
  "markers": [
    {
      "value": 3760,
      "label": "3.760",
      "focus": false,
      "lane": 0
    },
    {
      "value": 3800,
      "label": "3.800",
      "focus": false,
      "lane": 1
    },
    {
      "value": 4000,
      "label": "4.000",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [
    {
      "from": 3760,
      "to": 3800,
      "label": "+40"
    },
    {
      "from": 3800,
      "to": 4000,
      "label": "+200"
    }
  ],
  "notes": [
    "40 + 200 = 240"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: counter

**Question**

Een teller staat op **3.760**. Hoeveel moet er nog bij om **4.000** te bereiken?

**Minnie**

Ga eerst van 3.760 naar een handig rond getal. **3.800** ligt dichtbij.

**Moose**

Van 3.760 naar 3.800 is **40**. Van 3.800 naar 4.000 is nog **200**. Tel die twee stukken bij elkaar op.

**Full explanation**

We vullen 3.760 aan tot 4.000.

Van **3.760 naar 3.800** is **40**.

Van **3.800 naar 4.000** is **200**.

Samen is dat:

**40 + 200 = 240**.

Er moet dus **240** bij.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We vullen 3.760 aan tot 4.000.",
  "Van **3.760 naar 3.800** is **40**.",
  "Van **3.800 naar 4.000** is **200**.",
  "Samen is dat:",
  "**40 + 200 = 240**.",
  "Er moet dus **240** bij."
]
```

### Visual stages

**Visual type:** `numberLine`. All four frames below belong to surface `counter`.

**Question stage**

```json
{
  "min": 3760,
  "max": 4000,
  "markers": [
    {
      "value": 3760,
      "label": "3.760",
      "focus": false,
      "lane": 0
    },
    {
      "value": 4000,
      "label": "4.000",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": []
}
```

**Minnie stage**

```json
{
  "min": 3760,
  "max": 4000,
  "markers": [
    {
      "value": 3760,
      "label": "3.760",
      "focus": false,
      "lane": 0
    },
    {
      "value": 3800,
      "label": "3.800",
      "focus": false,
      "lane": 1
    },
    {
      "value": 4000,
      "label": "4.000",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": []
}
```

**Moose stage**

```json
{
  "min": 3760,
  "max": 4000,
  "markers": [
    {
      "value": 3760,
      "label": "3.760",
      "focus": false,
      "lane": 0
    },
    {
      "value": 3800,
      "label": "3.800",
      "focus": false,
      "lane": 1
    },
    {
      "value": 4000,
      "label": "4.000",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [
    {
      "from": 3760,
      "to": 3800,
      "label": "+40"
    },
    {
      "from": 3800,
      "to": 4000,
      "label": "+200"
    }
  ],
  "notes": []
}
```

**Explanation stage**

```json
{
  "min": 3760,
  "max": 4000,
  "markers": [
    {
      "value": 3760,
      "label": "3.760",
      "focus": false,
      "lane": 0
    },
    {
      "value": 3800,
      "label": "3.800",
      "focus": false,
      "lane": 1
    },
    {
      "value": 4000,
      "label": "4.000",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [
    {
      "from": 3760,
      "to": 3800,
      "label": "+40"
    },
    {
      "from": 3800,
      "to": 4000,
      "label": "+200"
    }
  ],
  "notes": [
    "40 + 200 = 240"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-AS-004 — Optellen · Hoeveelheden samenvoegen

**Source:** expansion 75  
**Domain:** additionSubtraction  
**Objective:** add_three_digit_context  
**Difficulty:** 1  
**Report label:** Optellen · Hoeveelheden samenvoegen  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**728 + 742 = 1.470**"
  },
  "question": {
    "answer": 1470,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "1470",
        "1.470",
        "1 470"
      ],
      "grouping": true
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `1470`.
- Answer display: `"1.470"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "1470",
  "1.470",
  "1 470"
]
```

**Accepted input:** whole-number rule above; `grouping` is `true` (numeric equivalence).

**Exact resolved answer contract:**

```json
{
  "answer": 1470,
  "answerDisplay": "1.470",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "1470",
      "1.470",
      "1 470"
    ],
    "grouping": true
  }
}
```

### Surface: supplies

**Question**

In twee voorraden liggen **728** en **742** onderdelen. Hoeveel onderdelen zijn dat samen?

**Minnie**

Splits 742 in **700, 40 en 2**. Tel die delen één voor één bij 728 op.

**Moose**

728 + 700 = **1.428**. Tel daarna eerst 40 erbij en daarna nog 2.

**Full explanation**

We splitsen **742 in 700, 40 en 2**.

Eerst:

**728 + 700 = 1.428**.

Daarna:

**1.428 + 40 = 1.468**.

En ten slotte:

**1.468 + 2 = 1.470**.

Samen zijn het dus **1.470**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen **742 in 700, 40 en 2**.",
  "Eerst:",
  "**728 + 700 = 1.428**.",
  "Daarna:",
  "**1.428 + 40 = 1.468**.",
  "En ten slotte:",
  "**1.468 + 2 = 1.470**.",
  "Samen zijn het dus **1.470**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `supplies`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "728",
        "742"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "742 = 700 + 40 + 2"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "728 + 700 = 1.428",
        "1.428 + 40 = ?",
        "+2"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "728 + 700 = 1.428",
        "1.428 + 40 = 1.468",
        "1.468 + 2 = 1.470"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: visitors

**Question**

Op twee momenten komen **728** en **742** bezoekers binnen. Hoeveel bezoekers zijn dat samen?

**Minnie**

Splits 742 in **700, 40 en 2**. Tel die delen één voor één bij 728 op.

**Moose**

728 + 700 = **1.428**. Tel daarna eerst 40 erbij en daarna nog 2.

**Full explanation**

We splitsen **742 in 700, 40 en 2**.

Eerst:

**728 + 700 = 1.428**.

Daarna:

**1.428 + 40 = 1.468**.

En ten slotte:

**1.468 + 2 = 1.470**.

Samen zijn het dus **1.470**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen **742 in 700, 40 en 2**.",
  "Eerst:",
  "**728 + 700 = 1.428**.",
  "Daarna:",
  "**1.428 + 40 = 1.468**.",
  "En ten slotte:",
  "**1.468 + 2 = 1.470**.",
  "Samen zijn het dus **1.470**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `visitors`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "728",
        "742"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "742 = 700 + 40 + 2"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "728 + 700 = 1.428",
        "1.428 + 40 = ?",
        "+2"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "728 + 700 = 1.428",
        "1.428 + 40 = 1.468",
        "1.468 + 2 = 1.470"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-AS-005 — Optellen · Over honderdtallen heen

**Source:** expansion 75  
**Domain:** additionSubtraction  
**Objective:** add_three_digit_crossing  
**Difficulty:** 2  
**Report label:** Optellen · Over honderdtallen heen  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**468 + 257 = 725**"
  },
  "question": {
    "answer": 725,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "725"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `725`.
- Answer display: `"725"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "725"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 725,
  "answerDisplay": "725",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "725"
    ]
  }
}
```

### Surface: bare

**Question**

**468 + 257 = ?**

**Minnie**

Splits 257 in **200, 50 en 7**. Tel eerst de grootste stukken op.

**Moose**

468 + 200 = **668**.  
668 + 50 = **718**.  
Nu moet er nog 7 bij.

**Full explanation**

We splitsen 257 in **200, 50 en 7**.

**468 + 200 = 668**.

**668 + 50 = 718**.

Nu nog 7. Eerst 2 erbij tot 720:

**718 + 2 = 720**.

Van de 7 blijven dan nog 5 over:

**720 + 5 = 725**.

Dus **468 + 257 = 725**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen 257 in **200, 50 en 7**.",
  "**468 + 200 = 668**.",
  "**668 + 50 = 718**.",
  "Nu nog 7. Eerst 2 erbij tot 720:",
  "**718 + 2 = 720**.",
  "Van de 7 blijven dan nog 5 over:",
  "**720 + 5 = 725**.",
  "Dus **468 + 257 = 725**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `bare`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "257 = 200 + 50 + 7"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "468 + 200 = 668",
        "668 + 50 = 718",
        "718 + 7 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "468 + 200 = 668",
        "668 + 50 = 718",
        "718 + 2 = 720",
        "720 + 5 = 725"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: parts

**Question**

Er zijn **468** onderdelen. Er komen **257** onderdelen bij. Hoeveel zijn er dan?

**Minnie**

Splits 257 in **200, 50 en 7**. Tel eerst de grootste stukken op.

**Moose**

468 + 200 = **668**.  
668 + 50 = **718**.  
Nu moet er nog 7 bij.

**Full explanation**

We splitsen 257 in **200, 50 en 7**.

**468 + 200 = 668**.

**668 + 50 = 718**.

Nu nog 7. Eerst 2 erbij tot 720:

**718 + 2 = 720**.

Van de 7 blijven dan nog 5 over:

**720 + 5 = 725**.

Dus **468 + 257 = 725**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen 257 in **200, 50 en 7**.",
  "**468 + 200 = 668**.",
  "**668 + 50 = 718**.",
  "Nu nog 7. Eerst 2 erbij tot 720:",
  "**718 + 2 = 720**.",
  "Van de 7 blijven dan nog 5 over:",
  "**720 + 5 = 725**.",
  "Dus **468 + 257 = 725**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `parts`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "257 = 200 + 50 + 7"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "468 + 200 = 668",
        "668 + 50 = 718",
        "718 + 7 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "468 + 200 = 668",
        "668 + 50 = 718",
        "718 + 2 = 720",
        "720 + 5 = 725"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-AS-006 — Aftrekken · Over honderdtallen heen

**Source:** expansion 75  
**Domain:** additionSubtraction  
**Objective:** subtract_three_digit_crossing  
**Difficulty:** 2  
**Report label:** Aftrekken · Over honderdtallen heen  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**624 − 178 = 446**"
  },
  "question": {
    "answer": 446,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "446"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `446`.
- Answer display: `"446"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "446"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 446,
  "answerDisplay": "446",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "446"
    ]
  }
}
```

### Surface: bare

**Question**

**624 − 178 = ?**

**Minnie**

Splits 178 in **100, 70 en 8**. Trek die stukken één voor één af.

**Moose**

624 − 100 = **524**.  
524 − 70 = **454**.  
Nu moet er nog 8 af.

**Full explanation**

We splitsen 178 in **100, 70 en 8**.

**624 − 100 = 524**.

**524 − 70 = 454**.

Nu nog 8 eraf. Eerst 4 eraf tot 450:

**454 − 4 = 450**.

Dan nog 4:

**450 − 4 = 446**.

Dus **624 − 178 = 446**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen 178 in **100, 70 en 8**.",
  "**624 − 100 = 524**.",
  "**524 − 70 = 454**.",
  "Nu nog 8 eraf. Eerst 4 eraf tot 450:",
  "**454 − 4 = 450**.",
  "Dan nog 4:",
  "**450 − 4 = 446**.",
  "Dus **624 − 178 = 446**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `bare`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "178 = 100 + 70 + 8"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "624 − 100 = 524",
        "524 − 70 = 454",
        "454 − 8 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "624 − 100 = 524",
        "524 − 70 = 454",
        "454 − 4 = 450",
        "450 − 4 = 446"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: remaining

**Question**

Er zijn **624** onderdelen. Er worden **178** gebruikt. Hoeveel blijven er over?

**Minnie**

Splits 178 in **100, 70 en 8**. Trek die stukken één voor één af.

**Moose**

624 − 100 = **524**.  
524 − 70 = **454**.  
Nu moet er nog 8 af.

**Full explanation**

We splitsen 178 in **100, 70 en 8**.

**624 − 100 = 524**.

**524 − 70 = 454**.

Nu nog 8 eraf. Eerst 4 eraf tot 450:

**454 − 4 = 450**.

Dan nog 4:

**450 − 4 = 446**.

Dus **624 − 178 = 446**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen 178 in **100, 70 en 8**.",
  "**624 − 100 = 524**.",
  "**524 − 70 = 454**.",
  "Nu nog 8 eraf. Eerst 4 eraf tot 450:",
  "**454 − 4 = 450**.",
  "Dan nog 4:",
  "**450 − 4 = 446**.",
  "Dus **624 − 178 = 446**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `remaining`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "178 = 100 + 70 + 8"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "624 − 100 = 524",
        "524 − 70 = 454",
        "454 − 8 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "624 − 100 = 524",
        "524 − 70 = 454",
        "454 − 4 = 450",
        "450 − 4 = 446"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-AS-007 — Optellen · Duizendtallen

**Source:** expansion 75  
**Domain:** additionSubtraction  
**Objective:** add_four_digit_and_three_digit  
**Difficulty:** 2  
**Report label:** Optellen · Duizendtallen  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 2

### Educational core

```json
{
  "values": {
    "authored": "**1.836 + 475 = 2.311**"
  },
  "question": {
    "answer": 2311,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "2311",
        "2.311",
        "2 311"
      ],
      "grouping": true
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `2311`.
- Answer display: `"2.311"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "2311",
  "2.311",
  "2 311"
]
```

**Accepted input:** whole-number rule above; `grouping` is `true` (numeric equivalence).

**Exact resolved answer contract:**

```json
{
  "answer": 2311,
  "answerDisplay": "2.311",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "2311",
      "2.311",
      "2 311"
    ],
    "grouping": true
  }
}
```

### Surface: bare

**Question**

**1.836 + 475 = ?**

**Minnie**

Splits 475 in **400, 70 en 5**. Zo hoef je niet alles tegelijk op te tellen.

**Moose**

1.836 + 400 = **2.236**.  
2.236 + 70 = **2.306**.  
Tel nu nog 5 erbij.

**Full explanation**

We splitsen 475 in **400, 70 en 5**.

**1.836 + 400 = 2.236**.

**2.236 + 70 = 2.306**.

**2.306 + 5 = 2.311**.

Dus **1.836 + 475 = 2.311**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen 475 in **400, 70 en 5**.",
  "**1.836 + 400 = 2.236**.",
  "**2.236 + 70 = 2.306**.",
  "**2.306 + 5 = 2.311**.",
  "Dus **1.836 + 475 = 2.311**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `bare`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "475 = 400 + 70 + 5"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "1.836 + 400 = 2.236",
        "2.236 + 70 = 2.306",
        "2.306 + 5 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "1.836 + 400 = 2.236",
        "2.236 + 70 = 2.306",
        "2.306 + 5 = 2.311"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: distance

**Question**

Een route is al **1.836 meter** lang. Er komt **475 meter** bij. Hoe lang is de route daarna?

**Minnie**

Splits 475 in **400, 70 en 5**. Zo hoef je niet alles tegelijk op te tellen.

**Moose**

1.836 + 400 = **2.236**.  
2.236 + 70 = **2.306**.  
Tel nu nog 5 erbij.

**Full explanation**

We splitsen 475 in **400, 70 en 5**.

**1.836 + 400 = 2.236**.

**2.236 + 70 = 2.306**.

**2.306 + 5 = 2.311**.

Dus **1.836 + 475 = 2.311**.

De route is daarna **2.311 meter** lang.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen 475 in **400, 70 en 5**.",
  "**1.836 + 400 = 2.236**.",
  "**2.236 + 70 = 2.306**.",
  "**2.306 + 5 = 2.311**.",
  "Dus **1.836 + 475 = 2.311**.",
  "De route is daarna **2.311 meter** lang."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `distance`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "475 = 400 + 70 + 5"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "1.836 + 400 = 2.236",
        "2.236 + 70 = 2.306",
        "2.306 + 5 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "1.836 + 400 = 2.236",
        "2.236 + 70 = 2.306",
        "2.306 + 5 = 2.311"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-AS-008 — Aftrekken · Duizendtallen

**Source:** expansion 75  
**Domain:** additionSubtraction  
**Objective:** subtract_four_digit_crossing  
**Difficulty:** 3  
**Report label:** Aftrekken · Duizendtallen  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**3.203 − 1.487 = 1.716**"
  },
  "question": {
    "answer": 1716,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "1716",
        "1.716",
        "1 716"
      ],
      "grouping": true
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `1716`.
- Answer display: `"1.716"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "1716",
  "1.716",
  "1 716"
]
```

**Accepted input:** whole-number rule above; `grouping` is `true` (numeric equivalence).

**Exact resolved answer contract:**

```json
{
  "answer": 1716,
  "answerDisplay": "1.716",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "1716",
      "1.716",
      "1 716"
    ],
    "grouping": true
  }
}
```

### Surface: bare

**Question**

**3.203 − 1.487 = ?**

**Minnie**

Splits 1.487 in **1.000, 400, 80 en 7**. Trek die delen stap voor stap af.

**Moose**

3.203 − 1.000 = **2.203**.  
2.203 − 400 = **1.803**.  
1.803 − 80 = **1.723**.  
Nu moet er nog 7 af.

**Full explanation**

We splitsen 1.487 in **1.000, 400, 80 en 7**.

**3.203 − 1.000 = 2.203**.

**2.203 − 400 = 1.803**.

**1.803 − 80 = 1.723**.

Nu nog 7 eraf. Eerst 3:

**1.723 − 3 = 1.720**.

Daarna nog 4:

**1.720 − 4 = 1.716**.

Dus **3.203 − 1.487 = 1.716**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen 1.487 in **1.000, 400, 80 en 7**.",
  "**3.203 − 1.000 = 2.203**.",
  "**2.203 − 400 = 1.803**.",
  "**1.803 − 80 = 1.723**.",
  "Nu nog 7 eraf. Eerst 3:",
  "**1.723 − 3 = 1.720**.",
  "Daarna nog 4:",
  "**1.720 − 4 = 1.716**.",
  "Dus **3.203 − 1.487 = 1.716**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `bare`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "1.487 = 1.000 + 400 + 80 + 7"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "3.203 − 1.000 = 2.203",
        "2.203 − 400 = 1.803",
        "1.803 − 80 = 1.723",
        "1.723 − 7 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "3.203 − 1.000 = 2.203",
        "2.203 − 400 = 1.803",
        "1.803 − 80 = 1.723",
        "1.723 − 3 = 1.720",
        "1.720 − 4 = 1.716"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: stock

**Question**

Er zijn **3.203** onderdelen opgeslagen. **1.487** worden meegenomen. Hoeveel blijven er achter?

**Minnie**

Splits 1.487 in **1.000, 400, 80 en 7**. Trek die delen stap voor stap af.

**Moose**

3.203 − 1.000 = **2.203**.  
2.203 − 400 = **1.803**.  
1.803 − 80 = **1.723**.  
Nu moet er nog 7 af.

**Full explanation**

We splitsen 1.487 in **1.000, 400, 80 en 7**.

**3.203 − 1.000 = 2.203**.

**2.203 − 400 = 1.803**.

**1.803 − 80 = 1.723**.

Nu nog 7 eraf. Eerst 3:

**1.723 − 3 = 1.720**.

Daarna nog 4:

**1.720 − 4 = 1.716**.

Dus **3.203 − 1.487 = 1.716**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen 1.487 in **1.000, 400, 80 en 7**.",
  "**3.203 − 1.000 = 2.203**.",
  "**2.203 − 400 = 1.803**.",
  "**1.803 − 80 = 1.723**.",
  "Nu nog 7 eraf. Eerst 3:",
  "**1.723 − 3 = 1.720**.",
  "Daarna nog 4:",
  "**1.720 − 4 = 1.716**.",
  "Dus **3.203 − 1.487 = 1.716**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `stock`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "1.487 = 1.000 + 400 + 80 + 7"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "3.203 − 1.000 = 2.203",
        "2.203 − 400 = 1.803",
        "1.803 − 80 = 1.723",
        "1.723 − 7 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "3.203 − 1.000 = 2.203",
        "2.203 − 400 = 1.803",
        "1.803 − 80 = 1.723",
        "1.723 − 3 = 1.720",
        "1.720 − 4 = 1.716"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-MD-001 — Vermenigvuldigen · Tientallen en eenheden splitsen

**Source:** expansion 75  
**Domain:** multiplicationDivision  
**Objective:** multiply_one_digit_two_digit  
**Difficulty:** 1  
**Report label:** Vermenigvuldigen · Tientallen en eenheden splitsen  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**6 × 24 = 144**"
  },
  "question": {
    "answer": 144,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "144"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `144`.
- Answer display: `"144"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "144"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 144,
  "answerDisplay": "144",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "144"
    ]
  }
}
```

### Surface: bare

**Question**

**6 × 24 = ?**

**Minnie**

Splits 24 in **20 en 4**. Reken eerst 6 × 20 en daarna 6 × 4.

**Moose**

6 × 20 = **120**. Reken nu 6 × 4 en tel dat antwoord bij 120 op.

**Full explanation**

We splitsen 24 in **20 en 4**.

**6 × 20 = 120**.

**6 × 4 = 24**.

Tel die twee uitkomsten bij elkaar op:

**120 + 24 = 144**.

Dus **6 × 24 = 144**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen 24 in **20 en 4**.",
  "**6 × 20 = 120**.",
  "**6 × 4 = 24**.",
  "Tel die twee uitkomsten bij elkaar op:",
  "**120 + 24 = 144**.",
  "Dus **6 × 24 = 144**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `bare`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "24 = 20 + 4"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "6 × 20 = 120",
        "6 × 4 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "6 × 20 = 120",
        "6 × 4 = 24",
        "120 + 24 = 144"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: groups

**Question**

Er zijn **6 dozen** met elk **24 onderdelen**. Hoeveel onderdelen zijn dat samen?

**Minnie**

Splits 24 in **20 en 4**. Reken eerst 6 × 20 en daarna 6 × 4.

**Moose**

6 × 20 = **120**. Reken nu 6 × 4 en tel dat antwoord bij 120 op.

**Full explanation**

We splitsen 24 in **20 en 4**.

**6 × 20 = 120**.

**6 × 4 = 24**.

Tel die twee uitkomsten bij elkaar op:

**120 + 24 = 144**.

Dus **6 × 24 = 144**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen 24 in **20 en 4**.",
  "**6 × 20 = 120**.",
  "**6 × 4 = 24**.",
  "Tel die twee uitkomsten bij elkaar op:",
  "**120 + 24 = 144**.",
  "Dus **6 × 24 = 144**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `groups`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "24 = 20 + 4"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "6 × 20 = 120",
        "6 × 4 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "6 × 20 = 120",
        "6 × 4 = 24",
        "120 + 24 = 144"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-MD-002 — Delen · Groepjes maken

**Source:** expansion 75  
**Domain:** multiplicationDivision  
**Objective:** division_grouping  
**Difficulty:** 1  
**Report label:** Delen · Groepjes maken  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**160 ÷ 16 = 10 groepen**"
  },
  "question": {
    "answer": 10,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "10"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `10`.
- Answer display: `"10"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "10"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 10,
  "answerDisplay": "10",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "10"
    ]
  }
}
```

### Surface: pages

**Question**

Een boek heeft **160 pagina’s**. Je leest steeds **16 pagina’s**. Hoeveel keer moet je 16 pagina’s lezen om het boek uit te krijgen?

**Minnie**

Je zoekt niet hoeveel er in één groep komt. Je weet al dat elke groep 16 bevat. Je zoekt **hoeveel groepjes van 16** er in 160 passen.

**Moose**

Denk aan de keersom **16 × ? = 160**. Tien groepjes van 16 kun je controleren met 16 × 10.

**Full explanation**

We zoeken hoeveel groepjes van 16 in 160 passen.

Dat is dezelfde vraag als:

**16 × ? = 160**.

**16 × 10 = 160**.

Er passen dus **10 groepjes van 16** in 160.

Het antwoord is **10**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We zoeken hoeveel groepjes van 16 in 160 passen.",
  "Dat is dezelfde vraag als:",
  "**16 × ? = 160**.",
  "**16 × 10 = 160**.",
  "Er passen dus **10 groepjes van 16** in 160.",
  "Het antwoord is **10**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `pages`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "160 totaal",
        "16 per groep",
        "? groepen"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "160 totaal",
        "16 per groep",
        "? groepen",
        "160 → groepjes van 16 → ? groepen"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "16 × ? = 160"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "16 × 10 = 160",
        "160 : 16 = 10",
        "10 groepen"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: packs

**Question**

Er zijn **160 onderdelen**. In elk pakket gaan **16 onderdelen**. Hoeveel pakketten kun je maken?

**Minnie**

Je zoekt niet hoeveel er in één groep komt. Je weet al dat elke groep 16 bevat. Je zoekt **hoeveel groepjes van 16** er in 160 passen.

**Moose**

Denk aan de keersom **16 × ? = 160**. Tien groepjes van 16 kun je controleren met 16 × 10.

**Full explanation**

We zoeken hoeveel groepjes van 16 in 160 passen.

Dat is dezelfde vraag als:

**16 × ? = 160**.

**16 × 10 = 160**.

Er passen dus **10 groepjes van 16** in 160.

Het antwoord is **10**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We zoeken hoeveel groepjes van 16 in 160 passen.",
  "Dat is dezelfde vraag als:",
  "**16 × ? = 160**.",
  "**16 × 10 = 160**.",
  "Er passen dus **10 groepjes van 16** in 160.",
  "Het antwoord is **10**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `packs`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "160 totaal",
        "16 per groep",
        "? groepen"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "160 totaal",
        "16 per groep",
        "? groepen",
        "160 → groepjes van 16 → ? groepen"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "16 × ? = 160"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "16 × 10 = 160",
        "160 : 16 = 10",
        "10 groepen"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-MD-003 — Vermenigvuldigen · Veel gelijke groepen

**Source:** expansion 75  
**Domain:** multiplicationDivision  
**Objective:** multiply_by_twenty_context  
**Difficulty:** 1  
**Report label:** Vermenigvuldigen · Veel gelijke groepen  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**20 × 18 = 360**"
  },
  "question": {
    "answer": 360,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "360"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `360`.
- Answer display: `"360"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "360"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 360,
  "answerDisplay": "360",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "360"
    ]
  }
}
```

### Surface: tickets

**Question**

Er worden **20 kaartjes** verkocht voor **18 euro per stuk**. Hoeveel euro is dat samen?

**Minnie**

20 is twee keer 10. Reken eerst **10 × 18**.

**Moose**

10 × 18 = **180**. Twintig groepjes zijn twee keer zoveel als tien groepjes. Verdubbel 180.

**Full explanation**

Eerst rekenen we met 10 groepjes:

**10 × 18 = 180**.

Maar we hebben **20 groepjes**. Dat is twee keer zoveel.

**180 + 180 = 360**.

Dus **20 × 18 = 360**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Eerst rekenen we met 10 groepjes:",
  "**10 × 18 = 180**.",
  "Maar we hebben **20 groepjes**. Dat is twee keer zoveel.",
  "**180 + 180 = 360**.",
  "Dus **20 × 18 = 360**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `tickets`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "20 × 18 = ?"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "20 = 10 + 10",
        "10 × 18",
        "10 × 18"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "10 × 18 = 180",
        "20 × 18 = 180 + 180",
        "180 + 180 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "10 × 18 = 180",
        "180 + 180 = 360",
        "20 × 18 = 360"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: boxes

**Question**

Er zijn **20 dozen** met elk **18 onderdelen**. Hoeveel onderdelen zijn dat samen?

**Minnie**

20 is twee keer 10. Reken eerst **10 × 18**.

**Moose**

10 × 18 = **180**. Twintig groepjes zijn twee keer zoveel als tien groepjes. Verdubbel 180.

**Full explanation**

Eerst rekenen we met 10 groepjes:

**10 × 18 = 180**.

Maar we hebben **20 groepjes**. Dat is twee keer zoveel.

**180 + 180 = 360**.

Dus **20 × 18 = 360**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Eerst rekenen we met 10 groepjes:",
  "**10 × 18 = 180**.",
  "Maar we hebben **20 groepjes**. Dat is twee keer zoveel.",
  "**180 + 180 = 360**.",
  "Dus **20 × 18 = 360**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `boxes`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "20 × 18 = ?"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "20 = 10 + 10",
        "10 × 18",
        "10 × 18"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "10 × 18 = 180",
        "20 × 18 = 180 + 180",
        "180 + 180 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "10 × 18 = 180",
        "180 + 180 = 360",
        "20 × 18 = 360"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-MD-004 — Delen · Gelijk verdelen

**Source:** expansion 75  
**Domain:** multiplicationDivision  
**Objective:** division_sharing  
**Difficulty:** 1  
**Report label:** Delen · Gelijk verdelen  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**84 ÷ 7 = 12**"
  },
  "question": {
    "answer": 12,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "12"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `12`.
- Answer display: `"12"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "12"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 12,
  "answerDisplay": "12",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "12"
    ]
  }
}
```

### Surface: boxes

**Question**

Verdeel **84 onderdelen** eerlijk over **7 bakken**. Hoeveel onderdelen komen in elke bak?

**Minnie**

Je verdeelt 84 eerlijk over 7 gelijke groepen. Zoek dus hoeveel er in **één groep** komt.

**Moose**

Gebruik de omgekeerde keersom: **7 × ? = 84**. Denk eerst aan 7 × 10 = 70. Hoeveel moet er daarna nog bij?

**Full explanation**

We verdelen 84 over 7 gelijke groepen.

**7 × 10 = 70**.

Van 70 naar 84 ontbreken nog **14**.

**7 × 2 = 14**.

Dus:

**7 × 12 = 84**.

Daarom is:

**84 ÷ 7 = 12**.

Elke groep krijgt **12**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We verdelen 84 over 7 gelijke groepen.",
  "**7 × 10 = 70**.",
  "Van 70 naar 84 ontbreken nog **14**.",
  "**7 × 2 = 14**.",
  "Dus:",
  "**7 × 12 = 84**.",
  "Daarom is:",
  "**84 ÷ 7 = 12**.",
  "Elke groep krijgt **12**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `boxes`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "84 totaal",
        "7 gelijke groepen",
        "? per groep"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "84 totaal",
        "7 gelijke groepen",
        "? per groep",
        "84 : 7 = ?"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "7 × ? = 84",
        "7 × 10 = 70",
        "84 − 70 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "7 × 10 = 70",
        "84 − 70 = 14",
        "7 × 2 = 14",
        "10 + 2 = 12",
        "84 : 7 = 12"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: teams

**Question**

Verdeel **84 kaartjes** eerlijk over **7 teams**. Hoeveel kaartjes krijgt elk team?

**Minnie**

Je verdeelt 84 eerlijk over 7 gelijke groepen. Zoek dus hoeveel er in **één groep** komt.

**Moose**

Gebruik de omgekeerde keersom: **7 × ? = 84**. Denk eerst aan 7 × 10 = 70. Hoeveel moet er daarna nog bij?

**Full explanation**

We verdelen 84 over 7 gelijke groepen.

**7 × 10 = 70**.

Van 70 naar 84 ontbreken nog **14**.

**7 × 2 = 14**.

Dus:

**7 × 12 = 84**.

Daarom is:

**84 ÷ 7 = 12**.

Elke groep krijgt **12**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We verdelen 84 over 7 gelijke groepen.",
  "**7 × 10 = 70**.",
  "Van 70 naar 84 ontbreken nog **14**.",
  "**7 × 2 = 14**.",
  "Dus:",
  "**7 × 12 = 84**.",
  "Daarom is:",
  "**84 ÷ 7 = 12**.",
  "Elke groep krijgt **12**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `teams`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "84 totaal",
        "7 gelijke groepen",
        "? per groep"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "84 totaal",
        "7 gelijke groepen",
        "? per groep",
        "84 : 7 = ?"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "7 × ? = 84",
        "7 × 10 = 70",
        "84 − 70 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "7 × 10 = 70",
        "84 − 70 = 14",
        "7 × 2 = 14",
        "10 + 2 = 12",
        "84 : 7 = 12"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-MD-005 — Vermenigvuldigen · Tientallen

**Source:** expansion 75  
**Domain:** multiplicationDivision  
**Objective:** multiply_by_multiple_of_ten  
**Difficulty:** 1  
**Report label:** Vermenigvuldigen · Tientallen  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**7 × 40 = 280**"
  },
  "question": {
    "answer": 280,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "280"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `280`.
- Answer display: `"280"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "280"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 280,
  "answerDisplay": "280",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "280"
    ]
  }
}
```

### Surface: bare

**Question**

**7 × 40 = ?**

**Minnie**

Denk bij 40 aan **4 tientallen**. Reken eerst 7 × 4.

**Moose**

7 × 4 = **28**. Maar je rekent met tientallen: het zijn dus **28 tientallen**. Hoeveel is dat?

**Full explanation**

40 is hetzelfde als **4 tientallen**.

Eerst rekenen we:

**7 × 4 = 28**.

Dat zijn **28 tientallen**.

28 tientallen zijn:

**28 × 10 = 280**.

Dus **7 × 40 = 280**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "40 is hetzelfde als **4 tientallen**.",
  "Eerst rekenen we:",
  "**7 × 4 = 28**.",
  "Dat zijn **28 tientallen**.",
  "28 tientallen zijn:",
  "**28 × 10 = 280**.",
  "Dus **7 × 40 = 280**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `bare`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "40 = 4 tientallen"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "7 × 4 = 28",
        "28 tientallen = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "7 × 4 = 28",
        "28 tientallen = 280"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: bundles

**Question**

Er zijn **7 bundels** met elk **40 onderdelen**. Hoeveel onderdelen zijn dat samen?

**Minnie**

Denk bij 40 aan **4 tientallen**. Reken eerst 7 × 4.

**Moose**

7 × 4 = **28**. Maar je rekent met tientallen: het zijn dus **28 tientallen**. Hoeveel is dat?

**Full explanation**

40 is hetzelfde als **4 tientallen**.

Eerst rekenen we:

**7 × 4 = 28**.

Dat zijn **28 tientallen**.

28 tientallen zijn:

**28 × 10 = 280**.

Dus **7 × 40 = 280**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "40 is hetzelfde als **4 tientallen**.",
  "Eerst rekenen we:",
  "**7 × 4 = 28**.",
  "Dat zijn **28 tientallen**.",
  "28 tientallen zijn:",
  "**28 × 10 = 280**.",
  "Dus **7 × 40 = 280**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `bundles`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "40 = 4 tientallen"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "7 × 4 = 28",
        "28 tientallen = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "7 × 4 = 28",
        "28 tientallen = 280"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-MD-006 — Delen · Grotere deelsom

**Source:** expansion 75  
**Domain:** multiplicationDivision  
**Objective:** divide_three_digit_by_one_digit  
**Difficulty:** 2  
**Report label:** Delen · Grotere deelsom  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**168 ÷ 7 = 24**"
  },
  "question": {
    "answer": 24,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "24"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `24`.
- Answer display: `"24"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "24"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 24,
  "answerDisplay": "24",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "24"
    ]
  }
}
```

### Surface: bare

**Question**

**168 : 7 = ?**

**Minnie**

Splits 168 in twee stukken die makkelijk door 7 te delen zijn. **140 en 28** werken goed.

**Moose**

140 : 7 = **20**.  
Er blijft nog 28 over. Reken 28 : 7 en tel dat bij 20 op.

**Full explanation**

We splitsen 168 in **140 en 28**.

**140 : 7 = 20**.

**28 : 7 = 4**.

Samen:

**20 + 4 = 24**.

Dus **168 : 7 = 24**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen 168 in **140 en 28**.",
  "**140 : 7 = 20**.",
  "**28 : 7 = 4**.",
  "Samen:",
  "**20 + 4 = 24**.",
  "Dus **168 : 7 = 24**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `bare`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "168 = 140 + 28"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "140 : 7 = 20",
        "28 : 7 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "140 : 7 = 20",
        "28 : 7 = 4",
        "20 + 4 = 24"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: sharing

**Question**

Verdeel **168 onderdelen** eerlijk over **7 groepen**. Hoeveel krijgt elke groep?

**Minnie**

Splits 168 in twee stukken die makkelijk door 7 te delen zijn. **140 en 28** werken goed.

**Moose**

140 : 7 = **20**.  
Er blijft nog 28 over. Reken 28 : 7 en tel dat bij 20 op.

**Full explanation**

We splitsen 168 in **140 en 28**.

**140 : 7 = 20**.

**28 : 7 = 4**.

Samen:

**20 + 4 = 24**.

Dus **168 : 7 = 24**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen 168 in **140 en 28**.",
  "**140 : 7 = 20**.",
  "**28 : 7 = 4**.",
  "Samen:",
  "**20 + 4 = 24**.",
  "Dus **168 : 7 = 24**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `sharing`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "168 = 140 + 28"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "140 : 7 = 20",
        "28 : 7 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "140 : 7 = 20",
        "28 : 7 = 4",
        "20 + 4 = 24"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-MD-007 — Vermenigvuldigen · Grotere keersom

**Source:** expansion 75  
**Domain:** multiplicationDivision  
**Objective:** multiply_one_digit_two_digit_crossing  
**Difficulty:** 2  
**Report label:** Vermenigvuldigen · Grotere keersom  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**8 × 38 = 304**"
  },
  "question": {
    "answer": 304,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "304"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `304`.
- Answer display: `"304"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "304"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 304,
  "answerDisplay": "304",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "304"
    ]
  }
}
```

### Surface: bare

**Question**

**8 × 38 = ?**

**Minnie**

Splits 38 in **30 en 8**. Reken beide stukken apart uit.

**Moose**

8 × 30 = **240**.  
8 × 8 = **64**.  
Tel 240 en 64 bij elkaar op.

**Full explanation**

We splitsen 38 in **30 en 8**.

**8 × 30 = 240**.

**8 × 8 = 64**.

Daarna tellen we de twee uitkomsten op:

**240 + 64 = 304**.

Dus **8 × 38 = 304**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen 38 in **30 en 8**.",
  "**8 × 30 = 240**.",
  "**8 × 8 = 64**.",
  "Daarna tellen we de twee uitkomsten op:",
  "**240 + 64 = 304**.",
  "Dus **8 × 38 = 304**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `bare`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "38 = 30 + 8"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "8 × 30 = 240",
        "8 × 8 = 64"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "8 × 30 = 240",
        "8 × 8 = 64",
        "240 + 64 = 304"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: crates

**Question**

Er staan **8 kratten** met elk **38 onderdelen**. Hoeveel onderdelen zijn dat samen?

**Minnie**

Splits 38 in **30 en 8**. Reken beide stukken apart uit.

**Moose**

8 × 30 = **240**.  
8 × 8 = **64**.  
Tel 240 en 64 bij elkaar op.

**Full explanation**

We splitsen 38 in **30 en 8**.

**8 × 30 = 240**.

**8 × 8 = 64**.

Daarna tellen we de twee uitkomsten op:

**240 + 64 = 304**.

Dus **8 × 38 = 304**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen 38 in **30 en 8**.",
  "**8 × 30 = 240**.",
  "**8 × 8 = 64**.",
  "Daarna tellen we de twee uitkomsten op:",
  "**240 + 64 = 304**.",
  "Dus **8 × 38 = 304**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `crates`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "38 = 30 + 8"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "8 × 30 = 240",
        "8 × 8 = 64"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "8 × 30 = 240",
        "8 × 8 = 64",
        "240 + 64 = 304"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-MD-008 — Delen · Aantal groepen bepalen

**Source:** expansion 75  
**Domain:** multiplicationDivision  
**Objective:** division_grouping_context  
**Difficulty:** 2  
**Report label:** Delen · Aantal groepen bepalen  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 2

### Educational core

```json
{
  "values": {
    "authored": "**400 ÷ 40 = 10**"
  },
  "question": {
    "answer": 10,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "10"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `10`.
- Answer display: `"10"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "10"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 10,
  "answerDisplay": "10",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "10"
    ]
  }
}
```

### Surface: budget

**Question**

Er is **€400** beschikbaar. Elk pakket kost **€40**. Hoeveel pakketten kunnen er worden gekocht?

**Minnie**

Je weet hoeveel één groep kost. Zoek hoeveel groepjes van **40** er in **400** passen.

**Moose**

Denk aan de omgekeerde keersom: **40 × ? = 400**. Je kunt eerst de nullen even wegdenken en 4 × ? = 40 gebruiken.

**Full explanation**

We zoeken hoeveel groepen van 40 in 400 passen.

De omgekeerde keersom is:

**40 × ? = 400**.

Omdat:

**40 × 10 = 400**,

geldt ook:

**400 : 40 = 10**.

Er kunnen dus **10 groepen** worden gemaakt.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We zoeken hoeveel groepen van 40 in 400 passen.",
  "De omgekeerde keersom is:",
  "**40 × ? = 400**.",
  "Omdat:",
  "**40 × 10 = 400**,",
  "geldt ook:",
  "**400 : 40 = 10**.",
  "Er kunnen dus **10 groepen** worden gemaakt."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `budget`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "40 × ? = 400"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "4 × ? = 40"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "40 × 10 = 400",
        "400 : 40 = 10"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: length

**Question**

Er is **400 meter** kabel. Voor één traject is **40 meter** nodig. Voor hoeveel trajecten is er genoeg kabel?

**Minnie**

Je weet hoeveel één groep gebruikt. Zoek hoeveel groepjes van **40** er in **400** passen.

**Moose**

Denk aan de omgekeerde keersom: **40 × ? = 400**. Je kunt eerst de nullen even wegdenken en 4 × ? = 40 gebruiken.

**Full explanation**

We zoeken hoeveel groepen van 40 in 400 passen.

De omgekeerde keersom is:

**40 × ? = 400**.

Omdat:

**40 × 10 = 400**,

geldt ook:

**400 : 40 = 10**.

Er kunnen dus **10 groepen** worden gemaakt.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We zoeken hoeveel groepen van 40 in 400 passen.",
  "De omgekeerde keersom is:",
  "**40 × ? = 400**.",
  "Omdat:",
  "**40 × 10 = 400**,",
  "geldt ook:",
  "**400 : 40 = 10**.",
  "Er kunnen dus **10 groepen** worden gemaakt."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `length`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "40 × ? = 400"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "4 × ? = 40"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "40 × 10 = 400",
        "400 : 40 = 10"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-MD-009 — Delen · Rest betekenis geven

**Source:** expansion 75  
**Domain:** multiplicationDivision  
**Objective:** division_remainder_round_up_context  
**Difficulty:** 3  
**Report label:** Delen · Rest betekenis geven  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 2

### Educational core

```json
{
  "values": {
    "authored": "**29 items, maximaal 6 per doos → 5 dozen nodig**"
  },
  "question": {
    "answer": 5,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "5"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `5`.
- Answer display: `"5"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "5"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 5,
  "answerDisplay": "5",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "5"
    ]
  }
}
```

### Surface: boxes

**Question**

Er moeten **29 onderdelen** worden ingepakt. In één doos passen maximaal **6 onderdelen**. Hoeveel dozen zijn er minimaal nodig?

**Minnie**

Kijk eerst hoeveel je met **4 groepen van 6** kunt inpakken.

**Moose**

4 × 6 = **24**.  
Van de 29 blijven dan **5** over. Die 5 hebben nog steeds een plek nodig.

**Full explanation**

Met 4 dozen kun je kwijt:

**4 × 6 = 24**.

Maar er zijn 29 onderdelen.

Er blijven dus over:

**29 − 24 = 5**.

Voor die 5 is nog één extra doos nodig.

Dus zijn er minimaal:

**4 + 1 = 5**.

Het antwoord is **5**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Met 4 dozen kun je kwijt:",
  "**4 × 6 = 24**.",
  "Maar er zijn 29 onderdelen.",
  "Er blijven dus over:",
  "**29 − 24 = 5**.",
  "Voor die 5 is nog één extra doos nodig.",
  "Dus zijn er minimaal:",
  "**4 + 1 = 5**.",
  "Het antwoord is **5**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `boxes`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "29",
        "6 per groep"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "6 × 4 = 24"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "29 − 24 = 5"
      ]
    }
  ],
  "quantities": [
    {
      "label": "?",
      "count": 0
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [],
  "quantities": [
    {
      "label": "6",
      "count": 6
    },
    {
      "label": "6",
      "count": 6
    },
    {
      "label": "6",
      "count": 6
    },
    {
      "label": "6",
      "count": 6
    },
    {
      "label": "5",
      "count": 5
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: vehicles

**Question**

Er moeten **29 mensen** mee. In één voertuig passen maximaal **6 mensen**. Hoeveel voertuigen zijn er minimaal nodig?

**Minnie**

Kijk eerst hoeveel je met **4 groepen van 6** kunt meenemen.

**Moose**

4 × 6 = **24**.  
Van de 29 blijven dan **5** over. Die 5 hebben nog steeds een plek nodig.

**Full explanation**

Met 4 voertuigen kun je kwijt:

**4 × 6 = 24**.

Maar er zijn 29 mensen.

Er blijven dus over:

**29 − 24 = 5**.

Voor die 5 is nog één extra voertuig nodig.

Dus zijn er minimaal:

**4 + 1 = 5**.

Het antwoord is **5**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Met 4 voertuigen kun je kwijt:",
  "**4 × 6 = 24**.",
  "Maar er zijn 29 mensen.",
  "Er blijven dus over:",
  "**29 − 24 = 5**.",
  "Voor die 5 is nog één extra voertuig nodig.",
  "Dus zijn er minimaal:",
  "**4 + 1 = 5**.",
  "Het antwoord is **5**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `vehicles`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "29",
        "6 per groep"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "6 × 4 = 24"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "29 − 24 = 5"
      ]
    }
  ],
  "quantities": [
    {
      "label": "?",
      "count": 0
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [],
  "quantities": [
    {
      "label": "6",
      "count": 6
    },
    {
      "label": "6",
      "count": 6
    },
    {
      "label": "6",
      "count": 6
    },
    {
      "label": "6",
      "count": 6
    },
    {
      "label": "5",
      "count": 5
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-MD-010 — Vermenigvuldigen · Meerstaps context

**Source:** expansion 75  
**Domain:** multiplicationDivision  
**Objective:** multiply_two_layers_context  
**Difficulty:** 3  
**Report label:** Vermenigvuldigen · Meerstaps context  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 2

### Educational core

```json
{
  "values": {
    "authored": "**7 groepen × 6 rijen × 8 items = 336**"
  },
  "question": {
    "answer": 336,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "336"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `336`.
- Answer display: `"336"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "336"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 336,
  "answerDisplay": "336",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "336"
    ]
  }
}
```

### Surface: storage

**Question**

Er staan **7 rekken**. Elk rek heeft **6 rijen** met **8 onderdelen per rij**. Hoeveel onderdelen zijn dat samen?

**Minnie**

Reken eerst uit hoeveel onderdelen er in **één rek** zitten. Daarvoor gebruik je 6 × 8.

**Moose**

6 × 8 = **48**.  
Eén rek heeft dus 48 onderdelen. Er zijn er 7. Reken nu **7 × 48**.

**Full explanation**

Eerst rekenen we één rek uit:

**6 × 8 = 48**.

Er zijn **7** van zulke rekken.

Dus rekenen we:

**7 × 48**.

Splits 48 in 40 en 8:

**7 × 40 = 280**.

**7 × 8 = 56**.

Samen:

**280 + 56 = 336**.

Het totaal is dus **336**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Eerst rekenen we één rek uit:",
  "**6 × 8 = 48**.",
  "Er zijn **7** van zulke rekken.",
  "Dus rekenen we:",
  "**7 × 48**.",
  "Splits 48 in 40 en 8:",
  "**7 × 40 = 280**.",
  "**7 × 8 = 56**.",
  "Samen:",
  "**280 + 56 = 336**.",
  "Het totaal is dus **336**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `storage`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "7 × 6 × 8"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "6 × 8"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "6 × 8 = 48",
        "7 × 48 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "6 × 8 = 48",
        "7 × 40 = 280",
        "7 × 8 = 56",
        "280 + 56 = 336"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: seating

**Question**

Er zijn **7 vakken**. Elk vak heeft **6 rijen** met **8 plaatsen per rij**. Hoeveel plaatsen zijn dat samen?

**Minnie**

Reken eerst uit hoeveel plaatsen er in **één vak** zitten. Daarvoor gebruik je 6 × 8.

**Moose**

6 × 8 = **48**.  
Eén vak heeft dus 48 plaatsen. Er zijn er 7. Reken nu **7 × 48**.

**Full explanation**

Eerst rekenen we één vak uit:

**6 × 8 = 48**.

Er zijn **7** van zulke vakken.

Dus rekenen we:

**7 × 48**.

Splits 48 in 40 en 8:

**7 × 40 = 280**.

**7 × 8 = 56**.

Samen:

**280 + 56 = 336**.

Het totaal is dus **336**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Eerst rekenen we één vak uit:",
  "**6 × 8 = 48**.",
  "Er zijn **7** van zulke vakken.",
  "Dus rekenen we:",
  "**7 × 48**.",
  "Splits 48 in 40 en 8:",
  "**7 × 40 = 280**.",
  "**7 × 8 = 56**.",
  "Samen:",
  "**280 + 56 = 336**.",
  "Het totaal is dus **336**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `seating`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "7 × 6 × 8"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "6 × 8"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "6 × 8 = 48",
        "7 × 48 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "6 × 8 = 48",
        "7 × 40 = 280",
        "7 × 8 = 56",
        "280 + 56 = 336"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-FR-001 — Breuken · Breuk herkennen

**Source:** expansion 75  
**Domain:** fractionsRatios  
**Objective:** identify_fraction_from_visual  
**Difficulty:** 1  
**Report label:** Breuken · Breuk herkennen  
**Answer mode:** multipleChoice  
**Visual/presentation:** fractionStrip / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**3 van 8 gelijke delen gekleurd → 3/8**"
  },
  "question": {
    "answer": "3/8",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "3/8",
      "5/8",
      "3/5",
      "8/3"
    ],
    "choiceParts": {
      "3/8": [
        {
          "numerator": 3,
          "denominator": 8
        }
      ],
      "5/8": [
        {
          "numerator": 5,
          "denominator": 8
        }
      ],
      "3/5": [
        {
          "numerator": 3,
          "denominator": 5
        }
      ],
      "8/3": [
        {
          "numerator": 8,
          "denominator": 3
        }
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `"3/8"`.
- Answer display: `"3/8"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "3/8",
  "5/8",
  "3/5",
  "8/3"
]
```

**Rich choice presentation:**

```json
{
  "3/8": [
    {
      "numerator": 3,
      "denominator": 8
    }
  ],
  "5/8": [
    {
      "numerator": 5,
      "denominator": 8
    }
  ],
  "3/5": [
    {
      "numerator": 3,
      "denominator": 5
    }
  ],
  "8/3": [
    {
      "numerator": 8,
      "denominator": 3
    }
  ]
}
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "3/8",
  "answerDisplay": "3/8",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "3/8",
    "5/8",
    "3/5",
    "8/3"
  ],
  "choiceParts": {
    "3/8": [
      {
        "numerator": 3,
        "denominator": 8
      }
    ],
    "5/8": [
      {
        "numerator": 5,
        "denominator": 8
      }
    ],
    "3/5": [
      {
        "numerator": 3,
        "denominator": 5
      }
    ],
    "8/3": [
      {
        "numerator": 8,
        "denominator": 3
      }
    ]
  }
}
```

### Surface: original

**Question**

De strook is verdeeld in **8 gelijke delen**. **3 delen** zijn gekleurd.

Welke breuk hoort daarbij?

**Minnie**

De **noemer** vertelt in hoeveel gelijke delen het geheel is verdeeld. Tel eerst hoeveel delen er in totaal zijn.

**Moose**

Er zijn **8 delen in totaal** en **3 daarvan zijn gekleurd**. Het aantal gekleurde delen komt boven de breukstreep.

**Full explanation**

De strook is verdeeld in **8 gelijke delen**.

Daarvan zijn **3 delen gekleurd**.

Bij een breuk staat het aantal gekozen of gekleurde delen bovenaan en het totaal aantal gelijke delen onderaan.

Dus de breuk is **3/8**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "De strook is verdeeld in **8 gelijke delen**.",
  "Daarvan zijn **3 delen gekleurd**.",
  "Bij een breuk staat het aantal gekozen of gekleurde delen bovenaan en het totaal aantal gelijke delen onderaan.",
  "Dus de breuk is **3/8**."
]
```

**Resolved rich presentation parts:**

```json
{
  "explanationStepParts": [
    "De strook is verdeeld in **8 gelijke delen**.",
    "Daarvan zijn **3 delen gekleurd**.",
    "Bij een breuk staat het aantal gekozen of gekleurde delen bovenaan en het totaal aantal gelijke delen onderaan.",
    [
      "Dus de breuk is ",
      {
        "strong": [
          {
            "numerator": 3,
            "denominator": 8
          }
        ]
      },
      "."
    ]
  ]
}
```

### Visual stages

**Visual type:** `fractionStrip`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "totalLabel": "",
  "segments": [
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ]
}
```

**Minnie stage**

```json
{
  "totalLabel": "8 delen in totaal",
  "segments": [
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ],
  "focus": [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ]
}
```

**Moose stage**

```json
{
  "totalLabel": "8 delen in totaal",
  "segments": [
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ],
  "focus": [
    0,
    1,
    2
  ],
  "notes": [
    "3 gekleurd"
  ]
}
```

**Explanation stage**

```json
{
  "totalLabel": "8 delen in totaal",
  "segments": [
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ],
  "notes": [
    [
      {
        "numerator": 3,
        "denominator": 8
      }
    ],
    "teller: 3 gekleurd",
    "noemer: 8 delen in totaal"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-FR-002 — Breuken · Helft van een hoeveelheid

**Source:** expansion 75  
**Domain:** fractionsRatios  
**Objective:** fraction_of_quantity_half  
**Difficulty:** 1  
**Report label:** Breuken · Helft van een hoeveelheid  
**Answer mode:** open  
**Visual/presentation:** fractionStrip / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**1/2 van 18 = 9**"
  },
  "question": {
    "answer": 9,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "9"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `9`.
- Answer display: `"9"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "9"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 9,
  "answerDisplay": "9",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "9"
    ]
  }
}
```

### Surface: items

**Question**

Er zijn **18 onderdelen**. De helft wordt gebruikt. Hoeveel onderdelen is dat?

**Minnie**

Een helft betekent dat je het geheel in **2 gelijke delen** verdeelt.

**Moose**

Verdeel 18 in 2 gelijke delen. Reken dus **18 : 2**.

**Full explanation**

Een helft is **1 van 2 gelijke delen**.

Daarom delen we 18 door 2:

**18 : 2 = 9**.

De helft van 18 is dus **9**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Een helft is **1 van 2 gelijke delen**.",
  "Daarom delen we 18 door 2:",
  "**18 : 2 = 9**.",
  "De helft van 18 is dus **9**."
]
```

### Visual stages

**Visual type:** `fractionStrip`. All four frames below belong to surface `items`.

**Question stage**

```json
{
  "totalLabel": "18",
  "segments": [
    {
      "label": "",
      "selected": false
    }
  ],
  "partitioned": false,
  "notes": [
    [
      {
        "numerator": 1,
        "denominator": 2
      }
    ]
  ]
}
```

**Minnie stage**

```json
{
  "totalLabel": "18",
  "segments": [
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ]
}
```

**Moose stage**

```json
{
  "totalLabel": "18",
  "segments": [
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ],
  "notes": [
    "18 : 2 = ?"
  ]
}
```

**Explanation stage**

```json
{
  "totalLabel": "18",
  "segments": [
    {
      "label": "9",
      "selected": true
    },
    {
      "label": "9",
      "selected": false
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: group

**Question**

Een groep bestaat uit **18 kinderen**. De helft staat aan één kant. Hoeveel kinderen zijn dat?

**Minnie**

Een helft betekent dat je het geheel in **2 gelijke delen** verdeelt.

**Moose**

Verdeel 18 in 2 gelijke delen. Reken dus **18 : 2**.

**Full explanation**

Een helft is **1 van 2 gelijke delen**.

Daarom delen we 18 door 2:

**18 : 2 = 9**.

De helft van 18 is dus **9**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Een helft is **1 van 2 gelijke delen**.",
  "Daarom delen we 18 door 2:",
  "**18 : 2 = 9**.",
  "De helft van 18 is dus **9**."
]
```

### Visual stages

**Visual type:** `fractionStrip`. All four frames below belong to surface `group`.

**Question stage**

```json
{
  "totalLabel": "18",
  "segments": [
    {
      "label": "",
      "selected": false
    }
  ],
  "partitioned": false,
  "notes": [
    [
      {
        "numerator": 1,
        "denominator": 2
      }
    ]
  ]
}
```

**Minnie stage**

```json
{
  "totalLabel": "18",
  "segments": [
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ]
}
```

**Moose stage**

```json
{
  "totalLabel": "18",
  "segments": [
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ],
  "notes": [
    "18 : 2 = ?"
  ]
}
```

**Explanation stage**

```json
{
  "totalLabel": "18",
  "segments": [
    {
      "label": "9",
      "selected": true
    },
    {
      "label": "9",
      "selected": false
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-FR-003 — Breuken · Kwart van een hoeveelheid

**Source:** expansion 75  
**Domain:** fractionsRatios  
**Objective:** fraction_of_quantity_quarter  
**Difficulty:** 1  
**Report label:** Breuken · Kwart van een hoeveelheid  
**Answer mode:** open  
**Visual/presentation:** fractionStrip / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**1/4 van 28 = 7**"
  },
  "question": {
    "answer": 7,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "7"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `7`.
- Answer display: `"7"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "7"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 7,
  "answerDisplay": "7",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "7"
    ]
  }
}
```

### Surface: supplies

**Question**

Er zijn **28 onderdelen**. Een kwart wordt apart gelegd. Hoeveel onderdelen zijn dat?

**Minnie**

Een kwart betekent **1 van 4 gelijke delen**. Verdeel 28 dus eerst in 4 gelijke groepen.

**Moose**

Reken **28 : 4**. Eén van die vier gelijke groepen is het kwart dat je zoekt.

**Full explanation**

Een kwart is **1 van 4 gelijke delen**.

We verdelen 28 daarom in 4 gelijke groepen:

**28 : 4 = 7**.

Eén kwart van 28 is dus **7**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Een kwart is **1 van 4 gelijke delen**.",
  "We verdelen 28 daarom in 4 gelijke groepen:",
  "**28 : 4 = 7**.",
  "Eén kwart van 28 is dus **7**."
]
```

### Visual stages

**Visual type:** `fractionStrip`. All four frames below belong to surface `supplies`.

**Question stage**

```json
{
  "totalLabel": "28",
  "segments": [
    {
      "label": "",
      "selected": false
    }
  ],
  "partitioned": false,
  "notes": [
    [
      {
        "numerator": 1,
        "denominator": 4
      }
    ]
  ]
}
```

**Minnie stage**

```json
{
  "totalLabel": "28",
  "segments": [
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ]
}
```

**Moose stage**

```json
{
  "totalLabel": "28",
  "segments": [
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ],
  "notes": [
    "28 : 4 = ?"
  ]
}
```

**Explanation stage**

```json
{
  "totalLabel": "28",
  "segments": [
    {
      "label": "7",
      "selected": true
    },
    {
      "label": "7",
      "selected": false
    },
    {
      "label": "7",
      "selected": false
    },
    {
      "label": "7",
      "selected": false
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: tickets

**Question**

Er zijn **28 kaartjes**. Een kwart is al uitgedeeld. Hoeveel kaartjes zijn dat?

**Minnie**

Een kwart betekent **1 van 4 gelijke delen**. Verdeel 28 dus eerst in 4 gelijke groepen.

**Moose**

Reken **28 : 4**. Eén van die vier gelijke groepen is het kwart dat je zoekt.

**Full explanation**

Een kwart is **1 van 4 gelijke delen**.

We verdelen 28 daarom in 4 gelijke groepen:

**28 : 4 = 7**.

Eén kwart van 28 is dus **7**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Een kwart is **1 van 4 gelijke delen**.",
  "We verdelen 28 daarom in 4 gelijke groepen:",
  "**28 : 4 = 7**.",
  "Eén kwart van 28 is dus **7**."
]
```

### Visual stages

**Visual type:** `fractionStrip`. All four frames below belong to surface `tickets`.

**Question stage**

```json
{
  "totalLabel": "28",
  "segments": [
    {
      "label": "",
      "selected": false
    }
  ],
  "partitioned": false,
  "notes": [
    [
      {
        "numerator": 1,
        "denominator": 4
      }
    ]
  ]
}
```

**Minnie stage**

```json
{
  "totalLabel": "28",
  "segments": [
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ]
}
```

**Moose stage**

```json
{
  "totalLabel": "28",
  "segments": [
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ],
  "notes": [
    "28 : 4 = ?"
  ]
}
```

**Explanation stage**

```json
{
  "totalLabel": "28",
  "segments": [
    {
      "label": "7",
      "selected": true
    },
    {
      "label": "7",
      "selected": false
    },
    {
      "label": "7",
      "selected": false
    },
    {
      "label": "7",
      "selected": false
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-FR-004 — Verhoudingen · Opschalen

**Source:** expansion 75  
**Domain:** fractionsRatios  
**Objective:** scale_ratio_double  
**Difficulty:** 1  
**Report label:** Verhoudingen · Opschalen  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 2

### Educational core

```json
{
  "values": {
    "authored": "**2 eenheden → 12 items; 4 eenheden → 24 items**"
  },
  "question": {
    "answer": 24,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "24"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `24`.
- Answer display: `"24"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "24"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 24,
  "answerDisplay": "24",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "24"
    ]
  }
}
```

### Surface: boxes

**Question**

In **2 dozen** zitten samen **12 lampen**. Elke doos bevat evenveel. Hoeveel lampen zitten er samen in **4 dozen**?

**Minnie**

Vergelijk eerst 2 met 4. Hoeveel keer zo groot is 4?

**Moose**

Van 2 naar 4 doe je **×2**. Bij een gelijke verhouding moet je aan de andere kant hetzelfde doen: **12 × 2**.

**Full explanation**

4 is precies **2 keer zoveel** als 2.

Daarom moet de andere hoeveelheid ook 2 keer zo groot worden.

**12 × 2 = 24**.

Dus bij 4 dozen horen **24** lampen.

**Exact explanation step boundaries (runtime order):**

```json
[
  "4 is precies **2 keer zoveel** als 2.",
  "Daarom moet de andere hoeveelheid ook 2 keer zo groot worden.",
  "**12 × 2 = 24**.",
  "Dus bij 4 dozen horen **24** lampen."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `boxes`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "2 → 12",
        "4 → ?"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "2 × 2 = 4"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "nodes": [
        "2",
        "4"
      ],
      "jumps": [
        "×2"
      ]
    },
    {
      "nodes": [
        "12",
        "?"
      ],
      "jumps": [
        "×2"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "12 × 2 = 24"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: tables

**Question**

Voor **2 tafels** zijn samen **12 stoelen** nodig. Elke tafel krijgt evenveel stoelen. Hoeveel stoelen zijn nodig voor **4 tafels**?

**Minnie**

Vergelijk eerst 2 met 4. Hoeveel keer zo groot is 4?

**Moose**

Van 2 naar 4 doe je **×2**. Bij een gelijke verhouding moet je aan de andere kant hetzelfde doen: **12 × 2**.

**Full explanation**

4 is precies **2 keer zoveel** als 2.

Daarom moet de andere hoeveelheid ook 2 keer zo groot worden.

**12 × 2 = 24**.

Dus bij 4 tafels horen **24** stoelen.

**Exact explanation step boundaries (runtime order):**

```json
[
  "4 is precies **2 keer zoveel** als 2.",
  "Daarom moet de andere hoeveelheid ook 2 keer zo groot worden.",
  "**12 × 2 = 24**.",
  "Dus bij 4 tafels horen **24** stoelen."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `tables`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "2 → 12",
        "4 → ?"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "2 × 2 = 4"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "nodes": [
        "2",
        "4"
      ],
      "jumps": [
        "×2"
      ]
    },
    {
      "nodes": [
        "12",
        "?"
      ],
      "jumps": [
        "×2"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "12 × 2 = 24"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-FR-005 — Verhoudingen · Eén groep bepalen

**Source:** expansion 75  
**Domain:** fractionsRatios  
**Objective:** ratio_find_unit  
**Difficulty:** 1  
**Report label:** Verhoudingen · Eén groep bepalen  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 2

### Educational core

```json
{
  "values": {
    "authored": "**3 gelijke groepen → 18 items; 1 groep → 6 items**"
  },
  "question": {
    "answer": 6,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "6"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `6`.
- Answer display: `"6"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "6"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 6,
  "answerDisplay": "6",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "6"
    ]
  }
}
```

### Surface: boxes

**Question**

In **3 gelijke dozen** zitten samen **18 lampen**. In elke doos zitten evenveel lampen. Hoeveel lampen zitten in **1 doos**?

**Minnie**

Je weet hoeveel er in **3 gelijke groepen samen** zitten. Verdeel 18 daarom eerlijk over die 3 groepen.

**Moose**

Reken **18 : 3**. De uitkomst vertelt hoeveel er in één groep zitten.

**Full explanation**

De 18 lampen zijn verdeeld over **3 gelijke groepen**.

Daarom rekenen we:

**18 : 3 = 6**.

In één doos horen dus **6** lampen.

**Exact explanation step boundaries (runtime order):**

```json
[
  "De 18 lampen zijn verdeeld over **3 gelijke groepen**.",
  "Daarom rekenen we:",
  "**18 : 3 = 6**.",
  "In één doos horen dus **6** lampen."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `boxes`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "3 groepen → 18",
        "1 groep → ?"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "18"
      ]
    }
  ],
  "quantities": [
    {
      "label": "?",
      "count": 0
    },
    {
      "label": "?",
      "count": 0
    },
    {
      "label": "?",
      "count": 0
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "18 : 3 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "18 : 3 = 6"
      ]
    }
  ],
  "quantities": [
    {
      "label": "6",
      "count": 6
    },
    {
      "label": "6",
      "count": 6
    },
    {
      "label": "6",
      "count": 6
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: tables

**Question**

Bij **3 gelijke tafels** staan samen **18 stoelen**. Bij elke tafel staan evenveel stoelen. Hoeveel stoelen staan bij **1 tafel**?

**Minnie**

Je weet hoeveel er in **3 gelijke groepen samen** zitten. Verdeel 18 daarom eerlijk over die 3 groepen.

**Moose**

Reken **18 : 3**. De uitkomst vertelt hoeveel er in één groep zitten.

**Full explanation**

De 18 stoelen zijn verdeeld over **3 gelijke groepen**.

Daarom rekenen we:

**18 : 3 = 6**.

Bij één tafel horen dus **6** stoelen.

**Exact explanation step boundaries (runtime order):**

```json
[
  "De 18 stoelen zijn verdeeld over **3 gelijke groepen**.",
  "Daarom rekenen we:",
  "**18 : 3 = 6**.",
  "Bij één tafel horen dus **6** stoelen."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `tables`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "3 groepen → 18",
        "1 groep → ?"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "18"
      ]
    }
  ],
  "quantities": [
    {
      "label": "?",
      "count": 0
    },
    {
      "label": "?",
      "count": 0
    },
    {
      "label": "?",
      "count": 0
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "18 : 3 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "18 : 3 = 6"
      ]
    }
  ],
  "quantities": [
    {
      "label": "6",
      "count": 6
    },
    {
      "label": "6",
      "count": 6
    },
    {
      "label": "6",
      "count": 6
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-FR-006 — Breuken · Meerdere delen van een hoeveelheid

**Source:** expansion 75  
**Domain:** fractionsRatios  
**Objective:** fraction_of_quantity_multiple_parts  
**Difficulty:** 2  
**Report label:** Breuken · Meerdere delen van een hoeveelheid  
**Answer mode:** open  
**Visual/presentation:** fractionStrip / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**2/3 van 60 = 40**"
  },
  "question": {
    "answer": 40,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "40"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `40`.
- Answer display: `"40"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "40"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 40,
  "answerDisplay": "40",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "40"
    ]
  }
}
```

### Surface: supplies

**Question**

Er zijn **60 onderdelen**. **Twee derde** wordt gebruikt. Hoeveel onderdelen zijn dat?

**Minnie**

Bij twee derde verdeel je het geheel eerst in **3 gelijke delen**. Zoek dus eerst hoeveel **één derde** van 60 is.

**Moose**

60 : 3 = **20**. Dat is één derde. Je hebt **twee** van die delen nodig.

**Full explanation**

Eerst zoeken we één derde van 60:

**60 : 3 = 20**.

Twee derde bestaat uit twee van zulke delen:

**20 + 20 = 40**.

Dus **2/3 van 60 = 40**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Eerst zoeken we één derde van 60:",
  "**60 : 3 = 20**.",
  "Twee derde bestaat uit twee van zulke delen:",
  "**20 + 20 = 40**.",
  "Dus **2/3 van 60 = 40**."
]
```

**Resolved rich presentation parts:**

```json
{
  "explanationStepParts": [
    "Eerst zoeken we één derde van 60:",
    "**60 : 3 = 20**.",
    "Twee derde bestaat uit twee van zulke delen:",
    "**20 + 20 = 40**.",
    [
      "Dus ",
      {
        "strong": [
          {
            "numerator": 2,
            "denominator": 3
          },
          " van 60 = 40"
        ]
      },
      "."
    ]
  ]
}
```

### Visual stages

**Visual type:** `fractionStrip`. All four frames below belong to surface `supplies`.

**Question stage**

```json
{
  "totalLabel": "60",
  "segments": [
    {
      "label": "",
      "selected": false
    }
  ],
  "partitioned": false,
  "notes": [
    [
      {
        "numerator": 2,
        "denominator": 3
      }
    ]
  ]
}
```

**Minnie stage**

```json
{
  "totalLabel": "60",
  "segments": [
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ]
}
```

**Moose stage**

```json
{
  "totalLabel": "60",
  "segments": [
    {
      "label": "20",
      "selected": true
    },
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": false
    }
  ],
  "notes": [
    "60 : 3 = 20"
  ]
}
```

**Explanation stage**

```json
{
  "totalLabel": "60",
  "segments": [
    {
      "label": "20",
      "selected": true
    },
    {
      "label": "20",
      "selected": true
    },
    {
      "label": "20",
      "selected": false
    }
  ],
  "notes": [
    "20 + 20 = 40"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: tickets

**Question**

Er zijn **60 kaartjes**. **Twee derde** is al uitgedeeld. Hoeveel kaartjes zijn dat?

**Minnie**

Bij twee derde verdeel je het geheel eerst in **3 gelijke delen**. Zoek dus eerst hoeveel **één derde** van 60 is.

**Moose**

60 : 3 = **20**. Dat is één derde. Je hebt **twee** van die delen nodig.

**Full explanation**

Eerst zoeken we één derde van 60:

**60 : 3 = 20**.

Twee derde bestaat uit twee van zulke delen:

**20 + 20 = 40**.

Dus **2/3 van 60 = 40**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Eerst zoeken we één derde van 60:",
  "**60 : 3 = 20**.",
  "Twee derde bestaat uit twee van zulke delen:",
  "**20 + 20 = 40**.",
  "Dus **2/3 van 60 = 40**."
]
```

**Resolved rich presentation parts:**

```json
{
  "explanationStepParts": [
    "Eerst zoeken we één derde van 60:",
    "**60 : 3 = 20**.",
    "Twee derde bestaat uit twee van zulke delen:",
    "**20 + 20 = 40**.",
    [
      "Dus ",
      {
        "strong": [
          {
            "numerator": 2,
            "denominator": 3
          },
          " van 60 = 40"
        ]
      },
      "."
    ]
  ]
}
```

### Visual stages

**Visual type:** `fractionStrip`. All four frames below belong to surface `tickets`.

**Question stage**

```json
{
  "totalLabel": "60",
  "segments": [
    {
      "label": "",
      "selected": false
    }
  ],
  "partitioned": false,
  "notes": [
    [
      {
        "numerator": 2,
        "denominator": 3
      }
    ]
  ]
}
```

**Minnie stage**

```json
{
  "totalLabel": "60",
  "segments": [
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ]
}
```

**Moose stage**

```json
{
  "totalLabel": "60",
  "segments": [
    {
      "label": "20",
      "selected": true
    },
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": false
    }
  ],
  "notes": [
    "60 : 3 = 20"
  ]
}
```

**Explanation stage**

```json
{
  "totalLabel": "60",
  "segments": [
    {
      "label": "20",
      "selected": true
    },
    {
      "label": "20",
      "selected": true
    },
    {
      "label": "20",
      "selected": false
    }
  ],
  "notes": [
    "20 + 20 = 40"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-FR-007 — Breuken · Geheel terugvinden

**Source:** expansion 75  
**Domain:** fractionsRatios  
**Objective:** find_whole_from_unit_fraction  
**Difficulty:** 2  
**Report label:** Breuken · Geheel terugvinden  
**Answer mode:** open  
**Visual/presentation:** fractionStrip / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**12 is 1/3 van het geheel → geheel = 36**"
  },
  "question": {
    "answer": 36,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "36"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `36`.
- Answer display: `"36"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "36"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 36,
  "answerDisplay": "36",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "36"
    ]
  }
}
```

### Surface: crates

**Question**

**12 onderdelen** vormen **één derde** van de hele voorraad. Hoeveel onderdelen zitten er in de hele voorraad?

**Minnie**

Als 12 **één derde** is, bestaat het hele aantal uit **3 even grote delen** van 12.

**Moose**

Je hebt drie delen van 12 nodig. Reken **12 + 12 + 12** of **3 × 12**.

**Full explanation**

12 is **één derde** van het geheel.

Een geheel bestaat uit **3 derden**.

Daarom nemen we 12 drie keer:

**3 × 12 = 36**.

Het hele aantal is dus **36**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "12 is **één derde** van het geheel.",
  "Een geheel bestaat uit **3 derden**.",
  "Daarom nemen we 12 drie keer:",
  "**3 × 12 = 36**.",
  "Het hele aantal is dus **36**."
]
```

### Visual stages

**Visual type:** `fractionStrip`. All four frames below belong to surface `crates`.

**Question stage**

```json
{
  "totalLabel": "",
  "segments": [
    {
      "label": "12",
      "selected": true
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ]
}
```

**Minnie stage**

```json
{
  "totalLabel": "",
  "segments": [
    {
      "label": "12",
      "selected": true
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ],
  "focus": [
    0,
    1,
    2
  ],
  "notes": [
    [
      {
        "numerator": 1,
        "denominator": 3
      }
    ]
  ]
}
```

**Moose stage**

```json
{
  "totalLabel": "",
  "segments": [
    {
      "label": "12",
      "selected": true
    },
    {
      "label": "12",
      "selected": false
    },
    {
      "label": "12",
      "selected": false
    }
  ],
  "notes": [
    "12 + 12 + 12 = ?"
  ]
}
```

**Explanation stage**

```json
{
  "totalLabel": "",
  "segments": [
    {
      "label": "12",
      "selected": true
    },
    {
      "label": "12",
      "selected": false
    },
    {
      "label": "12",
      "selected": false
    }
  ],
  "notes": [
    "3 × 12 = 36"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: visitors

**Question**

**12 bezoekers** vormen **één derde** van de hele groep. Hoeveel bezoekers zijn er in totaal?

**Minnie**

Als 12 **één derde** is, bestaat het hele aantal uit **3 even grote delen** van 12.

**Moose**

Je hebt drie delen van 12 nodig. Reken **12 + 12 + 12** of **3 × 12**.

**Full explanation**

12 is **één derde** van het geheel.

Een geheel bestaat uit **3 derden**.

Daarom nemen we 12 drie keer:

**3 × 12 = 36**.

Het hele aantal is dus **36**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "12 is **één derde** van het geheel.",
  "Een geheel bestaat uit **3 derden**.",
  "Daarom nemen we 12 drie keer:",
  "**3 × 12 = 36**.",
  "Het hele aantal is dus **36**."
]
```

### Visual stages

**Visual type:** `fractionStrip`. All four frames below belong to surface `visitors`.

**Question stage**

```json
{
  "totalLabel": "",
  "segments": [
    {
      "label": "12",
      "selected": true
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ]
}
```

**Minnie stage**

```json
{
  "totalLabel": "",
  "segments": [
    {
      "label": "12",
      "selected": true
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ],
  "focus": [
    0,
    1,
    2
  ],
  "notes": [
    [
      {
        "numerator": 1,
        "denominator": 3
      }
    ]
  ]
}
```

**Moose stage**

```json
{
  "totalLabel": "",
  "segments": [
    {
      "label": "12",
      "selected": true
    },
    {
      "label": "12",
      "selected": false
    },
    {
      "label": "12",
      "selected": false
    }
  ],
  "notes": [
    "12 + 12 + 12 = ?"
  ]
}
```

**Explanation stage**

```json
{
  "totalLabel": "",
  "segments": [
    {
      "label": "12",
      "selected": true
    },
    {
      "label": "12",
      "selected": false
    },
    {
      "label": "12",
      "selected": false
    }
  ],
  "notes": [
    "3 × 12 = 36"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-FR-008 — Verhoudingen · Via één eenheid opschalen

**Source:** expansion 75  
**Domain:** fractionsRatios  
**Objective:** ratio_scale_via_unit  
**Difficulty:** 2  
**Report label:** Verhoudingen · Via één eenheid opschalen  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 2

### Educational core

```json
{
  "values": {
    "authored": "**3 eenheden → 450 gram; 1 → 150 gram; 7 → 1.050 gram**"
  },
  "question": {
    "answer": 1050,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "1050",
        "1.050",
        "1 050"
      ],
      "grouping": true
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `1050`.
- Answer display: `"1.050"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "1050",
  "1.050",
  "1 050"
]
```

**Accepted input:** whole-number rule above; `grouping` is `true` (numeric equivalence).

**Exact resolved answer contract:**

```json
{
  "answer": 1050,
  "answerDisplay": "1.050",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "1050",
      "1.050",
      "1 050"
    ],
    "grouping": true
  }
}
```

### Surface: trays

**Question**

Voor **3 schalen** is samen **450 gram** materiaal nodig. Elke schaal gebruikt evenveel. Hoeveel gram is nodig voor **7 schalen**?

**Minnie**

Ga eerst terug naar **1 schaal**. Verdeel 450 gram daarvoor door 3.

**Moose**

450 : 3 = **150 gram** per schaal. Voor 7 stuks heb je dus **7 × 150** gram nodig.

**Full explanation**

Eerst zoeken we hoeveel één schaal nodig heeft:

**450 : 3 = 150 gram**.

Daarna rekenen we voor 7 stuks:

**7 × 150 = 1.050 gram**.

Er is dus **1.050 gram** nodig.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Eerst zoeken we hoeveel één schaal nodig heeft:",
  "**450 : 3 = 150 gram**.",
  "Daarna rekenen we voor 7 stuks:",
  "**7 × 150 = 1.050 gram**.",
  "Er is dus **1.050 gram** nodig."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `trays`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "3 → 450 g",
        "7 → ?"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "3 → 450 g",
        "1 → ?",
        "7 → ?"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "450 : 3 = 150 g",
        "7 × 150 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "450 : 3 = 150 g",
        "7 × 150 = 1.050 g"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: packages

**Question**

Voor **3 pakketten** is samen **450 gram** materiaal nodig. Elk pakket gebruikt evenveel. Hoeveel gram is nodig voor **7 pakketten**?

**Minnie**

Ga eerst terug naar **1 pakket**. Verdeel 450 gram daarvoor door 3.

**Moose**

450 : 3 = **150 gram** per pakket. Voor 7 stuks heb je dus **7 × 150** gram nodig.

**Full explanation**

Eerst zoeken we hoeveel één pakket nodig heeft:

**450 : 3 = 150 gram**.

Daarna rekenen we voor 7 stuks:

**7 × 150 = 1.050 gram**.

Er is dus **1.050 gram** nodig.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Eerst zoeken we hoeveel één pakket nodig heeft:",
  "**450 : 3 = 150 gram**.",
  "Daarna rekenen we voor 7 stuks:",
  "**7 × 150 = 1.050 gram**.",
  "Er is dus **1.050 gram** nodig."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `packages`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "3 → 450 g",
        "7 → ?"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "3 → 450 g",
        "1 → ?",
        "7 → ?"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "450 : 3 = 150 g",
        "7 × 150 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "450 : 3 = 150 g",
        "7 × 150 = 1.050 g"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-FR-009 — Breuken · Geheel vanuit meerdere breukdelen

**Source:** expansion 75  
**Domain:** fractionsRatios  
**Objective:** find_whole_from_nonunit_fraction  
**Difficulty:** 3  
**Report label:** Breuken · Geheel vanuit meerdere breukdelen  
**Answer mode:** open  
**Visual/presentation:** fractionStrip / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**14 is 2/5 van het geheel → 1/5 = 7 → geheel = 35**"
  },
  "question": {
    "answer": 35,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "35"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `35`.
- Answer display: `"35"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "35"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 35,
  "answerDisplay": "35",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "35"
    ]
  }
}
```

### Surface: supplies

**Question**

**14 onderdelen** zijn **twee vijfde** van de hele voorraad. Hoeveel onderdelen zitten er in de hele voorraad?

**Minnie**

De 14 hoort bij **2 gelijke delen**. Zoek eerst hoeveel **één vijfde** is.

**Moose**

Twee vijfden zijn samen 14. Dus één vijfde is:

**14 : 2 = 7**.

Het hele aantal bestaat uit **5** van zulke delen.

**Full explanation**

14 is **2/5** van het geheel.

Eerst zoeken we één vijfde:

**14 : 2 = 7**.

Het hele aantal bestaat uit 5 vijfden:

**5 × 7 = 35**.

Het geheel is dus **35**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "14 is **2/5** van het geheel.",
  "Eerst zoeken we één vijfde:",
  "**14 : 2 = 7**.",
  "Het hele aantal bestaat uit 5 vijfden:",
  "**5 × 7 = 35**.",
  "Het geheel is dus **35**."
]
```

**Resolved rich presentation parts:**

```json
{
  "explanationStepParts": [
    [
      "14 is ",
      {
        "strong": [
          {
            "numerator": 2,
            "denominator": 5
          }
        ]
      },
      " van het geheel."
    ],
    "Eerst zoeken we één vijfde:",
    "**14 : 2 = 7**.",
    "Het hele aantal bestaat uit 5 vijfden:",
    "**5 × 7 = 35**.",
    "Het geheel is dus **35**."
  ]
}
```

### Visual stages

**Visual type:** `fractionStrip`. All four frames below belong to surface `supplies`.

**Question stage**

```json
{
  "totalLabel": "",
  "segments": [
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ],
  "joined": [
    0
  ],
  "groups": [
    {
      "from": 0,
      "count": 2,
      "label": "14"
    }
  ]
}
```

**Minnie stage**

```json
{
  "totalLabel": "",
  "segments": [
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 2,
      "label": "14"
    }
  ],
  "focus": [
    0,
    1
  ]
}
```

**Moose stage**

```json
{
  "totalLabel": "",
  "segments": [
    {
      "label": "7",
      "selected": true
    },
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ],
  "notes": [
    "14 : 2 = 7"
  ]
}
```

**Explanation stage**

```json
{
  "totalLabel": "",
  "segments": [
    {
      "label": "7",
      "selected": true
    },
    {
      "label": "7",
      "selected": true
    },
    {
      "label": "7",
      "selected": false
    },
    {
      "label": "7",
      "selected": false
    },
    {
      "label": "7",
      "selected": false
    }
  ],
  "notes": [
    "5 × 7 = 35"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: route

**Question**

**14 kilometer** is **twee vijfde** van de hele route. Hoeveel kilometer is de hele route?

**Minnie**

De 14 hoort bij **2 gelijke delen**. Zoek eerst hoeveel **één vijfde** is.

**Moose**

Twee vijfden zijn samen 14. Dus één vijfde is:

**14 : 2 = 7**.

Het hele aantal bestaat uit **5** van zulke delen.

**Full explanation**

14 is **2/5** van het geheel.

Eerst zoeken we één vijfde:

**14 : 2 = 7**.

Het hele aantal bestaat uit 5 vijfden:

**5 × 7 = 35**.

Het geheel is dus **35**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "14 is **2/5** van het geheel.",
  "Eerst zoeken we één vijfde:",
  "**14 : 2 = 7**.",
  "Het hele aantal bestaat uit 5 vijfden:",
  "**5 × 7 = 35**.",
  "Het geheel is dus **35**."
]
```

**Resolved rich presentation parts:**

```json
{
  "explanationStepParts": [
    [
      "14 is ",
      {
        "strong": [
          {
            "numerator": 2,
            "denominator": 5
          }
        ]
      },
      " van het geheel."
    ],
    "Eerst zoeken we één vijfde:",
    "**14 : 2 = 7**.",
    "Het hele aantal bestaat uit 5 vijfden:",
    "**5 × 7 = 35**.",
    "Het geheel is dus **35**."
  ]
}
```

### Visual stages

**Visual type:** `fractionStrip`. All four frames below belong to surface `route`.

**Question stage**

```json
{
  "totalLabel": "",
  "segments": [
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ],
  "joined": [
    0
  ],
  "groups": [
    {
      "from": 0,
      "count": 2,
      "label": "14"
    }
  ]
}
```

**Minnie stage**

```json
{
  "totalLabel": "",
  "segments": [
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ],
  "groups": [
    {
      "from": 0,
      "count": 2,
      "label": "14"
    }
  ],
  "focus": [
    0,
    1
  ]
}
```

**Moose stage**

```json
{
  "totalLabel": "",
  "segments": [
    {
      "label": "7",
      "selected": true
    },
    {
      "label": "",
      "selected": true
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    },
    {
      "label": "",
      "selected": false
    }
  ],
  "notes": [
    "14 : 2 = 7"
  ]
}
```

**Explanation stage**

```json
{
  "totalLabel": "",
  "segments": [
    {
      "label": "7",
      "selected": true
    },
    {
      "label": "7",
      "selected": true
    },
    {
      "label": "7",
      "selected": false
    },
    {
      "label": "7",
      "selected": false
    },
    {
      "label": "7",
      "selected": false
    }
  ],
  "notes": [
    "5 × 7 = 35"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-FR-010 — Verhoudingen · Meerstaps opschalen

**Source:** expansion 75  
**Domain:** fractionsRatios  
**Objective:** ratio_scale_via_unit_multistep  
**Difficulty:** 3  
**Report label:** Verhoudingen · Meerstaps opschalen  
**Answer mode:** open  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 2

### Educational core

```json
{
  "values": {
    "authored": "**4 eenheden → 28 items; 1 → 7 items; 9 → 63 items**"
  },
  "question": {
    "answer": 63,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "63"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `63`.
- Answer display: `"63"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "63"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 63,
  "answerDisplay": "63",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "63"
    ]
  }
}
```

### Surface: trays

**Question**

Op **4 schalen** liggen samen **28 flesjes**. Op elke schaal liggen evenveel flesjes. Hoeveel flesjes liggen er samen op **9 schalen**?

**Minnie**

Van 4 naar 9 kun je niet in één eenvoudige verdubbelstap gaan. Zoek daarom eerst hoeveel er bij **1 schaal** horen.

**Moose**

28 : 4 = **7** per schaal. Voor 9 schalen moet je nu **9 × 7** rekenen.

**Full explanation**

Eerst rekenen we terug naar één schaal:

**28 : 4 = 7**.

Daarna schalen we op naar 9:

**9 × 7 = 63**.

Er zijn dus **63** flesjes.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Eerst rekenen we terug naar één schaal:",
  "**28 : 4 = 7**.",
  "Daarna schalen we op naar 9:",
  "**9 × 7 = 63**.",
  "Er zijn dus **63** flesjes."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `trays`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "4 → 28",
        "9 → ?"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "4 → 28",
        "1 → ?",
        "9 → ?"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "28 : 4 = 7",
        "9 × 7 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "28 : 4 = 7",
        "9 × 7 = 63"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: shelves

**Question**

Op **4 planken** staan samen **28 boeken**. Op elke plank staan evenveel boeken. Hoeveel boeken staan er samen op **9 planken**?

**Minnie**

Van 4 naar 9 kun je niet in één eenvoudige verdubbelstap gaan. Zoek daarom eerst hoeveel er bij **1 plank** horen.

**Moose**

28 : 4 = **7** per plank. Voor 9 planken moet je nu **9 × 7** rekenen.

**Full explanation**

Eerst rekenen we terug naar één plank:

**28 : 4 = 7**.

Daarna schalen we op naar 9:

**9 × 7 = 63**.

Er zijn dus **63** boeken.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Eerst rekenen we terug naar één plank:",
  "**28 : 4 = 7**.",
  "Daarna schalen we op naar 9:",
  "**9 × 7 = 63**.",
  "Er zijn dus **63** boeken."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `shelves`.

**Question stage**

```json
{
  "groups": [
    {
      "lines": [
        "4 → 28",
        "9 → ?"
      ]
    }
  ]
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "lines": [
        "4 → 28",
        "1 → ?",
        "9 → ?"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "lines": [
        "28 : 4 = 7",
        "9 × 7 = ?"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "28 : 4 = 7",
        "9 × 7 = 63"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-MO-001 — Geld · Bedrag tellen

**Source:** expansion 75  
**Domain:** money  
**Objective:** count_currency_visual  
**Difficulty:** 1  
**Report label:** Geld · Bedrag tellen  
**Answer mode:** open  
**Visual/presentation:** currency / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**€20 + €5 + €2 + €0,50 = €27,50**"
  },
  "question": {
    "answer": 2750,
    "answerSpec": {
      "type": "euro",
      "allowedForms": [
        "27,50"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `2750`.
- Answer display: `"2.750 cent = €27,50"`.
- Contract type: `euro`.
- Units: integer cents (displayed as euro amounts).

**Stored allowed forms (legacy metadata; structured input is used):**

```json
[
  "27,50"
]
```

**Accepted input:** structured digit fields `euros` and `cents`, using the rule above. Correct when canonical cents equal 2750.

**Exact resolved answer contract:**

```json
{
  "answer": 2750,
  "answerDisplay": "2.750 cent = €27,50",
  "answerMode": "open",
  "answerSpec": {
    "type": "euro",
    "allowedForms": [
      "27,50"
    ]
  }
}
```

### Surface: original

**Question**

Hoeveel geld zie je in totaal?

**Minnie**

Tel eerst de **hele euro’s** bij elkaar op. Kijk daarna pas naar de centen.

**Moose**

€20 + €5 + €2 = **€27**. Er ligt ook nog **50 cent**.

**Full explanation**

Eerst tellen we de hele euro’s:

**€20 + €5 + €2 = €27**.

Daar komt nog **€0,50** bij.

Dus:

**€27 + €0,50 = €27,50**.

Het totale bedrag is **€27,50**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Eerst tellen we de hele euro’s:",
  "**€20 + €5 + €2 = €27**.",
  "Daar komt nog **€0,50** bij.",
  "Dus:",
  "**€27 + €0,50 = €27,50**.",
  "Het totale bedrag is **€27,50**."
]
```

### Visual stages

**Visual type:** `currency`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "mode": "count",
  "items": [
    {
      "denomination": 2000,
      "count": 1
    },
    {
      "denomination": 500,
      "count": 1
    },
    {
      "denomination": 200,
      "count": 1
    },
    {
      "denomination": 50,
      "count": 1
    }
  ]
}
```

**Minnie stage**

```json
{
  "mode": "count",
  "items": [
    {
      "denomination": 2000,
      "count": 1
    },
    {
      "denomination": 500,
      "count": 1
    },
    {
      "denomination": 200,
      "count": 1
    },
    {
      "denomination": 50,
      "count": 1
    }
  ],
  "rows": [
    [
      0,
      1,
      2
    ],
    [
      3
    ]
  ]
}
```

**Moose stage**

```json
{
  "mode": "count",
  "items": [
    {
      "denomination": 2000,
      "count": 1
    },
    {
      "denomination": 500,
      "count": 1
    },
    {
      "denomination": 200,
      "count": 1
    },
    {
      "denomination": 50,
      "count": 1
    }
  ],
  "rows": [
    [
      0,
      1,
      2
    ],
    [
      3
    ]
  ],
  "notes": [
    "€20 + €5 + €2 = €27"
  ]
}
```

**Explanation stage**

```json
{
  "mode": "count",
  "items": [
    {
      "denomination": 2000,
      "count": 1
    },
    {
      "denomination": 500,
      "count": 1
    },
    {
      "denomination": 200,
      "count": 1
    },
    {
      "denomination": 50,
      "count": 1
    }
  ],
  "notes": [
    "€27 + €0,50 = €27,50"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-MO-002 — Geld · Euro’s en centen tellen

**Source:** expansion 75  
**Domain:** money  
**Objective:** count_currency_visual_mixed_cents  
**Difficulty:** 1  
**Report label:** Geld · Euro’s en centen tellen  
**Answer mode:** open  
**Visual/presentation:** currency / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**€10 + €2 + €1 + €0,50 + €0,10 + €0,05 = €13,65**"
  },
  "question": {
    "answer": 1365,
    "answerSpec": {
      "type": "euro",
      "allowedForms": [
        "13,65"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `1365`.
- Answer display: `"1.365 cent = €13,65"`.
- Contract type: `euro`.
- Units: integer cents (displayed as euro amounts).

**Stored allowed forms (legacy metadata; structured input is used):**

```json
[
  "13,65"
]
```

**Accepted input:** structured digit fields `euros` and `cents`, using the rule above. Correct when canonical cents equal 1365.

**Exact resolved answer contract:**

```json
{
  "answer": 1365,
  "answerDisplay": "1.365 cent = €13,65",
  "answerMode": "open",
  "answerSpec": {
    "type": "euro",
    "allowedForms": [
      "13,65"
    ]
  }
}
```

### Surface: original

**Question**

Hoeveel geld zie je in totaal?

**Minnie**

Maak twee groepjes: **hele euro’s** en **centen**. Tel die apart.

**Moose**

De hele euro’s zijn samen **€13**.  
De centen zijn **50 + 10 + 5 = 65 cent**.  
Zet die twee delen nu samen.

**Full explanation**

De hele euro’s:

**€10 + €2 + €1 = €13**.

De centen:

**50 + 10 + 5 = 65 cent**.

Samen is dat:

**€13,65**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "De hele euro’s:",
  "**€10 + €2 + €1 = €13**.",
  "De centen:",
  "**50 + 10 + 5 = 65 cent**.",
  "Samen is dat:",
  "**€13,65**."
]
```

### Visual stages

**Visual type:** `currency`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "mode": "count",
  "items": [
    {
      "denomination": 1000,
      "count": 1
    },
    {
      "denomination": 200,
      "count": 1
    },
    {
      "denomination": 100,
      "count": 1
    },
    {
      "denomination": 50,
      "count": 1
    },
    {
      "denomination": 10,
      "count": 1
    },
    {
      "denomination": 5,
      "count": 1
    }
  ]
}
```

**Minnie stage**

```json
{
  "mode": "count",
  "items": [
    {
      "denomination": 1000,
      "count": 1
    },
    {
      "denomination": 200,
      "count": 1
    },
    {
      "denomination": 100,
      "count": 1
    },
    {
      "denomination": 50,
      "count": 1
    },
    {
      "denomination": 10,
      "count": 1
    },
    {
      "denomination": 5,
      "count": 1
    }
  ],
  "rows": [
    [
      0,
      1,
      2
    ],
    [
      3,
      4,
      5
    ]
  ]
}
```

**Moose stage**

```json
{
  "mode": "count",
  "items": [
    {
      "denomination": 1000,
      "count": 1
    },
    {
      "denomination": 200,
      "count": 1
    },
    {
      "denomination": 100,
      "count": 1
    },
    {
      "denomination": 50,
      "count": 1
    },
    {
      "denomination": 10,
      "count": 1
    },
    {
      "denomination": 5,
      "count": 1
    }
  ],
  "rows": [
    [
      0,
      1,
      2
    ],
    [
      3,
      4,
      5
    ]
  ],
  "notes": [
    "€10 + €2 + €1 = €13",
    "50 + 10 + 5 = 65 cent"
  ]
}
```

**Explanation stage**

```json
{
  "mode": "count",
  "items": [
    {
      "denomination": 1000,
      "count": 1
    },
    {
      "denomination": 200,
      "count": 1
    },
    {
      "denomination": 100,
      "count": 1
    },
    {
      "denomination": 50,
      "count": 1
    },
    {
      "denomination": 10,
      "count": 1
    },
    {
      "denomination": 5,
      "count": 1
    }
  ],
  "notes": [
    "€13,65"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-MO-003 — Geld · Wisselgeld

**Source:** expansion 75  
**Domain:** money  
**Objective:** calculate_change_to_next_euro  
**Difficulty:** 1  
**Report label:** Geld · Wisselgeld  
**Answer mode:** open  
**Visual/presentation:** moneyReceipt / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**Prijs €3,20; betaald €4,00 → wisselgeld €0,80**"
  },
  "question": {
    "answer": 80,
    "answerSpec": {
      "type": "euro",
      "allowedForms": [
        "0,80"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `80`.
- Answer display: `"80 cent = €0,80"`.
- Contract type: `euro`.
- Units: integer cents (displayed as euro amounts).

**Stored allowed forms (legacy metadata; structured input is used):**

```json
[
  "0,80"
]
```

**Accepted input:** structured digit fields `euros` and `cents`, using the rule above. Correct when canonical cents equal 80.

**Exact resolved answer contract:**

```json
{
  "answer": 80,
  "answerDisplay": "80 cent = €0,80",
  "answerMode": "open",
  "answerSpec": {
    "type": "euro",
    "allowedForms": [
      "0,80"
    ]
  }
}
```

### Surface: purchase

**Question**

Iets kost **€3,20**. Je betaalt met **€4,00**. Hoeveel geld krijg je terug?

**Minnie**

Tel vanaf €3,20 omhoog naar €4,00. Een tussenstap via **€3,50** kan helpen.

**Moose**

Van €3,20 naar €3,50 is **€0,30**.  
Van €3,50 naar €4,00 is **€0,50**.  
Tel die twee bedragen bij elkaar op.

**Full explanation**

We tellen vanaf de prijs omhoog naar het betaalde bedrag.

Van **€3,20 naar €3,50** is **€0,30**.

Van **€3,50 naar €4,00** is **€0,50**.

Samen:

**€0,30 + €0,50 = €0,80**.

Je krijgt dus **€0,80 wisselgeld**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We tellen vanaf de prijs omhoog naar het betaalde bedrag.",
  "Van **€3,20 naar €3,50** is **€0,30**.",
  "Van **€3,50 naar €4,00** is **€0,50**.",
  "Samen:",
  "**€0,30 + €0,50 = €0,80**.",
  "Je krijgt dus **€0,80 wisselgeld**."
]
```

### Visual stages

**Visual type:** `moneyReceipt`. All four frames below belong to surface `purchase`.

**Question stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€3,20"
    }
  ],
  "paid": "€4,00",
  "change": "?",
  "highlight": [],
  "groups": []
}
```

**Minnie stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€3,20"
    }
  ],
  "paid": "€4,00",
  "change": "?",
  "highlight": [],
  "groups": [
    {
      "lines": [
        "€3,50"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€3,20"
    }
  ],
  "paid": "€4,00",
  "change": "?",
  "highlight": [],
  "groups": [
    {
      "lines": [
        "€3,20 → €3,50 = €0,30",
        "€3,50 → €4,00 = €0,50"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€3,20"
    }
  ],
  "paid": "€4,00",
  "change": "€0,80",
  "highlight": [],
  "groups": [
    {
      "lines": [
        "€0,30 + €0,50 = €0,80"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: ticket

**Question**

Een kaartje kost **€3,20**. Je betaalt met **€4,00**. Hoeveel wisselgeld krijg je?

**Minnie**

Tel vanaf €3,20 omhoog naar €4,00. Een tussenstap via **€3,50** kan helpen.

**Moose**

Van €3,20 naar €3,50 is **€0,30**.  
Van €3,50 naar €4,00 is **€0,50**.  
Tel die twee bedragen bij elkaar op.

**Full explanation**

We tellen vanaf de prijs omhoog naar het betaalde bedrag.

Van **€3,20 naar €3,50** is **€0,30**.

Van **€3,50 naar €4,00** is **€0,50**.

Samen:

**€0,30 + €0,50 = €0,80**.

Je krijgt dus **€0,80 wisselgeld**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We tellen vanaf de prijs omhoog naar het betaalde bedrag.",
  "Van **€3,20 naar €3,50** is **€0,30**.",
  "Van **€3,50 naar €4,00** is **€0,50**.",
  "Samen:",
  "**€0,30 + €0,50 = €0,80**.",
  "Je krijgt dus **€0,80 wisselgeld**."
]
```

### Visual stages

**Visual type:** `moneyReceipt`. All four frames below belong to surface `ticket`.

**Question stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€3,20"
    }
  ],
  "paid": "€4,00",
  "change": "?",
  "highlight": [],
  "groups": []
}
```

**Minnie stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€3,20"
    }
  ],
  "paid": "€4,00",
  "change": "?",
  "highlight": [],
  "groups": [
    {
      "lines": [
        "€3,50"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€3,20"
    }
  ],
  "paid": "€4,00",
  "change": "?",
  "highlight": [],
  "groups": [
    {
      "lines": [
        "€3,20 → €3,50 = €0,30",
        "€3,50 → €4,00 = €0,50"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€3,20"
    }
  ],
  "paid": "€4,00",
  "change": "€0,80",
  "highlight": [],
  "groups": [
    {
      "lines": [
        "€0,30 + €0,50 = €0,80"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-MO-004 — Geld · Bedrag samenstellen

**Source:** expansion 75  
**Domain:** money  
**Objective:** compose_exact_currency_amount  
**Difficulty:** 1  
**Report label:** Geld · Bedrag samenstellen  
**Answer mode:** currencyCompose  
**Visual/presentation:** currency / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 2

### Educational core

```json
{
  "values": {
    "authored": "**Stel exact €8,50 samen**"
  },
  "question": {
    "answer": 850,
    "answerSpec": {
      "type": "currency",
      "mode": "compose",
      "denominations": [
        500,
        200,
        100,
        50
      ],
      "targetCents": 850
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `850`.
- Answer display: `"€8,50"`.
- Contract type: `currency`.
- Units: integer cents (displayed as euro amounts).

**Currency target (canonical cents):** 850.  
**Allowed denominations (cents):** 500, 200, 100, 50.  
**Multiple-valid-answer rule:** every valid allowed-denomination combination totaling the target is accepted; the explanation is an example, not a required combination.

**Currency assets:**

| Denomination (cents) | Runtime asset |
| --- | --- |
| 500 | assets/ui/currency/500.png |
| 200 | assets/ui/currency/200.png |
| 100 | assets/ui/currency/100.png |
| 50 | assets/ui/currency/50.png |

**Exact resolved answer contract:**

```json
{
  "answer": 850,
  "answerDisplay": "€8,50",
  "answerMode": "currencyCompose",
  "answerSpec": {
    "type": "currency",
    "mode": "compose",
    "denominations": [
      500,
      200,
      100,
      50
    ],
    "targetCents": 850
  }
}
```

### Surface: original

**Question**

Maak precies **€8,50** met de munten en biljetten.

**Minnie**

Begin met een groot bedrag dat **niet over €8,50 heen gaat**. Kijk daarna hoeveel er nog ontbreekt.

**Moose**

Je kunt bijvoorbeeld beginnen met **€5**. Dan moet je nog **€3,50** samenstellen met de andere bedragen.

**Full explanation**

Er zijn meerdere goede combinaties mogelijk.

Eén mogelijkheid is:

**€5 + €2 + €1 + €0,50 = €8,50**.

Controle:

**€5 + €2 = €7**.

**€7 + €1 = €8**.

**€8 + €0,50 = €8,50**.

Elke andere gekozen combinatie die precies **€8,50** vormt, is ook correct.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Er zijn meerdere goede combinaties mogelijk.",
  "Eén mogelijkheid is:",
  "**€5 + €2 + €1 + €0,50 = €8,50**.",
  "Controle:",
  "**€5 + €2 = €7**.",
  "**€7 + €1 = €8**.",
  "**€8 + €0,50 = €8,50**.",
  "Elke andere gekozen combinatie die precies **€8,50** vormt, is ook correct."
]
```

### Visual stages

**Visual type:** `currency`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "mode": "compose",
  "targetCents": 850,
  "denominations": [
    500,
    200,
    100,
    50
  ],
  "label": "€8,50"
}
```

**Minnie stage**

```json
{
  "mode": "compose",
  "targetCents": 850,
  "denominations": [
    500,
    200,
    100,
    50
  ],
  "label": "€8,50",
  "highlightDenominations": [
    500
  ]
}
```

**Moose stage**

```json
{
  "mode": "compose",
  "targetCents": 850,
  "denominations": [
    500,
    200,
    100,
    50
  ],
  "notes": [
    "€8,50 − €5,00 = €3,50 over"
  ]
}
```

**Explanation stage**

```json
{
  "mode": "compose",
  "targetCents": 850,
  "denominations": [
    500,
    200,
    100,
    50
  ],
  "notes": [
    "€5 + €2 + €1 + €0,50 = €8,50"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-MO-005 — Geld · Bedrag samenstellen

**Source:** expansion 75  
**Domain:** money  
**Objective:** compose_exact_currency_amount  
**Difficulty:** 2  
**Report label:** Geld · Bedrag samenstellen  
**Answer mode:** currencyCompose  
**Visual/presentation:** currency / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 2

### Educational core

```json
{
  "values": {
    "authored": "**Stel exact €24,50 samen**"
  },
  "question": {
    "answer": 2450,
    "answerSpec": {
      "type": "currency",
      "mode": "compose",
      "denominations": [
        2000,
        1000,
        500,
        200,
        100,
        50
      ],
      "targetCents": 2450
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `2450`.
- Answer display: `"€24,50"`.
- Contract type: `currency`.
- Units: integer cents (displayed as euro amounts).

**Currency target (canonical cents):** 2450.  
**Allowed denominations (cents):** 2000, 1000, 500, 200, 100, 50.  
**Multiple-valid-answer rule:** every valid allowed-denomination combination totaling the target is accepted; the explanation is an example, not a required combination.

**Currency assets:**

| Denomination (cents) | Runtime asset |
| --- | --- |
| 2000 | assets/ui/currency/2000.png |
| 1000 | assets/ui/currency/1000.png |
| 500 | assets/ui/currency/500.png |
| 200 | assets/ui/currency/200.png |
| 100 | assets/ui/currency/100.png |
| 50 | assets/ui/currency/50.png |

**Exact resolved answer contract:**

```json
{
  "answer": 2450,
  "answerDisplay": "€24,50",
  "answerMode": "currencyCompose",
  "answerSpec": {
    "type": "currency",
    "mode": "compose",
    "denominations": [
      2000,
      1000,
      500,
      200,
      100,
      50
    ],
    "targetCents": 2450
  }
}
```

### Surface: original

**Question**

Maak precies **€24,50** met de munten en biljetten.

**Minnie**

Begin met een groot bedrag dat onder **€24,50** blijft. Kijk daarna hoeveel er nog ontbreekt.

**Moose**

Je kunt bijvoorbeeld beginnen met **€20**. Dan moet je nog **€4,50** samenstellen.

**Full explanation**

Er zijn meerdere goede combinaties mogelijk.

Eén mogelijkheid is:

**€20 + €2 + €2 + €0,50 = €24,50**.

Controle:

**€20 + €2 + €2 = €24**.

**€24 + €0,50 = €24,50**.

Elke andere combinatie die precies **€24,50** vormt, is ook correct.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Er zijn meerdere goede combinaties mogelijk.",
  "Eén mogelijkheid is:",
  "**€20 + €2 + €2 + €0,50 = €24,50**.",
  "Controle:",
  "**€20 + €2 + €2 = €24**.",
  "**€24 + €0,50 = €24,50**.",
  "Elke andere combinatie die precies **€24,50** vormt, is ook correct."
]
```

### Visual stages

**Visual type:** `currency`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "mode": "compose",
  "targetCents": 2450,
  "denominations": [
    2000,
    1000,
    500,
    200,
    100,
    50
  ],
  "label": "€24,50"
}
```

**Minnie stage**

```json
{
  "mode": "compose",
  "targetCents": 2450,
  "denominations": [
    2000,
    1000,
    500,
    200,
    100,
    50
  ],
  "label": "€24,50",
  "highlightDenominations": [
    2000
  ]
}
```

**Moose stage**

```json
{
  "mode": "compose",
  "targetCents": 2450,
  "denominations": [
    2000,
    1000,
    500,
    200,
    100,
    50
  ],
  "notes": [
    "€24,50 − €20,00 = €4,50 over"
  ]
}
```

**Explanation stage**

```json
{
  "mode": "compose",
  "targetCents": 2450,
  "denominations": [
    2000,
    1000,
    500,
    200,
    100,
    50
  ],
  "notes": [
    "€20 + €2 + €2 + €0,50 = €24,50"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-MO-006 — Geld · Wisselgeld berekenen

**Source:** expansion 75  
**Domain:** money  
**Objective:** calculate_change_mixed_euros_cents  
**Difficulty:** 2  
**Report label:** Geld · Wisselgeld berekenen  
**Answer mode:** open  
**Visual/presentation:** moneyReceipt / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**Prijs €12,40; betaald €20,00 → wisselgeld €7,60**"
  },
  "question": {
    "answer": 760,
    "answerSpec": {
      "type": "euro",
      "allowedForms": [
        "7,60"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `760`.
- Answer display: `"760 cent = €7,60"`.
- Contract type: `euro`.
- Units: integer cents (displayed as euro amounts).

**Stored allowed forms (legacy metadata; structured input is used):**

```json
[
  "7,60"
]
```

**Accepted input:** structured digit fields `euros` and `cents`, using the rule above. Correct when canonical cents equal 760.

**Exact resolved answer contract:**

```json
{
  "answer": 760,
  "answerDisplay": "760 cent = €7,60",
  "answerMode": "open",
  "answerSpec": {
    "type": "euro",
    "allowedForms": [
      "7,60"
    ]
  }
}
```

### Surface: purchase

**Question**

Iets kost **€12,40**. Je betaalt met **€20,00**. Hoeveel geld krijg je terug?

**Minnie**

Tel vanaf **€12,40** omhoog naar €20,00. Ga eerst naar een heel eurobedrag.

**Moose**

Van €12,40 naar €13,00 is **€0,60**.  
Van €13,00 naar €20,00 is **€7,00**.  
Tel die twee bedragen bij elkaar op.

**Full explanation**

We tellen vanaf de prijs omhoog naar €20,00.

Van **€12,40 naar €13,00** is **€0,60**.

Van **€13,00 naar €20,00** is **€7,00**.

Samen:

**€0,60 + €7,00 = €7,60**.

Je krijgt dus **€7,60 wisselgeld**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We tellen vanaf de prijs omhoog naar €20,00.",
  "Van **€12,40 naar €13,00** is **€0,60**.",
  "Van **€13,00 naar €20,00** is **€7,00**.",
  "Samen:",
  "**€0,60 + €7,00 = €7,60**.",
  "Je krijgt dus **€7,60 wisselgeld**."
]
```

### Visual stages

**Visual type:** `moneyReceipt`. All four frames below belong to surface `purchase`.

**Question stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€12,40"
    }
  ],
  "paid": "€20,00",
  "change": "?",
  "highlight": [],
  "groups": []
}
```

**Minnie stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€12,40"
    }
  ],
  "paid": "€20,00",
  "change": "?",
  "highlight": [],
  "groups": [
    {
      "lines": [
        "€13,00"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€12,40"
    }
  ],
  "paid": "€20,00",
  "change": "?",
  "highlight": [],
  "groups": [
    {
      "lines": [
        "€12,40 → €13,00 = €0,60",
        "€13,00 → €20,00 = €7,00"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€12,40"
    }
  ],
  "paid": "€20,00",
  "change": "€7,60",
  "highlight": [],
  "groups": [
    {
      "lines": [
        "€0,60 + €7,00 = €7,60"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: entry

**Question**

Een toegangsbewijs kost **€12,40**. Je betaalt met **€20,00**. Hoeveel wisselgeld krijg je?

**Minnie**

Tel vanaf **€12,40** omhoog naar €20,00. Ga eerst naar een heel eurobedrag.

**Moose**

Van €12,40 naar €13,00 is **€0,60**.  
Van €13,00 naar €20,00 is **€7,00**.  
Tel die twee bedragen bij elkaar op.

**Full explanation**

We tellen vanaf de prijs omhoog naar €20,00.

Van **€12,40 naar €13,00** is **€0,60**.

Van **€13,00 naar €20,00** is **€7,00**.

Samen:

**€0,60 + €7,00 = €7,60**.

Je krijgt dus **€7,60 wisselgeld**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We tellen vanaf de prijs omhoog naar €20,00.",
  "Van **€12,40 naar €13,00** is **€0,60**.",
  "Van **€13,00 naar €20,00** is **€7,00**.",
  "Samen:",
  "**€0,60 + €7,00 = €7,60**.",
  "Je krijgt dus **€7,60 wisselgeld**."
]
```

### Visual stages

**Visual type:** `moneyReceipt`. All four frames below belong to surface `entry`.

**Question stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€12,40"
    }
  ],
  "paid": "€20,00",
  "change": "?",
  "highlight": [],
  "groups": []
}
```

**Minnie stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€12,40"
    }
  ],
  "paid": "€20,00",
  "change": "?",
  "highlight": [],
  "groups": [
    {
      "lines": [
        "€13,00"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€12,40"
    }
  ],
  "paid": "€20,00",
  "change": "?",
  "highlight": [],
  "groups": [
    {
      "lines": [
        "€12,40 → €13,00 = €0,60",
        "€13,00 → €20,00 = €7,00"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€12,40"
    }
  ],
  "paid": "€20,00",
  "change": "€7,60",
  "highlight": [],
  "groups": [
    {
      "lines": [
        "€0,60 + €7,00 = €7,60"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-MO-007 — Geld · Meerstaps betalen

**Source:** expansion 75  
**Domain:** money  
**Objective:** add_prices_then_calculate_change  
**Difficulty:** 2  
**Report label:** Geld · Meerstaps betalen  
**Answer mode:** open  
**Visual/presentation:** moneyReceipt / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**€7,35 + €4,80 = €12,15; betaald €20,00 → wisselgeld €7,85**"
  },
  "question": {
    "answer": 785,
    "answerSpec": {
      "type": "euro",
      "allowedForms": [
        "7,85"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `785`.
- Answer display: `"785 cent = €7,85"`.
- Contract type: `euro`.
- Units: integer cents (displayed as euro amounts).

**Stored allowed forms (legacy metadata; structured input is used):**

```json
[
  "7,85"
]
```

**Accepted input:** structured digit fields `euros` and `cents`, using the rule above. Correct when canonical cents equal 785.

**Exact resolved answer contract:**

```json
{
  "answer": 785,
  "answerDisplay": "785 cent = €7,85",
  "answerMode": "open",
  "answerSpec": {
    "type": "euro",
    "allowedForms": [
      "7,85"
    ]
  }
}
```

### Surface: shop

**Question**

Je koopt iets van **€7,35** en iets van **€4,80**. Je betaalt met **€20,00**. Hoeveel geld krijg je terug?

**Minnie**

Reken eerst uit wat de **twee aankopen samen** kosten. Pas daarna kun je het wisselgeld bepalen.

**Moose**

€7,35 + €4,80 = **€12,15**.

Tel nu vanaf €12,15 omhoog naar €20,00. Van €12,15 naar €13,00 is **€0,85**.

**Full explanation**

Eerst tellen we de twee prijzen op:

**€7,35 + €4,80 = €12,15**.

Je betaalt €20,00.

Van **€12,15 naar €13,00** is **€0,85**.

Van **€13,00 naar €20,00** is **€7,00**.

Samen:

**€0,85 + €7,00 = €7,85**.

Je krijgt dus **€7,85 wisselgeld**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Eerst tellen we de twee prijzen op:",
  "**€7,35 + €4,80 = €12,15**.",
  "Je betaalt €20,00.",
  "Van **€12,15 naar €13,00** is **€0,85**.",
  "Van **€13,00 naar €20,00** is **€7,00**.",
  "Samen:",
  "**€0,85 + €7,00 = €7,85**.",
  "Je krijgt dus **€7,85 wisselgeld**."
]
```

### Visual stages

**Visual type:** `moneyReceipt`. All four frames below belong to surface `shop`.

**Question stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€7,35"
    },
    {
      "label": "Prijs",
      "amount": "€4,80"
    }
  ],
  "paid": "€20,00",
  "change": "?",
  "highlight": [],
  "groups": []
}
```

**Minnie stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€7,35"
    },
    {
      "label": "Prijs",
      "amount": "€4,80"
    }
  ],
  "paid": "€20,00",
  "change": "?",
  "highlight": [
    0,
    1
  ],
  "groups": [
    {
      "lines": [
        "€7,35 + €4,80 = ?"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€7,35"
    },
    {
      "label": "Prijs",
      "amount": "€4,80"
    }
  ],
  "paid": "€20,00",
  "change": "?",
  "highlight": [],
  "groups": [
    {
      "lines": [
        "€7,35 + €4,80 = €12,15",
        "€12,15 → €13,00 = €0,85",
        "€13,00 → €20,00 = €7,00"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€7,35"
    },
    {
      "label": "Prijs",
      "amount": "€4,80"
    }
  ],
  "paid": "€20,00",
  "change": "€7,85",
  "highlight": [],
  "groups": [
    {
      "lines": [
        "€7,35 + €4,80 = €12,15",
        "€0,85 + €7,00 = €7,85"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: tickets

**Question**

Twee kaartjes kosten **€7,35** en **€4,80**. Je betaalt samen met **€20,00**. Hoeveel wisselgeld krijg je?

**Minnie**

Reken eerst uit wat de **twee aankopen samen** kosten. Pas daarna kun je het wisselgeld bepalen.

**Moose**

€7,35 + €4,80 = **€12,15**.

Tel nu vanaf €12,15 omhoog naar €20,00. Van €12,15 naar €13,00 is **€0,85**.

**Full explanation**

Eerst tellen we de twee prijzen op:

**€7,35 + €4,80 = €12,15**.

Je betaalt €20,00.

Van **€12,15 naar €13,00** is **€0,85**.

Van **€13,00 naar €20,00** is **€7,00**.

Samen:

**€0,85 + €7,00 = €7,85**.

Je krijgt dus **€7,85 wisselgeld**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Eerst tellen we de twee prijzen op:",
  "**€7,35 + €4,80 = €12,15**.",
  "Je betaalt €20,00.",
  "Van **€12,15 naar €13,00** is **€0,85**.",
  "Van **€13,00 naar €20,00** is **€7,00**.",
  "Samen:",
  "**€0,85 + €7,00 = €7,85**.",
  "Je krijgt dus **€7,85 wisselgeld**."
]
```

### Visual stages

**Visual type:** `moneyReceipt`. All four frames below belong to surface `tickets`.

**Question stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€7,35"
    },
    {
      "label": "Prijs",
      "amount": "€4,80"
    }
  ],
  "paid": "€20,00",
  "change": "?",
  "highlight": [],
  "groups": []
}
```

**Minnie stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€7,35"
    },
    {
      "label": "Prijs",
      "amount": "€4,80"
    }
  ],
  "paid": "€20,00",
  "change": "?",
  "highlight": [
    0,
    1
  ],
  "groups": [
    {
      "lines": [
        "€7,35 + €4,80 = ?"
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€7,35"
    },
    {
      "label": "Prijs",
      "amount": "€4,80"
    }
  ],
  "paid": "€20,00",
  "change": "?",
  "highlight": [],
  "groups": [
    {
      "lines": [
        "€7,35 + €4,80 = €12,15",
        "€12,15 → €13,00 = €0,85",
        "€13,00 → €20,00 = €7,00"
      ]
    }
  ]
}
```

**Explanation stage**

```json
{
  "items": [
    {
      "label": "Prijs",
      "amount": "€7,35"
    },
    {
      "label": "Prijs",
      "amount": "€4,80"
    }
  ],
  "paid": "€20,00",
  "change": "€7,85",
  "highlight": [],
  "groups": [
    {
      "lines": [
        "€7,35 + €4,80 = €12,15",
        "€0,85 + €7,00 = €7,85"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-MO-008 — Geld · Wisselgeld samenstellen

**Source:** expansion 75  
**Domain:** money  
**Objective:** compose_change_amount  
**Difficulty:** 3  
**Report label:** Geld · Wisselgeld samenstellen  
**Answer mode:** currencyCompose  
**Visual/presentation:** currency / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**Prijs €36,75; betaald €50,00 → wisselgeld €13,25**"
  },
  "question": {
    "answer": 1325,
    "answerSpec": {
      "type": "currency",
      "mode": "change",
      "denominations": [
        1000,
        500,
        200,
        100,
        50,
        10,
        5
      ],
      "priceCents": 3675,
      "paidCents": 5000
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `1325`.
- Answer display: `"€13,25"`.
- Contract type: `currency`.
- Units: integer cents (displayed as euro amounts).

**Currency target (canonical cents):** 1325.  
**Allowed denominations (cents):** 1000, 500, 200, 100, 50, 10, 5.  
**Multiple-valid-answer rule:** every valid allowed-denomination combination totaling the target is accepted; the explanation is an example, not a required combination.

**Currency assets:**

| Denomination (cents) | Runtime asset |
| --- | --- |
| 1000 | assets/ui/currency/1000.png |
| 500 | assets/ui/currency/500.png |
| 200 | assets/ui/currency/200.png |
| 100 | assets/ui/currency/100.png |
| 50 | assets/ui/currency/50.png |
| 10 | assets/ui/currency/10.png |
| 5 | assets/ui/currency/5.png |

**Exact resolved answer contract:**

```json
{
  "answer": 1325,
  "answerDisplay": "€13,25",
  "answerMode": "currencyCompose",
  "answerSpec": {
    "type": "currency",
    "mode": "change",
    "denominations": [
      1000,
      500,
      200,
      100,
      50,
      10,
      5
    ],
    "priceCents": 3675,
    "paidCents": 5000
  }
}
```

### Surface: original

**Question**

Een aankoop kost **€36,75**. Er wordt betaald met **€50,00**.

Stel het juiste **wisselgeld** samen.

**Minnie**

Bepaal eerst **hoeveel wisselgeld** nodig is. Tel vanaf €36,75 omhoog naar €50,00.

**Moose**

Van €36,75 naar €40,00 is **€3,25**.  
Van €40,00 naar €50,00 is **€10,00**.  
Gebruik die twee stukken om het totale wisselgeld te bepalen.

**Full explanation**

We tellen vanaf €36,75 omhoog naar €50,00.

Van **€36,75 naar €40,00** is **€3,25**.

Van **€40,00 naar €50,00** is **€10,00**.

Samen:

**€3,25 + €10,00 = €13,25**.

Het wisselgeld moet dus precies **€13,25** zijn.

Eén mogelijke samenstelling is:

**€10 + €2 + €1 + €0,10 + €0,10 + €0,05 = €13,25**.

Andere combinaties die exact €13,25 vormen zijn ook correct.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We tellen vanaf €36,75 omhoog naar €50,00.",
  "Van **€36,75 naar €40,00** is **€3,25**.",
  "Van **€40,00 naar €50,00** is **€10,00**.",
  "Samen:",
  "**€3,25 + €10,00 = €13,25**.",
  "Het wisselgeld moet dus precies **€13,25** zijn.",
  "Eén mogelijke samenstelling is:",
  "**€10 + €2 + €1 + €0,10 + €0,10 + €0,05 = €13,25**.",
  "Andere combinaties die exact €13,25 vormen zijn ook correct."
]
```

### Visual stages

**Visual type:** `currency`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "mode": "change",
  "priceCents": 3675,
  "paidCents": 5000,
  "denominations": [
    1000,
    500,
    200,
    100,
    50,
    10,
    5
  ],
  "notes": [
    "€36,75 → €50,00"
  ]
}
```

**Minnie stage**

```json
{
  "mode": "change",
  "priceCents": 3675,
  "paidCents": 5000,
  "denominations": [
    1000,
    500,
    200,
    100,
    50,
    10,
    5
  ],
  "notes": [
    "€36,75 → ? → €50,00"
  ]
}
```

**Moose stage**

```json
{
  "mode": "change",
  "priceCents": 3675,
  "paidCents": 5000,
  "denominations": [
    1000,
    500,
    200,
    100,
    50,
    10,
    5
  ],
  "notes": [
    "€36,75 → €40,00 = €3,25",
    "€40,00 → €50,00 = €10,00"
  ]
}
```

**Explanation stage**

```json
{
  "mode": "change",
  "priceCents": 3675,
  "paidCents": 5000,
  "denominations": [
    1000,
    500,
    200,
    100,
    50,
    10,
    5
  ],
  "notes": [
    "€3,25 + €10,00 = €13,25",
    "€10 + €2 + €1 + €0,10 + €0,10 + €0,05 = €13,25"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-TI-001 — Tijd · Analoge klok lezen

**Source:** expansion 75  
**Domain:** time  
**Objective:** analogue_clock_to_spoken_time_quarter_past  
**Difficulty:** 1  
**Report label:** Tijd · Analoge klok lezen  
**Answer mode:** multipleChoice  
**Visual/presentation:** analogueClock / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**Analoge klok 08:15 → kwart over acht**"
  },
  "question": {
    "answer": "kwart over acht",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "kwart over acht",
      "kwart voor acht",
      "half negen",
      "vijf over acht"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"kwart over acht"`.
- Answer display: `"kwart over acht"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "kwart over acht",
  "kwart voor acht",
  "half negen",
  "vijf over acht"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "kwart over acht",
  "answerDisplay": "kwart over acht",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "kwart over acht",
    "kwart voor acht",
    "half negen",
    "vijf over acht"
  ]
}
```

### Surface: original

**Question**

Hoe laat is het?

**Minnie**

Kijk eerst naar de lange wijzer. Die staat op de **3**. Dat betekent dat er 15 minuten voorbij zijn.

**Moose**

Het is **15 minuten na acht uur**. Vijftien minuten noemen we ook een kwartier.

**Full explanation**

De lange wijzer staat op de 3.

Dat betekent **15 minuten**.

De korte wijzer staat net voorbij de 8.

Het is dus **15 minuten over acht**.

15 minuten is een kwartier.

Daarom is het **kwart over acht**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "De lange wijzer staat op de 3.",
  "Dat betekent **15 minuten**.",
  "De korte wijzer staat net voorbij de 8.",
  "Het is dus **15 minuten over acht**.",
  "15 minuten is een kwartier.",
  "Daarom is het **kwart over acht**."
]
```

### Visual stages

**Visual type:** `analogueClock`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "hour": 8,
  "minute": 15
}
```

**Minnie stage**

```json
{
  "hour": 8,
  "minute": 15,
  "highlightHand": "minute",
  "highlightNumerals": [
    3
  ]
}
```

**Moose stage**

```json
{
  "hour": 8,
  "minute": 15,
  "notes": [
    "15 minuten na 8 uur"
  ]
}
```

**Explanation stage**

```json
{
  "hour": 8,
  "minute": 15,
  "notes": [
    "08:15 = kwart over acht"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-TI-002 — Tijd · Analoge klok lezen

**Source:** expansion 75  
**Domain:** time  
**Objective:** analogue_clock_to_spoken_time_half  
**Difficulty:** 1  
**Report label:** Tijd · Analoge klok lezen  
**Answer mode:** multipleChoice  
**Visual/presentation:** analogueClock / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**Analoge klok 16:30 → half vijf**"
  },
  "question": {
    "answer": "half vijf",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "half vier",
      "half vijf",
      "vier uur",
      "vijf uur"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"half vijf"`.
- Answer display: `"half vijf"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "half vier",
  "half vijf",
  "vier uur",
  "vijf uur"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "half vijf",
  "answerDisplay": "half vijf",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "half vier",
    "half vijf",
    "vier uur",
    "vijf uur"
  ]
}
```

### Surface: original

**Question**

Hoe laat is het?

**Minnie**

De lange wijzer staat op de **6**. Dan is er een half uur voorbij.

**Moose**

De korte wijzer staat halverwege **4 en 5**. In het Nederlands noemen we een half uur na vier: **half vijf**.

**Full explanation**

De lange wijzer op de 6 betekent **30 minuten**.

Het is dus 30 minuten na vier uur.

De korte wijzer staat daarom halverwege de 4 en de 5.

In het Nederlands zeggen we dan **half vijf**.

Dus **16:30 = half vijf**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "De lange wijzer op de 6 betekent **30 minuten**.",
  "Het is dus 30 minuten na vier uur.",
  "De korte wijzer staat daarom halverwege de 4 en de 5.",
  "In het Nederlands zeggen we dan **half vijf**.",
  "Dus **16:30 = half vijf**."
]
```

### Visual stages

**Visual type:** `analogueClock`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "hour": 16,
  "minute": 30
}
```

**Minnie stage**

```json
{
  "hour": 16,
  "minute": 30,
  "highlightHand": "minute",
  "highlightNumerals": [
    6
  ]
}
```

**Moose stage**

```json
{
  "hour": 16,
  "minute": 30,
  "highlightHand": "hour",
  "highlightNumerals": [
    4,
    5
  ]
}
```

**Explanation stage**

```json
{
  "hour": 16,
  "minute": 30,
  "notes": [
    "16:30 = half vijf"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-TI-003 — Tijd · Analoge klok lezen

**Source:** expansion 75  
**Domain:** time  
**Objective:** analogue_clock_to_spoken_time_before_half  
**Difficulty:** 1  
**Report label:** Tijd · Analoge klok lezen  
**Answer mode:** multipleChoice  
**Visual/presentation:** analogueClock / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**Analoge klok 10:25 → vijf voor half elf**"
  },
  "question": {
    "answer": "vijf voor half elf",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "vijf over half elf",
      "vijf voor half elf",
      "vijf voor tien",
      "half elf"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"vijf voor half elf"`.
- Answer display: `"vijf voor half elf"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "vijf over half elf",
  "vijf voor half elf",
  "vijf voor tien",
  "half elf"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "vijf voor half elf",
  "answerDisplay": "vijf voor half elf",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "vijf over half elf",
    "vijf voor half elf",
    "vijf voor tien",
    "half elf"
  ]
}
```

### Surface: original

**Question**

Hoe laat is het?

**Minnie**

De klok staat op **25 minuten over tien**. Kijk hoeveel minuten het nog duurt tot 10:30.

**Moose**

Van 10:25 naar 10:30 is nog **5 minuten**. 10:30 noemen we **half elf**.

**Full explanation**

De tijd is **10:25**.

Een half uur na tien is **10:30**. Dat noemen we in het Nederlands **half elf**.

Van 10:25 tot 10:30 zijn nog **5 minuten**.

Daarom zeggen we:

**vijf voor half elf**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "De tijd is **10:25**.",
  "Een half uur na tien is **10:30**. Dat noemen we in het Nederlands **half elf**.",
  "Van 10:25 tot 10:30 zijn nog **5 minuten**.",
  "Daarom zeggen we:",
  "**vijf voor half elf**."
]
```

### Visual stages

**Visual type:** `analogueClock`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "hour": 10,
  "minute": 25
}
```

**Minnie stage**

```json
{
  "hour": 10,
  "minute": 25,
  "highlightHand": "minute",
  "highlightNumerals": [
    5
  ]
}
```

**Moose stage**

```json
{
  "hour": 10,
  "minute": 25,
  "referenceMinute": 30,
  "notes": [
    "nog 5 minuten tot half elf"
  ]
}
```

**Explanation stage**

```json
{
  "hour": 10,
  "minute": 25,
  "notes": [
    "10:25 = vijf voor half elf"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-TI-004 — Tijd · Analoge klok lezen

**Source:** expansion 75  
**Domain:** time  
**Objective:** analogue_clock_to_spoken_time_after_half  
**Difficulty:** 2  
**Report label:** Tijd · Analoge klok lezen  
**Answer mode:** multipleChoice  
**Visual/presentation:** analogueClock / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**Analoge klok 13:40 → tien over half twee**"
  },
  "question": {
    "answer": "tien over half twee",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "tien voor half twee",
      "tien over half twee",
      "twintig voor één",
      "tien over één"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"tien over half twee"`.
- Answer display: `"tien over half twee"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "tien voor half twee",
  "tien over half twee",
  "twintig voor één",
  "tien over één"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "tien over half twee",
  "answerDisplay": "tien over half twee",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "tien voor half twee",
    "tien over half twee",
    "twintig voor één",
    "tien over één"
  ]
}
```

### Surface: original

**Question**

Hoe laat is het?

**Minnie**

Gebruik **13:30** als handig herkenningspunt. De klok staat daar 10 minuten voorbij.

**Moose**

13:30 noemen we **half twee**. De klok staat op 13:40, dus dat is 10 minuten later.

**Full explanation**

13:30 is **half twee**.

De klok staat op 13:40.

Van 13:30 naar 13:40 is **10 minuten**.

Daarom is 13:40:

**tien over half twee**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "13:30 is **half twee**.",
  "De klok staat op 13:40.",
  "Van 13:30 naar 13:40 is **10 minuten**.",
  "Daarom is 13:40:",
  "**tien over half twee**."
]
```

### Visual stages

**Visual type:** `analogueClock`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "hour": 13,
  "minute": 40
}
```

**Minnie stage**

```json
{
  "hour": 13,
  "minute": 40,
  "referenceMinute": 30,
  "referenceLabel": "13:30"
}
```

**Moose stage**

```json
{
  "hour": 13,
  "minute": 40,
  "referenceMinute": 30,
  "notes": [
    "13:30 → 13:40 = 10 minuten"
  ]
}
```

**Explanation stage**

```json
{
  "hour": 13,
  "minute": 40,
  "notes": [
    "13:30 = half twee",
    "13:40 = tien over half twee"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-TI-005 — Tijd · Digitale klok lezen

**Source:** expansion 75  
**Domain:** time  
**Objective:** digital_clock_to_spoken_time_quarter_past  
**Difficulty:** 1  
**Report label:** Tijd · Digitale klok lezen  
**Answer mode:** multipleChoice  
**Visual/presentation:** digitalClock / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**14:15 → kwart over twee**"
  },
  "question": {
    "answer": "kwart over twee",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "kwart over twee",
      "kwart voor twee",
      "half drie",
      "kwart over drie"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"kwart over twee"`.
- Answer display: `"kwart over twee"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "kwart over twee",
  "kwart voor twee",
  "half drie",
  "kwart over drie"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "kwart over twee",
  "answerDisplay": "kwart over twee",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "kwart over twee",
    "kwart voor twee",
    "half drie",
    "kwart over drie"
  ]
}
```

### Surface: original

**Question**

Hoe zeg je deze tijd?

**Minnie**

Kijk eerst naar de minuten. **:15** betekent dat er 15 minuten na het hele uur voorbij zijn.

**Moose**

14:00 is twee uur in de middag. 14:15 is **15 minuten later**. Vijftien minuten is een kwartier.

**Full explanation**

De digitale klok toont **14:15**.

14:00 is twee uur in de middag.

De `15` betekent dat er 15 minuten voorbij zijn.

15 minuten is een kwartier.

Dus **14:15 = kwart over twee**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "De digitale klok toont **14:15**.",
  "14:00 is twee uur in de middag.",
  "De `15` betekent dat er 15 minuten voorbij zijn.",
  "15 minuten is een kwartier.",
  "Dus **14:15 = kwart over twee**."
]
```

### Visual stages

**Visual type:** `digitalClock`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "hour": 14,
  "minute": 15
}
```

**Minnie stage**

```json
{
  "hour": 14,
  "minute": 15,
  "highlightMinutes": true
}
```

**Moose stage**

```json
{
  "hour": 14,
  "minute": 15,
  "notes": [
    "15 minuten na 14:00",
    "14:00 = twee uur 's middags"
  ]
}
```

**Explanation stage**

```json
{
  "hour": 14,
  "minute": 15,
  "notes": [
    "14:15 = kwart over twee"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-TI-006 — Tijd · Digitale klok lezen

**Source:** expansion 75  
**Domain:** time  
**Objective:** digital_clock_to_spoken_time_half  
**Difficulty:** 1  
**Report label:** Tijd · Digitale klok lezen  
**Answer mode:** multipleChoice  
**Visual/presentation:** digitalClock / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**09:30 → half tien**"
  },
  "question": {
    "answer": "half tien",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "half negen",
      "half tien",
      "negen uur",
      "tien voor half tien"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"half tien"`.
- Answer display: `"half tien"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "half negen",
  "half tien",
  "negen uur",
  "tien voor half tien"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "half tien",
  "answerDisplay": "half tien",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "half negen",
    "half tien",
    "negen uur",
    "tien voor half tien"
  ]
}
```

### Surface: original

**Question**

Hoe zeg je deze tijd?

**Minnie**

**:30** betekent dat er een half uur voorbij is. Kijk ook naar het volgende hele uur.

**Moose**

09:30 is 30 minuten na negen en 30 minuten vóór tien. In het Nederlands noemen we dat **half tien**.

**Full explanation**

De digitale klok toont **09:30**.

Dat is een half uur na negen uur.

Het volgende hele uur is tien uur.

In het Nederlands noemen we deze tijd daarom **half tien**.

Dus **09:30 = half tien**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "De digitale klok toont **09:30**.",
  "Dat is een half uur na negen uur.",
  "Het volgende hele uur is tien uur.",
  "In het Nederlands noemen we deze tijd daarom **half tien**.",
  "Dus **09:30 = half tien**."
]
```

### Visual stages

**Visual type:** `digitalClock`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "hour": 9,
  "minute": 30
}
```

**Minnie stage**

```json
{
  "hour": 9,
  "minute": 30,
  "highlightMinutes": true
}
```

**Moose stage**

```json
{
  "hour": 9,
  "minute": 30,
  "notes": [
    "30 minuten na 9 uur",
    "09:30 → 10:00"
  ]
}
```

**Explanation stage**

```json
{
  "hour": 9,
  "minute": 30,
  "notes": [
    "09:30 = half tien"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-TI-007 — Tijd · Digitale klok lezen

**Source:** expansion 75  
**Domain:** time  
**Objective:** digital_clock_to_spoken_time_before_half  
**Difficulty:** 2  
**Report label:** Tijd · Digitale klok lezen  
**Answer mode:** multipleChoice  
**Visual/presentation:** digitalClock / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**22:25 → vijf voor half elf**"
  },
  "question": {
    "answer": "vijf voor half elf",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "vijf over half elf",
      "vijf voor half elf",
      "vijf voor tien",
      "vijf over tien"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"vijf voor half elf"`.
- Answer display: `"vijf voor half elf"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "vijf over half elf",
  "vijf voor half elf",
  "vijf voor tien",
  "vijf over tien"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "vijf voor half elf",
  "answerDisplay": "vijf voor half elf",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "vijf over half elf",
    "vijf voor half elf",
    "vijf voor tien",
    "vijf over tien"
  ]
}
```

### Surface: original

**Question**

Hoe zeg je deze tijd?

**Minnie**

Kijk hoeveel minuten het nog duurt tot **22:30**.

**Moose**

Van 22:25 naar 22:30 is **5 minuten**. 22:30 noemen we in het Nederlands **half elf**.

**Full explanation**

De klok toont **22:25**.

Een half uur na tien uur 's avonds is **22:30**. In het Nederlands zeggen we dan **half elf**.

Van 22:25 tot 22:30 zijn nog **5 minuten**.

Daarom is **22:25 = vijf voor half elf**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "De klok toont **22:25**.",
  "Een half uur na tien uur 's avonds is **22:30**. In het Nederlands zeggen we dan **half elf**.",
  "Van 22:25 tot 22:30 zijn nog **5 minuten**.",
  "Daarom is **22:25 = vijf voor half elf**."
]
```

### Visual stages

**Visual type:** `digitalClock`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "hour": 22,
  "minute": 25
}
```

**Minnie stage**

```json
{
  "hour": 22,
  "minute": 25,
  "highlightMinutes": true
}
```

**Moose stage**

```json
{
  "hour": 22,
  "minute": 25,
  "notes": [
    "22:25 → 22:30 = 5 minuten",
    "22:30 = half elf"
  ]
}
```

**Explanation stage**

```json
{
  "hour": 22,
  "minute": 25,
  "notes": [
    "22:25 = vijf voor half elf"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-TI-008 — Tijd · Digitale klok lezen

**Source:** expansion 75  
**Domain:** time  
**Objective:** digital_clock_to_spoken_time_after_half  
**Difficulty:** 2  
**Report label:** Tijd · Digitale klok lezen  
**Answer mode:** multipleChoice  
**Visual/presentation:** digitalClock / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**17:40 → tien over half zes**"
  },
  "question": {
    "answer": "tien over half zes",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "tien voor half zes",
      "tien over half zes",
      "twintig voor vijf",
      "tien over vijf"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"tien over half zes"`.
- Answer display: `"tien over half zes"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "tien voor half zes",
  "tien over half zes",
  "twintig voor vijf",
  "tien over vijf"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "tien over half zes",
  "answerDisplay": "tien over half zes",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "tien voor half zes",
    "tien over half zes",
    "twintig voor vijf",
    "tien over vijf"
  ]
}
```

### Surface: original

**Question**

Hoe zeg je deze tijd?

**Minnie**

Gebruik **17:30** als herkenningspunt. Hoeveel minuten is 17:40 later?

**Moose**

17:30 is **half zes**. Van 17:30 naar 17:40 is **10 minuten**.

**Full explanation**

17:30 noemen we **half zes**.

De klok staat op 17:40.

Dat is **10 minuten na half zes**.

Dus **17:40 = tien over half zes**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "17:30 noemen we **half zes**.",
  "De klok staat op 17:40.",
  "Dat is **10 minuten na half zes**.",
  "Dus **17:40 = tien over half zes**."
]
```

### Visual stages

**Visual type:** `digitalClock`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "hour": 17,
  "minute": 40
}
```

**Minnie stage**

```json
{
  "hour": 17,
  "minute": 40,
  "notes": [
    "17:30"
  ]
}
```

**Moose stage**

```json
{
  "hour": 17,
  "minute": 40,
  "notes": [
    "17:30 → 17:40 = 10 minuten",
    "17:30 = half zes"
  ]
}
```

**Explanation stage**

```json
{
  "hour": 17,
  "minute": 40,
  "notes": [
    "17:40 = tien over half zes"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-TI-009 — Tijd · Tijdsduur

**Source:** expansion 75  
**Domain:** time  
**Objective:** elapsed_time_same_hour  
**Difficulty:** 1  
**Report label:** Tijd · Tijdsduur  
**Answer mode:** open  
**Visual/presentation:** timeLine / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**10:10 → 10:35 = 25 minuten**"
  },
  "question": {
    "answer": 25,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "25"
      ],
      "unit": "minuten"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `25`.
- Answer display: `"25"`.
- Contract type: `wholeNumber`.
- Units: `"minuten"`.

**Stored allowed forms:**

```json
[
  "25"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 25,
  "answerDisplay": "25",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "25"
    ],
    "unit": "minuten"
  }
}
```

### Surface: activity

**Question**

Een activiteit begint om **10:10** en eindigt om **10:35**. Hoeveel minuten duurt de activiteit?

**Minnie**

Je kunt de tijd in twee makkelijke stukken verdelen. Ga eerst van 10:10 naar **10:30**.

**Moose**

Van 10:10 naar 10:30 is **20 minuten**. Van 10:30 naar 10:35 is nog **5 minuten**.

**Full explanation**

Van **10:10 naar 10:30** zijn 20 minuten.

Van **10:30 naar 10:35** zijn 5 minuten.

Samen:

**20 + 5 = 25 minuten**.

De tijdsduur is dus **25 minuten**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Van **10:10 naar 10:30** zijn 20 minuten.",
  "Van **10:30 naar 10:35** zijn 5 minuten.",
  "Samen:",
  "**20 + 5 = 25 minuten**.",
  "De tijdsduur is dus **25 minuten**."
]
```

### Visual stages

**Visual type:** `timeLine`. All four frames below belong to surface `activity`.

**Question stage**

```json
{
  "direction": "forward",
  "nodes": [
    "10:10",
    "10:35"
  ],
  "jumps": []
}
```

**Minnie stage**

```json
{
  "direction": "forward",
  "nodes": [
    "10:10",
    "10:30",
    "10:35"
  ],
  "jumps": []
}
```

**Moose stage**

```json
{
  "direction": "forward",
  "nodes": [
    "10:10",
    "10:30",
    "10:35"
  ],
  "jumps": [
    "20 min",
    "5 min"
  ]
}
```

**Explanation stage**

```json
{
  "direction": "forward",
  "nodes": [
    "10:10",
    "10:30",
    "10:35"
  ],
  "jumps": [
    "20 min",
    "5 min"
  ],
  "notes": [
    "20 + 5 = 25 minuten"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: wait

**Question**

Je begint om **10:10** te wachten. Om **10:35** kun je verder. Hoeveel minuten heb je gewacht?

**Minnie**

Je kunt de tijd in twee makkelijke stukken verdelen. Ga eerst van 10:10 naar **10:30**.

**Moose**

Van 10:10 naar 10:30 is **20 minuten**. Van 10:30 naar 10:35 is nog **5 minuten**.

**Full explanation**

Van **10:10 naar 10:30** zijn 20 minuten.

Van **10:30 naar 10:35** zijn 5 minuten.

Samen:

**20 + 5 = 25 minuten**.

De tijdsduur is dus **25 minuten**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Van **10:10 naar 10:30** zijn 20 minuten.",
  "Van **10:30 naar 10:35** zijn 5 minuten.",
  "Samen:",
  "**20 + 5 = 25 minuten**.",
  "De tijdsduur is dus **25 minuten**."
]
```

### Visual stages

**Visual type:** `timeLine`. All four frames below belong to surface `wait`.

**Question stage**

```json
{
  "direction": "forward",
  "nodes": [
    "10:10",
    "10:35"
  ],
  "jumps": []
}
```

**Minnie stage**

```json
{
  "direction": "forward",
  "nodes": [
    "10:10",
    "10:30",
    "10:35"
  ],
  "jumps": []
}
```

**Moose stage**

```json
{
  "direction": "forward",
  "nodes": [
    "10:10",
    "10:30",
    "10:35"
  ],
  "jumps": [
    "20 min",
    "5 min"
  ]
}
```

**Explanation stage**

```json
{
  "direction": "forward",
  "nodes": [
    "10:10",
    "10:30",
    "10:35"
  ],
  "jumps": [
    "20 min",
    "5 min"
  ],
  "notes": [
    "20 + 5 = 25 minuten"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-TI-010 — Tijd · Tijdsduur

**Source:** expansion 75  
**Domain:** time  
**Objective:** elapsed_time_half_hour  
**Difficulty:** 1  
**Report label:** Tijd · Tijdsduur  
**Answer mode:** open  
**Visual/presentation:** timeLine / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**09:20 → 09:50 = 30 minuten**"
  },
  "question": {
    "answer": 30,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "30"
      ],
      "unit": "minuten"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `30`.
- Answer display: `"30"`.
- Contract type: `wholeNumber`.
- Units: `"minuten"`.

**Stored allowed forms:**

```json
[
  "30"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 30,
  "answerDisplay": "30",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "30"
    ],
    "unit": "minuten"
  }
}
```

### Surface: original

**Question**

Een activiteit begint om **09:20** en eindigt om **09:50**.

Hoeveel minuten duurt de activiteit?

**Minnie**

Beide tijden liggen in hetzelfde uur. Je kunt daarom naar het verschil tussen de minuten kijken.

**Moose**

De begintijd heeft **20 minuten** en de eindtijd **50 minuten**. Reken **50 − 20**.

**Full explanation**

De activiteit begint om 09:20 en eindigt om 09:50.

Omdat beide tijden in hetzelfde uur liggen, rekenen we:

**50 − 20 = 30**.

De activiteit duurt dus **30 minuten**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "De activiteit begint om 09:20 en eindigt om 09:50.",
  "Omdat beide tijden in hetzelfde uur liggen, rekenen we:",
  "**50 − 20 = 30**.",
  "De activiteit duurt dus **30 minuten**."
]
```

### Visual stages

**Visual type:** `timeLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "direction": "forward",
  "nodes": [
    "09:20",
    "09:50"
  ],
  "jumps": []
}
```

**Minnie stage**

```json
{
  "direction": "forward",
  "nodes": [
    "09:20",
    "09:50"
  ],
  "jumps": [],
  "focusNodes": [
    0,
    1
  ]
}
```

**Moose stage**

```json
{
  "direction": "forward",
  "nodes": [
    "09:20",
    "09:50"
  ],
  "jumps": [],
  "notes": [
    "50 − 20 = ?"
  ]
}
```

**Explanation stage**

```json
{
  "direction": "forward",
  "nodes": [
    "09:20",
    "09:50"
  ],
  "jumps": [],
  "notes": [
    "50 − 20 = 30 minuten"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-TI-011 — Tijd · Tijdsduur over het uur

**Source:** expansion 75  
**Domain:** time  
**Objective:** elapsed_time_cross_hour  
**Difficulty:** 2  
**Report label:** Tijd · Tijdsduur over het uur  
**Answer mode:** open  
**Visual/presentation:** timeLine / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**14:31 → 15:20 = 49 minuten**"
  },
  "question": {
    "answer": 49,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "49"
      ],
      "unit": "minuten"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `49`.
- Answer display: `"49"`.
- Contract type: `wholeNumber`.
- Units: `"minuten"`.

**Stored allowed forms:**

```json
[
  "49"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 49,
  "answerDisplay": "49",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "49"
    ],
    "unit": "minuten"
  }
}
```

### Surface: original

**Question**

Een activiteit begint om **14:31** en eindigt om **15:20**.

Hoeveel minuten duurt de activiteit?

**Minnie**

Ga eerst van 14:31 naar het volgende hele uur: **15:00**.

**Moose**

Van 14:31 naar 15:00 is **29 minuten**. Daarna is het van 15:00 naar 15:20 nog **20 minuten**.

**Full explanation**

We splitsen de tijd in twee stukken.

Van **14:31 naar 15:00**:

**29 minuten**.

Van **15:00 naar 15:20**:

**20 minuten**.

Samen:

**29 + 20 = 49 minuten**.

De activiteit duurt **49 minuten**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen de tijd in twee stukken.",
  "Van **14:31 naar 15:00**:",
  "**29 minuten**.",
  "Van **15:00 naar 15:20**:",
  "**20 minuten**.",
  "Samen:",
  "**29 + 20 = 49 minuten**.",
  "De activiteit duurt **49 minuten**."
]
```

### Visual stages

**Visual type:** `timeLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "direction": "forward",
  "nodes": [
    "14:31",
    "15:20"
  ],
  "jumps": []
}
```

**Minnie stage**

```json
{
  "direction": "forward",
  "nodes": [
    "14:31",
    "15:00",
    "15:20"
  ],
  "jumps": []
}
```

**Moose stage**

```json
{
  "direction": "forward",
  "nodes": [
    "14:31",
    "15:00",
    "15:20"
  ],
  "jumps": [
    "29 min",
    "20 min"
  ]
}
```

**Explanation stage**

```json
{
  "direction": "forward",
  "nodes": [
    "14:31",
    "15:00",
    "15:20"
  ],
  "jumps": [
    "29 min",
    "20 min"
  ],
  "notes": [
    "29 + 20 = 49 minuten"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-TI-012 — Tijd · Tijdsduur over het uur

**Source:** expansion 75  
**Domain:** time  
**Objective:** elapsed_time_cross_hour_nonround  
**Difficulty:** 2  
**Report label:** Tijd · Tijdsduur over het uur  
**Answer mode:** open  
**Visual/presentation:** timeLine / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**15:42 → 16:39 = 57 minuten**"
  },
  "question": {
    "answer": 57,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "57"
      ],
      "unit": "minuten"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `57`.
- Answer display: `"57"`.
- Contract type: `wholeNumber`.
- Units: `"minuten"`.

**Stored allowed forms:**

```json
[
  "57"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 57,
  "answerDisplay": "57",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "57"
    ],
    "unit": "minuten"
  }
}
```

### Surface: original

**Question**

Een activiteit begint om **15:42** en eindigt om **16:39**.

Hoeveel minuten duurt de activiteit?

**Minnie**

Gebruik **16:00** als tussenpunt. Zo krijg je twee overzichtelijke stukken.

**Moose**

Van 15:42 naar 16:00 is **18 minuten**. Van 16:00 naar 16:39 is **39 minuten**.

**Full explanation**

Van **15:42 naar 16:00** zijn 18 minuten.

Van **16:00 naar 16:39** zijn 39 minuten.

Samen:

**18 + 39 = 57 minuten**.

De activiteit duurt dus **57 minuten**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Van **15:42 naar 16:00** zijn 18 minuten.",
  "Van **16:00 naar 16:39** zijn 39 minuten.",
  "Samen:",
  "**18 + 39 = 57 minuten**.",
  "De activiteit duurt dus **57 minuten**."
]
```

### Visual stages

**Visual type:** `timeLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "direction": "forward",
  "nodes": [
    "15:42",
    "16:39"
  ],
  "jumps": []
}
```

**Minnie stage**

```json
{
  "direction": "forward",
  "nodes": [
    "15:42",
    "16:00",
    "16:39"
  ],
  "jumps": []
}
```

**Moose stage**

```json
{
  "direction": "forward",
  "nodes": [
    "15:42",
    "16:00",
    "16:39"
  ],
  "jumps": [
    "18 min",
    "39 min"
  ]
}
```

**Explanation stage**

```json
{
  "direction": "forward",
  "nodes": [
    "15:42",
    "16:00",
    "16:39"
  ],
  "jumps": [
    "18 min",
    "39 min"
  ],
  "notes": [
    "18 + 39 = 57 minuten"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-TI-013 — Tijd · Eindtijd bepalen

**Source:** expansion 75  
**Domain:** time  
**Objective:** find_end_time_simple  
**Difficulty:** 1  
**Report label:** Tijd · Eindtijd bepalen  
**Answer mode:** multipleChoice  
**Visual/presentation:** timeLine / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**Start 13:20 + 30 minuten = 13:50**"
  },
  "question": {
    "answer": "13:50",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "13:40",
      "13:50",
      "14:00",
      "14:20"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"13:50"`.
- Answer display: `"13:50"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "13:40",
  "13:50",
  "14:00",
  "14:20"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "13:50",
  "answerDisplay": "13:50",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "13:40",
    "13:50",
    "14:00",
    "14:20"
  ]
}
```

### Surface: original

**Question**

Een activiteit begint om **13:20** en duurt **30 minuten**.

Hoe laat is de activiteit afgelopen?

**Minnie**

Tel de 30 minuten stap voor stap bij 13:20 op.

**Moose**

Na 20 minuten is het **13:40**. Er moeten dan nog **10 minuten** bij.

**Full explanation**

De activiteit begint om 13:20.

Na 20 minuten is het:

**13:40**.

Er moeten nog 10 minuten bij:

**13:40 + 10 minuten = 13:50**.

De eindtijd is dus **13:50**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "De activiteit begint om 13:20.",
  "Na 20 minuten is het:",
  "**13:40**.",
  "Er moeten nog 10 minuten bij:",
  "**13:40 + 10 minuten = 13:50**.",
  "De eindtijd is dus **13:50**."
]
```

### Visual stages

**Visual type:** `timeLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "direction": "forward",
  "nodes": [
    "13:20",
    "?"
  ],
  "jumps": [
    "+30 minuten"
  ],
  "digital": true
}
```

**Minnie stage**

```json
{
  "direction": "forward",
  "nodes": [
    "13:20",
    "13:30",
    "?"
  ],
  "jumps": [
    "+10 min",
    "+20 min"
  ]
}
```

**Moose stage**

```json
{
  "direction": "forward",
  "nodes": [
    "13:20",
    "13:40",
    "?"
  ],
  "jumps": [
    "+20 min",
    "+10 min"
  ]
}
```

**Explanation stage**

```json
{
  "direction": "forward",
  "nodes": [
    "13:20",
    "13:40",
    "13:50"
  ],
  "jumps": [
    "+20 min",
    "+10 min"
  ],
  "digital": true
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-TI-014 — Tijd · Eindtijd bepalen

**Source:** expansion 75  
**Domain:** time  
**Objective:** find_end_time_hours_minutes  
**Difficulty:** 3  
**Report label:** Tijd · Eindtijd bepalen  
**Answer mode:** multipleChoice  
**Visual/presentation:** timeLine / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**Start 13:50 + 1 uur 25 minuten = 15:15**"
  },
  "question": {
    "answer": "15:15",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "14:15",
      "14:55",
      "15:05",
      "15:15"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"15:15"`.
- Answer display: `"15:15"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "14:15",
  "14:55",
  "15:05",
  "15:15"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "15:15",
  "answerDisplay": "15:15",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "14:15",
    "14:55",
    "15:05",
    "15:15"
  ]
}
```

### Surface: original

**Question**

Een activiteit begint om **13:50** en duurt **1 uur en 25 minuten**.

Hoe laat is de activiteit afgelopen?

**Minnie**

Splits de duur in **1 uur** en **25 minuten**. Tel eerst het hele uur erbij.

**Moose**

13:50 + 1 uur = **14:50**. Nu moeten er nog 25 minuten bij.

**Full explanation**

Eerst tellen we 1 uur bij 13:50 op:

**13:50 + 1 uur = 14:50**.

Daarna nog 25 minuten.

Van 14:50 naar 15:00 is 10 minuten.

Er blijven nog 15 minuten over:

**15:00 + 15 minuten = 15:15**.

De eindtijd is dus **15:15**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Eerst tellen we 1 uur bij 13:50 op:",
  "**13:50 + 1 uur = 14:50**.",
  "Daarna nog 25 minuten.",
  "Van 14:50 naar 15:00 is 10 minuten.",
  "Er blijven nog 15 minuten over:",
  "**15:00 + 15 minuten = 15:15**.",
  "De eindtijd is dus **15:15**."
]
```

### Visual stages

**Visual type:** `timeLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "direction": "forward",
  "nodes": [
    "13:50",
    "?"
  ],
  "jumps": [
    "+1 uur 25 minuten"
  ],
  "digital": true
}
```

**Minnie stage**

```json
{
  "direction": "forward",
  "nodes": [
    "13:50",
    "?",
    "?"
  ],
  "jumps": [
    "+1 uur",
    "+25 minuten"
  ]
}
```

**Moose stage**

```json
{
  "direction": "forward",
  "nodes": [
    "13:50",
    "14:50",
    "?"
  ],
  "jumps": [
    "+1 uur",
    "+25 min"
  ]
}
```

**Explanation stage**

```json
{
  "direction": "forward",
  "nodes": [
    "13:50",
    "14:50",
    "15:00",
    "15:15"
  ],
  "jumps": [
    "+1 uur",
    "+10 min",
    "+15 min"
  ],
  "digital": true
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-TI-015 — Tijd · Begintijd bepalen

**Source:** expansion 75  
**Domain:** time  
**Objective:** find_start_time_minutes  
**Difficulty:** 2  
**Report label:** Tijd · Begintijd bepalen  
**Answer mode:** multipleChoice  
**Visual/presentation:** timeLine / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**Einde 15:10; duur 35 minuten → start 14:35**"
  },
  "question": {
    "answer": "14:35",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "14:25",
      "14:35",
      "14:45",
      "15:35"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"14:35"`.
- Answer display: `"14:35"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "14:25",
  "14:35",
  "14:45",
  "15:35"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "14:35",
  "answerDisplay": "14:35",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "14:25",
    "14:35",
    "14:45",
    "15:35"
  ]
}
```

### Surface: original

**Question**

Een activiteit eindigt om **15:10** en duurt **35 minuten**.

Hoe laat begon de activiteit?

**Minnie**

Reken achteruit vanaf 15:10. Ga eerst **10 minuten terug naar 15:00**.

**Moose**

Van de 35 minuten heb je dan 10 minuten teruggeteld. Er moeten nog **25 minuten** af van 15:00.

**Full explanation**

We rekenen 35 minuten terug vanaf 15:10.

Eerst 10 minuten terug:

**15:10 → 15:00**.

Er blijven nog 25 minuten over.

**15:00 − 25 minuten = 14:35**.

De activiteit begon dus om **14:35**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We rekenen 35 minuten terug vanaf 15:10.",
  "Eerst 10 minuten terug:",
  "**15:10 → 15:00**.",
  "Er blijven nog 25 minuten over.",
  "**15:00 − 25 minuten = 14:35**.",
  "De activiteit begon dus om **14:35**."
]
```

### Visual stages

**Visual type:** `timeLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "direction": "backward",
  "nodes": [
    "15:10",
    "?"
  ],
  "jumps": [
    "−35 minuten"
  ],
  "digital": true
}
```

**Minnie stage**

```json
{
  "direction": "backward",
  "nodes": [
    "15:10",
    "15:00",
    "?"
  ],
  "jumps": []
}
```

**Moose stage**

```json
{
  "direction": "backward",
  "nodes": [
    "15:10",
    "15:00",
    "?"
  ],
  "jumps": [
    "−10 min",
    "−25 min"
  ]
}
```

**Explanation stage**

```json
{
  "direction": "backward",
  "nodes": [
    "15:10",
    "15:00",
    "14:35"
  ],
  "jumps": [
    "−10 min",
    "−25 min"
  ],
  "digital": true
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-TI-016 — Tijd · Begintijd bepalen

**Source:** expansion 75  
**Domain:** time  
**Objective:** find_start_time_hours_minutes  
**Difficulty:** 3  
**Report label:** Tijd · Begintijd bepalen  
**Answer mode:** multipleChoice  
**Visual/presentation:** timeLine / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**Einde 16:20; duur 1 uur 35 minuten → start 14:45**"
  },
  "question": {
    "answer": "14:45",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "14:35",
      "14:45",
      "15:05",
      "15:45"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"14:45"`.
- Answer display: `"14:45"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "14:35",
  "14:45",
  "15:05",
  "15:45"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "14:45",
  "answerDisplay": "14:45",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "14:35",
    "14:45",
    "15:05",
    "15:45"
  ]
}
```

### Surface: original

**Question**

Een activiteit eindigt om **16:20** en duurt **1 uur en 35 minuten**.

Hoe laat begon de activiteit?

**Minnie**

Trek eerst **1 uur** van 16:20 af. Daarna moet je nog 35 minuten terug.

**Moose**

16:20 − 1 uur = **15:20**. Trek nu nog 35 minuten af. Je kunt eerst naar 15:00 teruggaan.

**Full explanation**

Eerst trekken we 1 uur af:

**16:20 − 1 uur = 15:20**.

Daarna nog 35 minuten.

Van 15:20 naar 15:00 is 20 minuten.

Er moeten dan nog 15 minuten af:

**15:00 − 15 minuten = 14:45**.

De activiteit begon dus om **14:45**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Eerst trekken we 1 uur af:",
  "**16:20 − 1 uur = 15:20**.",
  "Daarna nog 35 minuten.",
  "Van 15:20 naar 15:00 is 20 minuten.",
  "Er moeten dan nog 15 minuten af:",
  "**15:00 − 15 minuten = 14:45**.",
  "De activiteit begon dus om **14:45**."
]
```

### Visual stages

**Visual type:** `timeLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "direction": "backward",
  "nodes": [
    "16:20",
    "?"
  ],
  "jumps": [
    "−1 uur 35 minuten"
  ],
  "digital": true
}
```

**Minnie stage**

```json
{
  "direction": "backward",
  "nodes": [
    "16:20",
    "?",
    "?"
  ],
  "jumps": [
    "−1 uur",
    "−35 minuten"
  ]
}
```

**Moose stage**

```json
{
  "direction": "backward",
  "nodes": [
    "16:20",
    "15:20",
    "?"
  ],
  "jumps": [
    "−1 uur",
    "−35 min"
  ]
}
```

**Explanation stage**

```json
{
  "direction": "backward",
  "nodes": [
    "16:20",
    "15:20",
    "15:00",
    "14:45"
  ],
  "jumps": [
    "−1 uur",
    "−20 min",
    "−15 min"
  ],
  "digital": true
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-TI-017 — Tijd · Wachten tot een tijdstip

**Source:** expansion 75  
**Domain:** time  
**Objective:** time_until_event  
**Difficulty:** 1  
**Report label:** Tijd · Wachten tot een tijdstip  
**Answer mode:** open  
**Visual/presentation:** timeLine / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**13:42 → 14:05 = 23 minuten**"
  },
  "question": {
    "answer": 23,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "23"
      ],
      "unit": "minuten"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `23`.
- Answer display: `"23"`.
- Contract type: `wholeNumber`.
- Units: `"minuten"`.

**Stored allowed forms:**

```json
[
  "23"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 23,
  "answerDisplay": "23",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "23"
    ],
    "unit": "minuten"
  }
}
```

### Surface: original

**Question**

Het is **13:42**. Een activiteit begint om **14:05**.

Hoeveel minuten moet je nog wachten?

**Minnie**

Ga eerst van 13:42 naar het hele uur **14:00**.

**Moose**

Van 13:42 naar 14:00 is **18 minuten**. Daarna is het nog **5 minuten** tot 14:05.

**Full explanation**

Van **13:42 naar 14:00** zijn 18 minuten.

Van **14:00 naar 14:05** zijn 5 minuten.

Samen:

**18 + 5 = 23 minuten**.

Je moet dus **23 minuten** wachten.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Van **13:42 naar 14:00** zijn 18 minuten.",
  "Van **14:00 naar 14:05** zijn 5 minuten.",
  "Samen:",
  "**18 + 5 = 23 minuten**.",
  "Je moet dus **23 minuten** wachten."
]
```

### Visual stages

**Visual type:** `timeLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "direction": "forward",
  "nodes": [
    "13:42",
    "14:05"
  ],
  "jumps": []
}
```

**Minnie stage**

```json
{
  "direction": "forward",
  "nodes": [
    "13:42",
    "14:00",
    "14:05"
  ],
  "jumps": []
}
```

**Moose stage**

```json
{
  "direction": "forward",
  "nodes": [
    "13:42",
    "14:00",
    "14:05"
  ],
  "jumps": [
    "18 min",
    "5 min"
  ]
}
```

**Explanation stage**

```json
{
  "direction": "forward",
  "nodes": [
    "13:42",
    "14:00",
    "14:05"
  ],
  "jumps": [
    "18 min",
    "5 min"
  ],
  "notes": [
    "18 + 5 = 23 minuten"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-TI-018 — Tijd · Meerstaps planning

**Source:** expansion 75  
**Domain:** time  
**Objective:** multistep_schedule_end_time  
**Difficulty:** 3  
**Report label:** Tijd · Meerstaps planning  
**Answer mode:** multipleChoice  
**Visual/presentation:** timeLine / story  
**Eligibility:** time-only; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**Start 10:35 + 45 min + 20 min pauze + 55 min = 12:35**"
  },
  "question": {
    "answer": "12:35",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "12:15",
      "12:25",
      "12:35",
      "12:45"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"12:35"`.
- Answer display: `"12:35"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "12:15",
  "12:25",
  "12:35",
  "12:45"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "12:35",
  "answerDisplay": "12:35",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "12:15",
    "12:25",
    "12:35",
    "12:45"
  ]
}
```

### Surface: original

**Question**

De eerste activiteit begint om **10:35** en duurt **45 minuten**.

Daarna is er **20 minuten pauze**.

De tweede activiteit duurt **55 minuten**.

Hoe laat is alles afgelopen?

**Minnie**

Reken de onderdelen één voor één. Begin met de eerste activiteit van **45 minuten**.

**Moose**

10:35 + 45 minuten = **11:20**.

Na 20 minuten pauze is het **11:40**.

Nu hoef je alleen de tweede activiteit van 55 minuten nog toe te voegen.

**Full explanation**

De eerste activiteit:

**10:35 + 45 minuten = 11:20**.

Daarna 20 minuten pauze:

**11:20 + 20 minuten = 11:40**.

De tweede activiteit duurt 55 minuten.

Van 11:40 naar 12:00 is 20 minuten.

Er blijven 35 minuten over:

**12:00 + 35 minuten = 12:35**.

Alles is dus afgelopen om **12:35**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "De eerste activiteit:",
  "**10:35 + 45 minuten = 11:20**.",
  "Daarna 20 minuten pauze:",
  "**11:20 + 20 minuten = 11:40**.",
  "De tweede activiteit duurt 55 minuten.",
  "Van 11:40 naar 12:00 is 20 minuten.",
  "Er blijven 35 minuten over:",
  "**12:00 + 35 minuten = 12:35**.",
  "Alles is dus afgelopen om **12:35**."
]
```

### Visual stages

**Visual type:** `timeLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "direction": "forward",
  "nodes": [
    "10:35",
    "?",
    "?",
    "?"
  ],
  "jumps": [
    "45 min",
    "20 min pauze",
    "55 min"
  ]
}
```

**Minnie stage**

```json
{
  "direction": "forward",
  "nodes": [
    "10:35",
    "11:20",
    "?",
    "?"
  ],
  "jumps": [
    "45 min",
    "20 min pauze",
    "55 min"
  ]
}
```

**Moose stage**

```json
{
  "direction": "forward",
  "nodes": [
    "10:35",
    "11:20",
    "11:40",
    "?"
  ],
  "jumps": [
    "45 min",
    "20 min pauze",
    "55 min"
  ]
}
```

**Explanation stage**

```json
{
  "direction": "forward",
  "nodes": [
    "10:35",
    "11:20",
    "11:40",
    "12:35"
  ],
  "jumps": [
    "45 min",
    "20 min pauze",
    "55 min"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-ME-001 — Meten · Centimeter naar meter

**Source:** expansion 75  
**Domain:** measurementGeometry  
**Objective:** convert_cm_to_m_exact  
**Difficulty:** 1  
**Report label:** Meten · Centimeter naar meter  
**Answer mode:** open  
**Visual/presentation:** measurement / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**300 cm = 3 m**"
  },
  "question": {
    "answer": 3,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "3"
      ],
      "unit": "m"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `3`.
- Answer display: `"3"`.
- Contract type: `wholeNumber`.
- Units: `"m"`.

**Stored allowed forms:**

```json
[
  "3"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 3,
  "answerDisplay": "3",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "3"
    ],
    "unit": "m"
  }
}
```

### Surface: original

**Question**

Hoeveel meter is **300 centimeter**?

**Minnie**

Eén meter is **100 centimeter**. Kijk hoeveel groepjes van 100 er in 300 zitten.

**Moose**

300 centimeter kun je verdelen in:

**100 + 100 + 100 centimeter**.

Hoeveel meters zijn dat?

**Full explanation**

**100 centimeter = 1 meter**.

300 centimeter bestaat uit 3 groepjes van 100 centimeter:

**300 : 100 = 3**.

Dus **300 cm = 3 m**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "**100 centimeter = 1 meter**.",
  "300 centimeter bestaat uit 3 groepjes van 100 centimeter:",
  "**300 : 100 = 3**.",
  "Dus **300 cm = 3 m**."
]
```

### Visual stages

**Visual type:** `measurement`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "source": {
    "value": 300,
    "unit": "cm"
  },
  "targetUnit": "m"
}
```

**Minnie stage**

```json
{
  "source": {
    "value": 300,
    "unit": "cm"
  },
  "targetUnit": "m",
  "notes": [
    "100 cm = 1 m"
  ]
}
```

**Moose stage**

```json
{
  "source": {
    "value": 300,
    "unit": "cm"
  },
  "targetUnit": "m",
  "pieces": [
    "100 cm",
    "100 cm",
    "100 cm"
  ]
}
```

**Explanation stage**

```json
{
  "source": {
    "value": 300,
    "unit": "cm"
  },
  "targetUnit": "m",
  "targetLabel": "3",
  "notes": [
    "300 : 100 = 3 m"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-ME-002 — Meten · Meter naar decimeter

**Source:** expansion 75  
**Domain:** measurementGeometry  
**Objective:** convert_m_to_dm  
**Difficulty:** 1  
**Report label:** Meten · Meter naar decimeter  
**Answer mode:** open  
**Visual/presentation:** measurement / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**18 m = 180 dm**"
  },
  "question": {
    "answer": 180,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "180"
      ],
      "unit": "dm"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `180`.
- Answer display: `"180"`.
- Contract type: `wholeNumber`.
- Units: `"dm"`.

**Stored allowed forms:**

```json
[
  "180"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 180,
  "answerDisplay": "180",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "180"
    ],
    "unit": "dm"
  }
}
```

### Surface: original

**Question**

Hoeveel decimeter is **18 meter**?

**Minnie**

Eén meter bestaat uit **10 decimeter**.

**Moose**

Je hebt 18 meter en iedere meter is 10 decimeter. Reken daarom **18 × 10**.

**Full explanation**

**1 meter = 10 decimeter**.

Voor 18 meter rekenen we:

**18 × 10 = 180**.

Dus **18 m = 180 dm**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "**1 meter = 10 decimeter**.",
  "Voor 18 meter rekenen we:",
  "**18 × 10 = 180**.",
  "Dus **18 m = 180 dm**."
]
```

### Visual stages

**Visual type:** `measurement`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "source": {
    "value": 18,
    "unit": "m"
  },
  "targetUnit": "dm"
}
```

**Minnie stage**

```json
{
  "source": {
    "value": 18,
    "unit": "m"
  },
  "targetUnit": "dm",
  "notes": [
    "1 m = 10 dm"
  ]
}
```

**Moose stage**

```json
{
  "source": {
    "value": 18,
    "unit": "m"
  },
  "targetUnit": "dm",
  "notes": [
    "18 × 10 = ?"
  ]
}
```

**Explanation stage**

```json
{
  "source": {
    "value": 18,
    "unit": "m"
  },
  "targetUnit": "dm",
  "targetLabel": "180",
  "notes": [
    "18 × 10 = 180 dm"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-ME-003 — Meten · Meter naar millimeter

**Source:** expansion 75  
**Domain:** measurementGeometry  
**Objective:** convert_m_to_mm_unit_fact  
**Difficulty:** 1  
**Report label:** Meten · Meter naar millimeter  
**Answer mode:** multipleChoice  
**Visual/presentation:** measurement / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**1 m = 1.000 mm**"
  },
  "question": {
    "answer": "1.000 mm",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "10 mm",
      "100 mm",
      "1.000 mm",
      "10.000 mm"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"1.000 mm"`.
- Answer display: `"1.000 mm"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "10 mm",
  "100 mm",
  "1.000 mm",
  "10.000 mm"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "1.000 mm",
  "answerDisplay": "1.000 mm",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "10 mm",
    "100 mm",
    "1.000 mm",
    "10.000 mm"
  ]
}
```

### Surface: original

**Question**

Hoeveel millimeter is **1 meter**?

**Minnie**

Eén meter is **100 centimeter**. Nu moet je nog bedenken hoeveel millimeter er in één centimeter zitten.

**Moose**

**1 cm = 10 mm**. Een meter heeft 100 centimeter, dus reken **100 × 10**.

**Full explanation**

**1 meter = 100 centimeter**.

**1 centimeter = 10 millimeter**.

Daarom:

**100 × 10 = 1.000 millimeter**.

Dus **1 m = 1.000 mm**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "**1 meter = 100 centimeter**.",
  "**1 centimeter = 10 millimeter**.",
  "Daarom:",
  "**100 × 10 = 1.000 millimeter**.",
  "Dus **1 m = 1.000 mm**."
]
```

### Visual stages

**Visual type:** `measurement`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "source": {
    "value": 1,
    "unit": "m"
  },
  "targetUnit": "mm"
}
```

**Minnie stage**

```json
{
  "source": {
    "value": 1,
    "unit": "m"
  },
  "targetUnit": "mm",
  "notes": [
    "1 m = 100 cm"
  ]
}
```

**Moose stage**

```json
{
  "source": {
    "value": 1,
    "unit": "m"
  },
  "targetUnit": "mm",
  "notes": [
    "1 m = 100 cm",
    "1 cm = 10 mm",
    "100 × 10 = ?"
  ]
}
```

**Explanation stage**

```json
{
  "source": {
    "value": 1,
    "unit": "m"
  },
  "targetUnit": "mm",
  "targetLabel": "1.000",
  "notes": [
    "1 m = 100 cm = 1.000 mm"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-ME-004 — Meten · Gram en kilogram

**Source:** expansion 75  
**Domain:** measurementGeometry  
**Objective:** combine_grams_to_kilogram  
**Difficulty:** 1  
**Report label:** Meten · Gram en kilogram  
**Answer mode:** open  
**Visual/presentation:** measurement / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 2

### Educational core

```json
{
  "values": {
    "authored": "**500 g + 500 g = 1 kg**"
  },
  "question": {
    "answer": 1,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "1"
      ],
      "unit": "kg"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `1`.
- Answer display: `"1"`.
- Contract type: `wholeNumber`.
- Units: `"kg"`.

**Stored allowed forms:**

```json
[
  "1"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 1,
  "answerDisplay": "1",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "1"
    ],
    "unit": "kg"
  }
}
```

### Surface: packages

**Question**

Twee pakketten wegen elk **500 gram**. Hoeveel kilogram wegen ze samen?

**Minnie**

Tel eerst de twee gewichten in **grammen** bij elkaar op.

**Moose**

500 g + 500 g = **1.000 g**. Hoeveel kilogram is 1.000 gram?

**Full explanation**

De twee pakketten wegen samen:

**500 g + 500 g = 1.000 g**.

**1.000 gram = 1 kilogram**.

Samen wegen ze dus **1 kg**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "De twee pakketten wegen samen:",
  "**500 g + 500 g = 1.000 g**.",
  "**1.000 gram = 1 kilogram**.",
  "Samen wegen ze dus **1 kg**."
]
```

### Visual stages

**Visual type:** `measurement`. All four frames below belong to surface `packages`.

**Question stage**

```json
{
  "sources": [
    {
      "value": 500,
      "unit": "g"
    },
    {
      "value": 500,
      "unit": "g"
    }
  ],
  "targetUnit": "kg",
  "pieces": [
    "500 g",
    "500 g"
  ]
}
```

**Minnie stage**

```json
{
  "sources": [
    {
      "value": 500,
      "unit": "g"
    },
    {
      "value": 500,
      "unit": "g"
    }
  ],
  "targetUnit": "kg",
  "notes": [
    "500 g + 500 g = ? g"
  ]
}
```

**Moose stage**

```json
{
  "sources": [
    {
      "value": 500,
      "unit": "g"
    },
    {
      "value": 500,
      "unit": "g"
    }
  ],
  "targetUnit": "kg",
  "notes": [
    "500 + 500 = 1.000 g",
    "1.000 g = ? kg"
  ]
}
```

**Explanation stage**

```json
{
  "sources": [
    {
      "value": 500,
      "unit": "g"
    },
    {
      "value": 500,
      "unit": "g"
    }
  ],
  "targetUnit": "kg",
  "targetLabel": "1",
  "notes": [
    "1.000 g = 1 kg"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: bags

**Question**

Twee zakken wegen elk **500 gram**. Hoeveel kilogram wegen ze samen?

**Minnie**

Tel eerst de twee gewichten in **grammen** bij elkaar op.

**Moose**

500 g + 500 g = **1.000 g**. Hoeveel kilogram is 1.000 gram?

**Full explanation**

De twee zakken wegen samen:

**500 g + 500 g = 1.000 g**.

**1.000 gram = 1 kilogram**.

Samen wegen ze dus **1 kg**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "De twee zakken wegen samen:",
  "**500 g + 500 g = 1.000 g**.",
  "**1.000 gram = 1 kilogram**.",
  "Samen wegen ze dus **1 kg**."
]
```

### Visual stages

**Visual type:** `measurement`. All four frames below belong to surface `bags`.

**Question stage**

```json
{
  "sources": [
    {
      "value": 500,
      "unit": "g"
    },
    {
      "value": 500,
      "unit": "g"
    }
  ],
  "targetUnit": "kg",
  "pieces": [
    "500 g",
    "500 g"
  ]
}
```

**Minnie stage**

```json
{
  "sources": [
    {
      "value": 500,
      "unit": "g"
    },
    {
      "value": 500,
      "unit": "g"
    }
  ],
  "targetUnit": "kg",
  "notes": [
    "500 g + 500 g = ? g"
  ]
}
```

**Moose stage**

```json
{
  "sources": [
    {
      "value": 500,
      "unit": "g"
    },
    {
      "value": 500,
      "unit": "g"
    }
  ],
  "targetUnit": "kg",
  "notes": [
    "500 + 500 = 1.000 g",
    "1.000 g = ? kg"
  ]
}
```

**Explanation stage**

```json
{
  "sources": [
    {
      "value": 500,
      "unit": "g"
    },
    {
      "value": 500,
      "unit": "g"
    }
  ],
  "targetUnit": "kg",
  "targetLabel": "1",
  "notes": [
    "1.000 g = 1 kg"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-ME-005 — Meten · Meter en centimeter combineren

**Source:** expansion 75  
**Domain:** measurementGeometry  
**Objective:** convert_mixed_length_to_cm  
**Difficulty:** 2  
**Report label:** Meten · Meter en centimeter combineren  
**Answer mode:** open  
**Visual/presentation:** measurement / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**2 m 35 cm = 235 cm**"
  },
  "question": {
    "answer": 235,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "235"
      ],
      "unit": "cm"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `235`.
- Answer display: `"235"`.
- Contract type: `wholeNumber`.
- Units: `"cm"`.

**Stored allowed forms:**

```json
[
  "235"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 235,
  "answerDisplay": "235",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "235"
    ],
    "unit": "cm"
  }
}
```

### Surface: original

**Question**

Hoeveel centimeter is **2 meter en 35 centimeter**?

**Minnie**

Zet eerst de **2 meter** om naar centimeters.

**Moose**

2 meter is **200 centimeter**. Tel daar de extra 35 centimeter bij op.

**Full explanation**

**1 meter = 100 centimeter**.

Dus:

**2 meter = 200 centimeter**.

Daar komt nog 35 centimeter bij:

**200 + 35 = 235**.

Dus **2 m 35 cm = 235 cm**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "**1 meter = 100 centimeter**.",
  "Dus:",
  "**2 meter = 200 centimeter**.",
  "Daar komt nog 35 centimeter bij:",
  "**200 + 35 = 235**.",
  "Dus **2 m 35 cm = 235 cm**."
]
```

### Visual stages

**Visual type:** `measurement`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "sources": [
    {
      "value": 2,
      "unit": "m"
    },
    {
      "value": 35,
      "unit": "cm"
    }
  ],
  "targetUnit": "cm"
}
```

**Minnie stage**

```json
{
  "sources": [
    {
      "value": 2,
      "unit": "m"
    },
    {
      "value": 35,
      "unit": "cm"
    }
  ],
  "targetUnit": "cm",
  "notes": [
    "2 m = 200 cm"
  ]
}
```

**Moose stage**

```json
{
  "sources": [
    {
      "value": 2,
      "unit": "m"
    },
    {
      "value": 35,
      "unit": "cm"
    }
  ],
  "targetUnit": "cm",
  "notes": [
    "200 cm + 35 cm = ?"
  ]
}
```

**Explanation stage**

```json
{
  "sources": [
    {
      "value": 2,
      "unit": "m"
    },
    {
      "value": 35,
      "unit": "cm"
    }
  ],
  "targetUnit": "cm",
  "targetLabel": "235"
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-ME-006 — Meten · Gewichten samenrekenen

**Source:** expansion 75  
**Domain:** measurementGeometry  
**Objective:** multiply_equal_weights  
**Difficulty:** 2  
**Report label:** Meten · Gewichten samenrekenen  
**Answer mode:** open  
**Visual/presentation:** measurement / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 2

### Educational core

```json
{
  "values": {
    "authored": "**6 × 250 g = 1.500 g**"
  },
  "question": {
    "answer": 1500,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "1500",
        "1.500",
        "1 500"
      ],
      "grouping": true,
      "unit": "g"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `1500`.
- Answer display: `"1.500"`.
- Contract type: `wholeNumber`.
- Units: `"g"`.

**Stored allowed forms:**

```json
[
  "1500",
  "1.500",
  "1 500"
]
```

**Accepted input:** whole-number rule above; `grouping` is `true` (numeric equivalence).

**Exact resolved answer contract:**

```json
{
  "answer": 1500,
  "answerDisplay": "1.500",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "1500",
      "1.500",
      "1 500"
    ],
    "grouping": true,
    "unit": "g"
  }
}
```

### Surface: packages

**Question**

Er zijn **6 pakketten** van elk **250 gram**. Hoeveel gram wegen ze samen?

**Minnie**

Je kunt 250 splitsen in **200 en 50**.

**Moose**

6 × 200 = **1.200**.

6 × 50 = **300**.

Tel die twee gewichten bij elkaar op.

**Full explanation**

We splitsen 250 gram in 200 gram en 50 gram.

**6 × 200 = 1.200**.

**6 × 50 = 300**.

Samen:

**1.200 + 300 = 1.500 gram**.

De zes pakketten wegen dus **1.500 g**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen 250 gram in 200 gram en 50 gram.",
  "**6 × 200 = 1.200**.",
  "**6 × 50 = 300**.",
  "Samen:",
  "**1.200 + 300 = 1.500 gram**.",
  "De zes pakketten wegen dus **1.500 g**."
]
```

### Visual stages

**Visual type:** `measurement`. All four frames below belong to surface `packages`.

**Question stage**

```json
{
  "source": {
    "value": 250,
    "unit": "g"
  },
  "targetUnit": "g",
  "multiplier": 6
}
```

**Minnie stage**

```json
{
  "source": {
    "value": 250,
    "unit": "g"
  },
  "targetUnit": "g",
  "multiplier": 6,
  "notes": [
    "250 = 200 + 50"
  ]
}
```

**Moose stage**

```json
{
  "source": {
    "value": 250,
    "unit": "g"
  },
  "targetUnit": "g",
  "multiplier": 6,
  "notes": [
    "6 × 200 = 1.200",
    "6 × 50 = 300"
  ]
}
```

**Explanation stage**

```json
{
  "source": {
    "value": 250,
    "unit": "g"
  },
  "targetUnit": "g",
  "multiplier": 6,
  "targetLabel": "1.500",
  "notes": [
    "1.200 + 300 = 1.500 g"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: containers

**Question**

Er zijn **6 bakjes** van elk **250 gram**. Hoeveel gram wegen ze samen?

**Minnie**

Je kunt 250 splitsen in **200 en 50**.

**Moose**

6 × 200 = **1.200**.

6 × 50 = **300**.

Tel die twee gewichten bij elkaar op.

**Full explanation**

We splitsen 250 gram in 200 gram en 50 gram.

**6 × 200 = 1.200**.

**6 × 50 = 300**.

Samen:

**1.200 + 300 = 1.500 gram**.

De zes bakjes wegen dus **1.500 g**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We splitsen 250 gram in 200 gram en 50 gram.",
  "**6 × 200 = 1.200**.",
  "**6 × 50 = 300**.",
  "Samen:",
  "**1.200 + 300 = 1.500 gram**.",
  "De zes bakjes wegen dus **1.500 g**."
]
```

### Visual stages

**Visual type:** `measurement`. All four frames below belong to surface `containers`.

**Question stage**

```json
{
  "source": {
    "value": 250,
    "unit": "g"
  },
  "targetUnit": "g",
  "multiplier": 6
}
```

**Minnie stage**

```json
{
  "source": {
    "value": 250,
    "unit": "g"
  },
  "targetUnit": "g",
  "multiplier": 6,
  "notes": [
    "250 = 200 + 50"
  ]
}
```

**Moose stage**

```json
{
  "source": {
    "value": 250,
    "unit": "g"
  },
  "targetUnit": "g",
  "multiplier": 6,
  "notes": [
    "6 × 200 = 1.200",
    "6 × 50 = 300"
  ]
}
```

**Explanation stage**

```json
{
  "source": {
    "value": 250,
    "unit": "g"
  },
  "targetUnit": "g",
  "multiplier": 6,
  "targetLabel": "1.500",
  "notes": [
    "1.200 + 300 = 1.500 g"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-ME-007 — Meten · Meerstaps lengte

**Source:** expansion 75  
**Domain:** measurementGeometry  
**Objective:** add_mixed_lengths_convert_to_cm  
**Difficulty:** 3  
**Report label:** Meten · Meerstaps lengte  
**Answer mode:** open  
**Visual/presentation:** measurement / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**2 m 35 cm + 1 m 80 cm = 415 cm**"
  },
  "question": {
    "answer": 415,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "415"
      ],
      "unit": "cm"
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `415`.
- Answer display: `"415"`.
- Contract type: `wholeNumber`.
- Units: `"cm"`.

**Stored allowed forms:**

```json
[
  "415"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 415,
  "answerDisplay": "415",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "415"
    ],
    "unit": "cm"
  }
}
```

### Surface: cables

**Question**

Een kabel is **2 meter 35 centimeter** lang. Een tweede kabel is **1 meter 80 centimeter** lang. Hoeveel centimeter zijn de kabels samen?

**Minnie**

Zet beide lengtes eerst helemaal om naar **centimeters**.

**Moose**

2 m 35 cm = **235 cm**.

1 m 80 cm = **180 cm**.

Tel nu 235 en 180 op.

**Full explanation**

Eerst zetten we beide lengtes om.

**2 m 35 cm = 235 cm**.

**1 m 80 cm = 180 cm**.

Daarna tellen we ze op:

**235 + 180 = 415**.

Samen zijn de twee lengtes **415 cm**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Eerst zetten we beide lengtes om.",
  "**2 m 35 cm = 235 cm**.",
  "**1 m 80 cm = 180 cm**.",
  "Daarna tellen we ze op:",
  "**235 + 180 = 415**.",
  "Samen zijn de twee lengtes **415 cm**."
]
```

### Visual stages

**Visual type:** `measurement`. All four frames below belong to surface `cables`.

**Question stage**

```json
{
  "sourceGroups": [
    [
      {
        "value": 2,
        "unit": "m"
      },
      {
        "value": 35,
        "unit": "cm"
      }
    ],
    [
      {
        "value": 1,
        "unit": "m"
      },
      {
        "value": 80,
        "unit": "cm"
      }
    ]
  ],
  "targetUnit": "cm"
}
```

**Minnie stage**

```json
{
  "sourceGroups": [
    [
      {
        "value": 2,
        "unit": "m"
      },
      {
        "value": 35,
        "unit": "cm"
      }
    ],
    [
      {
        "value": 1,
        "unit": "m"
      },
      {
        "value": 80,
        "unit": "cm"
      }
    ]
  ],
  "targetUnit": "cm",
  "notes": [
    "2 m 35 cm = 235 cm"
  ]
}
```

**Moose stage**

```json
{
  "sourceGroups": [
    [
      {
        "value": 2,
        "unit": "m"
      },
      {
        "value": 35,
        "unit": "cm"
      }
    ],
    [
      {
        "value": 1,
        "unit": "m"
      },
      {
        "value": 80,
        "unit": "cm"
      }
    ]
  ],
  "targetUnit": "cm",
  "notes": [
    "2 m 35 cm = 235 cm",
    "1 m 80 cm = 180 cm",
    "235 + 180 = ?"
  ]
}
```

**Explanation stage**

```json
{
  "sourceGroups": [
    [
      {
        "value": 2,
        "unit": "m"
      },
      {
        "value": 35,
        "unit": "cm"
      }
    ],
    [
      {
        "value": 1,
        "unit": "m"
      },
      {
        "value": 80,
        "unit": "cm"
      }
    ]
  ],
  "targetUnit": "cm",
  "targetLabel": "415",
  "notes": [
    "235 + 180 = 415 cm"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

### Surface: routes

**Question**

Een eerste stuk route is **2 meter 35 centimeter**. Een tweede stuk is **1 meter 80 centimeter**. Hoeveel centimeter zijn beide stukken samen?

**Minnie**

Zet beide lengtes eerst helemaal om naar **centimeters**.

**Moose**

2 m 35 cm = **235 cm**.

1 m 80 cm = **180 cm**.

Tel nu 235 en 180 op.

**Full explanation**

Eerst zetten we beide lengtes om.

**2 m 35 cm = 235 cm**.

**1 m 80 cm = 180 cm**.

Daarna tellen we ze op:

**235 + 180 = 415**.

Samen zijn de twee lengtes **415 cm**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Eerst zetten we beide lengtes om.",
  "**2 m 35 cm = 235 cm**.",
  "**1 m 80 cm = 180 cm**.",
  "Daarna tellen we ze op:",
  "**235 + 180 = 415**.",
  "Samen zijn de twee lengtes **415 cm**."
]
```

### Visual stages

**Visual type:** `measurement`. All four frames below belong to surface `routes`.

**Question stage**

```json
{
  "sourceGroups": [
    [
      {
        "value": 2,
        "unit": "m"
      },
      {
        "value": 35,
        "unit": "cm"
      }
    ],
    [
      {
        "value": 1,
        "unit": "m"
      },
      {
        "value": 80,
        "unit": "cm"
      }
    ]
  ],
  "targetUnit": "cm"
}
```

**Minnie stage**

```json
{
  "sourceGroups": [
    [
      {
        "value": 2,
        "unit": "m"
      },
      {
        "value": 35,
        "unit": "cm"
      }
    ],
    [
      {
        "value": 1,
        "unit": "m"
      },
      {
        "value": 80,
        "unit": "cm"
      }
    ]
  ],
  "targetUnit": "cm",
  "notes": [
    "2 m 35 cm = 235 cm"
  ]
}
```

**Moose stage**

```json
{
  "sourceGroups": [
    [
      {
        "value": 2,
        "unit": "m"
      },
      {
        "value": 35,
        "unit": "cm"
      }
    ],
    [
      {
        "value": 1,
        "unit": "m"
      },
      {
        "value": 80,
        "unit": "cm"
      }
    ]
  ],
  "targetUnit": "cm",
  "notes": [
    "2 m 35 cm = 235 cm",
    "1 m 80 cm = 180 cm",
    "235 + 180 = ?"
  ]
}
```

**Explanation stage**

```json
{
  "sourceGroups": [
    [
      {
        "value": 2,
        "unit": "m"
      },
      {
        "value": 35,
        "unit": "cm"
      }
    ],
    [
      {
        "value": 1,
        "unit": "m"
      },
      {
        "value": 80,
        "unit": "cm"
      }
    ]
  ],
  "targetUnit": "cm",
  "targetLabel": "415",
  "notes": [
    "235 + 180 = 415 cm"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-DP-001 — Patronen · Reeks met vaste stap

**Source:** expansion 75  
**Domain:** dataPatterns  
**Objective:** sequence_plus_ten  
**Difficulty:** 1  
**Report label:** Patronen · Reeks met vaste stap  
**Answer mode:** open  
**Visual/presentation:** numberLine / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**2.360, 2.370, 2.380, ?, 2.400 → 2.390**"
  },
  "question": {
    "answer": 2390,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "2390",
        "2.390",
        "2 390"
      ],
      "grouping": true
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `2390`.
- Answer display: `"2.390"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "2390",
  "2.390",
  "2 390"
]
```

**Accepted input:** whole-number rule above; `grouping` is `true` (numeric equivalence).

**Exact resolved answer contract:**

```json
{
  "answer": 2390,
  "answerDisplay": "2.390",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "2390",
      "2.390",
      "2 390"
    ],
    "grouping": true
  }
}
```

### Surface: original

**Question**

Welk getal ontbreekt?

**2.360 → 2.370 → 2.380 → ? → 2.400**

**Minnie**

Kijk hoeveel er steeds bij komt van het ene getal naar het volgende.

**Moose**

Van 2.360 naar 2.370 komt er **10** bij. Dezelfde stap wordt steeds herhaald.

**Full explanation**

De reeks gaat steeds met **10 omhoog**:

2.360 → 2.370 → 2.380 → **2.390** → 2.400.

Het ontbrekende getal is **2.390**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "De reeks gaat steeds met **10 omhoog**:",
  "2.360 → 2.370 → 2.380 → **2.390** → 2.400.",
  "Het ontbrekende getal is **2.390**."
]
```

### Visual stages

**Visual type:** `numberLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "min": 2360,
  "max": 2400,
  "markers": [
    {
      "value": 2360,
      "label": "2.360",
      "focus": false,
      "lane": 0
    },
    {
      "value": 2370,
      "label": "2.370",
      "focus": false,
      "lane": 0
    },
    {
      "value": 2380,
      "label": "2.380",
      "focus": false,
      "lane": 0
    },
    {
      "value": 2390,
      "label": "?",
      "focus": false,
      "lane": 0
    },
    {
      "value": 2400,
      "label": "2.400",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": []
}
```

**Minnie stage**

```json
{
  "min": 2360,
  "max": 2400,
  "markers": [
    {
      "value": 2360,
      "label": "2.360",
      "focus": false,
      "lane": 0
    },
    {
      "value": 2370,
      "label": "2.370",
      "focus": false,
      "lane": 0
    },
    {
      "value": 2380,
      "label": "2.380",
      "focus": false,
      "lane": 0
    },
    {
      "value": 2390,
      "label": "?",
      "focus": false,
      "lane": 0
    },
    {
      "value": 2400,
      "label": "2.400",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [
    {
      "from": 2360,
      "to": 2370,
      "label": ""
    }
  ],
  "notes": []
}
```

**Moose stage**

```json
{
  "min": 2360,
  "max": 2400,
  "markers": [
    {
      "value": 2360,
      "label": "2.360",
      "focus": false,
      "lane": 0
    },
    {
      "value": 2370,
      "label": "2.370",
      "focus": false,
      "lane": 0
    },
    {
      "value": 2380,
      "label": "2.380",
      "focus": false,
      "lane": 0
    },
    {
      "value": 2390,
      "label": "?",
      "focus": false,
      "lane": 0
    },
    {
      "value": 2400,
      "label": "2.400",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [
    {
      "from": 2360,
      "to": 2370,
      "label": "+10"
    },
    {
      "from": 2370,
      "to": 2380,
      "label": "+10"
    },
    {
      "from": 2380,
      "to": 2390,
      "label": "+10"
    }
  ],
  "notes": []
}
```

**Explanation stage**

```json
{
  "min": 2360,
  "max": 2400,
  "markers": [
    {
      "value": 2360,
      "label": "2.360",
      "focus": false,
      "lane": 0
    },
    {
      "value": 2370,
      "label": "2.370",
      "focus": false,
      "lane": 0
    },
    {
      "value": 2380,
      "label": "2.380",
      "focus": false,
      "lane": 0
    },
    {
      "value": 2390,
      "label": "2.390",
      "focus": true,
      "lane": 0
    },
    {
      "value": 2400,
      "label": "2.400",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [
    {
      "from": 2360,
      "to": 2370,
      "label": "+10"
    },
    {
      "from": 2370,
      "to": 2380,
      "label": "+10"
    },
    {
      "from": 2380,
      "to": 2390,
      "label": "+10"
    },
    {
      "from": 2390,
      "to": 2400,
      "label": "+10"
    }
  ],
  "notes": []
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-DP-002 — Patronen · Reeks met grotere stap

**Source:** expansion 75  
**Domain:** dataPatterns  
**Objective:** sequence_plus_twenty_five  
**Difficulty:** 1  
**Report label:** Patronen · Reeks met grotere stap  
**Answer mode:** open  
**Visual/presentation:** numberLine / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**1.125, 1.150, 1.175, ?, 1.225 → 1.200**"
  },
  "question": {
    "answer": 1200,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "1200"
      ],
      "grouping": true
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `1200`.
- Answer display: `"1.200"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "1200"
]
```

**Accepted input:** whole-number rule above; `grouping` is `true` (numeric equivalence).

**Exact resolved answer contract:**

```json
{
  "answer": 1200,
  "answerDisplay": "1.200",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "1200"
    ],
    "grouping": true
  }
}
```

### Surface: original

**Question**

Welk getal ontbreekt?

**1.125 → 1.150 → 1.175 → ? → 1.225**

**Minnie**

Bereken eerst het verschil tussen **1.125 en 1.150**.

**Moose**

Het verschil is **25**. Controleer: 1.150 + 25 = 1.175. Doe daarna dezelfde stap nog een keer.

**Full explanation**

De stap is steeds **+25**.

1.125 + 25 = 1.150.

1.150 + 25 = 1.175.

1.175 + 25 = **1.200**.

Daarna:

1.200 + 25 = 1.225.

Het ontbrekende getal is **1.200**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "De stap is steeds **+25**.",
  "1.125 + 25 = 1.150.",
  "1.150 + 25 = 1.175.",
  "1.175 + 25 = **1.200**.",
  "Daarna:",
  "1.200 + 25 = 1.225.",
  "Het ontbrekende getal is **1.200**."
]
```

### Visual stages

**Visual type:** `numberLine`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "min": 1125,
  "max": 1225,
  "markers": [
    {
      "value": 1125,
      "label": "1.125",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1150,
      "label": "1.150",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1175,
      "label": "1.175",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1200,
      "label": "?",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1225,
      "label": "1.225",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [],
  "notes": []
}
```

**Minnie stage**

```json
{
  "min": 1125,
  "max": 1225,
  "markers": [
    {
      "value": 1125,
      "label": "1.125",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1150,
      "label": "1.150",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1175,
      "label": "1.175",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1200,
      "label": "?",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1225,
      "label": "1.225",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [
    {
      "from": 1125,
      "to": 1150,
      "label": ""
    }
  ],
  "notes": []
}
```

**Moose stage**

```json
{
  "min": 1125,
  "max": 1225,
  "markers": [
    {
      "value": 1125,
      "label": "1.125",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1150,
      "label": "1.150",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1175,
      "label": "1.175",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1200,
      "label": "?",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1225,
      "label": "1.225",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [
    {
      "from": 1125,
      "to": 1150,
      "label": "+25"
    },
    {
      "from": 1150,
      "to": 1175,
      "label": "+25"
    }
  ],
  "notes": []
}
```

**Explanation stage**

```json
{
  "min": 1125,
  "max": 1225,
  "markers": [
    {
      "value": 1125,
      "label": "1.125",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1150,
      "label": "1.150",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1175,
      "label": "1.175",
      "focus": false,
      "lane": 0
    },
    {
      "value": 1200,
      "label": "1.200",
      "focus": true,
      "lane": 0
    },
    {
      "value": 1225,
      "label": "1.225",
      "focus": false,
      "lane": 0
    }
  ],
  "jumps": [
    {
      "from": 1125,
      "to": 1150,
      "label": "+25"
    },
    {
      "from": 1150,
      "to": 1175,
      "label": "+25"
    },
    {
      "from": 1175,
      "to": 1200,
      "label": "+25"
    },
    {
      "from": 1200,
      "to": 1225,
      "label": "+25"
    }
  ],
  "notes": []
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-DP-003 — Data · Tabel aflezen

**Source:** expansion 75  
**Domain:** dataPatterns  
**Objective:** read_single_table_value  
**Difficulty:** 1  
**Report label:** Data · Tabel aflezen  
**Answer mode:** open  
**Visual/presentation:** compactDataTable / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "Authored table:\n- Maandag: 18\n- Dinsdag: 24\n- Woensdag: 21\n- Donderdag: 27\n\nVraag naar woensdag → 21."
  },
  "question": {
    "answer": 21,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "21"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `21`.
- Answer display: `"21"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "21"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 21,
  "answerDisplay": "21",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "21"
    ]
  }
}
```

### Surface: original

**Question**

Bekijk de tabel.

| Dag | Aantal |
|---|---:|
| Maandag | 18 |
| Dinsdag | 24 |
| Woensdag | 21 |
| Donderdag | 27 |

Hoeveel staat er bij **woensdag**?

**Minnie**

Zoek eerst de rij met **woensdag**.

**Moose**

Kijk in de rij woensdag naar de kolom **Aantal**.

**Full explanation**

In de tabel zoeken we de rij **Woensdag**.

In die rij staat bij `Aantal` het getal **21**.

Het antwoord is dus **21**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "In de tabel zoeken we de rij **Woensdag**.",
  "In die rij staat bij `Aantal` het getal **21**.",
  "Het antwoord is dus **21**."
]
```

**Resolved rich presentation parts:**

```json
{
  "promptParts": [
    "Bekijk de tabel.\n\n",
    {
      "table": {
        "columns": [
          "Dag",
          "Aantal"
        ],
        "rows": [
          [
            "Maandag",
            "18"
          ],
          [
            "Dinsdag",
            "24"
          ],
          [
            "Woensdag",
            "21"
          ],
          [
            "Donderdag",
            "27"
          ]
        ]
      },
      "source": "| Dag | Aantal |\n|---|---:|\n| Maandag | 18 |\n| Dinsdag | 24 |\n| Woensdag | 21 |\n| Donderdag | 27 |\n"
    },
    "\nHoeveel staat er bij **woensdag**?"
  ]
}
```

### Visual stages

**Visual type:** `compactDataTable`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "columns": [
    "Dag",
    "Aantal"
  ],
  "rows": [
    [
      "Maandag",
      "18"
    ],
    [
      "Dinsdag",
      "24"
    ],
    [
      "Woensdag",
      "21"
    ],
    [
      "Donderdag",
      "27"
    ]
  ],
  "inPrompt": true
}
```

**Minnie stage**

```json
{
  "columns": [
    "Dag",
    "Aantal"
  ],
  "rows": [
    [
      "Maandag",
      "18"
    ],
    [
      "Dinsdag",
      "24"
    ],
    [
      "Woensdag",
      "21"
    ],
    [
      "Donderdag",
      "27"
    ]
  ],
  "highlightRows": [
    2
  ]
}
```

**Moose stage**

```json
{
  "columns": [
    "Dag",
    "Aantal"
  ],
  "rows": [
    [
      "Maandag",
      "18"
    ],
    [
      "Dinsdag",
      "24"
    ],
    [
      "Woensdag",
      "21"
    ],
    [
      "Donderdag",
      "27"
    ]
  ],
  "highlightCells": [
    [
      2,
      1
    ]
  ]
}
```

**Explanation stage**

```json
{
  "columns": [
    "Dag",
    "Aantal"
  ],
  "rows": [
    [
      "Maandag",
      "18"
    ],
    [
      "Dinsdag",
      "24"
    ],
    [
      "Woensdag",
      "21"
    ],
    [
      "Donderdag",
      "27"
    ]
  ],
  "highlightCells": [
    [
      2,
      1
    ]
  ],
  "notes": [
    "Woensdag → 21"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-DP-004 — Data · Waarden vergelijken

**Source:** expansion 75  
**Domain:** dataPatterns  
**Objective:** compare_table_values_difference  
**Difficulty:** 2  
**Report label:** Data · Waarden vergelijken  
**Answer mode:** open  
**Visual/presentation:** compactDataTable / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "Authored table:\n- Route A: 138\n- Route B: 156\n- Route C: 149\n- Route D: 132\n\nVerschil B en D: **156 − 132 = 24**"
  },
  "question": {
    "answer": 24,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "24"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `24`.
- Answer display: `"24"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "24"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 24,
  "answerDisplay": "24",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "24"
    ]
  }
}
```

### Surface: original

**Question**

Bekijk de tabel.

| Route | Afstand |
|---|---:|
| A | 138 |
| B | 156 |
| C | 149 |
| D | 132 |

Hoeveel groter is de waarde van **route B** dan die van **route D**?

**Minnie**

Je hebt alleen de waarden van **B en D** nodig. Zoek die eerst op.

**Moose**

Route B heeft 156 en route D 132. Het verschil vind je met **156 − 132**.

**Full explanation**

Route B heeft de waarde **156**.

Route D heeft de waarde **132**.

Het verschil is:

**156 − 132 = 24**.

Route B is dus **24** groter.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Route B heeft de waarde **156**.",
  "Route D heeft de waarde **132**.",
  "Het verschil is:",
  "**156 − 132 = 24**.",
  "Route B is dus **24** groter."
]
```

**Resolved rich presentation parts:**

```json
{
  "promptParts": [
    "Bekijk de tabel.\n\n",
    {
      "table": {
        "columns": [
          "Route",
          "Afstand"
        ],
        "rows": [
          [
            "A",
            "138"
          ],
          [
            "B",
            "156"
          ],
          [
            "C",
            "149"
          ],
          [
            "D",
            "132"
          ]
        ]
      },
      "source": "| Route | Afstand |\n|---|---:|\n| A | 138 |\n| B | 156 |\n| C | 149 |\n| D | 132 |\n"
    },
    "\nHoeveel groter is de waarde van **route B** dan die van **route D**?"
  ]
}
```

### Visual stages

**Visual type:** `compactDataTable`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "columns": [
    "Route",
    "Afstand"
  ],
  "rows": [
    [
      "A",
      "138"
    ],
    [
      "B",
      "156"
    ],
    [
      "C",
      "149"
    ],
    [
      "D",
      "132"
    ]
  ],
  "inPrompt": true
}
```

**Minnie stage**

```json
{
  "columns": [
    "Route",
    "Afstand"
  ],
  "rows": [
    [
      "A",
      "138"
    ],
    [
      "B",
      "156"
    ],
    [
      "C",
      "149"
    ],
    [
      "D",
      "132"
    ]
  ],
  "highlightRows": [
    1,
    3
  ]
}
```

**Moose stage**

```json
{
  "columns": [
    "Route",
    "Afstand"
  ],
  "rows": [
    [
      "A",
      "138"
    ],
    [
      "B",
      "156"
    ],
    [
      "C",
      "149"
    ],
    [
      "D",
      "132"
    ]
  ],
  "highlightRows": [
    1,
    3
  ],
  "notes": [
    "156 − 132 = ?"
  ]
}
```

**Explanation stage**

```json
{
  "columns": [
    "Route",
    "Afstand"
  ],
  "rows": [
    [
      "A",
      "138"
    ],
    [
      "B",
      "156"
    ],
    [
      "C",
      "149"
    ],
    [
      "D",
      "132"
    ]
  ],
  "notes": [
    "156 − 132 = 24"
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-DP-005 — Data · Verhoudingstabel

**Source:** expansion 75  
**Domain:** dataPatterns  
**Objective:** extend_ratio_table  
**Difficulty:** 2  
**Report label:** Data · Verhoudingstabel  
**Answer mode:** open  
**Visual/presentation:** compactDataTable / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "Authored ratio table:\n- 1 doos → 6 items\n- 2 dozen → 12\n- 3 dozen → 18\n- 5 dozen → ?\n\n**5 × 6 = 30**"
  },
  "question": {
    "answer": 30,
    "answerSpec": {
      "type": "wholeNumber",
      "allowedForms": [
        "30"
      ]
    }
  }
}
```

### Answer contract

- Correct answer (canonical): `30`.
- Answer display: `"30"`.
- Contract type: `wholeNumber`.
- Units: no explicit `answerSpec.unit`.

**Stored allowed forms:**

```json
[
  "30"
]
```

**Accepted input:** whole-number rule above; `answerSpec.grouping` is absent (correct input must match a stored allowed form; grouping syntax can still be enabled by those forms).

**Exact resolved answer contract:**

```json
{
  "answer": 30,
  "answerDisplay": "30",
  "answerMode": "open",
  "answerSpec": {
    "type": "wholeNumber",
    "allowedForms": [
      "30"
    ]
  }
}
```

### Surface: original

**Question**

Bekijk de tabel.

| Dozen | Onderdelen |
|---:|---:|
| 1 | 6 |
| 2 | 12 |
| 3 | 18 |
| 5 | ? |

In elke doos zitten evenveel onderdelen.

Hoeveel onderdelen horen bij **5 dozen**?

**Minnie**

De eerste rij vertelt hoeveel onderdelen er in **één doos** zitten.

**Moose**

Eén doos bevat 6 onderdelen. Voor 5 dozen heb je dus **5 × 6** onderdelen.

**Full explanation**

Uit de eerste rij zien we:

**1 doos = 6 onderdelen**.

Voor 5 dozen rekenen we:

**5 × 6 = 30**.

Bij 5 dozen horen dus **30 onderdelen**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "Uit de eerste rij zien we:",
  "**1 doos = 6 onderdelen**.",
  "Voor 5 dozen rekenen we:",
  "**5 × 6 = 30**.",
  "Bij 5 dozen horen dus **30 onderdelen**."
]
```

**Resolved rich presentation parts:**

```json
{
  "promptParts": [
    "Bekijk de tabel.\n\n",
    {
      "table": {
        "columns": [
          "Dozen",
          "Onderdelen"
        ],
        "rows": [
          [
            "1",
            "6"
          ],
          [
            "2",
            "12"
          ],
          [
            "3",
            "18"
          ],
          [
            "5",
            "?"
          ]
        ]
      },
      "source": "| Dozen | Onderdelen |\n|---:|---:|\n| 1 | 6 |\n| 2 | 12 |\n| 3 | 18 |\n| 5 | ? |\n"
    },
    "\nIn elke doos zitten evenveel onderdelen.\n\nHoeveel onderdelen horen bij **5 dozen**?"
  ]
}
```

### Visual stages

**Visual type:** `compactDataTable`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "columns": [
    "Dozen",
    "Onderdelen"
  ],
  "rows": [
    [
      "1",
      "6"
    ],
    [
      "2",
      "12"
    ],
    [
      "3",
      "18"
    ],
    [
      "5",
      "?"
    ]
  ],
  "inPrompt": true
}
```

**Minnie stage**

```json
{
  "columns": [
    "Dozen",
    "Onderdelen"
  ],
  "rows": [
    [
      "1",
      "6"
    ],
    [
      "2",
      "12"
    ],
    [
      "3",
      "18"
    ],
    [
      "5",
      "?"
    ]
  ],
  "highlightRows": [
    0
  ]
}
```

**Moose stage**

```json
{
  "columns": [
    "Dozen",
    "Onderdelen"
  ],
  "rows": [
    [
      "1",
      "6"
    ],
    [
      "2",
      "12"
    ],
    [
      "3",
      "18"
    ],
    [
      "5",
      "?"
    ]
  ],
  "notes": [
    "5 × 6 = ?"
  ]
}
```

**Explanation stage**

```json
{
  "columns": [
    "Dozen",
    "Onderdelen"
  ],
  "rows": [
    [
      "1",
      "6"
    ],
    [
      "2",
      "12"
    ],
    [
      "3",
      "18"
    ],
    [
      "5",
      "30"
    ]
  ],
  "highlightCells": [
    [
      3,
      1
    ]
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## M6-DP-006 — Patronen · Veranderende stap

**Source:** expansion 75  
**Domain:** dataPatterns  
**Objective:** sequence_increasing_step  
**Difficulty:** 2  
**Report label:** Patronen · Veranderende stap  
**Answer mode:** multipleChoice  
**Visual/presentation:** calculationSteps / story  
**Eligibility:** generic; current slider difficulty eligibility also applies.  
**Content version:** 1

### Educational core

```json
{
  "values": {
    "authored": "**20 → 25 (+5) → 35 (+10) → 50 (+15) → ? (+20) = 70**"
  },
  "question": {
    "answer": "70",
    "answerSpec": {
      "type": "choice"
    },
    "choices": [
      "60",
      "65",
      "70",
      "75"
    ]
  }
}
```

### Answer contract

- Correct answer (canonical): `"70"`.
- Answer display: `"70"`.
- Contract type: `choice`.
- Units: no explicit `answerSpec.unit`.

**Authored choices (not shuffled):**

```json
[
  "60",
  "65",
  "70",
  "75"
]
```

**Accepted input:** one of the exact authored choices above; correct only when it equals the canonical answer.

**Exact resolved answer contract:**

```json
{
  "answer": "70",
  "answerDisplay": "70",
  "answerMode": "multipleChoice",
  "answerSpec": {
    "type": "choice"
  },
  "choices": [
    "60",
    "65",
    "70",
    "75"
  ]
}
```

### Surface: original

**Question**

Welk getal komt daarna?

**20 → 25 → 35 → 50 → ?**

**Minnie**

Kijk niet alleen naar de getallen, maar naar **hoe groot elke sprong** is.

**Moose**

De sprongen zijn:

**+5, +10, +15**.

Elke sprong wordt 5 groter. De volgende sprong is dus **+20**.

**Full explanation**

We bekijken de verschillen:

20 → 25 is **+5**.

25 → 35 is **+10**.

35 → 50 is **+15**.

De sprong wordt iedere keer 5 groter.

De volgende sprong is daarom:

**+20**.

Dus:

**50 + 20 = 70**.

Het volgende getal is **70**.

**Exact explanation step boundaries (runtime order):**

```json
[
  "We bekijken de verschillen:",
  "20 → 25 is **+5**.",
  "25 → 35 is **+10**.",
  "35 → 50 is **+15**.",
  "De sprong wordt iedere keer 5 groter.",
  "De volgende sprong is daarom:",
  "**+20**.",
  "Dus:",
  "**50 + 20 = 70**.",
  "Het volgende getal is **70**."
]
```

### Visual stages

**Visual type:** `calculationSteps`. All four frames below belong to surface `original`.

**Question stage**

```json
{
  "groups": []
}
```

**Minnie stage**

```json
{
  "groups": [
    {
      "nodes": [
        "20",
        "25",
        "35",
        "50",
        "?"
      ],
      "jumps": [
        "+5",
        "+10",
        "",
        ""
      ]
    }
  ]
}
```

**Moose stage**

```json
{
  "groups": [
    {
      "nodes": [
        "20",
        "25",
        "35",
        "50",
        "?"
      ],
      "jumps": [
        "+5",
        "+10",
        "+15",
        "+20"
      ]
    }
  ],
  "notes": [
    "volgende sprong = +20"
  ]
}
```

**Explanation stage**

```json
{
  "groups": [
    {
      "lines": [
        "50 + 20 = 70"
      ]
    }
  ]
}
```

**Explanation visual placement:**

No per-question interleaving mapping; the complete explanation-stage visual follows the last explanation step.

## Export-integrity results

| Check | Final count | Expected / status |
| --- | --- | --- |
| Unique production question IDs | 99 | 99 expected |
| Original migrated questions | 24 | 24 expected |
| Expansion questions | 75 | 75 expected |
| 99-row inventory entries | 99 | 99 expected |
| Question sections | 99 | 99 expected |
| Configured / exported surfaces | 133 / 133 | all exported |
| Questions with multiple surfaces | 34 | 34 |
| Surfaces with exact question text | 133 | 133 / 133 |
| Questions with Minnie on every surface | 99 | 99 / 99 |
| Resolved Minnie fields | 133 | 133 / 133 |
| Questions with Moose on every surface | 99 | 99 / 99 |
| Resolved Moose fields | 133 | 133 / 133 |
| Questions with full explanation on every surface | 99 | 99 / 99 |
| Resolved full explanations | 133 | 133 / 133 |
| Question answer contracts | 99 | 99 / 99 |
| Surface answer contracts verified | 133 | 133 / 133 |
| Visual stage frames | 532 | 532 / 532 |
| Test-only question IDs | 0 | 0 |
| Content or runtime changes made | 0 | export only |

Verified against the current resolved runtime objects: every question section, surface text field, answer contract and visual-stage JSON matches its source object. This is an export-integrity check only, not an educational assessment. No browser QA or screenshots were performed.
