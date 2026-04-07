import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const AuthorsDetail = () => {
    const { id } = useParams()
    const [authors, setAuthors] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:3000/autores/${id}`)
            .then(res => res.json())
            .then(data => setAuthors(data))
    }, [id])

    if (!authors) return <div>Carregando...</div>

    return (
        <div className="flex justify-center">
            <div className={`flex flex-col p-4 justify-center gap-2 max-w-300`}>
            <div className="flex justify-center">
            <img src={authors.foto} alt={authors.nome} className="h-auto"/>
            </div>
            <div className="flex items-center gap-5 pt-5 justify-between">
                <h1 className="text-2xl font-bold"> {authors.nome}</h1>
                <h1 className="text-xl">Idade: {authors.idade}</h1>
            </div>
            <h1 className="text-xl font-semibold">Especialidade: {authors.especialidade}</h1>
            <h2 className="text-lg">{authors.descricao}</h2>
            <h2 className="text-xl font-semibold">Biografia:</h2>
            <h3 className="text-lg">{authors.biografia}</h3>
            <h2 className="text-xl font-semibold pt-2">Algumas das Obras:</h2>
            <ul className="list-disc pl-7">
                {authors.obras.map((obra, index) => (
                    <li key={index}>{obra}</li>
                )
            )}
            </ul>
            <div>
            <button type="submit" className="bg-blue-600 text-white text-xl mt-4 px-5 py-2 rounded hover:bg-blue-700 cursor-pointer" onClick={() => navigate(-1)}>
                Voltar
            </button>
            </div>
            </div>
        </div>
    )
}

export default AuthorsDetail