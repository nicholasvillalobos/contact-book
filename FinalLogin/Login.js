import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
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
                <Link to='/contacts'>
                    <button className='newButton'>Sign In</button>
                </Link>
            </div>
            <div style={{position: 'absolute', left: 0}} className="vertical1"></div>
            <div style={{position: 'absolute', right:0}} className='containerR'>
                <form>
                    <h3> Sign Up</h3>
                    <p>Name</p>
                    <input type="text" name="newusername" placeholder="Name"/>
                    <p>Email</p>
                    <input type="text" name="newemail" placeholder="Email"/>
                    <p>Password</p>
                    <input type="password" name="newpass" placeholder="Password"/>
                    <Link to='/contacts'>
                        <button className='newButton'>Sign Up</button>
                    </Link>
                </form>
            </div>
        </div>

    )
}

export default Login
