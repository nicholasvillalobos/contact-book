import React from 'react'
import {Link} from 'react-router-dom'

function ViewContact(props) {
    return (
        <div className='inner'>
            {/* <header className='viewHeader'> */}
            <header className='contactHeader viewHeader'>
                <div className='plus'>
                    <div className='ver'></div>
                    <div className='hor'></div>
                </div>
                <Link className='linkToEdit link'>Edit</Link>
            </header>
            <div className='container'>
                <div className='nameLogoWrapper'>
                    <div className='nameLogo'><h2>M</h2></div>
                    <h2 className='wrapName'>Billy Bob</h2>
                </div>
                <form>
                    <label>First name</label>
                    <input name="firstName" type="text" placeholder="Bobby" value={props.firstName} onChange={props.handleChange} />
                    <label>Last name</label>
                    <input name="lastName" type="text" placeholder="last name" value={props.lastName} onChange={props.handleChange}  />
                    <label>Last name</label>
                    <input name="lastName" type="text" placeholder="last name" value={props.lastName} onChange={props.handleChange}  />
                    <label>Last name</label>
                    <input name="lastName" type="text" placeholder="last name" value={props.lastName} onChange={props.handleChange}  />
                    <label>Last name</label>
                    <input name="lastName" type="text" placeholder="last name" value={props.lastName} onChange={props.handleChange}  />
                </form>
            </div>
        </div>
    )
}

export default ViewContact