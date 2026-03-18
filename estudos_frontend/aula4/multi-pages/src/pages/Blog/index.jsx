import { useEffect, useState } from "react"

const Blog = () => {
    const [post, setPosts] = useState([])

    useEffect(() => {
        fetch("https://localhost:3000/posts")
        .then(res => res.json())
        .then(data => {
            setPosts(posts)
        })
    }, [])
    return (
        <>
            <div className="flex gap-2 ">
                {
                    posts.map(post => (
                        <div key={post.id} className="card">
                            <h2>{post.title}</h2>
                            <p>{post.view}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Blog