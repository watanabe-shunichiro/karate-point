import { Dayjs } from "dayjs"
import { useEffect, useState } from "react"
import { atom, useRecoilState } from "recoil"
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

export const resultStateDefault: MatchInfo = { playerResults: [] }

export const ResultState = atom<MatchInfo>({
    key: "ResultState",
    default: resultStateDefault,
    effects_UNSTABLE: [persistAtom],
})

/**
 * support SSR (https://github.com/polemius/recoil-persist#server-side-rendering)
 */
export function useResults() {
    const [isInitial, setIsInitial] = useState(true)
    const [result, setResult] = useRecoilState(ResultState)

    useEffect(() => {
        setIsInitial(false)
    }, [])

    return [isInitial ? resultStateDefault : result, setResult] as const
}
