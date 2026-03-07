import { Metadata } from "next";
import { DiagnosisContent } from "./DiagnosisContent";

export const metadata: Metadata = {
    title: "供養の選択肢診断チャート｜永代供養・樹木葬・納骨堂を整理｜清蓮",
    description: "いくつかの質問に答えるだけで、永代供養墓・樹木葬・納骨堂・散骨などの候補を中立に整理。迷っている方のための供養比較ガイド。",
};

export default function DiagnosisPage() {
    return <DiagnosisContent />;
}
