"use client";
import { useEffect, useState } from "react";
import BounceLoader from "react-spinners/DotLoader";

const Loading = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <BounceLoader color="#6d1fd8" loading={true} speedMultiplier={2} />
      </div>
    </>
  );
};

export default Loading;
