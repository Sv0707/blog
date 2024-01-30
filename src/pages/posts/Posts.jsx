import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { getOneUser } from '../../api/users'
import { getAllPostsByUser } from '../../api/posts'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from '../../ui-kit/components/loader/Loader'
import Button from '../../ui-kit/components/buttons/Button'
import Post from '../../components/posts/Post'

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

  const navigate = useNavigate()

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1)
    } else {
      navigate('/', { replace: true })
    }
  }

  const renderContent = useMemo(() => {
    return posts?.map((post) => <Post key={post.id} postData={post} />)
  }, [posts])

  useEffect(() => {
    handleFetch()
  }, [handleFetch])

  return (
    <div className="container">
      <Button
        className="btn btn-light btn-md mb-4"
        label="Go back"
        onClick={handleGoBack}
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
  )
}

export default Posts
