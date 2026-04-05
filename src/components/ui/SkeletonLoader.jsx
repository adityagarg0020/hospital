export default function SkeletonLoader({ type = 'card', count = 1 }) {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="rounded-2xl p-6 bg-white/40 dark:bg-white/[0.04] border border-white/10">
            <div className="shimmer h-4 w-1/3 rounded-lg mb-4" />
            <div className="shimmer h-8 w-2/3 rounded-lg mb-3" />
            <div className="shimmer h-3 w-full rounded-lg mb-2" />
            <div className="shimmer h-3 w-4/5 rounded-lg" />
          </div>
        );
      case 'list':
        return (
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/40 dark:bg-white/[0.04]">
            <div className="shimmer h-12 w-12 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <div className="shimmer h-4 w-1/2 rounded-lg mb-2" />
              <div className="shimmer h-3 w-1/3 rounded-lg" />
            </div>
          </div>
        );
      case 'stat':
        return (
          <div className="rounded-2xl p-5 bg-white/40 dark:bg-white/[0.04] border border-white/10">
            <div className="shimmer h-3 w-1/2 rounded-lg mb-3" />
            <div className="shimmer h-8 w-1/3 rounded-lg mb-2" />
            <div className="shimmer h-2 w-2/3 rounded-lg" />
          </div>
        );
      default:
        return <div className="shimmer h-20 rounded-2xl" />;
    }
  };

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </div>
  );
}
