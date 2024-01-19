const CardShimmer = () => {
  return (
    <div className=" flex flex-wrap">
      {/*  shimmer columns */}
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="mx-auto w-[100%]  py-3">
          <div className="w-full h-20 bg-gray-300 animate-pulse rounded-lg"></div>
          {/* <div className="w-full h-2 mt-2 bg-gray-300 animate-pulse rounded-lg"></div> */}
        </div>
      ))}
    </div>
  );
};

export default CardShimmer;
