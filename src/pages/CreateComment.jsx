import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";
import { useNavigate } from "react-router-dom";

export function CommentForm({initialData={},onSubmit,error}){
    const [formData,setFormData]=useState({
        text:initialData?.text||''
    })
    useEffect(()=>{
        setFormData({
            text:initialData?.text||''
        })
    },[initialData])

    function onChange(e){
        setFormData((prev)=>(
            {...prev,[e.target.name]:e.target.value}
        ))
    }

    async function handleSubmit(e){
        e.preventDefault()
        onSubmit(formData)
    }

    return(
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label>Text:</label>
                <textarea name="text" value={formData.text} required rows={6} onChange={onChange} className="border-4 border-amber-700"></textarea>
                <button type="submit" className="p-2 bg-indigo-600 rounded-2xl text-white">Submit</button>
            </form>
        </div>
    )
}

function CreateComment(){
    const {blogId}=useParams()
    const navigate=useNavigate()
    const [error,setError]=useState(null)
    async function onSubmit(formData){
        try{
            await client.post(`/blogs/${blogId}/comments`,formData)
            navigate(`/blogs/${blogId}`)
        }catch(err){
            setError(err.response?.data?.message||'Failed to create comment.')
        }
    }
    return(
        <div>
            <h1>Create Comment</h1>
            <CommentForm initialData={{}} onSubmit={onSubmit} error={error}/>
        </div>
    )
}

export default CreateComment