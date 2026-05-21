import { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import { useParams } from "react-router-dom";
import {CommentForm} from './CreateComment'

function EditComment(){
    const navigate=useNavigate()
    const {blogId,commentId}=useParams()
    const [comment,setComment]=useState(null)
    const [error,setError]=useState(null)

    async function fetchComment(){
        try{
            const response=await client.get(`/blogs/${blogId}/comments/${commentId}`)
            setComment(response.data.comment)
        }catch(err){
            setError(err.response?.data?.message || 'Failed to fetch comment.')
        }
    }

    async function onSubmit(formData){
        try{
            await client.put(`/blogs/${blogId}/comments/${commentId}`,formData)
            navigate(`/blogs/${blogId}`)
        }catch(err){
            setError(err.response?.data?.message ||'Failed to edit comment.')
        }
    }

    useEffect(()=>{
        fetchComment()
    },[commentId])

    return(
        <div>
            <h1>Edit Comment</h1>
            <CommentForm initialData={comment} onSubmit={onSubmit} error={error}/>
        </div>
    )
}

export default EditComment