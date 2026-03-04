// app/lib/contractPdf.tsx
// @react-pdf/renderer を使ったサーバーサイドPDF生成ユーティリティ
// 日本語テキストはフォント埋め込みが必要だが、フォント設定が複雑なため
// このファイルでは HTML→PDF の代替として API ルート側で文字列を組み立てて
// @react-pdf/renderer の Document/Page へ渡す。
// NOTE: 実行はNode.js（API Route / Server Action）上のみ。Edgeランタイム不可。

import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import { ContractData, PLAN_DETAILS, CONTRACT_VERSION } from "@/lib/contract";

import path from "path";

// フォント登録（ローカルの woff2 ファイルを使用）
const FONT_PATH = path.join(process.cwd(), "public/fonts/NotoSansJP-Regular.woff2");

Font.register({
    family: "NotoSansJP",
    fonts: [
        { src: FONT_PATH, fontWeight: "normal" },
        { src: FONT_PATH, fontWeight: "bold" },
    ],
});

const styles = StyleSheet.create({
    page: {
        fontFamily: "NotoSansJP",
        fontSize: 9,
        paddingTop: 50,
        paddingBottom: 60,
        paddingHorizontal: 50,
        color: "#1a1a1a",
    },
    header: {
        textAlign: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 9,
        color: "#666",
        marginBottom: 2,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        marginVertical: 12,
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: "bold",
        marginBottom: 6,
        backgroundColor: "#f5f5f5",
        padding: "4 6",
    },
    row: {
        flexDirection: "row",
        marginBottom: 4,
    },
    label: {
        width: 100,
        color: "#666",
        fontSize: 9,
    },
    value: {
        flex: 1,
        fontSize: 9,
    },
    article: {
        marginBottom: 10,
    },
    articleTitle: {
        fontWeight: "bold",
        marginBottom: 3,
        fontSize: 9,
    },
    articleBody: {
        lineHeight: 1.7,
        fontSize: 8.5,
        color: "#333",
    },
    planBox: {
        border: "1 solid #007B55",
        borderRadius: 4,
        padding: 10,
        marginBottom: 12,
        backgroundColor: "#f0faf5",
    },
    planTitle: {
        fontWeight: "bold",
        color: "#007B55",
        marginBottom: 4,
        fontSize: 10,
    },
    footer: {
        position: "absolute",
        bottom: 30,
        left: 50,
        right: 50,
        fontSize: 7,
        color: "#999",
        textAlign: "center",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 6,
    },
    electronicNote: {
        backgroundColor: "#fffbe6",
        border: "1 solid #f5c842",
        borderRadius: 4,
        padding: 8,
        marginTop: 10,
        fontSize: 8,
        color: "#7a5c00",
    },
    signatureArea: {
        marginTop: 20,
        flexDirection: "row",
        gap: 20,
    },
    signatureBox: {
        flex: 1,
        border: "1 solid #ccc",
        borderRadius: 4,
        padding: 10,
        minHeight: 60,
    },
    signatureLabel: {
        fontSize: 8,
        color: "#666",
        marginBottom: 4,
    },
});

const ARTICLES = [
    {
        title: "第1条（目的）",
        body: "本契約は、乙が運営する「清蓮 お墓探しナビ」（以下「本サービス」）に甲の施設情報を掲載し、利用者への案内および問い合わせ受付を行うことを目的とする。",
    },
    {
        title: "第2条（掲載内容と情報提供義務）",
        body: "甲は施設名、所在地、連絡先、区画プランおよび料金（税込）、施設写真等を提供し、最新状態を維持する義務を負う。区画が完売・停止した場合は速やかに乙へ通知しなければならない。",
    },
    {
        title: "第3条（プランと料金）",
        body: "甲は本契約において前記「選択プラン」に記載のプランを選択し、同プランに定める料金を乙へ支払う。",
    },
    {
        title: "第4条（リード課金）",
        body: "（1）有効リードの定義：資料請求、お問い合わせ（来訪意向あり）、来訪予約の3種別とする。（2）単価は選択プランの「リード課金」欄のとおり。（3）スパム・7日以内重複・電話番号不通等は申請期限（リード発生より14日以内）に申請することで課金対象外とする。（4）月末締め、翌月15日請求書発行、翌月末払い。",
    },
    {
        title: "第5条（請求と支払）",
        body: "月額掲載料及びリード課金を合算して月末締め翌月末日に銀行振込にて支払う。遅延損害金は年14.6%とする。",
    },
    {
        title: "第6条（甲の義務）",
        body: "（1）提供情報の正確性・最新性の維持。（2）問い合わせユーザーへの3営業日以内の対応。（3）本サービス経由ユーザーをポータル非経由と偽る行為の禁止。",
    },
    {
        title: "第7条（乙の義務）",
        body: "（1）掲載情報の正確な表示への努力。（2）月次リード集計レポートの提供。（3）甲のデータの第三者への無断提供禁止。",
    },
    {
        title: "第8条（禁止事項）",
        body: "虚偽情報の掲載、口コミ不正操作の依頼、他施設の誹謗中傷を禁止する。",
    },
    {
        title: "第9条（契約期間と解約）",
        body: "（1）本契約は締結日から1年間とし、解約の申出がない場合は自動更新する。（2）解約は30日前の書面通知による。解約月の月額掲載料は満額適用（日割返金なし）。",
    },
    {
        title: "第10条（損害賠償の制限）",
        body: "乙の損害賠償責任は、損害発生直前6ヶ月の月額掲載料の合計額を上限とする。",
    },
    {
        title: "第11条（秘密保持）",
        body: "甲乙ともに、本契約に関して知り得た相手方の機密情報を第三者に開示・漏洩しない。",
    },
    {
        title: "第12条（電子契約の有効性）",
        body: "本契約は民法第522条に基づき、甲によるウェブフォームへの入力・送信をもって申込みの意思表示とし、乙の承諾により成立する電子契約である。",
    },
    {
        title: "第13条（準拠法・管轄）",
        body: "本契約は日本法に準拠し、東京地方裁判所を専属的合意管轄裁判所とする。",
    },
];

interface ContractDocumentProps {
    data: ContractData;
    contractHash: string;
}

export function ContractDocument({ data, contractHash }: ContractDocumentProps) {
    const plan = PLAN_DETAILS[data.planType];
    const dateStr = data.agreedAt.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });

    return (
        <Document title="掲載契約書 - 清蓮 お墓探しナビ" author="株式会社清蓮" creator="清蓮お墓探しナビ">
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>掲載サービス利用規約に基づく掲載契約書</Text>
                    <Text style={styles.subtitle}>清蓮 お墓探しナビ ／ 契約番号: {data.contractId} ／ バージョン: {CONTRACT_VERSION}</Text>
                    <Text style={styles.subtitle}>契約締結日: {dateStr}</Text>
                </View>

                <View style={styles.divider} />

                {/* 当事者 */}
                <View style={styles.article}>
                    <Text style={styles.sectionTitle}>▌ 契約当事者</Text>
                    <View style={{ flexDirection: "row", gap: 20 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.articleTitle, { fontSize: 8, color: "#555" }]}>【甲：掲載施設】</Text>
                            <View style={styles.row}><Text style={styles.label}>施設名</Text><Text style={styles.value}>{data.templeName}</Text></View>
                            <View style={styles.row}><Text style={styles.label}>担当者</Text><Text style={styles.value}>{data.representativeName}（{data.representativeTitle}）</Text></View>
                            <View style={styles.row}><Text style={styles.label}>連絡先</Text><Text style={styles.value}>{data.contactEmail}</Text></View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.articleTitle, { fontSize: 8, color: "#555" }]}>【乙：サービス提供者】</Text>
                            <View style={styles.row}><Text style={styles.label}>会社名</Text><Text style={styles.value}>株式会社清蓮</Text></View>
                            <View style={styles.row}><Text style={styles.label}>サービス</Text><Text style={styles.value}>清蓮 お墓探しナビ</Text></View>
                        </View>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* 選択プラン */}
                <View style={styles.planBox}>
                    <Text style={styles.planTitle}>▌ 選択プラン</Text>
                    <View style={styles.row}><Text style={styles.label}>プラン名</Text><Text style={styles.value}>{plan.label}</Text></View>
                    <View style={styles.row}><Text style={styles.label}>月額費用</Text><Text style={styles.value}>{plan.monthly}</Text></View>
                    <View style={styles.row}><Text style={styles.label}>リード課金</Text><Text style={styles.value}>{plan.lead}</Text></View>
                </View>

                {/* 契約本文 */}
                <Text style={styles.sectionTitle}>▌ 契約条項</Text>
                {ARTICLES.map((article) => (
                    <View key={article.title} style={styles.article}>
                        <Text style={styles.articleTitle}>{article.title}</Text>
                        <Text style={styles.articleBody}>{article.body}</Text>
                    </View>
                ))}

                {/* 電子契約注記 */}
                <View style={styles.electronicNote}>
                    <Text style={{ fontWeight: "bold", marginBottom: 3 }}>【電子契約に関する記録】</Text>
                    <Text>本書は電子的に締結された契約書です。民法第522条に基づき法的効力を有します。</Text>
                    <Text>同意日時: {data.agreedAt.toISOString()}</Text>
                    <Text>同意時IPアドレス: {data.agreedIp}</Text>
                    <Text>契約書ハッシュ（SHA-256）: {contractHash.slice(0, 32)}...</Text>
                </View>

                {/* フッター */}
                <Text style={styles.footer}>
                    清蓮 お墓探しナビ ／ 本書は電子的に生成・交付されました ／ 契約番号: {data.contractId} ／ バージョン: {CONTRACT_VERSION}
                </Text>
            </Page>
        </Document>
    );
}
