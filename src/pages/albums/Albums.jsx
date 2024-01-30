import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { getOneUser } from '../../api/users'
import { getAllAlbumsByUser } from '../../api/albums'
import { useParams, useNavigate } from 'react-router-dom'
import { metatags } from '../../constants/metatags'
import Loader from '../../ui-kit/components/loader/Loader'
import Button from '../../ui-kit/components/buttons/Button'
import Album from '../../components/albums/Album'
import { Helmet } from 'react-helmet'

const Albums = () => {
  const [albums, setAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState({})

  const { id: userId } = useParams()

  const navigate = useNavigate()

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1)
    } else {
      navigate('/', { replace: true })
    }
  }

  const handleFetch = useCallback(async () => {
    setIsLoading(true)
    await Promise.all([getAllAlbumsByUser(userId), getOneUser(userId)])
      .then((res) => {
        setAlbums(res[0].data)
        setUserData(res[1].data)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const renderContent = useMemo(() => {
    return albums?.map((album) => (
      <Album albumId={album.id} key={album.id} title={album.title} />
    ))
  }, [albums])

  useEffect(() => {
    handleFetch()
  }, [handleFetch])

  return (
    <>
      <Helmet>
        <title>{`${userData?.name || ''}'s ${metatags.albums.title}`}</title>
        <meta content={`Albums of ${userData?.name || ''}. ${metatags.albums.description}`} name="description" />
        <link href={`https://sv0707-blog-app.netlify.app/albums/${userId}/`} rel="canonical" />
        <meta content="index, follow" name="robots" />
      </Helmet>
      <div className="container">
        <Button
          className="btn btn-light btn-md mb-4"
          label="Go back"
          onClick={handleGoBack}
          type="button"
        />
        <h1 className="mb-4">List of {userData?.name}`s albums</h1>
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

export default Albums
