import React from "react";
import ImageBlur from "../../../common/ImageBlur";
import { PostsCardProps } from "@/types/posts";


const PostsCard: React.FC<PostsCardProps> = ({
  date,
  imageUrl,
  text,
  heading,
}) => {
  const defaultImageUrl = "/images/default-post.png";
  return (
    <div className="posts-card border rounded shadow-md">
      {/* Header */}
      <div className="bg-[#004A15] p-2 text-white text-sm mb-4 flex items-center">
        <ImageBlur
          src="/icons/calendar.png"
          alt="calendar icon"
          width={46}
          height={46}
          className="mr-2"
        />
        {date}
      </div>

      {/* Body */}
      <div className="body flex flex-col space-y-1">
        {/* Image */}
        <div className="">
          <ImageBlur
            src={imageUrl || defaultImageUrl}
            alt="post image"
            className="w-full"
            width={800}
            height={800}
          />
        </div>

        {/* Text */}
        <div className="text text-gray-800 text-md px-1 pb-3">
          <h3 className="font-bold">{heading}</h3>
          <h3>{text}</h3>
        </div>
      </div>
    </div>
  );
};

export default PostsCard;
