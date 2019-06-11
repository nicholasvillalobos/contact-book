import React from 'react'
import Search from '../images/search.png'
import ContactName from './ContactName'

function ContactLookUp() {
    return (
        <div>
            <div>
                <form className='search'>
                    <input></input>
                    <div className='searchButton'>
                        <img className='searchLogo' src={Search} alt='' />
                    </div>
                </form>
                <div>
                    <ContactName contactName='Jose Mendoza'/>
                    <ContactName contactName='Pepe Guy'/>
                    <ContactName contactName='Bob the Bob'/>
                    <ContactName contactName='Billy Nelson'/>
                </div>
            </div>
        </div>
    )
}

export default ContactLookUp
