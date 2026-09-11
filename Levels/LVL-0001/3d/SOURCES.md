# LVL-0001 visual asset sources

Blender geometry, route composition, conifer trunk/branch meshes, terrain, paving, temple architecture, runestones, guardians, braziers and authoring scripts were created for this implementation. Atlas character sprites and UI assets are reused from the existing repository.

The September 2026 faceted-forest pass replaces generic fir/groundcover meshes with original opaque vertex-colored geometry and simplifies selected scanned rocks in the live GLB. The following inventory also documents historical sources retained in the original Blender checkpoint; it does not imply every source remains in the current export. See `Docs/faceted-forest.md` and `scripts/stylized-forest-lvl0001-blender.py` for the current replacements.

## Poly Haven — CC0

Public-domain PBR scans and HDR environment from [Poly Haven](https://polyhaven.com/license):

- [Knotted Pine Bark](https://polyhaven.com/a/knotted_pine_bark)
- [Rock Boulder Dry](https://polyhaven.com/a/rock_boulder_dry)
- [Forrest Ground 01](https://polyhaven.com/a/forrest_ground_01)
- [Mossy Stone Wall](https://polyhaven.com/a/mossy_stone_wall)
- [Mossy Rock](https://polyhaven.com/a/mossy_rock)
- [Qwantani Sunset Pure Sky](https://polyhaven.com/a/qwantani_sunset_puresky)
- [Fir Tree 01](https://polyhaven.com/a/fir_tree_01) — twig atlas used on authored folded foliage; original high-resolution model retained only in local source cache.
- [Fern 02](https://polyhaven.com/a/fern_02)
- [Rock Moss Set 01](https://polyhaven.com/a/rock_moss_set_01)
- [Rock Face 01](https://polyhaven.com/a/rock_face_01)
- [Flower Heliophila](https://polyhaven.com/a/flower_heliophila)
- [Flower Ursinia](https://polyhaven.com/a/flower_ursinia)
- [Grass Medium 01](https://polyhaven.com/a/grass_medium_01)
- [Periwinkle Plant](https://polyhaven.com/a/periwinkle_plant)

Source metadata and files were fetched from `https://api.polyhaven.com/files/{asset_id}` through Blender MCP. Model textures are generally 2K, with 1K periwinkle textures. GLB delivery uses embedded WebP images at quality 88; original authoring textures are retained in the Blender checkpoint. The `sources/` folder is a local download cache, excluded from Git. The running game does not contact Poly Haven.

## Generated carving textures

`textures/runestone-carved-albedo.png` and `textures/gate-carved-albedo.png` were generated for this task using the ImageGen skill. They are surface textures on solid Blender geometry; target screenshots are not used as a runtime backdrop or depth projection.

## Runtime dependency

`textures/spruce-spray.png` is rendered from needle and branch geometry authored in Blender for this project. It supplies alpha coverage to the existing folded foliage meshes; `spruce-spray-lvl0001-blender.py` records its source geometry and render settings.

Three.js 0.180.0 is vendored under `assets/vendor/three`, including its MIT license and the loaders/post-processing modules used by the game.

The local Draco WebAssembly decoder is distributed with Three.js r180. Its Apache 2.0 license is included at `assets/vendor/three/draco/LICENSE`. The game loads no decoder code from a CDN.

[Coast Land Rocks 04](https://polyhaven.com/a/coast_land_rocks_04) supplies terrain-conforming rocky bank patches; [Coastal Cliff 04](https://polyhaven.com/a/coastal_cliff_04) supplies layered enclosure shelves. Both are CC0 Poly Haven scans with 2K PBR textures. Reduced independent derivatives are used in the scene; original imported meshes remain in the source library.

[Tree Small 02](https://polyhaven.com/a/tree_small_02) and three variants of [Fir Sapling Medium](https://polyhaven.com/a/fir_sapling_medium) replace selected authored understory trees. These CC0 models supply genuinely different small-tree structures. Independent reduced derivatives preserve the original source meshes; fifteen saplings and ten broadleaf trees are placed across the route.

Additional CC0 sources used in the enclosure refinement: [Pine Bark](https://polyhaven.com/a/pine_bark), [Shrub 02](https://polyhaven.com/a/shrub_02). [Shrub Sorrel 01](https://polyhaven.com/a/shrub_sorrel_01) supplies tiny paving-joint plants. Juvenile fir geometry is separately authored; it does not scale down the mature fir mesh.

[Shrub 01](https://polyhaven.com/a/shrub_01) supplies photographed broad-leaf surface textures for the separately authored forked saplings and masonry creepers. Its source mesh remains in the Blender source library and is not used as a repeated runtime tree.

Eighteen selected mature crowns use reduced geometry from the full `fir_tree_01_a` source, supported by the authored solid trunk cores. These are distinct from the separately authored juvenile firs. The original scanned master remains in the Blender source library; foliage derivatives do not destructively change it.

[Boulder 01](https://polyhaven.com/a/boulder_01) supplies the sharper opening focal boulder. Its independent derivative is oriented toward the route and grounded against the existing terrain; the previous boulder and original scan remain in the source library. This CC0 asset uses 2K PBR textures.
