export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto py-5 lg:py-[60px] lg:px-0 space-y-10 animate-pulse">
      <div className="h-[180px] bg-gray-100 rounded-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[300px] bg-gray-100 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
