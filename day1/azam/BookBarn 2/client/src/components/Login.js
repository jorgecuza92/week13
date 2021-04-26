import { useState } from 'react'

function Login(props) {

    const [credentials, setCredentials] = useState({})

    const handleChange = (e) => {
        setCredentials({
            ...credentials, 
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = () => {
        fetch('http://localhost:8080/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(credentials)
        }).then(response => response.json())
        .then(result => {
            if(result.success) {
                const token = result.token 
                // get the token and put it in local storage 
                localStorage.setItem("jsonwebtoken", token)
                localStorage.setItem("username", result.username)
                // take the user to the dashboard screen 
                props.history.push('/dashboard')
            }
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <input type="text" onChange = {handleChange} placeholder = "Username" name = "username" />
            <input type="password" onChange = {handleChange} placeholder = "Password" name = "password" />
            <button onClick = {handleLogin}>Login</button>
        </div>
    )
}

export default Login 