import { useEffect,useState } from "react";
import { useAuth } from "../hooks/useAuth";
import client from "../api/client";
import { useParams,useNavigate  } from "react-router-dom";
import { Link } from "react-router-dom";
function BlogDetails(){
    const {user}=useAuth()
    const navigate=useNavigate()
    const {blogId}=useParams()
    const [blog,setBlog]=useState(null)
    const [error,setError]=useState(null)

    async function getBlogDetails(){
        try{
            const resposne=await client.get(`blogs/${blogId}`)
            setBlog(resposne.data.blog)
            console.log(blog)
        }catch(err){
            setError(err.response?.data?.message || 'Failed to load comments.')
        }
    }

    async function handleDelete(e){
        if(!confirm("Delete this comment permanently?"))return
        try{
            const commentId=e.currentTarget.dataset.commentId 
            await client.delete(`/blogs/${blogId}/comments/${commentId}`)
            getBlogDetails()
        }catch(err){
            setError(err.response?.data?.message || 'Failed to delete comment.')
        }
    }

    useEffect(()=>{
        getBlogDetails()
    },[blogId])

    if(error)return <p className="text-red-700">{error}</p>
    if(!blog)return null
    return(
        <div className="flex flex-col gap-6 bg-amber-200">
            <Link to={"/"} className="text-indigo-600">← Back to Home</Link>
            <h2>Title: {blog.title}</h2>
            <h3>Author: {blog.author.firstName } {blog.author.lastName}</h3>
            <h4>Created At: {blog.createdAt}</h4>
            <h4>{blog.text}</h4>
            <Link to={`/blogs/${blogId}/comments/new`}>
                <button className="p-2 bg-indigo-600 rounded-2xl text-white">Create Comment!</button>
            </Link>
            {blog.comments.map((comment)=>{
                const isCommentAuthor=Number(comment.authorId)===Number(user.id)
                console.log("userId:",user.id)
                console.log("comment author id:",comment.authorId)
                console.log('is comment author:',isCommentAuthor)
                    return(
                    <div key={comment.id} className={`border-8 rounded-2xl border-amber-600 p-6 max-h-40 ${comment.authorId===Number(user.id)?"bg-indigo-100":""} overflow-auto`}>
                        <h4>Author: {comment.author.firstName} {comment.author.lastName}</h4>
                        <h4>{comment.text}</h4>
                        <h4>{comment.createdAt}</h4>
                        
                        {isCommentAuthor && (
                            <div>
                                <Link to={`/blogs/${blogId}/comments/${comment.id}/edit`}>
                                    <button className="p-2 bg-indigo-600 rounded-2xl text-white">Edit</button>
                                </Link>
                                <button onClick={handleDelete}
                                data-comment-id={comment.id} className="p-2 bg-red-600 rounded-2xl text-white">Delete</button>
                            </div>)
                        }
                    </div>
                )})}
        </div>
    )
}
export default BlogDetails