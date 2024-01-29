import React from 'react'
import PT from 'prop-types'

const User = ({ userData }) => {
  return (
    <tr>
      <th scope="row"><div className="px-2">{userData.id}</div></th>
      <td>{userData.name}</td>
      <td>@{userData.username}</td>
      <td>{userData.email}</td>
      <td>{userData.company.name}</td>
      <td>
        <div className="d-flex flex-wrap align-items-center gap-3">
          <a
            className="btn btn-secondary btn-md"
            href={`albums/${userData.id}`}
            role="button"
            tabIndex="-1"
          >
            Albums
          </a>
          <a
            className="btn btn-secondary btn-md"
            href={`posts/${userData.id}`}
            role="button"
            tabIndex="-1"
          >
            Posts
          </a>
        </div>
      </td>
    </tr>
  )
}

User.propTypes = {
  userData: PT.shape({
    name: PT.string,
    id: PT.number,
    username: PT.string,
    email: PT.string,
    phone: PT.string,
    company: PT.shape({
      name: PT.string,
    }),
  }),
}

export default User
