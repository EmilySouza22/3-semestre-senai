import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Authors = () => {

    const [autores, setAutores] = useState([])

    useEffect(()=> {
            fetch("http://localhost:3000/autores")
            .then(res => res.json())
            .then(data => {
                setAutores(data)
            })
        }, [autores])

    return (
        <div className={`flex gap-2 py-5 flex-wrap`}>
            {
                autores.map(autores => (
                    <div key={autores.id} className="card-author"> 
                        <img src={autores.foto} alt={autores.nome} />
                        <h2 className="text-xl">{autores.nome}</h2>
                        <p>{autores.descricao}</p>
                        <Link to={`/autores/${autores.id}`} className="text-blue-50 bg-blue-500 hover:bg-blue-700">Saiba mais</Link>
                    </div>
                )
                )
            }
        </div>
    )
}