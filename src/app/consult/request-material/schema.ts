import { z } from "zod";

// Helper regex
const phoneRegex = /^0\d{1,4}-?\d{1,4}-?\d{3,4}$/; // Allows hyphens or no hyphens, loose check but structural
const zipRegex = /^\d{3}-?\d{4}$/; // 123-4567 or 1234567

// --- Contact Info Schema (Step 1) ---
export const inquirySchema = z.object({
    // Name
    lastName: z.string().min(1, "姓を入力してください").max(25),
    firstName: z.string().min(1, "名を入力してください").max(25),
    lastNameKana: z.string().min(1, "せいを入力してください").regex(/^[ぁ-んー　・\s]+$/, "ひらがなで入力してください"),
    firstNameKana: z.string().min(1, "めいを入力してください").regex(/^[ぁ-んー　・\s]+$/, "ひらがなで入力してください"),

    // Contact
    email: z.string().email("メールアドレスの形式が正しくありません"),
    phone: z.string().min(1, "電話番号を入力してください"),
    phoneRaw: z.string().optional(),

    // Address
    zipCode: z.string().regex(/^\d{3}-?\d{4}$/, "郵便番号は7桁で入力してください"),
    prefecture: z.string().min(1, "都道府県を選択してください"),
    city: z.string().min(1, "市区町村を入力してください"),
    addressLine: z.string().min(1, "番地を入力してください"),
    building: z.string().optional(),

    // Legacy/Composite Fields (Computed but kept for compatibility validation if needed)
    // We typically don't validate them if we validate parts, but payload mapping handles it.

    // Questionnaire (Step 2)
    boneStatus: z.enum(['exist', 'none', 'unknown']),
    graveTypes: z.array(z.string()).optional(),
    nearbyCemeteryOptIn: z.boolean().optional(),
    visitDate: z.string().optional(),
    visitTime: z.string().optional(),

    // Terms
    agreedToTerms: z.boolean().refine(val => val === true, "利用規約とプライバシーポリシーへの同意が必要です"),

    // Context & Remarks
    templeId: z.string().optional(),
    templeName: z.string().optional(),
    planId: z.string().optional(),
    planName: z.string().optional(),
    ref: z.string().optional(),
    refUrl: z.string().optional(),
    message: z.string().optional(),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;
