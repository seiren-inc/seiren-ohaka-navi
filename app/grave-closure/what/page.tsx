import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";

export default function GraveClosureWhatPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main id="main-content" className="grow pt-32 px-4 max-w-7xl mx-auto w-full">
                <h1 className="text-3xl font-bold text-primary-dark mb-4">お墓じまいとは</h1>
                <p className="text-gray-600">このページは現在準備中です。</p>
            </main>
            <Footer />
        </div>
    );
}
