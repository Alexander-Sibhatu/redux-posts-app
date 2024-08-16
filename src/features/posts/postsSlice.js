import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'



const initialState = [
    {
        id: '1', 
        title: 'Harry Potter', 
        content: 'This is the best SciFi book',
        date: sub(new Date(), { minute: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        }
    },
    {
        id: '2', 
        title: 'The Alchemist', 
        content: 'A wisdom book by Paulo',
        date: sub(new Date(), { minute: 5 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        }
    }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action){
                return [...state, action.payload]
                },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        }
                    }
                }
            }
        
        },
        reactionAdded (state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.find(post => post.id === postId)
            if(existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
})


export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer