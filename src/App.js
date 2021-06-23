import React, { useContext} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import UsersList from './features/users/usersList.js';
import Chat from './features/chat/chat.js';
import Login from './features/login/login.js';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { FirebaseContext } from './index.js';
import Loader from './features/loader/loader.js';
import { setCurrentUser, setUsersInfo } from './features/users/usersSlice.js'
import { useDispatch, useSelector } from 'react-redux';


function canDispatch(users, chats) {
  if (users[0] && chats[0]) {
    return true
  }
  return false
}


function App() {
  const { auth, firestore } = useContext(FirebaseContext)
  const [user, loading] = useAuthState(auth)
  const dispatch = useDispatch()
  let takeData = user ? user.uid : '' 
  if (user) {
    dispatch(setCurrentUser(user.uid, user.displayName, user.photoURL))
  }
  const otherUsers = useCollectionData(firestore.collection("users").where('id', '!=', takeData))
  const chatsFirestore = useCollectionData(firestore.collection('chats').where('users', 'array-contains', takeData))


  if (canDispatch(otherUsers, chatsFirestore) && (takeData !== '')) {
    dispatch(setUsersInfo(otherUsers, chatsFirestore))
  }
  

  if (loading) {
    return <Loader/>
  }
 



  return (
    user ? (
      <main className='main'>
    <Switch>
        <Route path = '/' exact component={UsersList}/>
        <Route path = '/chat/:userId' exact component={Chat}/>
        <Redirect to = '/'/>
    </Switch>
  </main>
    ) : (
      <main className='main'>
        <Login/>
      </main>
    )
  )
  

}

export default App;
