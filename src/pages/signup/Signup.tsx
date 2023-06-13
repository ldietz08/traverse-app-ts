import React, { FormEvent, ChangeEvent, FC, useState } from 'react'
import { auth, googleProvider } from '../../components/config/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import './Signup.scss'

const Signup: FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const signUp = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/hikes')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className='signup__container'>
      <form className='signup__form' onSubmit={signUp}>
        <h2 className='signup__title'>Sign up</h2>
        <label className='signup__form-label' htmlFor='email'>
          Email
        </label>
        <input
          className='signup__form-body'
          type='email'
          id='email'
          name='email'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        ></input>
        <label className='signup__form-label' htmlFor='password'>
          Password
        </label>
        <input
          className='signup__form-body'
          type='password'
          id='password'
          name='password'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        ></input>
        <button type='submit' className='login__form-btn'>
          SIGN UP
        </button>
        <div>
          <span className='signup__form-text'>Already have an account?</span>
          <Link to='/Login' className='signup__form-link'>
            LOGIN
          </Link>
        </div>
      </form>
    </section>
  )
}

export default Signup
