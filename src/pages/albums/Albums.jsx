import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { getOneUser } from '../../api/users'
import { getAllAlbumsByUser } from '../../api/albums'
import { useParams } from 'react-router-dom'
import Loader from '../../ui-kit/components/loader/Loader'
import Album from '../../components/Album'

const Albums = () => {
  const [albums, setAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState({})

  const { id: userId } = useParams()

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
    return albums?.map((album) => <Album albumId={album.id} key={album.id} title={album.title} />)
  }, [albums])

  useEffect(() => {
    handleFetch()
  }, [handleFetch])

  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="mb-4">List of {userData?.name}`s albums</h1>
          <div className="col">
            <ul className="list-group">{renderContent}</ul>
          </div>
        </>
      )}
    </div>
  )
}

export default Albums
