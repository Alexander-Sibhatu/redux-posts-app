import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectAllUsers } from '../users/usersSlice'

import { addNewPost }  from './postsSlice'


const AddPostForm = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

    const users = useSelector(selectAllUsers);

    const dispatch = useDispatch()

    const handleTitle = (e) => setTitle(e.target.value)
    const handleContent = (e) => setContent(e.target.value)
    const handleAuthor = (e) => setUserId(e.target.value)

    const handlePost = (e) => {
        e.preventDefault();
        if(canSave){
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({ title, body: content, userId})).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
            } catch (error) {
                console.log('Failed to save the post', error)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

  return (
        <form className='form'>
            <label htmlFor="postTitle">Post Title:</label>
            <input 
                type="text"
                id='postTitle'
                value={title}
                onChange={handleTitle}
            />
            <br />
            <label htmlFor="postAuthor">Author:</label>
            <select type="text" id='postAuthor' value={userId} onChange={handleAuthor}>
                <option value=""></option>
                {usersOptions}
            </select>

            <label htmlFor="postContent" >Post Content:</label>
            <textarea 
                type="text"
                id='postContent'
                value={content}
                onChange={handleContent}
            />
            <br />
            <button 
                onClick={handlePost}
                disabled={!canSave}
            > Add Post</button>
        </form>
  )
}

export default AddPostForm