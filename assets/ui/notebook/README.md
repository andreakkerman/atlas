# Notebook paper material

`paper-aged.png` was generated with the built-in imagegen tool on 4 October 2026,
then copied unchanged into this project. It is blank decorative artwork: every
question, hint, explanation, number and ruling remains live application content.
The supplied reference screenshots informed the material direction; they were
not used as educational source or pasted into the UI.

Short sheets retain the fitted paper artwork. For overflowing help and notes,
CSS nine-slices the same unchanged PNG at 110 source pixels: corners retain
their width-based scale and the middle/side material repeats vertically instead
of stretching its grain. The surface height follows the native scroll height.
The 28px ruling remains native local-background content; clipped decorative
paper and bindings follow that same scroll offset. There is no second scroller
or editor. Resize, font loading, typing and deletion refresh these measurements.
The existing paper-turn animation transforms text and material together.
Paired gold-bronze wire bindings remain a separate noninteractive SVG CSS image,
repeated every 40px along the longer sheet. Only complete tiles are added, with
end margins; the viewport clips rings naturally as they scroll out. Highlights and darker edges
give the slender wires a metallic finish. Each pair is centred on the unchanged
rounded rectangular hole. Both return arcs and their shadows are clipped at the
paper edge (x=18 in the 40px SVG); only the front arcs cross the page into the hole.
The bindings remain stationary while the paper turns. Decorative dimensions and
offsets live only in DOM styles; question, notes and learning state are unchanged.

Source output: `exec-0c738dc1-54b4-4e70-a56b-400207c7f76a.png`.
The runtime image is included in service-worker precaching; cache v258 distributes
the scrolling-material presentation.

## Generation prompt

Use case: product-mockup. Asset type: production game UI background texture for an old explorer's ring notebook, with live HTML text overlaid later.
Generate ONLY ONE blank aged paper sheet texture. Full-bleed 3:2 landscape rectangular page, straight-on orthographic scan, precisely horizontal and vertical outer edges. The entire image must be paper all the way to each boundary: no outer backdrop, no frame, no desk, no surrounding margin or perspective.
Materials: convincing fine antique rag-paper grain, faded warm cream ivory centre, light sepia edge patina. A REAL well-used notebook leaf, not a cloud/noise texture: finely frayed darkened edge seams, tiny shallow edge nicks, gently creased and dog-eared top-right and bottom-right corners within the image, several delicate dry hairline creases and small localized foxing marks close to the outer margins. Restrained irregular wear along the right edge. The central 85 percent remains calm, pale and uniformly legible for children's handwriting; very faint fibre structure there. Age is concentrated at the outer 5 percent border, not heavy brown stains or broad cloudy blobs across the writing surface. Overall light readable warm cream, natural paper, subtle depth in the folded corners.
Lighting: even soft diffuse light, no cast shadows across the page, subtle paper microtexture.
ABSOLUTELY NO TEXT, numbers, letters, logos, watermark, symbols, drawings, borders drawn with ink, printed rules, vertical margin line, holes, binder rings, metal, binding, leaves, coffee cup rings, or other objects. The UI supplies all lines, numbers and binder rings separately. No exaggerated grunge, burnt edges, torn-away chunks, repeating clouds, wood grain or leather. Beautiful tangible antique notebook material matching a polished teal-and-antique-brass fantasy adventure interface, but the image itself contains only the blank paper.

