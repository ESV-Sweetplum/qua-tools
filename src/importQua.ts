import * as fs from "fs"
import { QUA, MetaData, TimingLine, ScrollVelocity, HitObject } from "./interfaces"

export function importQua(fileName: string): QUA {
    const file = fs.readFileSync(fileName, 'utf-8').replaceAll("\r", "").split("\n")

    const timingPointIndex = file.findIndex((line) => line.includes("TimingPoints:"))
    const scrollVelocityIndex = file.findIndex((line) => line.includes("SliderVelocities:"))
    const hitObjectIndex = file.findIndex((line) => line.includes("HitObjects:"))

    const metaData = file.slice(0, timingPointIndex).reduce((obj: Partial<MetaData>, line: string) => {
        const [key, value] = line.split(": ")
        if (key === "Tags") {
            obj["Tags"] = value.split(", ")
        } else {
            obj[key as keyof Partial<MetaData>] = value
        }
        return obj
    }, {})
    
    const timingLines: TimingLine[] = []

    let currentTimingLine: Partial<TimingLine> = {
        startTime: -1,
        bpm: 69
    }

    file.slice(timingPointIndex + 1, scrollVelocityIndex).forEach((line, idx) => {
        const value = parseFloat(line.split(": ")[1])
        if (line.includes("-") && idx) {
            timingLines.push(currentTimingLine as TimingLine)
            currentTimingLine = { startTime: value }
        } else if (!timingLines.length) {
            currentTimingLine.startTime =value
        } else {
            currentTimingLine.bpm = value
        }
    })

    if (currentTimingLine.startTime !== -1) { timingLines.push(currentTimingLine as TimingLine)}


    const scrollVelocities: ScrollVelocity[] = []

    let currentScrollVelocity: Partial<ScrollVelocity> = {
        startTime: -1,
        multiplier: 69
    }

    file.slice(scrollVelocityIndex + 1, hitObjectIndex).forEach((line, idx) => {
        const value = parseFloat(line.split(": ")[1])
        if (line.includes("-") && idx) {
            scrollVelocities.push(currentScrollVelocity as ScrollVelocity)
            currentScrollVelocity = { startTime: value }
        } else if (!scrollVelocities.length) {
            currentScrollVelocity.startTime = value
        } else {
            currentScrollVelocity.multiplier = value
        }
    })

    if (currentScrollVelocity.startTime !== -1) { scrollVelocities.push(currentScrollVelocity as ScrollVelocity)}


    const hitObjects: HitObject[] = []

    let currentHitObject: Partial<HitObject> = {
        startTime: -1,
        lane: -1,
        keySounds: [],
    }

    file.slice(hitObjectIndex + 1).forEach((line, idx) => {
        const key = line.split(": ")[0].replaceAll(/[- ]/g, "")
        const value = line.split(": ")[1]
        if (line.includes("-") && idx) {
            hitObjects.push(currentHitObject as HitObject)
            currentHitObject = { startTime: parseFloat(value) }
        }
        switch (key) {
            case "StartTime": {
                currentHitObject.startTime = parseFloat(value)
                break;
            }
            case "EndTime": {
                currentHitObject.endTime = parseFloat(value)
                break;
            }
            case "Lane": {
                currentHitObject.lane = parseFloat(value)
                break;
            }
            case "HitSound": {
                currentHitObject.hitSound = value.split(", ").filter((item) => item)
            }
            case "KeySounds": {
                currentHitObject.keySounds = value.replaceAll(/[\[\]]/g, "").split(", ").filter((item) => item)
                break;
            }
        }
    })

    if (currentHitObject.startTime !== -1) { hitObjects.push(currentHitObject as HitObject)}

    return {
        metaData,
        timingLines,
        scrollVelocities,
        hitObjects
    }
}