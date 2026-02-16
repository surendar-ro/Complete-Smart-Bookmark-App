import Link from 'next/link'

export default function Setup() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
            <h1 className="text-3xl font-bold mb-4 text-red-600">Configuration Required</h1>
            <p className="mb-6 max-w-md text-gray-700">
                The application is missing Supabase credentials.
                Please update your <code>.env.local</code> file.
            </p>

            <div className="bg-gray-100 p-4 rounded-lg text-left mb-6 overflow-x-auto max-w-full">
                <pre className="text-sm">
                    NEXT_PUBLIC_SUPABASE_URL=your-project-url<br />
                    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
                </pre>
            </div>

            <p className="text-sm text-gray-500 mb-8">
                Restart the server after saving the file.
            </p>

            <Link
                href="/"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
                I have updated the file, try again
            </Link>
        </div>
    )
}
