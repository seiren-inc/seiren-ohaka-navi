import { createClient } from '@supabase/supabase-js';
import { ImageIcon, Trash2, Copy } from 'lucide-react';
import { ImageManagerClient } from './ImageManagerClient';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

async function listBucket(bucket: string, prefix: string) {
    const { data } = await supabaseAdmin.storage.from(bucket).list(prefix, { limit: 100 });
    return (data || []).filter(f => f.name !== '.emptyFolderPlaceholder');
}

export default async function ImageManagePage() {
    const [mainFiles, galleryFiles] = await Promise.all([
        listBucket('temples', 'main'),
        listBucket('temples', 'gallery'),
    ]);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const bucketBase = `${supabaseUrl}/storage/v1/object/public/temples/`;

    const toUrl = (prefix: string, name: string) => `${bucketBase}${prefix}/${name}`;

    const mainItems = mainFiles.map(f => ({ name: f.name, url: toUrl('main', f.name), size: f.metadata?.size || 0, path: `main/${f.name}`, bucket: 'temples' }));
    const galleryItems = galleryFiles.map(f => ({ name: f.name, url: toUrl('gallery', f.name), size: f.metadata?.size || 0, path: `gallery/${f.name}`, bucket: 'temples' }));

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <ImageIcon className="w-6 h-6" /> 画像管理
                </h2>
                <span className="text-sm text-gray-400">メイン {mainItems.length}枚 / ギャラリー {galleryItems.length}枚</span>
            </div>

            <ImageManagerClient
                mainItems={mainItems}
                galleryItems={galleryItems}
            />
        </div>
    );
}
