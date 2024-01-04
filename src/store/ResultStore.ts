import { Dayjs } from "dayjs"
import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist()

export type PlayerResult = {
    no: number
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
    effects_UNSTABLE: [persistAtom],
})

export const PointBaseState = atom({
    key: "PointBaseState",
    default: 7,
})

export const EditNoState = atom({
    key: "EditNoState",
    default: -1,
})
