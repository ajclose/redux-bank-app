import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class BaseLayout extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">BankShot</Link>
              <ul className="nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
              </ul>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
