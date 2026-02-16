'use client'

import { createClient } from '@/utils/supabase/client'

export default function LoginButton() {
    const handleLogin = async () => {
        const supabase = createClient()
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        })
    }

    return (
        <button
            onClick={handleLogin}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        >
            Sign In with Google
        </button>
    )
}
