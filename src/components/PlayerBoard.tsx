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

    const handleUpDown = useCallback(
        (index: number, diff: number) => {
            const newP = points.concat()
            newP[index] = newP[index] + diff
            setPoints(newP)
        },
        [points]
    )

    return (
        <div className="flex gap-4">
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
    )
}
