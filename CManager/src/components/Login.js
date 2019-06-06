import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import logo from '../images/pegasus.png'
import lock from '../images/lock_gray.png'
import hoveredLock from '../images/lock_white.png'
import '../styles/main.css'

function Login(props) {
    return (
        <div className='wrapper'>
            <div className='container'>
                <header><img src={logo} alt='' /></header>
                <form>
                    <input name="username" type="text" placeholder="username" value={props.username} onChange={props.handleChange} />
                    <input name="password" type="password" placeholder="password" onChange={props.handleChange} />
                    <label className="right"><Link className='link' to="#">Forgot password?</Link></label>
                </form>

                <footer>
                    <Link className='fakeButton' role='button' to='/contacts'>
                        <img className='hoveredTinyLock' src={hoveredLock} alt='' />
                        <img className='tinyLock' src={lock} alt='' />
                        <div>UCF <span>SIGN IN</span></div>
                        <div className='plus'>
                            <div className='ver'></div>
                            <div className='hor'></div>
                        </div>
                    </Link>

                    <label>Don't have an account? <Link className='link' to='/signup'>Sign Up</Link></label>
                </footer>
            </div>
        </div>
    )
}

export default Login