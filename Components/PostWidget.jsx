import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Link from 'next/link';

import { getRecPost, getSimilarPost} from '../services';

const PostWidget = ({ categories, slugs}) => {
  const [relatedPosts, setrelatedPosts] = useState([]);

  useEffect(() => {
    if(slugs){
      getSimilarPost(categories, slugs)
        .then((result) => setrelatedPosts(result))
    }  else {
      getRecPost()
        .then((result) => setrelatedPosts(result))
    }
  },[slugs]);
  console.log(relatedPosts)

  return (
    <div className=' bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className=' text-xl mb-8 font-semibold border-b pb-4'>
        {slugs ? "Related Post" : "Recent Posts"}
      </h3>
      {relatedPosts.map((posts) => (
        <div key={posts.title} className='flex items-center w-full mb-4'>
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
            <Link href={`/post/${posts.slugs}`} key={posts.title} className='text-sm'>
              {posts.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget