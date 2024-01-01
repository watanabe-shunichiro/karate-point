"use client"

import { PlayerBoard } from "@/components/PlayerBoard"
import { ResultTable } from "@/components/ResultTable"
import { RecoilRoot } from "recoil"

export default function Home() {
    return (
        <RecoilRoot>
            <main className="flex flex-col p-4 gap-2">
                <PlayerBoard />
                <ResultTable />
            </main>
        </RecoilRoot>
    )
}
