import LoginButton from '@/components/LoginButton'

export default function Login() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-8">Sign In</h1>
            <LoginButton />
        </div>
    )
}
