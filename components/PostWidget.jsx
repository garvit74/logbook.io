/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Link from 'next/link';

import { getRecentPosts, getSimilarPosts} from '../services';

const PostWidget = ({ categories, slug}) => {
  const [relatedPosts, setrelatedPosts] = useState([]);

  useEffect(() => {
    if(slug){
      getSimilarPosts(categories, slug)
        .then((result) => setrelatedPosts(result))
    }  else {
      getRecentPosts()
        .then((result) => setrelatedPosts(result))
    }
  },[categories, slug]);


  return (
    <div className=' bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className=' text-xl mb-8 font-semibold border-b pb-4 text-black'>
        {slug ? "Related Post" : "Recent Posts"}
      </h3>
      {relatedPosts.map((posts) => (
        <div key={posts.title} className='flex items-center w-full mb-4 text-black'>
          <div className='w-16 flex'>
            <img 
              alt={posts.title}
              height='75px'
              width='60px'
              className='rounded-full align-middle shadow-lg transition duration-700 transform hover:translate-x-2 cursor-pointer'
              src={posts.featuredImage.url} />
          </div>
          <div className='flex-grow ml-4'>
            <p className=' text-gray-500 text-xs'>
              {moment(posts.createdAt).format('MMM DD, YY')}
            </p>
            <Link href={`/post/${posts.slug}`} key={posts.title} className='text-sm'>
              {posts.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget