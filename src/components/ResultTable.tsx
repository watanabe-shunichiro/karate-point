import { EditNoState, PlayerResult, ResultState } from "@/store/ResultStore"
import { useCallback, useMemo } from "react"
import { useRecoilState, useResetRecoilState } from "recoil"
import { PlayerBoard } from "./PlayerBoard"

export const ResultTable = () => {
    const [results, setResults] = useRecoilState(ResultState)
    const reset = useResetRecoilState(ResultState)
    const [editNo, setEditNo] = useRecoilState(EditNoState)

    const renderPoint = useCallback(
        (r: PlayerResult, point: number, i: number) => {
            let bgColor = "bg-gray-100"
            if (i == r.maxIndex) {
                bgColor = "bg-red-100"
            } else if (i === r.minIndex) {
                bgColor = "bg-blue-100"
            }
            return (
                <div
                    className={`p-2 w-10 border ${bgColor}`}
                    key={`playerResults${r.no}-${i}`}
                >
                    {point.toFixed(1)}
                </div>
            )
        },
        []
    )

    const handleEdit = useCallback(
        (no: number) => {
            if (editNo === no) {
                setEditNo(-1)
            } else {
                setEditNo(no)
            }
        },
        [editNo, setEditNo]
    )

    const handleDelete = useCallback(
        (no: number) => {
            if (confirm(`${no}番目を削除しますか？`)) {
                const newResult = { ...results }
                const newPoints = results.playerResults.concat()
                const index = results.playerResults.findIndex(
                    (p) => p.no === no
                )
                newPoints.splice(index, 1)
                newResult.playerResults = newPoints
                setResults(newResult)
            }
        },
        [results, setResults]
    )

    const handleReset = useCallback(() => {
        if (confirm("表をリセットしますか？")) {
            reset()
        }
    }, [reset])

    const renderPlayerResult = useCallback(
        (r: PlayerResult) => {
            let rankBg = ""
            if (r.rank === 1) {
                rankBg = "bg-red-100"
            } else if (r.rank === 2) {
                rankBg = "bg-yellow-200"
            } else if (r.rank === 3) {
                rankBg = "bg-yellow-200"
            }
            return (
                <div className="flex flex-col" key={`playerResultsW${r.no}`}>
                    <div className="flex" key={`playerResults${r.no}`}>
                        <div className="flex items-center justify-center border w-10">
                            <p>{r.no}</p>
                        </div>
                        <div className="border p-2 w-20">{r.name}</div>
                        {r.points.map((p, i) => renderPoint(r, p, i))}
                        <div className="border p-2 w-12">
                            {r.total.toFixed(1)}
                        </div>
                        <div
                            className={`flex items-center justify-center border w-14 ${rankBg}`}
                        >
                            <p>{r.rank}位</p>
                        </div>
                        <div className="pl-2">
                            {editNo === r.no ? (
                                <button
                                    className="p-2 border bg-yellow-100"
                                    onClick={() => handleEdit(r.no)}
                                >
                                    取り消し
                                </button>
                            ) : (
                                <>
                                    <button
                                        className="p-2 border bg-gray-100"
                                        onClick={() => handleEdit(r.no)}
                                    >
                                        編集
                                    </button>
                                    <button
                                        className="p-2 border bg-orange-100"
                                        onClick={() => handleDelete(r.no)}
                                    >
                                        削除
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    {editNo === r.no ? (
                        <div className="p-2">
                            <PlayerBoard editMode={true} />
                        </div>
                    ) : undefined}
                </div>
            )
        },
        [editNo, handleDelete, handleEdit, renderPoint]
    )

    const viewResults = useMemo(() => {
        const copy = results.playerResults.concat()
        copy.reverse()
        return copy
    }, [results.playerResults])

    return (
        <div className="flex flex-col">
            {viewResults.map((r) => renderPlayerResult(r))}
            {results.playerResults.length > 0 ? (
                <button
                    className="mt-4 p-1 w-24 border bg-orange-100"
                    onClick={handleReset}
                >
                    表リセット
                </button>
            ) : undefined}
        </div>
    )
}
