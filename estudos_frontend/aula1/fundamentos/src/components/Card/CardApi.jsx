//useState hook do react
//primeiro hook q usaremos e aprenderemos será o useState
//tudo q é nativo do react tem que ser importado aqui, caso contrario n funciona

import React, { useEffect, useState } from 'react'
import styles from './Card.module.css';

export const CardApi = () => {
    
    //contado inicia com 0, e a funcao que vai alterar isso é o setContador
    // const [contador, setContador] = useState(0)

    // const incrementaValor = () => {
    //     //boa pratica q garante q ele vai pegar o ultimo valor
    //     setContador(prev => prev + 1)
    //     console.log("contador", contador)
    // }

    //convencao 'users' usar set na frente => 'setUsers'
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => setUsers(data))
        
        // .then(data => console.log(data))
    }, [])
    
    return (
        <>
            <div className={styles.cardContainerApi}>
                {
                    users.map((user) => (
                        <div className={styles.card} key={user.id}>
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                            <p>{user.address.street}</p>
                            
                        </div>
                    )) 
                }
            </div>

            {/* <p>{contador}</p>
            <button onClick={incrementaValor}>Add</button> */}

        </>
    )
}