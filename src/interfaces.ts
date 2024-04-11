export interface QUA {
    metaData: Partial<MetaData>
    timingLines: TimingLine[],
    scrollVelocities: ScrollVelocity[],
    hitObjects: HitObject[]
}

export interface MetaData {
    [key: string]: number | string | string[] | boolean | undefined;
    AudioFile: string,
    SongPreviewTime: number,
    BackgroundFile: string,
    BannerFile: string,
    MapId: number,
    MapSetId: number,
    Mode: "Keys4" | "Keys7",
    Title: string,
    Artist: string,
    Source: string,
    Tags: string[],
    Creator: string,
    DifficultyName: string,
    Description: string,
    EditorLayers: string,
    CustomAudioSamples: string,
    SoundEffects: string
} 

export interface TimingLine {
    startTime: number,
    bpm: number
}

export interface ScrollVelocity {
    startTime: number,
    multiplier: number
}

export interface HitObject {
    startTime: number,
    endTime?: number,
    lane: number,
    hitSound?: string[],
    keySounds: string[]
}
