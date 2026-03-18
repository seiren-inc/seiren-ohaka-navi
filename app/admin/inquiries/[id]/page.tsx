export const dynamic = 'force-dynamic';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../../../lib/prisma";
import { CheckCircle2, ChevronLeft, MapPin, Phone, Mail, Calendar, User, FileText, Globe, Building } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryActions } from "./InquiryActions";

const BONE_STATUS_LABELS: Record<string, string> = {
    exist: 'あり',
    none: 'なし',
    unknown: '未定・その他'
};

export default async function InquiryDetail(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;

    // Debug Logging
    console.log("[AdminDetail] Requested ID:", params.id);

    const decodedId = decodeURIComponent(params.id);
    const inquiryData = await prisma.inquiry.findUnique({
        where: { id: decodedId },
    });

    if (!inquiryData) {
        return notFound();
    }

    const inquiry = inquiryData as any;
    const raw = inquiry.rawPayload as any;

    const isBusiness = inquiry.inquiryDetail?.inquiryKind === 'business';

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
                <Link href="/admin/inquiries" className="text-gray-500 hover:text-gray-800 flex items-center gap-1">
                    <ChevronLeft className="w-4 h-4" /> 一覧へ戻る
                </Link>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-400">ID: {inquiry.id}</span>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <div className="text-xs font-bold text-gray-400 mb-1">受信日時</div>
                        <div className="text-xl font-bold text-gray-800">{new Date(inquiry.createdAt).toLocaleString('ja-JP')}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        {isBusiness && (
                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 border border-purple-200">
                                <Building className="w-3 h-3" /> 事業者
                            </span>
                        )}
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            inquiry.status === 'new' ? 'bg-red-100 text-red-600' :
                            inquiry.status === 'inProgress' ? 'bg-yellow-100 text-yellow-700' :
                            inquiry.status === 'done' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-600'
                        }`}>
                            {inquiry.status === 'new' ? '新着' : inquiry.status === 'inProgress' ? '対応中' : inquiry.status === 'done' ? '完了' : inquiry.status}
                        </span>
                    </div>
                </div>

                <div className="p-8">
                    {/* Context Context */}
                    {!isBusiness && (
                        <div className="mb-10 bg-blue-50 border border-blue-100 rounded-lg p-6">
                            <h3 className="text-sm font-bold text-blue-800 mb-4 flex items-center gap-2">
                                <FileText className="w-4 h-4" /> お問い合わせ対象
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">希望墓地</div>
                                    <div className="text-lg font-bold text-gray-800">
                                        {inquiry.inquiryDetail?.templeNameSnapshot || raw?.context?.templeName || raw?.desiredTempleName || '未指定'}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">ID: {inquiry.inquiryDetail?.templeId || raw?.context?.templeId || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">希望プラン</div>
                                    <div className="flex items-center gap-2">
                                        {inquiry.inquiryDetail?.planName || raw?.context?.planName || raw?.desiredPlanName ? (
                                            <div className="text-lg font-bold text-primary bg-white px-3 py-1 rounded border border-blue-100 inline-block">
                                                {inquiry.inquiryDetail?.planName || raw?.context?.planName || raw?.desiredPlanName}
                                            </div>
                                        ) : (
                                            <div className="text-gray-400">未指定</div>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">ID: {inquiry.inquiryDetail?.planId || raw?.context?.planId || '-'}</div>
                                </div>
                                <div className="col-span-2 pt-2 border-t border-blue-100/50 mt-2">
                                    <div className="text-xs text-gray-500 mb-1">流入元参照 (Ref)</div>
                                    <div className="text-sm text-gray-600">{raw?.context?.sourceLabel || raw?.ref || '-'}</div>
                                    {raw?.context?.refUrl && (
                                        <a href={raw.context.refUrl} target="_blank" className="text-xs text-blue-500 underline mt-1 block">
                                            {raw.context.refUrl}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Business Info Section */}
                    {isBusiness && (
                        <div className="mb-10 bg-purple-50 border border-purple-100 rounded-lg p-6">
                            <h3 className="text-sm font-bold text-purple-800 mb-4 flex items-center gap-2">
                                <Building className="w-4 h-4" /> 事業者情報
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">会社名・寺院名</div>
                                    <div className="text-xl font-bold text-gray-900">{inquiry.organizationName}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">お問い合わせ種別</div>
                                    <div className="text-lg font-bold text-gray-900">{inquiry.inquiryType}</div>
                                </div>
                                <div className="col-span-2">
                                    <div className="text-xs text-gray-500 mb-1">ウェブサイト</div>
                                    {inquiry.websiteUrl ? (
                                        <a href={inquiry.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline font-medium">
                                            <Globe className="w-4 h-4 mr-1" />
                                            {inquiry.websiteUrl}
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </div>
                                <div className="col-span-2">
                                    <div className="text-xs text-gray-500 mb-1">取扱エリア</div>
                                    <div className="text-gray-700 font-medium">{inquiry.areas || '-'}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-10">
                        {/* User Info */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
                                <User className="w-5 h-5 text-gray-400" /> {isBusiness ? '担当者情報' : '顧客情報'}
                            </h3>
                            <dl className="space-y-6">
                                <div>
                                    <dt className="text-xs font-bold text-gray-400 mb-1">お名前</dt>
                                    <dd className="font-bold text-lg">
                                        {inquiry.lastName ? `${inquiry.lastName} ${inquiry.firstName || ''}` : (raw?.user?.lastName ? `${raw.user.lastName} ${raw.user.firstName}` : (raw?.user?.name || raw?.contactName || raw?.name || '（不明）'))}
                                    </dd>
                                    <dd className="text-sm text-gray-500">
                                        {raw?.user?.lastNameKana ? `${raw.user.lastNameKana} ${raw.user.firstNameKana}` : (raw?.user?.kana || raw?.furigana || '-')}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-bold text-gray-400 mb-1">連絡先</dt>
                                    <dd className="flex items-center gap-2 mb-1">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span className="font-bold font-mono">{inquiry.phone || raw?.user?.phone || raw?.phone || '-'}</span>
                                    </dd>
                                    <dd className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span className="font-mono">{inquiry.email || raw?.user?.email || raw?.email || '-'}</span>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-bold text-gray-400 mb-1">ご住所</dt>
                                    <dd className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                                        <div>
                                            <div className="font-mono text-sm mb-1">〒{raw?.user?.zipCode || raw?.zipCode || '-'}</div>
                                            {inquiry.prefecture ? (
                                                <div>
                                                    {inquiry.prefecture} {inquiry.city} {inquiry.addressDetail}
                                                </div>
                                            ) : (
                                                <div>{raw?.user?.address || raw?.address || '-'}</div>
                                            )}
                                        </div>
                                    </dd>
                                </div>
                                {isBusiness && (
                                    <div>
                                        <dt className="text-xs font-bold text-gray-400 mb-1">希望連絡方法・時間帯</dt>
                                        <dd className="text-sm text-gray-700">
                                            <div>方法: {(inquiry as any).preferredContact === 'email' ? 'メール' : '電話'}</div>
                                            <div>時間: {(inquiry as any).preferredTime || '-'}</div>
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>

                        {/* Inquiry Content */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-gray-400" /> {isBusiness ? 'ご相談内容' : 'アンケート・内容'}
                            </h3>
                            <dl className="space-y-6">
                                {!isBusiness && (
                                    <>
                                        <div>
                                            <dt className="text-xs font-bold text-gray-400 mb-1">ご遺骨の有無</dt>
                                            <dd className="font-bold text-lg">
                                                {inquiry.boneStatus ? BONE_STATUS_LABELS[inquiry.boneStatus] : '-'}
                                            </dd>
                                        </div>

                                        {/* Grave Closure Info */}
                                        {inquiry.inquiryDetail?.category === 'grave_closure' && (
                                            <div className="bg-amber-50 border border-amber-100 rounded p-4 mb-4">
                                                <h4 className="font-bold text-amber-800 border-b border-amber-200 pb-2 mb-3 flex items-center">
                                                    <Building className="w-4 h-4 mr-2" />
                                                    現在のお墓（墓じまい対象）
                                                </h4>
                                                <dl className="grid grid-cols-1 gap-y-3">
                                                    <div>
                                                        <dt className="text-xs font-bold text-amber-600/70 mb-1">寺院・霊園名</dt>
                                                        <dd className="font-bold text-gray-800 text-lg">
                                                            {raw?.graveTempleName || '未指定'}
                                                        </dd>
                                                        {raw?.graveTempleId && (
                                                            <div className="text-xs text-amber-500 font-mono mt-0.5">ID: {raw.graveTempleId}</div>
                                                        )}
                                                    </div>
                                                    {(raw?.graveTempleAddress || raw?.graveTemplePref) && (
                                                        <div>
                                                            <dt className="text-xs font-bold text-amber-600/70 mb-1">所在地</dt>
                                                            <dd className="text-sm text-gray-700">
                                                                {raw?.graveTempleAddress || `${raw?.graveTemplePref || ''} ${raw?.graveTempleCity || ''}`}
                                                            </dd>
                                                        </div>
                                                    )}
                                                </dl>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Generic Additional Fields */}
                                {raw?.additionalFields && Object.keys(raw.additionalFields).length > 0 && (
                                    <div className="pt-2">
                                        <h4 className="text-sm font-bold text-gray-800 border-b pb-1 mb-4 flex items-center gap-2">
                                            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">詳細情報</span>
                                        </h4>
                                        <dl className="grid grid-cols-1 gap-y-4">
                                            {Object.entries(raw.additionalFields).map(([key, value]) => (
                                                <div key={key}>
                                                    <dt className="text-xs font-bold text-gray-400 mb-1 capitalize">{key}</dt>
                                                    <dd className="font-medium bg-gray-50 px-3 py-2 rounded text-sm break-all">
                                                        {Array.isArray(value) ? value.join(', ') : (typeof value === 'object' ? JSON.stringify(value) : String(value))}
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </div>
                                )}

                                {!isBusiness && (
                                    <>
                                        <div>
                                            <dt className="text-xs font-bold text-gray-400 mb-1">検討中のお墓の種類</dt>
                                            <dd>
                                                {raw?.graveTypes && raw.graveTypes.length > 0 ? (
                                                    <div className="flex flex-wrap gap-2">
                                                        {raw.graveTypes.map((t: string) => (
                                                            <span key={t} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">{t}</span>
                                                        ))}
                                                    </div>
                                                ) : '-'}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs font-bold text-gray-400 mb-1">周辺のおすすめ霊園資料</dt>
                                            <dd className="font-bold">
                                                {raw?.nearbyCemeteryOptIn ? <span className="text-green-600">希望する</span> : '希望しない'}
                                            </dd>
                                        </div>
                                    </>
                                )}

                                <div>
                                    <dt className="text-xs font-bold text-gray-400 mb-1">{isBusiness ? '詳細メッセージ' : '備考'}</dt>
                                    <dd className="bg-gray-50 p-4 rounded-lg text-sm leading-relaxed whitespace-pre-wrap text-gray-700 min-h-[100px]">
                                        {inquiry.inquiryDetail?.message || inquiry.memo || '（なし）'}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            {/* ステータス変更・管理者メモ */}
            <InquiryActions
                inquiryId={inquiry.id}
                initialStatus={inquiry.status}
                initialAdminNotes={inquiry.adminNotes}
                contactEmail={inquiry.email || null}
                contactName={inquiry.lastName ? `${inquiry.lastName} ${inquiry.firstName || ''}`.trim() : null}
                templeNameSnapshot={inquiry.inquiryDetail?.templeNameSnapshot || null}
            />
        </div>
    );
}
