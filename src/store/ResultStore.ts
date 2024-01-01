import { Dayjs } from "dayjs"
import { atom } from "recoil"

export type PlayerResult = {
    name: string
    points: number[]
    maxIndex: number
    minIndex: number
}

export type MatchInfo = {
    date?: Dayjs
    playerResults: PlayerResult[]
}

export const ResultState = atom<MatchInfo>({
    key: "ResultState",
    default: { playerResults: [] },
})
