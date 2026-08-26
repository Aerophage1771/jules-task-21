Set 2: Push this theme toward a more editorial, premium, or expressive direction. Prioritize typography, whitespace, and a high-end reading experience while still supporting the dense product UI appropriately.


Build a comprehensive mockup covering the content described in the three provided Markdown specs (Marketing, Course, and Blog).
Your goal is not just to mechanically swap colors, but to discover the strongest possible version of this visual direction.
Feel free to adapt or extend the theme's palette, typography, and component styling as needed to support the entire GermaineTutoring ecosystem.
Output the full HTML file at the root. The output must be comprehensive and allow browsing between the Marketing, Course, and Blog sections.


WHEN YOU ARE FINISHED — OPEN A PULL REQUEST

Do not leave your work sitting in the VM. When you are done:

1. Commit your changes on your own branch.
2. Push that branch to `origin`.
3. Open a pull request against `main`.

Title the PR with the scope and the slug, e.g. `docs(question-types): course tab review
for rc-title`. In the body, say in plain terms what you changed and what you found. If
you found nothing and changed nothing, still open the PR and say so in one line.

Do not merge it. Leave it open for review.

BEFORE YOU REPORT DONE — PROVE IT, AND PUT THE PROOF IN THE PR

Do not declare the work finished on the strength of the code alone, and do not describe
what you saw without showing it. The evidence ships with the change.

Commit a `proof/` directory alongside your work containing:

1. **A still per state, showing that state working.** Not a sample. If the thing has
   twelve tabs, that is twelve images at 1280 and twelve at 375, each one showing that
   tab selected and its panel correctly displayed. Name them for the state they prove:
   `proof/1280/tab-typography.png`, `proof/375/tab-typography.png`. A reader must be
   able to open the folder and see every state functioning without running anything.
2. **A recording of the real interaction** — clicking through, scrolling, opening and
   closing, moving between states. `proof/walkthrough.mp4` or `.gif`. If the environment
   genuinely cannot record, commit a numbered frame sequence at
   `proof/walkthrough/001.png` and SAY in the PR body that recording was unavailable and
   frames were used instead. Do not silently skip it.
3. **`proof/README.md`** — a table mapping each image to the state it proves, plus every
   state you could NOT capture and why.

Then read your own captures. Anything that overflows, collides, sits outside its
container, renders as raw markup, or would make a reader stop and squint is a finding you
must report, and fix if it is in scope. If a state does not work, capture it broken,
fix it, and capture it again — commit both, named `-before` and `-after`.

In the PR body: what you captured, at what widths, what you found, what you fixed, and a
link to `proof/`. A PR that says "verified" without the proof directory is not verified
and will be sent back.

DRIVE IT, DO NOT READ IT. Reading the markup and reasoning about what it should do is
not a visual review. Click the control, load the page fresh at its anchor, reload on a
non-default state, and drive it from the keyboard. Report what happened, not what the
code implies would happen.
