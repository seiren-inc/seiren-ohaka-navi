import fs from 'fs';
import path from 'path';
import { Inquiry } from './store'; // Using shared type

const DB_PATH = path.join(process.cwd(), 'data', 'inquiries.json');
const DATA_DIR = path.join(process.cwd(), 'data');

// Vercel 環境チェック
const isVercel = process.env.VERCEL === '1';

// Ensure DB exists (Vercel では読み取り専用のため、エラーを無視)
const ensureDB = () => {
    try {
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }
        if (!fs.existsSync(DB_PATH)) {
            fs.writeFileSync(DB_PATH, JSON.stringify([]), 'utf-8');
        }
    } catch (e) {
        if (isVercel) {
            console.log('[INQUIRY_DB] Vercel 環境: ファイルシステムは読み取り専用です');
        } else {
            console.error('[INQUIRY_DB] DB初期化エラー:', e);
        }
    }
};

export const InquiryDB = {
    getAll: (): Inquiry[] => {
        ensureDB();
        try {
            const data = fs.readFileSync(DB_PATH, 'utf-8');
            return JSON.parse(data);
        } catch (e) {
            if (isVercel) {
                console.log('[INQUIRY_DB] Vercel 環境: データファイルが存在しません（空配列を返します）');
            } else {
                console.error('[INQUIRY_DB] 読み込みエラー:', e);
            }
            return [];
        }
    },

    getById: (id: string): Inquiry | undefined => {
        const all = InquiryDB.getAll();
        return all.find(i => i.id === id);
    },

    save: (inquiry: Inquiry): Inquiry => {
        const all = InquiryDB.getAll();
        // Check if update or new
        const idx = all.findIndex(i => i.id === inquiry.id);
        if (idx >= 0) {
            all[idx] = inquiry;
        } else {
            all.unshift(inquiry); // Newest first
        }

        try {
            fs.writeFileSync(DB_PATH, JSON.stringify(all, null, 2), 'utf-8');
            console.log(`[INQUIRY_DB] 保存成功: ${inquiry.id}`);
        } catch (e) {
            if (isVercel) {
                console.log('[INQUIRY_DB] Vercel 環境: ファイル書き込みスキップ（ログのみ出力）');
                console.log('[INQUIRY_SAVED_TO_LOG]', JSON.stringify(inquiry, null, 2));
            } else {
                console.error('[INQUIRY_DB] 書き込みエラー:', e);
            }
        }
        return inquiry;
    }
};

