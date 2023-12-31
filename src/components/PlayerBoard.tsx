"use client"

import { useCallback, useMemo, useState } from "react"
import { PointInput } from "./PointInput"

export const PlayerBoard = () => {
    const [points, setPoints] = useState(Array(5).fill(6.0))

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

    const handleReset = useCallback((base: number) => {
        setPoints(Array(5).fill(base))
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <button className="p-1 border" onClick={() => handleReset(6.0)}>
                    6点リセット
                </button>
                <button className="p-1 border" onClick={() => handleReset(7.0)}>
                    7点リセット
                </button>
                <button className="p-1 border" onClick={() => handleReset(8.0)}>
                    8点リセット
                </button>
            </div>

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
        </div>
    )
}
