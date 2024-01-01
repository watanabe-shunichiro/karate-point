"use client"

import { PlayerBoard } from "@/components/PlayerBoard"
import { RecoilRoot } from "recoil"

export default function Home() {
    return (
        <RecoilRoot>
            <main className="flex p-4">
                <PlayerBoard />
            </main>
        </RecoilRoot>
    )
}
