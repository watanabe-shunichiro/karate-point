"use client"

export type PointInputProps = {
    point: number
    onUp: () => void
    onDown: () => void
    isMax: boolean
    isMin: boolean
}

export const PointInput: React.FC<PointInputProps> = (props) => {
    return (
        <div
            className={`flex flex-col items-center ${
                props.isMax ? "bg-red-100" : ""
            } ${props.isMin ? "bg-blue-100" : ""}`}
        >
            <div>{props.point.toFixed(1)}</div>
            <div className="flex gap-2">
                <button
                    onClick={props.onUp}
                    className="border rounded-md p-1 w-9"
                >
                    -
                </button>
                <button
                    onClick={props.onDown}
                    className="border rounded-md p-1 w-9"
                >
                    +
                </button>
            </div>
        </div>
    )
}
