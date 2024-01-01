import { PlayerResult, ResultState } from "@/store/ResultStore"
import { useCallback, useMemo } from "react"
import { useRecoilValue, useResetRecoilState } from "recoil"

export const ResultTable = () => {
    const results = useRecoilValue(ResultState)
    const reset = useResetRecoilState(ResultState)

    const ranks = useMemo(() => {
        const players = results.playerResults
        const indexes: number[] = Array.from(
            { length: players.length },
            (_, i) => i
        )

        indexes.sort((a, b) => players[b].total - players[a].total)

        return Array.from(
            { length: players.length },
            (_, i) => indexes.indexOf(i) + 1
        )
    }, [results.playerResults])

    const renderPoint = useCallback(
        (r: PlayerResult, p: number, i: number, j: number) => {
            let bgColor = "bg-gray-100"
            if (j == r.maxIndex) {
                bgColor = "bg-red-100"
            } else if (j === r.minIndex) {
                bgColor = "bg-blue-100"
            }
            return (
                <div
                    className={`p-2 w-10 border ${bgColor}`}
                    key={`playerResults${i}-${j}`}
                >
                    {p.toFixed(1)}
                </div>
            )
        },
        []
    )

    const handleReset = useCallback(() => {
        reset()
    }, [reset])

    return (
        <div className="flex flex-col">
            {results.playerResults.map((r, i) => {
                let rankBg = ""
                if (ranks[i] === 1) {
                    rankBg = "bg-red-100"
                } else if (ranks[i] === 2) {
                    rankBg = "bg-yellow-200"
                } else if (ranks[i] === 3) {
                    rankBg = "bg-yellow-200"
                }
                return (
                    <div className="flex" key={`playerResults${i}`}>
                        <div className="border p-2 w-6">{i + 1}</div>
                        <div className="border p-2 w-20">{r.name}</div>
                        {r.points.map((p, j) => renderPoint(r, p, i, j))}
                        <div className="border p-2 w-15">
                            {r.total.toFixed(1)}
                        </div>
                        <div className={`border p-2 w-15 ${rankBg}`}>
                            {ranks[i]}位
                        </div>
                    </div>
                )
            })}
            {results.playerResults.length > 0 ? (
                <button className="mt-4 p-1 w-24 border" onClick={handleReset}>
                    表リセット
                </button>
            ) : undefined}
        </div>
    )
}
