import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { addBookmark, deleteBookmark, signOut } from '../actions'

interface Bookmark {
    id: string
    title: string
    url: string
    created_at: string
}

export default async function Dashboard() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: bookmarks } = await supabase
        .from('bookmarks')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
            <header className="w-full max-w-4xl flex justify-between items-center mb-8 p-4 bg-white rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-800">My Bookmarks</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{user.email}</span>
                    <form action={signOut}>
                        <button className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100 transition-colors">Sign Out</button>
                    </form>
                </div>
            </header>

            <main className="w-full max-w-4xl space-y-8">
                {/* Add Bookmark Form */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Add New Bookmark</h2>
                    <form action={addBookmark} className="flex gap-4">
                        <input
                            name="url"
                            type="url"
                            placeholder="https://example.com"
                            className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                        <input
                            name="title"
                            type="text"
                            placeholder="Title (optional)"
                            className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <button className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition-colors">
                            Add
                        </button>
                    </form>
                </div>

                {/* Bookmarks List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookmarks?.map((bookmark: Bookmark) => (
                        <div key={bookmark.id} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group relative">
                            <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="block pr-8">
                                <h3 className="font-semibold text-gray-800 truncate mb-1 group-hover:text-blue-600 transition-colors">
                                    {bookmark.title || bookmark.url}
                                </h3>
                                <p className="text-xs text-gray-500 truncate">{bookmark.url}</p>
                            </a>
                            <form action={deleteBookmark} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <input type="hidden" name="id" value={bookmark.id} />
                                <button className="text-gray-400 hover:text-red-500 p-1" aria-label="Delete">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    ))}
                    {(!bookmarks || bookmarks.length === 0) && (
                        <div className="col-span-2 text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                            <p className="text-gray-500">No bookmarks yet. Add your first one above!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
