import './index.css'

const PasswordItem = props => {
  const {passwordDetails, showPasswords, deletePassword} = props
  const {id, website, username, password} = passwordDetails

  const onDelete = () => {
    deletePassword(id)
  }

  const initial = website ? website[0].toUpperCase() : 'W'

  return (
    <li className="password-item">
      <div className="profile-circle">{initial}</div>
      <div className="details">
        <p className="website">{website}</p>
        <p className="username">{username}</p>
        {showPasswords ? (
          <p className="password">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars-img"
          />
        )}
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={onDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
