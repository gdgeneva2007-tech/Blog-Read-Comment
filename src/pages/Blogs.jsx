import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import client from "../api/client";

function ViewPublishedBlogs(){
    const [blogs,setBlogs]=useState([])
    const [error,setError]=useState(null)
    async function getAllPublishedBlogs(){
        try{
            const response=await client.get('/blogs')
            setBlogs(response.data.blogs)
        }catch(err){
            setError(err.response?.data?.message||'Failed to load blogs.')
        }
    }
    useEffect(()=>{
        getAllPublishedBlogs()
    },[])

    if(error)return <p className="text-red-700">{error}</p>
    return(
        <div className="flex flex-col gap-6 bg-amber-200">
            <h1>All Published Blogs ({blogs.length}):</h1>
            {blogs.map((blog)=>(
                <div key={blog.id} className="border-8 rounded-2xl border-amber-600 p-6 max-h-40">
                    <h3>{blog.title}</h3>
                    <h4>Author: {blog.author.firstName} {blog.author.lastName}</h4>
                    <h4>{blog.text}</h4>
                    <h4>{blog.createdAt}</h4>
                    <Link to={`/blogs/${blog.id}`}>
                        <h4 className="text-red-700">Details & Comments ({blog._count.comments})</h4>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default ViewPublishedBlogs