import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { setLogin } from '../features/user.slice'
import axios from 'axios'

const Login = () => {
    const dispatch = useAppDispatch()
    const [login, setLoginPage] = useState(true)
    const [formData, setFormData] = React.useState({
        username: "",
        password: ""
    })
    const handelOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const url = login ? "http://localhost:4000/login" : "http://localhost:4000/register"
        if(login){
            
            try {
                const response = await axios.post(url, formData)
                const obj = response.config.data
                const user = JSON.parse(obj).username
                dispatch(setLogin({
                    username: user,
                    id: response.data.id
                }))
            } catch (error: any) {
                alert(error.message)
                console.log(error)
            }
        }
        else{
            try {
                await axios.post(url, formData)
                setLoginPage(true)
            } catch (error: any) {
                alert(error.message)
                console.log(error)
            }
        }
        setFormData({ username: "", password: "" })
    }
    return (
        <div>
            {
                login ? <h1>Login</h1> : <h1>Register</h1>
            }
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handelOnChange} required /><br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" onChange={handelOnChange} value={formData.password} name="password" required /><br />
                {
                    login ? <button style={{ backgroundColor: "darkgrey", color: "white", marginTop: "1rem" }}
                        type="submit">Login</button>
                        :
                        <button style={{ marginTop: "1rem" }}
                            type="submit">Register</button>
                }
            </form>
            {
                login ? <p>Don't have an account? <span style={{ cursor: "pointer", color: "blue" }} onClick={() => setLoginPage(false)} >Register</span></p>
                    : <p>Already have an account? <span onClick={() => setLoginPage(true)} style={{ cursor: "pointer", color: "blue" }} >Login</span></p>
            }

        </div>
    )
}
export default Login