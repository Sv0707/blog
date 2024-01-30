import React from 'react'
import PT from 'prop-types'

const Button = ({ link, className, onClick, label, role }) => {
  const Element = link ? 'a' : 'button'

  return (
    <Element
      className={className}
      href={link}
      onClick={onClick}
      role={role}
    >
      {label}
    </Element>
  )
}

Button.propTypes = {
  link: PT.string,
  className: PT.string,
  onClick: PT.func,
  label: PT.string,
  role: PT.string,
}

Button.defaultProps = {
  link:'',
  className: '',
  onClick: () => {},
  label: 'button',
  role: 'button',
}

export default Button
