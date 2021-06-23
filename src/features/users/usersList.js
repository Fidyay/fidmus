import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import defautlUserPhoto from '../../images/user.svg'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../../index.js';

const UsersList = () => {
    const { auth } = useContext(FirebaseContext)
    const users = useSelector(state => state)
    const currentUser = useSelector(state => state.currentUser)
    const renderedMessages = users.ids.map(id => {
        if (currentUser.id === id) {
            return null
        }
        const user = users.entities[id]
        const {name, photo, chat} = user
        let avatar = photo ? photo : defautlUserPhoto
        const link = `chat/${id}`
        return (
            <Link key={id} to = {link}>
                <div className="chats__chat chat">
                    <div className="chat__avatar-and-name">
                        <img src={avatar}/>
                        <h1>{name}</h1>
                    </div>
                 {chat[chat.length - 1] ? <p>{`${chat[chat.length - 1]['author'] === currentUser.id ? 'You:' : name + ':'} ${chat[chat.length - 1]['content']}`}</p> : null}
            </div>
        </Link>
        )
        
    })

    return (
        <div className="main__chats chats">
            <header className="chats__user-info user-info">
                <div className="user-info__avatar-and-name avatar-and-name">
                    <img src={currentUser.photo ? currentUser.photo : "images/user.svg"}/> 
                    <h1>{currentUser.name}</h1>
                    <button onClick={()=> auth.signOut()}/>
                </div>
            </header>
            {renderedMessages}
            
        </div>
    )
    
}

export default UsersList
