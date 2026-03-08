import { Info } from "lucide-react";

interface AreaSEOContentProps {
    prefecture: string;
    count: number;
}

export function AreaSEOContent({ prefecture, count }: AreaSEOContentProps) {
    // 優先8都道県向けの個別テキスト
    const customContent: Record<string, string> = {
        "東京都": "東京都は地価が高く、従来型の一般墓を新たに購入する場合、200万円〜300万円以上かかることも珍しくありません。そのため、都心部へのアクセスが良好で費用も抑えられる「納骨堂」や、郊外の「樹木葬」「永代供養墓」の人気が急速に高まっています。宗教・宗派不問の施設も多く、ライフスタイルに合わせた供養選びがしやすい地域です。",
        "大阪府": "大阪府は都市部での空き区画不足が続いており、新しくお墓を建てるより「永代供養墓」や「納骨堂」を選ぶ方が増えています。特に大阪市内や北摂エリアでは、交通の便が良い納骨堂の人気が高いです。一方で、生駒山系などの郊外に行くと、自然豊かな環境での「樹木葬」も選ばれています。費用相場は関西圏の中でも比較的高めですが、選択肢は豊富です。",
        "神奈川県": "神奈川県は、横浜市や川崎市などの都市部と、鎌倉や湘南などの自然豊かなエリアで霊園の傾向が異なります。都市圏では「納骨堂」やコンパクトな「永代供養墓」の需要が高い一方、少し足を延ばしたエリアでは眺望の素晴らしい「公園墓地」や「樹木葬」が選ばれることが多いです。都内からのアクセスも良いため、東京在住でお墓を神奈川に持つ方も少なくありません。",
        "愛知県": "愛知県は、名古屋市内と尾張・三河エリアで事情が異なります。名古屋市内ではアクセスの良い「納骨堂」や寺院内にある「永代供養墓」の需要が増加しています。車社会であるため、郊外の大型霊園や公園墓地を選ぶご家族も多く、「樹木葬」の人気も高まっています。仏教の信仰が根強い地域でもあり、寺院墓地の数も全国トップクラスです。",
        "埼玉県": "埼玉県は、東京からのアクセスが良好でありながら、都内と比べて費用を抑えやすく、広々とした霊園が多いのが特徴です。「公園墓地」や霊園内の「樹木葬」区画が非常に充実しています。都内で高い費用をかけて小さなお墓を建てるより、少し離れてもゆったりとした環境を選ぶという方に人気のエリアです。",
        "千葉県": "千葉県には大規模な「公園墓地」が多数存在しており、美しい景観や充実した設備を持つ霊園が揃っています。緑豊かな環境を活かした「樹木葬」や「ガーデニング墓地」が人気です。都心からのアクセスも良いため、都内在住の方が千葉県で自然豊かなお墓を選ぶケースも増加しています。宗教・宗派不問の霊園も多いエリアです。",
        "兵庫県": "兵庫県は、神戸市などの都市部エリアと、阪神間、播磨エリアで異なる特色があります。神戸や阪神間では斜面を活かした眺望の良い霊園や、利便性の高い「納骨堂」の需要が伸びています。海や山など自然環境に恵まれているため、自然志向の「樹木葬」や「海洋散骨」の候補地としても人気があります。",
        "北海道": "北海道は本州とはお墓の事情が大きく異なります。広大な土地を活かしたスケールの大きい公園墓地が多く、お墓参りの際には家族や親族でピクニックのように集まる文化もあります。冬場は雪深くなるため、雪に影響されない「納骨堂（屋内施設）」の需要も高く、最近では「樹木葬」や「合同墓（永代供養）」の選択肢も増えてきています。"
    };

    const defaultContent = `${prefecture}でも、近年はお墓の承継者不足を背景に「永代供養墓」や「樹木葬」を選ぶご家族が増えています。従来の一般墓に比べて初期費用が抑えられ、その後の管理費が不要なプランが多いため、子供に負担をかけたくないという想いから選ばれています。地域によって霊園の数や費用相場は異なりますので、ご自身のライフスタイルと希望に合った施設を見つけることが大切です。`;

    return (
        <section className="bg-white py-12 px-4 border-t border-gray-200 mt-12">
            <div className="max-w-4xl mx-auto">
                {/* SEO Text Content */}
                <div className="mb-12">
                    <h2 className="font-serif text-2xl font-bold text-primary-dark mb-6 flex items-center">
                        <Info className="w-6 h-6 mr-3 text-secondary" />
                        {prefecture}のお墓・供養事情
                    </h2>
                    <p className="text-gray-700 leading-loose">
                        {customContent[prefecture] || defaultContent}
                    </p>
                </div>

                {/* GEO: AI Summary Block */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-sm">
                    <h3 className="font-bold text-lg text-gray-800 mb-4 border-b border-gray-200 pb-2">
                        💡 このページのまとめ情報
                    </h3>
                    <ul className="text-gray-600 space-y-2 text-sm md:text-base leading-relaxed">
                        <li><span className="font-bold">対象地域:</span> {prefecture}</li>
                        <li><span className="font-bold">掲載データ:</span> {prefecture}内で探せる永代供養・樹木葬・納骨堂・一般墓の情報を掲載</li>
                        <li><span className="font-bold">費用目安:</span> 永代供養は数万円〜100万円程度、樹木葬は約30万円〜が相場（施設により大きく変動）</li>
                        <li><span className="font-bold">主な選択肢:</span> 後継ぎ不要の永代供養墓・樹木葬・納骨堂など多様なスタイル</li>
                        <li><span className="font-bold">検索・相談サポート:</span> 清蓮（Seiren）が中立な立場で無料相談・資料請求をサポート</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
