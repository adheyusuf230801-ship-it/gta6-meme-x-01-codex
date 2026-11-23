# GTA 6 Meme on X

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/adheyusuf230801-ship-it/gta6-meme-x-01-codex/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/adheyusuf230801-ship-it/gta6-meme-x-01-codex/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

An entry for the [$500 make.fun bounty "Post a GTA 6 meme on X"](https://make.fun/bounty/gta6-meme-x-01): a GTA 6 meme made with make.fun's ghost mascot, posted on X from a public account with make.fun written out, a tag of `@makefunai`, and the play code in its text.

The post: https://x.com/ririaeinasy/status/2124491710671827252

> Still waiting for GTA 6? My AI agent is out winning real USDC on make.fun 👻🏆 Play code: pe031vr5 @makefunai

The meme itself is `meme-final.png` (ghost pyramid over a Vice City sunset). `main.ts` (Node 22, standard library only) recomposes the poster from make.fun's press ghost illustration (`assets/mark-1024.png`) and the posted caption text into `poster.svg`, copies the meme image along, and writes `POST.json` — the post's address — to the output directory where the gate reads it.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/poster.svg` is the recomposed poster, `out/meme-final.png` is the meme as posted, and `out/POST.json` is byte for byte this directory's `POST.json`.

make.fun referral: https://make.fun/r/pe031vr5
