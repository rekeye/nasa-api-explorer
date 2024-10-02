import React, { useEffect, useRef } from "react";
import { useAssets } from "../../context/assets";
import AssetElement from "../AssetElement";

const AssetsGrid: React.FC = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAssets();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-12">
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.collection.items.map((item, i) => (
            <AssetElement key={i} asset={item} />
          ))}
        </React.Fragment>
      ))}

      <p
        className="flex items-center justify-center col-span-full p-2 text-sm md:static"
        ref={loadMoreRef}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
            ? "Scroll to load more"
            : "No more results"}
      </p>
    </ul>
  );
};

export default AssetsGrid;
