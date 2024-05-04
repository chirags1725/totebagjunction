import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/admin.module.css'
import Head from 'next/head'


const index = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    let router = useRouter()

    const handleUsername = (event) =>{
        setUsername(event.target.value)
    }
    const handlePassword = (event) =>{
        setPassword(event.target.value)
    }

    const check = () =>{
        if(username.toLowerCase() ==="chirag" && password.toLowerCase() === "chirag"){
            localStorage.setItem("cred",true)
            router.push("/admin/admin")
        } 

    }
  return (
    
    <div className={styles.form}>
      <Head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>
    </Head>
        Enter your username and password
      <input type='text' value={username} onChange={handleUsername} placeholder='Username'/>
      <input type='password' value={password} onChange={handlePassword} placeholder='Password'/>
      <button id="submit" class="btn btn-primary"  onClick={check}>Submit</button>
    </div>

    
  )
}

export default index
