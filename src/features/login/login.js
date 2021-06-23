import React, { useContext } from 'react'
import { FirebaseContext } from '../../index.js'
import firebase from 'firebase'

const Login = () => {
    const { auth, firestore } = useContext(FirebaseContext)
    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider() 
        const { user } = await auth.signInWithPopup(provider)
        firestore.collection("users").add({
            id: user.uid,
            name: user.displayName,
            photo: user.photoURL
        })
        .catch((error) => {
        });
    } 

    return (
        <div className='main__login'>
            <h1>FIDMUS</h1>
            <button onClick={login}>Login with Google</button>
        </div>
    )
}

export default Login