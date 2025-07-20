import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    savedPasswords: [],
    searchInput: '',
    showPasswords: false,
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onToggleShowPasswords = () => {
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state

    if (websiteInput && usernameInput && passwordInput) {
      const newPassword = {
        id: uuidv4(),
        website: websiteInput,
        username: usernameInput,
        password: passwordInput,
      }

      this.setState(prevState => ({
        savedPasswords: [...prevState.savedPasswords, newPassword],
        websiteInput: '',
        usernameInput: '',
        passwordInput: '',
      }))
    }
  }

  deletePassword = id => {
    this.setState(prevState => ({
      savedPasswords: prevState.savedPasswords.filter(p => p.id !== id),
    }))
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      savedPasswords,
      searchInput,
      showPasswords,
    } = this.state

    const filteredPasswords = savedPasswords.filter(password =>
      password.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="app-container">
        <div className="password-manager-top-section">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="passwords-adding-container">
            <form className="form" onSubmit={this.onAddPassword}>
              <h1 className="form-heading">Add New Password</h1>

              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-icon"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input"
                  value={websiteInput}
                  onChange={this.onChangeWebsiteInput}
                />
              </div>

              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-icon"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  value={usernameInput}
                  onChange={this.onChangeUsernameInput}
                />
              </div>

              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-icon"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input"
                  value={passwordInput}
                  onChange={this.onChangePasswordInput}
                />
              </div>

              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-image"
            />
          </div>
        </div>
        <div className="passwords-container">
          <div className="passwords-header">
            <div className="passwords-count-container">
              <h1 className="passwords-heading">Your Passwords</h1>
              <p className="passwords-count">{filteredPasswords.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="showPasswords"
              onChange={this.onToggleShowPasswords}
            />
            <label htmlFor="showPasswords" className="show-passwords-label">
              Show Passwords
            </label>
          </div>

          {filteredPasswords.length === 0 ? (
            <div className="no-passwords-view">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords-img"
              />
              <p className="no-passwords-text">No Passwords</p>
            </div>
          ) : (
            <ul className="passwords-list">
              {filteredPasswords.map(password => (
                <PasswordItem
                  key={password.id}
                  passwordDetails={password}
                  showPasswords={showPasswords}
                  deletePassword={this.deletePassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
