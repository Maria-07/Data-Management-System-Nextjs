// Shimmer.js

const TableShimmer = () => {
  return (
    <div className="shimmer shimmer-placeholder flex flex-wrap">
      {/*  shimmer columns */}
      {Array.from({ length: 84 }, (_, index) => (
        <div key={index} className="w-1/8 md:w-[14%] px-2 py-3">
          <div className="w-full h-2 bg-gray-300 animate-pulse rounded-lg"></div>
          <div className="w-full h-2 mt-2 bg-gray-300 animate-pulse rounded-lg"></div>
        </div>
      ))}
    </div>
  );
};

export default TableShimmer;
