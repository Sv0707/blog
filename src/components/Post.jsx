import React from 'react'
import PT from 'prop-types'
import { capitalizeFirstWord } from '../utils/text-modifiers'

const Post = ({ postData }) => {
  return (
    <li className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">{capitalizeFirstWord(postData.title)}</h2>
        <p className="card-text">{postData.body}</p>
      </div>
    </li>
  )
}

Post.propTypes = {
  postData: PT.shape({
    title: PT.string,
    body: PT.string,
  }),
}

export default Post
