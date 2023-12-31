"use client"

import { useMemo } from "react"

export type PointInputProps = {
    point: number
    onUp: () => void
    onDown: () => void
    isMax: boolean
    isMin: boolean
}

export const PointInput: React.FC<PointInputProps> = (props) => {
    const bgColor = useMemo(() => {
        if (props.isMax) {
            return "bg-red-100"
        } else if (props.isMin) {
            return "bg-blue-100"
        } else {
            return "bg-gray-100"
        }
    }, [props.isMax, props.isMin])

    return (
        <div
            className={`flex flex-col items-center rounded-md p-0.5 ${bgColor}`}
        >
            <div>{props.point.toFixed(1)}</div>
            <div className="flex gap-2">
                <button
                    onClick={props.onUp}
                    className="border rounded-md p-1 w-8"
                >
                    -
                </button>
                <button
                    onClick={props.onDown}
                    className="border rounded-md p-1 w-8"
                >
                    +
                </button>
            </div>
        </div>
    )
}
