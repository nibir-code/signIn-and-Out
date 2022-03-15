import './App.css';
import * as firebase from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup }  from "firebase/auth";
import firebaseConfig from "./firebase config";
import 'firebase/compat/auth';
import { useState } from "react";


firebase.initializeApp(firebaseConfig)

function App() {
  const [user, setUser] =useState({
    isSignedIn:false,
    name :'',
    mail:'' ,
    photo:''
  })
  const provider = new GoogleAuthProvider();
  const handleSignin =()=>{
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((res) => {
        const {displayName, email , photoUrl}= res.user;
        const signedInUser={
          isSignedIn:true,
          name:displayName,
          mail:email,
          photo:photoUrl
        }
        setUser(signedInUser);
      console.log(displayName,email,photoUrl);
    })
    .catch(err=>{
      console.log(err);
      console.log(err.message);

    }
   )
}
    const handleSignOut =()=>{
      const auth =getAuth();
      auth.signOut()
      .then(()=>{
        const signedOutUser={
          isSignedOut:false,
          name:'',
          email:'',
          photo:''
        }
        setUser(signedOutUser);
      })
    }

  return (
    <div className="App">
       <h1>nibir</h1>
       { user.isSignedIn ? <button onClick ={handleSignOut}>sign out</button> :
         <button onClick ={handleSignin}>sign in</button>}
       {
         user.isSignedIn &&
         <div>
            <p>WELCOME {user.name}</p>
            <p>Email: {user.mail}</p>
            <img src={user.photo} alt="" />
         </div> 
         
       }
    </div>
  );
}

export default App;
