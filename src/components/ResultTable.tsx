import { EditIndexState, PlayerResult, ResultState } from "@/store/ResultStore"
import { useCallback, useMemo } from "react"
import { useRecoilState, useResetRecoilState } from "recoil"
import { PlayerBoard } from "./PlayerBoard"

export const ResultTable = () => {
    const [results, setResults] = useRecoilState(ResultState)
    const reset = useResetRecoilState(ResultState)
    const [editIndex, setEditIndex] = useRecoilState(EditIndexState)

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

    const handleEdit = useCallback(
        (i: number) => {
            if (editIndex === i) {
                setEditIndex(-1)
            } else {
                setEditIndex(i)
            }
        },
        [editIndex, setEditIndex]
    )

    const handleDelete = useCallback(
        (i: number) => {
            if (confirm(`${i + 1}番目を削除しますか？`)) {
                const newResult = { ...results }
                const newPoints = results.playerResults.concat()
                newPoints.splice(i, 1)
                newResult.playerResults = newPoints
                setResults(newResult)
            }
        },
        [results, setResults]
    )

    const handleReset = useCallback(() => {
        reset()
    }, [reset])

    const renderPlayerResult = useCallback(
        (r: PlayerResult, reversedIdx: number) => {
            const i = results.playerResults.length - reversedIdx - 1
            let rankBg = ""
            if (ranks[i] === 1) {
                rankBg = "bg-red-100"
            } else if (ranks[i] === 2) {
                rankBg = "bg-yellow-200"
            } else if (ranks[i] === 3) {
                rankBg = "bg-yellow-200"
            }
            return (
                <div className="flex flex-col" key={`playerResultsW${i}`}>
                    <div className="flex" key={`playerResults${i}`}>
                        <div className="flex items-center justify-center border w-10">
                            <p>{i + 1}</p>
                        </div>
                        <div className="border p-2 w-20">{r.name}</div>
                        {r.points.map((p, j) => renderPoint(r, p, i, j))}
                        <div className="border p-2 w-12">
                            {r.total.toFixed(1)}
                        </div>
                        <div
                            className={`flex items-center justify-center border w-14 ${rankBg}`}
                        >
                            <p>{ranks[i]}位</p>
                        </div>
                        <div className="pl-2">
                            {editIndex === i ? (
                                <button
                                    className="p-2 border bg-yellow-100"
                                    onClick={() => handleEdit(i)}
                                >
                                    取り消し
                                </button>
                            ) : (
                                <>
                                    <button
                                        className="p-2 border bg-gray-100"
                                        onClick={() => handleEdit(i)}
                                    >
                                        編集
                                    </button>
                                    <button
                                        className="p-2 border bg-orange-100"
                                        onClick={() => handleDelete(i)}
                                    >
                                        削除
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    {editIndex === i ? (
                        <div className="p-2">
                            <PlayerBoard editMode={true} />
                        </div>
                    ) : undefined}
                </div>
            )
        },
        [
            editIndex,
            handleDelete,
            handleEdit,
            ranks,
            renderPoint,
            results.playerResults.length,
        ]
    )

    const reversed = useMemo(() => {
        const copy = results.playerResults.concat()
        copy.reverse()
        return copy
    }, [results.playerResults])

    return (
        <div className="flex flex-col">
            {reversed.map((r, i) => renderPlayerResult(r, i))}
            {results.playerResults.length > 0 ? (
                <button className="mt-4 p-1 w-24 border" onClick={handleReset}>
                    表リセット
                </button>
            ) : undefined}
        </div>
    )
}
