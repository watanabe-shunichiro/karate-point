import { PlayerResult, ResultState } from "@/store/ResultStore"
import { useCallback } from "react"
import { useRecoilValue, useResetRecoilState } from "recoil"

export const ResultTable = () => {
    const results = useRecoilValue(ResultState)
    const reset = useResetRecoilState(ResultState)

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
            {results.playerResults.map((r, i) => (
                <div className="flex" key={`playerResults${i}`}>
                    <div className="border p-2 w-6">{i + 1}</div>
                    <div className="border p-2 w-20">{r.name}</div>
                    {r.points.map((p, j) => renderPoint(r, p, i, j))}
                    <div className="border p-2 w-15">{r.total.toFixed(1)}</div>
                </div>
            ))}
            <button className="mt-4 p-1 w-20 border" onClick={handleReset}>
                リセット
            </button>
        </div>
    )
}
