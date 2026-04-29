import { NextResponse } from 'next/server';

const CONTROL_CHAR_PATTERN = /[\u0000-\u001F\u007F]/;

export const INVALID_PARAM_CODE = 'INVALID_PARAM';
export const INVALID_PARAM_MESSAGE = 'Invalid request parameter';

type ValidatedString =
    | { ok: true; value: string | undefined }
    | { ok: false; field: string };

export function invalidParamResponse(field: string, status = 400) {
    return NextResponse.json(
        {
            error: {
                code: INVALID_PARAM_CODE,
                message: INVALID_PARAM_MESSAGE,
                field,
            },
        },
        { status }
    );
}

export function validateOptionalString(
    input: unknown,
    field: string,
    maxLength = 100
): ValidatedString {
    if (input == null) return { ok: true, value: undefined };
    if (typeof input !== 'string') return { ok: false, field };

    const trimmed = input.trim();
    if (!trimmed) return { ok: true, value: undefined };
    if (trimmed.length > maxLength) return { ok: false, field };
    if (CONTROL_CHAR_PATTERN.test(trimmed)) return { ok: false, field };
    return { ok: true, value: trimmed };
}

export function validateQueryParam(
    searchParams: URLSearchParams,
    key: string,
    maxLength = 100
): ValidatedString {
    return validateOptionalString(searchParams.get(key), key, maxLength);
}

export function validateJsonObjectBody(body: unknown): { ok: true; value: Record<string, unknown> } | { ok: false; field: string } {
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return { ok: false, field: 'body' };
    }
    return { ok: true, value: body as Record<string, unknown> };
}
