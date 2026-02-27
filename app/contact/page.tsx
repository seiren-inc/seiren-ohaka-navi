import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ContactForm } from "./ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "お問い合わせ・無料相談｜清蓮",
    description: "お墓探し、永代供養、墓じまいに関するご相談・お問い合わせはこちら。専門スタッフが親身に対応いたします。",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col bg-bg">
            <Navbar />

            <main className="flex-grow pt-32 px-[--content-px] pb-24">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-secondary font-medium tracking-[0.2em] text-xs uppercase mb-4 block">
                            Contact
                        </span>
                        <h1 className="font-serif text-2xl md:text-3xl text-primary-dark mb-6">
                            お問い合わせ・無料相談
                        </h1>
                        <p className="text-text-muted text-sm leading-[1.8]">
                            お墓に関するお悩みやご質問など、お気軽にご相談ください。<br />
                            以下のフォームより必要事項をご入力の上、送信してください。
                        </p>
                    </div>

                    <ContactForm />
                </div>
            </main>

            <Footer />
        </div>
    );
}
