// SEO ヘルパー: インデックス制御のための共通ロジック。

/**
 * 指定したファセット（絞り込み）キーのいずれかに有効な値が入っているか判定する。
 *
 * `Object.keys(searchParams).length > 0` のような全パラメータ判定だと、
 * utm_* / gclid / fbclid などの広告・計測パラメータが付いただけで noindex
 * になってしまう。インデックス制御は「ページの内容を実際に変える既知の
 * 絞り込みキー」だけで判定する。
 */
export function hasActiveFacetParams(
    searchParams: { [key: string]: string | string[] | undefined },
    facetKeys: readonly string[]
): boolean {
    return facetKeys.some((key) => {
        const value = searchParams[key];
        if (Array.isArray(value)) return value.length > 0;
        return value !== undefined && value !== "";
    });
}

/** /search が内容を変えるために使う絞り込みキー */
export const SEARCH_FACET_KEYS = [
    "pref",
    "type",
    "memorial",
    "sect",
    "buddhistSect",
    "feature",
    "priceMax",
] as const;

/** /area 配下が内容を変えるために使う絞り込みキー */
export const AREA_FACET_KEYS = ["type", "tag"] as const;
