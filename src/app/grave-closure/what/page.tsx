import type { Metadata } from "next";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";

export const metadata: Metadata = {
  title: "お墓じまいとは？意味・背景・流れをわかりやすく解説",
  description: "「お墓じまい」とは何か、その意味や背景、一般的な流れについてわかりやすく解説します。費用の目安・必要な手続き・改葬との違いも整理。",
};

export default function GraveClosureWhatPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="grow pt-32 px-4 max-w-7xl mx-auto w-full">
                <h1 className="text-3xl font-bold text-primary-dark mb-4">お墓じまいとは</h1>
                <p className="text-gray-600">このページは現在準備中です。</p>
            </main>
            <Footer />
        </div>
    );
}
