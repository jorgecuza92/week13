
import { useEffect } from 'react'
import { useState } from 'react'

function Dashboard() {

    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        fetchAllAccounts()
    }, [])

    const fetchAllAccounts = () => {
        
        const token = localStorage.getItem('jsonwebtoken')
        const username = localStorage.getItem('username')

        fetch(`http://localhost:8080/accounts/${username}`, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json()) 
        .then(result => {
            setAccounts(result)
        })
    }


    
    const accountItems = accounts.map((account) => {
        return <div>{account.name} - {account.balance}</div>
    }) 

    return (
        <div>
            <h1>Dashboard</h1>
            {accountItems}
        </div>
    )
}

export default Dashboard