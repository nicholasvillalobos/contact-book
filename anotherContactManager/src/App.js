import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './components/Login'
import SignUp from './components/SignUp'
import Contact from './components/Contact'
import './styles/index.css'
import bcrypt from 'bcryptjs'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            height: window.innerHeight,
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            password1: '',
            password2: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.updateWindowSize = this.updateWindowSize.bind(this)
    }

    handleChange(event) {
        const {name, value} = event.target
        if (name === 'username') {
            let isSame
            bcrypt.compare(value, this.state.password)
                .then((res) => {
                    isSame = res
            })
            console.log(isSame)
            this.setState({[name]: value})
        } else if (name === 'password') {
            let hashed
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(value, salt, function(err, hash) {
                    console.log(hash)
                    hashed = hash
                })
            })
            this.setState({[name]: hashed})
            this.setState({password1: hashed})
        } else {
            this.setState({[name]: value})
        }
    }
    
    updateWindowSize() {
        this.setState({height: window.innerHeight})
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowSize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowSize)
    }

    render() {
        const badStyle = {
            margin: 0,
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }

        if (this.state.height < 500) {
            return (
                <div style={badStyle} className='app'>
                    <h1 style={{textAlign: 'center'}}>Please resize your window</h1>
                </div>
            )
        }

        return (
            <Router>
                <video loop autoPlay muted>
                    <source src='https://www.ucf.edu/files/2019/02/MainsiteHeader_wBasketball_01.mp4' type='video/mp4' />
                    <source src='https://www.ucf.edu/files/2019/02/MainsiteHeader_wBasketball_01.mp4' type='video/ogg' />
                </video>
                <div className='app'>
                    <Switch>
                        <Route path='/' exact render={(props) => <
                            Login {...props}
                            username={this.state.username}
                            password={this.state.password}
                            handleChange={this.handleChange}
                        />}/>
                        <Route path='/signup' render={(props) => <
                            SignUp {...props}
                            password1={this.state.password1}
                            password2={this.state.password2}
                            handleChange={this.handleChange}
                        />}/>
                        <Route path='/Contacts' render={(props) => <
                            Contact {...props}
                            handleChange={this.handleChange}
                        />}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App
