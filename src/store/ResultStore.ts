import { Dayjs } from "dayjs"
import { atom } from "recoil"

export type PlayerResult = {
    name: string
    points: number[]
    maxIndex: number
    minIndex: number
    total: number
    rank?: number
}

export type MatchInfo = {
    date?: Dayjs
    playerResults: PlayerResult[]
}

export const ResultState = atom<MatchInfo>({
    key: "ResultState",
    default: { playerResults: [] },
})

export const PointBaseState = atom({
    key: "PointBaseState",
    default: 7,
})

export const EditIndexState = atom({
    key: "EditIndexState",
    default: -1,
})
