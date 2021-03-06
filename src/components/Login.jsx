import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

export default function Login({ currentUser, setCurrentUser, setShowForm }) {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [msg, setMessage] = useState('')

  const handleFormSubmit = async e => {
    e.preventDefault()
    try {
      // post to the backend with the form data to login
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, form)
      // decode the token that is sent to use
      const { token } = response.data
      const decoded = jwt_decode(token)
      // save the token in localstorage
      localStorage.setItem('jwt', token)
      // set the app state to the logged in user
      setCurrentUser(decoded)
      setShowForm(false)
    } catch (err) {
      // handle errors suchs as wrong credentials 
      if (err.response.status === 400) {
        console.log(err.response.data)
        setMessage(err.response.data.msg)
      }
      console.log(err)
    }
  }

  return (
    <div>
      <p>{msg ? `the server has a message for you: ${msg}` : ''}</p>

      <form className='center' onSubmit={handleFormSubmit}>
        <br />
        <h4 style={{ color: 'white' }} >Login Form:</h4>
        <div className="form-group">
          <label className='form-label mt-4' htmlFor="email">Email:</label>
          <input
            id="email"
            placeholder='user@domain.com'
            type="email"
            onChange={e => setForm({ ...form, email: e.target.value })}
            value={form.email}
            className="form-control center"
            style={{ width: '300px' }}
          />
        </div>

        <div class="form-group">
          <label className='form-label mt-4' htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="enter your password..."
            onChange={e => setForm({ ...form, password: e.target.value })}
            value={form.password}
            className="form-control center"
            style={{ width: '300px' }}
          />

        </div>

        <input className="btn  btn-game-choices m-3 mx-5 btn-md btn-primary container-mini" style={{ padding: '5px 10px' }} type="submit" />
      </form>
    </div>
  )
}