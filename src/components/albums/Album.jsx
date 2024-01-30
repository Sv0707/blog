import React, { useState, useCallback, useMemo, useEffect } from 'react'
import PT from 'prop-types'
import { getPhotosByAlbumId } from '../../api/photos'
import { capitalizeFirstWord } from '../../utils/text-modifiers'

const Album = ({ albumId, title }) => {
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleFetch = useCallback(async () => {
    setIsLoading(true)
    getPhotosByAlbumId(albumId)
      .then((res) => {
        setPhotos(res.data)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const renderPhotos = useMemo(() => {
    return photos?.map((photo, idx) => {
      if (idx <= 7)
        return (
          <img
            alt={photo.title}
            height="100px"
            key={photo.title}
            src={photo.url}
            title={photo.title}
            width="100px"
          />
        )
      else return null
    })
  }, [photos])

  useEffect(() => {
    handleFetch()
  }, [handleFetch])

  return (
    <li className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">{capitalizeFirstWord(title)}</h2>
        {isLoading ? (
          ''
        ) : (
          <div className="d-flex flex-row align-items-center gap-4">
            {renderPhotos} and {photos.length - 8} photos
          </div>
        )}
      </div>
    </li>
  )
}

Album.propTypes = {
  title: PT.string,
  albumId: PT.number,
}

export default Album
