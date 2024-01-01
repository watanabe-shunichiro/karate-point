"use client"

import {
    EditIndexState,
    PointBaseState,
    ResultState,
} from "@/store/ResultStore"
import dayjs from "dayjs"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { PointInput } from "./PointInput"

export const PlayerBoard: React.FC<{ editMode: boolean }> = ({ editMode }) => {
    const base = useRecoilValue(PointBaseState)
    const [result, setResult] = useRecoilState(ResultState)
    const [editIndex, setEditIndex] = useRecoilState(EditIndexState)

    const [points, setPoints] = useState(Array(5).fill(base))
    const [name, setName] = useState("")

    const reset = useCallback(() => {
        setPoints(Array(5).fill(base))
        setName("")
    }, [base])

    // 基準が変更されたらリセット
    useEffect(() => {
        reset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [base])

    const minIndex = useMemo(() => {
        var min = Number.MAX_VALUE
        var minI = 0
        points.forEach((p, index) => {
            if (p < min) {
                min = p
                minI = index
            }
        })
        return minI
    }, [points])

    const maxIndex = useMemo(() => {
        var max = 0
        var maxI = 0
        points.forEach((p, index) => {
            if (p > max && index !== minIndex) {
                max = p
                maxI = index
            }
        })
        return maxI
    }, [minIndex, points])

    const total = useMemo(() => {
        var r = 0.0
        points.forEach((p, index) => {
            if (index !== maxIndex && index !== minIndex) {
                r += p
            }
        })
        return r
    }, [maxIndex, minIndex, points])

    const handleUpDown = useCallback(
        (index: number, diff: number) => {
            const newP = points.concat()
            newP[index] = newP[index] + diff
            setPoints(newP)
        },
        [points]
    )

    const handleSave = useCallback(() => {
        const newResult = { ...result }
        if (!newResult.date) {
            newResult.date = dayjs()
        }
        const newPoints = result.playerResults.concat()
        const newPoint = { name, points, maxIndex, minIndex, total }
        if (editMode) {
            newPoints[editIndex] = newPoint
            setEditIndex(-1)
        } else {
            newPoints.push(newPoint)
        }
        newResult.playerResults = newPoints
        setResult(newResult)
        reset()
    }, [
        editIndex,
        editMode,
        maxIndex,
        minIndex,
        name,
        points,
        reset,
        result,
        setEditIndex,
        setResult,
        total,
    ])

    // 編集モードの場合は初期値を設定
    useEffect(() => {
        if (editMode) {
            const player = result.playerResults[editIndex]
            setPoints(player.points)
            setName(player.name)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editIndex])

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-1">
                {points.map((p, index) => (
                    <PointInput
                        key={index}
                        point={p}
                        onUp={() => handleUpDown(index, -0.1)}
                        onDown={() => handleUpDown(index, 0.1)}
                        isMax={index === maxIndex}
                        isMin={index === minIndex}
                    />
                ))}
            </div>
            <div>得点: {total.toFixed(1)}</div>
            <div className="flex gap-2 items-center">
                <div>名前:</div>
                <input
                    className="border"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>
                <button className="p-1 border" onClick={handleSave}>
                    {editMode ? "更新" : "登録"}
                </button>
            </div>
        </div>
    )
}
