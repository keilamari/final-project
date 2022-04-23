import './NavBar.scss'
import { useState } from 'react'
import axios from 'axios'

export default function NavBar(props) {

  const [login, setLogin] = useState(false)
  const [register, setRegister] = useState(false)
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const handleLoginClick = (e) => {
    e.preventDefault()
    if (register) {
      setRegister(false)
    }
    setLogin(value => !value)
    console.log("login", login)
  }

  const handleRegisterClick = (e) => {
    e.preventDefault()
    if (login) {
      setLogin(false)
    }
    setRegister(value => !value)
    console.log("register", register)
  }
  
  const handleLoginSubmit = (e) => {
    e.preventDefault()
    console.log("login")
    axios.put('/users/login', loginData)
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    console.log("submit")
    axios.put('/users/register', registerData)
  }

  return (
    <section>

      <nav>
        <div className='logo'>
          <a href="/" className='logo-name'>
            TeamUps
          </a>
        </div>
        <ul>

          <li>
            <a href="/register" className='navbar-link' onClick={handleRegisterClick}>
              Register
            </a>
          </li>

          <li>
            <a href="/login" className='navbar-link' onClick={handleLoginClick}>
              Login
            </a>
          </li>

          <li>
            <a href="/logout" className='navbar-link'>
              Logout
            </a>
          </li>

          <li>
            <a href="/my-profile" className='navbar-link'>
              My Profile
            </a>
          </li>
        </ul>
      </nav>
      {login ? 
      <div>
        <form className="form-inline">
          <label htmlFor='login-email'>Email: </label>
            <input type="email" id="login-email" name="login-email" onChange={(e) => setLoginData(prev => ({...prev, email: e.target.value}))}/>
          <label htmlFor='login-password'>Password: </label>
            <input type="password" id="login-password" name="login-password" onChange={(e) => setLoginData(prev => ({...prev, password: e.target.value}))}/>
            <button type="submit" onClick={handleLoginSubmit}>Login</button>
        </form>
      </div>
      : null}
      {register ?
      <div>
        <form className="form-inline">
          <label htmlFor="register-name">Name: </label>
            <input type="text" id="register-name" name="register-name" onChange={(e) => setRegisterData(prev => ({...prev, name: e.target.value}))}/>
          <label htmlFor="register-email">Email: </label>
            <input type="email" id='register-email' name='register-email' onChange={(e) => setRegisterData(prev => ({...prev, email: e.target.value}))}/>
          <label htmlFor="register-password">Password: </label>
            <input type="password" id="register-password" name="register-password" onChange={(e) => setRegisterData(prev => ({...prev, password: e.target.value}))}/>
            <button type="submit" onClick={handleRegisterSubmit}>Register</button>
        </form>
      </div>
      : null}
    </section>
  )
}