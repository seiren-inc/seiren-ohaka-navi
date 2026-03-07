/**
 * JSON-LD 構造化データ出力コンポーネント
 * Next.js の <head> 内に <script type="application/ld+json"> を出力する。
 * Google リッチリザルト対応のための構造化データを各ページから注入する用途で使用。
 */
export function JsonLd({ data }: { data: object }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
