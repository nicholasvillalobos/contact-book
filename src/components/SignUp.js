import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import logo from '../images/pegasus.png'
import lock from '../images/lock_gray.png'
import '../styles/main.css'

function SignUp(props) {
    return (
        <div className='wrapper'>
            <div className='container'>
                <header><img src={logo} alt=''/></header>
                <form>
                    <input name="firstName" type="text" placeholder="first name" value={props.firstName} onChange={props.handleChange} />
                    <input name="lastName" type="text" placeholder="last name" value={props.lastName} onChange={props.handleChange}  />
                    <input name="username" type="text" placeholder="username" value={props.username} onChange={props.handleChange}  />
                    <input name="password1" type="password" placeholder="password" value={props.password1} onChange={props.handleChange}  />
                    <input name="password2" type="password" placeholder="re-enter password" value={props.password2} onChange={props.handleChange}  />
                </form>

                <footer>
                    <Link className='fakeButton lessSpace' role='button' to='/contacts'>
                        <div>UCF <span>SIGN UP</span></div>
                        <div className='plus'>
                            <div className='ver'></div>
                            <div className='hor'></div>
                        </div>
                    </Link>
                    <label>Already have an account? <Link className='link' to='/'>Log In</Link></label>
                </footer>
            </div>
        </div>
    )
}

export default SignUp