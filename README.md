# Qua-Tools

`qua-tools` is a Node.JS package designed to help you easily deal with `.qua` files, the Quaver file format.

## Installation

Open a terminal in the root of your project, and run `npm i qua-tools --save-dev`.

## Usage

For ES6 and above:

```ts
import { importQua } from "qua-tools";

const qua = importQua("../PATH-TO-FILE");

console.log(qua.hitObjects.length);
```

For CommonJS:

```ts
const { importQua } = require("qua-tools");

const qua = importQua("../PATH-TO-FILE");

console.log(qua.hitObjects.length);
```

`importQua` returns a QUA object:

```ts
interface QUA {
  metaData: Partial<MetaData>;
  timingLines: TimingLine[];
  scrollVelocities: ScrollVelocity[];
  hitObjects: HitObject[];
}
```

Additional metatypes are defined below.

```ts
interface MetaData {
  [key: string]: number | string | string[] | boolean | undefined;
  AudioFile: string;
  SongPreviewTime: number;
  BackgroundFile: string;
  BannerFile: string;
  MapId: number;
  MapSetId: number;
  Mode: "Keys4" | "Keys7";
  Title: string;
  Artist: string;
  Source: string;
  Tags: string[];
  Creator: string;
  DifficultyName: string;
  Description: string;
  EditorLayers: string;
  CustomAudioSamples: string;
  SoundEffects: string;
}

interface TimingLine {
  startTime: number;
  bpm: number;
}

interface ScrollVelocity {
  startTime: number;
  multiplier: number;
}

interface HitObject {
  startTime: number;
  endTime?: number;
  lane: number;
  hitSound?: string[];
  keySounds: string[];
}
```
