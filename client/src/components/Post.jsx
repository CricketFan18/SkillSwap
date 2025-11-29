import React from 'react'

const Post = () => {
  return (
    <div className='flex flex-col gap- border-2 border-gray-300 rounded-lg p-4 w-full max-w-md shadow-md'>
      <div>Title</div>
      <div>Name</div>
      <div>Description</div>
      <div>Tags+Time</div>
      <div>Comments</div>
    </div>
  )
}

export default Post