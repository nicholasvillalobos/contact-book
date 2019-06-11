import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import logo from '../images/pegasus.png';
import ViewContact from './ViewContact'
import NewContact from './NewContact'
import ContactLookUp from './ContactLookUp'
import '../styles/contact.css'

function Contact(props) {
    return (
        <div className='contacts'>
            <div className='contactWrapper'>
                <NewContact />
                {/* <ViewContact /> */}
                <ContactLookUp />
            </div>
        </div>
    )
}

export default Contact