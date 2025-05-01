"use client";
import React from "react";
import ImageBlur from "../common/ImageBlur";

const SearchComp = () => {
  return (
    <div className="search-comp flex items-center">
      <div>
        <ImageBlur
          src="/icons/upper.png"
          alt="featured products"
          width={380}
          height={380}
          className="mr-2"
        />
      </div>
      <div>
        <button className="hover:bg-[#E8F2E8] hover:roounded-md flex justif-center p-2">
          <ImageBlur
            src="/icons/cart.png"
            alt="featured products"
            width={30}
            height={30}
            className="mr-2"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchComp;
