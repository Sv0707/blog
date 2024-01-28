import React from 'react'
import PT from 'prop-types'

const User = ({ userData }) => {
  return (
    <li className="candidate-list-box card mt-4">
      <div className="p-4 card-body">
        <div className="align-items-center row justify-content-between">
          <div className="col-lg-6">
            <div className="candidate-list-content mt-3 mt-lg-0">
              <h2 className="mb-0">{userData.name}</h2>
              <p className="text-muted mb-2">@{userData.username}</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-center justify-content-end gap-4">
              <a
                className="btn btn-secondary btn-lg"
                href={`albums/${userData.id}`}
                role="button"
                tabIndex="-1"
              >
                Albums
              </a>
              <a
                className="btn btn-secondary btn-lg"
                href={`posts/${userData.id}`}
                role="button"
                tabIndex="-1"
              >
                Posts
              </a>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

User.propTypes = {
  userData: PT.shape({
    name: PT.string,
    id: PT.number,
    username: PT.string,
  }),
}

export default User
