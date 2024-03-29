import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { getOneUser } from '../../api/users'
import { getAllPostsByUser } from '../../api/posts'
import { useParams } from 'react-router-dom'
import Loader from '../../ui-kit/components/loader/Loader'
import Button from '../../ui-kit/components/buttons/Button'
import Post from '../../components/posts/Post'
import { metatags } from '../../constants/metatags'
import { Helmet } from 'react-helmet'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState({})

  const { id: userId } = useParams()

  const handleFetch = useCallback(async () => {
    setIsLoading(true)
    await Promise.all([getAllPostsByUser(userId), getOneUser(userId)])
      .then((res) => {
        setPosts(res[0].data)
        setUserData(res[1].data)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const renderContent = useMemo(() => {
    return posts?.map((post) => <Post key={post.id} postData={post} />)
  }, [posts])

  useEffect(() => {
    handleFetch()
  }, [handleFetch])

  return (
    <>
      <Helmet>
        <title>{`${userData?.name || ''}'s ${metatags.posts.title}`}</title>
        <meta content={`Posts of ${userData?.name || ''}. ${metatags.posts.description}`} name="description" />
        <link href={`https://sv0707-blog-app.netlify.app/posts/${userId}/`} rel="canonical" />
        <meta content="index, follow" name="robots" />
      </Helmet>
      <div className="container">
        <Button
          className="btn btn-light btn-md mb-4"
          label="Back home"
          link="/"
          type="button"
        />
        <h1 className="mb-4">List of {userData?.name}`s posts</h1>
        <div className="col">
          {isLoading ? (
            <Loader />
          ) : (
            <ul className="list-group">{renderContent}</ul>
          )}
        </div>
      </div>
    </>
  )
}

export default Posts
