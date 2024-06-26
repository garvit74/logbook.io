import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";

import { getRecentPosts, getSimilarPosts } from "../services";

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);

  return (
    <div className="bg-gray-700 bg-opacity-10 shadow-xl rounded-lg p-8 mb-8">
        <h3 className="text-2xl text-center mb-8 font-semibold border-b pb-4">
            {slug ? 'Related Posts' : 'Recent Posts'}
        </h3>
        {relatedPosts.map((post) => (
            <div key={post.title} className="flex items-center w-full mb-4">
                <div className="w-16 flex-none">
                    <Image
                        unoptimized
                        alt={post.title}
                        height="45"
                        width="45"
                        className=" cursor-pointer align-middle rounded-2xl transition duration-1000 transform hover:-translate-y-3"
                        src={post.featuredImage.url}
                    /> 
                </div>
                <div className="flex-grow ml-4">
                    <p className="text-white text-xs">
                        {moment(post.createdAt).format('MMM DD, YYYY')}
                    </p>
                    <Link href={`/post/${post.slug}`} key={post.title} className="text-md">
                        {post.title}
                    </Link>
                </div>
            </div>
        ))}
    </div>
  )
};

export default PostWidget;
