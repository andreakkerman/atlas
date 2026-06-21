# Atlas Clock Question Review

Exact change specification for the current 48 authored analog clock-reading variants.

## Goal

Improve coverage without adding slots or variants.

Keep unchanged:
- 6 clock challenges
- 24 clock slots
- 48 clock variants
- all challenge IDs and slot IDs
- all non-clock learning content
- clock renderer and runtime behavior
- answer mode: multiple choice

## Required outcome

After applying this review:
- 4 whole-hour variants
- 8 half-hour variants
- 8 quarter-hour variants
- 14 five-minute variants
- 14 ten-minute variants
- no duplicated times between the Viking ship clock and the Austria clock
- Dutch school-style clock language throughout
- all choices remain unique and include the correct answer

---

# 1. Replace all eight Austria clock variants

Level: `LVL-0017`  
Challenge: `clockHouse`

## `at-clock-1a`
- Hour: `3`
- Minute: `0`
- Answer: `Drie uur`
- Choices: `Half drie`; `Drie uur`; `Half vier`; `Vier uur`
- hintMinnie: `De grote wijzer staat op de 12.`
- hintMoose: `Als de grote wijzer op de 12 staat, kijk je welk uur de kleine wijzer aanwijst.`
- Explanation: `De grote wijzer staat op de 12 en de kleine wijzer op de 3. Het is drie uur.`

## `at-clock-1b`
- Hour: `12`
- Minute: `0`
- Answer: `Twaalf uur`
- Choices: `Half twaalf`; `Twaalf uur`; `Half één`; `Eén uur`
- hintMinnie: `De grote wijzer staat op de 12.`
- hintMoose: `Beide wijzers wijzen naar de 12.`
- Explanation: `De grote en de kleine wijzer staan op de 12. Het is twaalf uur.`

## `at-clock-2a`
- Hour: `6`
- Minute: `0`
- Answer: `Zes uur`
- Choices: `Half zes`; `Zes uur`; `Half zeven`; `Zeven uur`
- hintMinnie: `De grote wijzer staat op de 12.`
- hintMoose: `Kijk nu naar het cijfer dat de kleine wijzer aanwijst.`
- Explanation: `De grote wijzer staat op de 12 en de kleine wijzer op de 6. Het is zes uur.`

## `at-clock-2b`
- Hour: `9`
- Minute: `0`
- Answer: `Negen uur`
- Choices: `Half negen`; `Negen uur`; `Half tien`; `Tien uur`
- hintMinnie: `De grote wijzer staat op de 12.`
- hintMoose: `De kleine wijzer wijst precies naar de 9.`
- Explanation: `De grote wijzer staat op de 12 en de kleine wijzer op de 9. Het is negen uur.`

## `at-clock-3a`
- Hour: `3`
- Minute: `20`
- Answer: `Tien voor half vier`
- Choices: `Kwart over drie`; `Tien voor half vier`; `Tien over half drie`; `Half vier`
- hintMinnie: `De grote wijzer staat op de 4.`
- hintMoose: `Op de 4 zijn twintig minuten voorbij. Dat is tien minuten voor half vier.`
- Explanation: `De grote wijzer staat op de 4 en de kleine wijzer tussen de 3 en de 4. Het is tien voor half vier.`

## `at-clock-3b`
- Hour: `5`
- Minute: `40`
- Answer: `Tien over half zes`
- Choices: `Tien voor half zes`; `Half zes`; `Tien over half zes`; `Tien voor zes`
- hintMinnie: `De grote wijzer staat op de 8.`
- hintMoose: `Op de 8 zijn veertig minuten voorbij. Dat is tien minuten na half zes.`
- Explanation: `De grote wijzer staat op de 8 en de kleine wijzer tussen de 5 en de 6. Het is tien over half zes.`

## `at-clock-4a`
- Hour: `9`
- Minute: `25`
- Answer: `Vijf voor half tien`
- Choices: `Vijf over negen`; `Vijf voor half tien`; `Half tien`; `Vijf over half tien`
- hintMinnie: `De grote wijzer staat op de 5.`
- hintMoose: `Op de 5 zijn vijfentwintig minuten voorbij. Dat is vijf minuten voor half tien.`
- Explanation: `De grote wijzer staat op de 5 en de kleine wijzer tussen de 9 en de 10. Het is vijf voor half tien.`

## `at-clock-4b`
- Hour: `12`
- Minute: `50`
- Answer: `Tien voor één`
- Choices: `Tien over twaalf`; `Vijf voor één`; `Tien voor één`; `Eén uur`
- hintMinnie: `De grote wijzer staat op de 10.`
- hintMoose: `Vanaf de 10 zijn het nog tien minuten tot het volgende hele uur.`
- Explanation: `De grote wijzer staat op de 10 en de kleine wijzer bijna op de 1. Het is tien voor één.`

---

# 2. Improve Moose hints for the Viking ship clock

Level: `LVL-0003`  
Challenge: `shipCompass`

Keep the existing times, answers, choices, prompts, Minnie hints and explanations. Replace only `hintMoose`.

- `shipCompass-1a`: `De grote wijzer staat op de 2. Dat betekent tien minuten na het hele uur. Kijk welk uur net begonnen is.`
- `shipCompass-1b`: `De grote wijzer staat op de 4. Dat is twintig minuten na vier, oftewel tien minuten voor half vijf.`
- `shipCompass-2a`: `De grote wijzer staat op de 5. Dat is vijf minuten voor het halve uur dat eraan komt.`
- `shipCompass-2b`: `De grote wijzer staat op de 7. Dat is vijf minuten na het halve uur.`
- `shipCompass-3a`: `De grote wijzer staat op de 8. Dat is tien minuten na het halve uur.`
- `shipCompass-3b`: `De grote wijzer staat op de 10. Vanaf daar zijn het nog tien minuten tot het volgende uur.`
- `shipCompass-4a`: `De grote wijzer staat op de 1. Elk cijfer is vijf minuten, dus er zijn vijf minuten voorbij.`
- `shipCompass-4b`: `De grote wijzer staat op de 11. Vanaf daar duurt het nog vijf minuten tot het volgende uur.`

---

# 3. Validation requirements

Confirm:
- total clock challenges: `6`
- total clock slots: `24`
- total clock variants: `48`
- whole-hour variants: `4`
- half-hour variants: `8`
- quarter-hour variants: `8`
- five-minute variants: `14`
- ten-minute variants: `14`
- no duplicate times between `shipCompass` and `clockHouse`
- every multiple-choice set has four unique choices
- every correct answer appears in its choices
- all Dutch time wording follows school-style conventions
- all clock visuals match the textual answer
- no non-clock content changed

Do not add digital clock questions in this change.
