import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import logo from '../images/pegasus.png'
import lock from '../images/lock_gray.png'
import hoveredLock from '../images/lock_white.png'
import '../styles/main.css'

function Login(props) {
    return (


        <div className='wrapper'>
            <div style={{position: 'absolute', left:0}} className='containerL'>
                <form>
                    <h1>Sign In</h1>
                    <p>Email</p>
                    <input name="username" type="text" placeholder="Username"
                           value={props.username} onChange={props.handleChange} />
                    <p>Password</p>
                    <input name="password" type="password" placeholder="Password"
                           onChange={props.handleChange} />
                </form>
                <button>Sign In</button>
            </div>
            <div class="vertical"></div>
            <div style={{position: 'absolute', right:0}} className='containerR'>
                <form>
                    <h3> Sign Up</h3>
                    <p>Name</p>
                    <input type="text" name="" placeholder="Name"/>
                    <p>Email</p>
                    <input type="text" name="" placeholder="Email"/>
                    <p>Password</p>
                    <input type="password" name="" placeholder="Password"/>
                    <button>Sign Up</button>
                </form>
            </div>
        </div>

    )
}

export default Login
