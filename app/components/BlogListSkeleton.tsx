export default function BlogListSkeleton() {
    return (
        <div
            className="mt-6 space-y-4 animate-pulse"
            role="status"
            aria-label="Loading blogs"
        >
            <span className="sr-only">Loading blogs...</span>

            {[1, 2, 3, 4, 5].map((item) => (
                <div
                    key={item}
                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 shrink-0 rounded-lg bg-gray-200" />

                        <div className="min-w-0 flex-1 space-y-3">
                            <div className="h-4 w-3/4 rounded bg-gray-200" />

                            <div className="h-3 w-1/2 rounded bg-gray-100" />

                            <div className="space-y-2 pt-1">
                                <div className="h-3 w-full rounded bg-gray-100" />
                                <div className="h-3 w-4/5 rounded bg-gray-100" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}