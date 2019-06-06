import React from 'react'
// import {Link} from 'react-router-dom'
import logo from '../images/pegasus.png'
import ContactAddFeature from './ContactAddFeature'

function NewContact(props) {
    return (
        <div className='inner'>
            <header className='contactHeader'>
                <img src={logo} alt=''/>
                <h1>New Contact</h1>
            </header>
            <div className='container'>
                <form>
                    <input name="firstName" type="text" placeholder="First name" value={props.firstName} onChange={props.handleChange} />
                    <input name="lastName" type="text" placeholder="Last name" value={props.lastName} onChange={props.handleChange}  />
                    <input name="company" type="text" placeholder="Company" value={props.company} onChange={props.handleChange}  />
                    <ContactAddFeature featureName='Phone' />
                    <ContactAddFeature featureName='Email' />
                    <ContactAddFeature featureName='Website' />
                    <ContactAddFeature featureName='Address' />
                    <ContactAddFeature featureName='Birthday' />
                    <div className='notes'>
                        <label>Notes</label>
                        <textarea></textarea>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewContact