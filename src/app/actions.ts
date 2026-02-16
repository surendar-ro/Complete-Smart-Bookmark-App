'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addBookmark(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const url = formData.get('url') as string
    let title = formData.get('title') as string

    if (!url) return

    // "Smart" Feature: specific fetch of the title if not provided
    if (!title) {
        try {
            const response = await fetch(url, { next: { revalidate: 3600 } })
            const html = await response.text()
            const titleMatch = html.match(/<title>(.*?)<\/title>/i)
            if (titleMatch && titleMatch[1]) {
                title = titleMatch[1].trim()
            } else {
                title = url
            }
        } catch (e) {
            console.error('Failed to fetch title:', e)
            title = url
        }
    }

    const { error } = await supabase.from('bookmarks').insert({
        user_id: user.id,
        url,
        title,
    })

    if (error) {
        console.error('Error adding bookmark:', error)
    }

    revalidatePath('/dashboard')
}

export async function deleteBookmark(formData: FormData) {
    const id = formData.get('id') as string
    const supabase = await createClient()

    await supabase.from('bookmarks').delete().match({ id })
    revalidatePath('/dashboard')
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}
