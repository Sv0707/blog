import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { getOneUser } from '../../api/users'
import { getAllPostsByUser } from '../../api/posts'
import { useParams } from 'react-router-dom'
import Loader from '../../ui-kit/components/loader/Loader'
import Post from '../../components/Post'

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
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="mb-4">List of {userData?.name}`s posts</h1>
          <div className="col">
            <ul className="list-group">{renderContent}</ul>
          </div>
        </>
      )}
    </div>
  )
}

export default Posts
