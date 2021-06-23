import React, { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import UsersList from '../users/usersList.js'
import DefaultPhoto from '../../images/user.svg'
import { Redirect } from 'react-router-dom'
import { FirebaseContext } from '../../index.js'


const Chat = ({match, history}) => {
    const [textMessage, changeTextMessage] = useState('')
    const { firestore } = useContext(FirebaseContext)
    useEffect(() => {
        const messages = document.querySelector('.main .chat-info__messages')
        if (messages) messages.scrollTo(0, messages.scrollHeight)
        const textarea = document.querySelector('textarea')
        textarea.focus()

    })

    const windowWidth = document.documentElement.clientWidth
    const currentUserId = useSelector(state => state.currentUser.id)
    const {userId} = match.params
    const companion = useSelector(state => state.entities[userId])
    if (!companion) {
         return <Redirect to = '/'/>
    }
    const companionPhoto = companion.photo
    const renderedMessages = companion.chat.map((message, index) => {
        return (
            <div key={index} className = {`message ${currentUserId === message.author ? 'message_right' : 'message_left'}`}>
                {message.content}
            </div>
        )
    })

    const sendMessage = async () => {
        if (!textMessage.trim()) return
        let documentFound = false
        const chatsSnapshot = await firestore.collection('chats').where('users', 'array-contains', currentUserId).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((document) => {
                const docData = document.data()
                if (docData.users.includes(userId)) {
                    documentFound = true
                    firestore.collection('chats').doc(document.id).set({
                        users: docData.users,
                        messages: [...docData.messages, {author: currentUserId, content: textMessage, receiver: userId}]
                    })
                }
            });
            if (!documentFound) {
                firestore.collection('chats').add({
                    users: [currentUserId, userId],
                    messages:[{author: currentUserId, content: textMessage, receiver: userId}]
                })
            }
            changeTextMessage('')
        })
        .catch((error) => {
        });
        
        
                        
        
    }

    return (
        <>
            {windowWidth > 980 ? <UsersList/> : null}
            <div className="main__chat-info chat-info">
                <header className="chat-info__avatar-and-name avatar-and-name">
                    <button onClick={() => history.push('/')}/>
                    <img src={companionPhoto ? companionPhoto : DefaultPhoto}/>
                    <h1>{companion.name}</h1>
                </header>
                <div className="chat-info__messages messages">
                    {renderedMessages}
                </div>
                
                <div className="chat-info__send-message send-message">
                        <textarea value={textMessage} placeholder='Type a message' onChange={e =>changeTextMessage(e.target.value)}/>

                        <button onClick={sendMessage}/>
                </div>
           
            </div>
        </>
    )
}
export default Chat