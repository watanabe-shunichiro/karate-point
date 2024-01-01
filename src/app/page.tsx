"use client"

import { PlayerBoard } from "@/components/PlayerBoard"
import { PointBase } from "@/components/PointBase"
import { ResultTable } from "@/components/ResultTable"
import { RecoilRoot } from "recoil"

export default function Home() {
    return (
        <RecoilRoot>
            <main className="flex flex-col p-4 gap-2">
                <PointBase />
                <PlayerBoard editMode={false} />
                <ResultTable />
            </main>
        </RecoilRoot>
    )
}
