import React from 'react'
import PT from 'prop-types'
import Button from '../../ui-kit/components/buttons/Button'

const User = ({ userData }) => {
  return (
    <tr>
      <th scope="row">
        <div className="px-2">{userData.id}</div>
      </th>
      <td>{userData.name}</td>
      <td>@{userData.username}</td>
      <td>{userData.email}</td>
      <td>{userData.company.name}</td>
      <td>
        <div className="d-flex flex-wrap align-items-center gap-3">
          <Button
            className="btn btn-secondary btn-md"
            label="Albums"
            link={`albums/${userData.id}`}
            role="button"
          />
          <Button
            className="btn btn-secondary btn-md"
            label="Posts"
            link={`posts/${userData.id}`}
            role="button"
          />
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
