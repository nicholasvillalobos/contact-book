import React from 'react'
// import {Link} from 'react-router-dom'
// import logo from '../images/pegasus.png'
// import './main.css'
// import './contact.css'

function ContactAddFeature(props) {
    return (
        <div className='add'>
            <div className='plus'>
                <div className='ver'></div>
                <div className='hor'></div>
            </div>
            <label>{props.featureName}</label>
        </div>
    )
}

export default ContactAddFeature