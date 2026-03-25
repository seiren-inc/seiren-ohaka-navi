import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildContractText, hashContractText, CONTRACT_VERSION, ContractData } from "@/lib/contract";
import { renderToBuffer } from "@react-pdf/renderer";
import { ContractDocument } from "@/lib/contractPdf";
import { createElement } from "react";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@seiren.ne.jp";
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@seiren.ne.jp";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { templeId, templeName, representativeName, representativeTitle, contactEmail, planType } = body;

        if (!templeId || !representativeName || !representativeTitle || !contactEmail || !planType) {
            return NextResponse.json({ error: "必須項目が不足しています。" }, { status: 400 });
        }

        // IPアドレス取得
        const agreedIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            req.headers.get("x-real-ip") || "unknown";
        const agreedAt = new Date();

        // 仮IDで Prisma レコード作成（PDF生成後にpdfUrlを更新）
        const contract = await prisma.contract.create({
            data: {
                templeId,
                representativeName,
                representativeTitle,
                contactEmail,
                planType,
                agreedAt,
                agreedIp,
                contractVersion: CONTRACT_VERSION,
                contractHash: "pending", // 後で更新
                status: "active",
            },
        });

        const contractData: ContractData = {
            contractId: contract.id,
            templeName,
            representativeName,
            representativeTitle,
            contactEmail,
            planType: planType as "free" | "standard" | "sponsor",
            agreedAt,
            agreedIp,
        };

        // 契約書ハッシュ計算
        const contractText = buildContractText(contractData);
        const contractHash = hashContractText(contractText);

        // PDF生成 - renderToBuffer は DocumentProps を持つ ReactElement を要求するため型キャストを使用
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const element = createElement(ContractDocument as any, { data: contractData, contractHash }) as any;
        const pdfBuffer = await renderToBuffer(element);

        // contractHash をDBに更新
        await prisma.contract.update({
            where: { id: contract.id },
            data: { contractHash },
        });

        // メール送信（PDFをバッファで直接添付）
        const pdfBase64 = Buffer.from(pdfBuffer).toString("base64");

        // Resend はビルド時ではなく実行時に初期化する
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: FROM_EMAIL,
            to: [contactEmail],
            bcc: [ADMIN_EMAIL],
            subject: "【清蓮 お墓探しナビ】掲載申込完了・契約書送付のご案内",
            html: buildEmailHtml({ templeName, representativeName, planType, contractId: contract.id, agreedAt }),
            attachments: [
                {
                    filename: `contract_${contract.id}_${agreedAt.toLocaleDateString("ja-JP").replace(/\//g, "")}.pdf`,
                    content: pdfBase64,
                },
            ],
        });

        return NextResponse.json({ success: true, contractId: contract.id });
    } catch (err) {
        console.error("[contract/submit] error:", err);
        return NextResponse.json({ error: "送信エラーが発生しました。しばらくしてから再度お試しください。" }, { status: 500 });
    }
}

function buildEmailHtml({ templeName, representativeName, planType, contractId, agreedAt }: {
    templeName: string;
    representativeName: string;
    planType: string;
    contractId: string;
    agreedAt: Date;
}) {
    const planLabel = { free: "無料プラン（Free）", standard: "標準プラン（Standard）", sponsor: "PR枠プラン（Sponsor）" }[planType] || planType;
    return `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
  <div style="background: #007B55; padding: 24px 32px;">
    <p style="color: white; font-size: 20px; font-weight: bold; margin: 0;">清蓮 お墓探しナビ</p>
    <p style="color: rgba(255,255,255,0.7); font-size: 12px; margin: 4px 0 0;">掲載申込完了のご確認</p>
  </div>
  <div style="padding: 32px;">
    <p>${representativeName} 様</p>
    <p>このたびは清蓮 お墓探しナビへの掲載お申し込みありがとうございます。</p>
    <p>以下の内容で申込を受け付けました。本メールに契約書PDFを添付いたします。</p>
    <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 8px; color: #666; width: 120px;">施設名</td>
        <td style="padding: 8px; font-weight: bold;">${templeName}</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 8px; color: #666;">選択プラン</td>
        <td style="padding: 8px; font-weight: bold;">${planLabel}</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 8px; color: #666;">申込日時</td>
        <td style="padding: 8px;">${agreedAt.toLocaleString("ja-JP")}</td>
      </tr>
      <tr>
        <td style="padding: 8px; color: #666;">契約番号</td>
        <td style="padding: 8px; font-family: monospace; font-size: 13px;">${contractId}</td>
      </tr>
    </table>
    <p style="font-size: 14px; background: #f5f5f5; border-left: 4px solid #007B55; padding: 12px 16px; border-radius: 0 4px 4px 0;">
      添付の契約書PDFは大切に保管してください。
    </p>
    <p style="margin-top: 32px; font-size: 13px; color: #666;">ご不明点は <a href="mailto:${ADMIN_EMAIL}" style="color: #007B55;">${ADMIN_EMAIL}</a> までお問い合わせください。</p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
    <p style="font-size: 12px; color: #999;">株式会社清蓮 ／ 清蓮 お墓探しナビ<br>本メールは自動送信です。このメールに直接返信はできません。</p>
  </div>
</div>`;
}

export async function GET() {
    const contracts = await prisma.contract.findMany({
        orderBy: { createdAt: "desc" },
        include: { temple: { select: { name: true } } },
    });
    return NextResponse.json(contracts);
}
