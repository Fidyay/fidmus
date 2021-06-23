import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firestore } from "../../index.js";




const currentUser = {}




// const fetchData = createAsyncThunk('users/fetchData', async id => {
//     const usersSnapshot = await firestore.collection("users").where('id', '!=', id).get()
//     const users = []
//     usersSnapshot.forEach(doc => users.push(doc.data()))
//     const chatsSnapshot = await firestore.collection('chats').where('users', 'array-contains', id).get()
//     chatsSnapshot.forEach(doc => console.log(doc.data()))
//     const chats = []
//     chatsSnapshot.forEach(doc => chats.push(doc.data()))
//     const usersInitialState = users.map(user => {
//         const userChat = chats.find(chat => chat.users.includes(user.id))
//         const messages = (userChat.messages.length > 0) ? userChat.messages : []
//         return {
//             id: user.id,
//             name: user.name,
//             photo: user.photo,
//             chat: [...messages]
//         }
//     })
//     return usersInitialState
// })




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
    // extraReducers: {
    //      [fetchData.pending]: (state, action) => {
    //         state.status = 'loading'
    //       },
    //       [fetchData.fulfilled]: (state, action) => {
    //         console.log(action.payload)
    //         const ids = []
    //         const entities = {}
    //         action.payload.forEach(user => {
    //             ids.push(user.id)
    //             entities[user.id] = user
    //         })
    //         return {
    //             ids,
    //             entities,
    //             status: 'succeded',
    //             currentUser: state.currentUser
    //         }
            
            
    //       },
    //       [fetchData.rejected]: (state, action) => {
    //         state.status = 'failed'
    //         state.error = action.error.message
    //       }
    // }
})


export default usersSlice.reducer



export const { sendMessage, setCurrentUser, setUsersInfo } = usersSlice.actions