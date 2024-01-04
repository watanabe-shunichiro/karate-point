import { PointBaseState } from "@/store/UIStateStore"
import { useSetRecoilState } from "recoil"

export const PointBase = () => {
    const setBase = useSetRecoilState(PointBaseState)

    return (
        <div className="flex gap-2">
            <button className="p-1 border" onClick={() => setBase(7.0)}>
                7点ベース
            </button>
            <button className="p-1 border" onClick={() => setBase(8.0)}>
                8点ベース
            </button>
        </div>
    )
}
