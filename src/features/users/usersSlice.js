import { createSlice } from "@reduxjs/toolkit";





const currentUser = {}




const initialState = {
    ids: [],
    entities: {},
    currentUser,

}


const usersSlice =  createSlice({
    name: 'users',
    initialState,
    reducers: {
        setCurrentUser: {
            reducer: (state, action) => {
                state.currentUser = action.payload
            },
            prepare(id, name, photo) {
                return {
                    payload: {
                        id,
                        name,
                        photo
                    }
                }
            }
        },
        setUsersInfo: {
            prepare(users, chats) {
                const payload = {
                    ids: [],
                    entities: {}
                }
                users[0].forEach(user => {
                    const chat = chats[0].find(chat => chat.users.includes(user.id))
                    payload.ids.push(user.id)
                    payload.entities[user.id] = {
                        id: user.id,
                        name: user.name,
                        photo: user.photo,
                        chat: chat ? chat.messages : []
                    }
                });
                return {
                    payload
                }
            },
            reducer: (state, action) => {
                state.ids = [...new Set(action.payload.ids)]
                state.entities = action.payload.entities
            }
        }
    }

})


export default usersSlice.reducer



export const { sendMessage, setCurrentUser, setUsersInfo } = usersSlice.actions