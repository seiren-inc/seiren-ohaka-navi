import { createClient } from './server'

export async function uploadImage(file: File, path: string) {
    const supabase = await createClient()

    const { data, error } = await supabase.storage
        .from('media')
        .upload(path, file, {
            cacheControl: '3600',
            upsert: true
        })

    if (error) throw error
    return data
}

export async function getPublicUrl(path: string) {
    const supabase = await createClient()
    const { data } = supabase.storage.from('media').getPublicUrl(path)
    return data.publicUrl
}
