import './App.css';
import * as firebase from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup}  from "firebase/auth";
import firebaseConfig from "./firebase config";
import 'firebase/compat/auth';
import { useState } from "react";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { createUserWithEmailAndPassword } from "firebase/auth";



firebase.initializeApp(firebaseConfig)

function App() {
  const [user, setUser] =useState({
    isSignedIn:false,
    name :'',
    mail:'' ,
    password:'',
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
          photo:'',
        
        }
        setUser(signedOutUser);
      })
    }
    const handleBlur =(e)=>{
      debugger;
     let isFormValid = true;
      if (e.target.name==='email') {
        isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        
        
      }
      if (e.target.value=== 'password') {
        const isPasswordValid = e.target.value.length>6;
        const passwordHasNumber= /\d{1}/.test(e.target.value);
        isFormValid=isPasswordValid && passwordHasNumber;
      }
      if (isFormValid){
        const newUserInfo ={...user};
        newUserInfo[e.target.name]= e.target.value;
        setUser(newUserInfo);

      }
    }
    const handleSubmit =(e)=>{
      console.log(user.email, user.password);
      if(user.email && user.password){
        //console.log('submitting');
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, user.email, user.password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorCode,errorMessage);
          });
        


      }
      e.preventDefault();

    }

  return (
    <div className="App">
       <h1>nibir</h1>
       { user.isSignedIn ? <button onClick ={handleSignOut}>sign out</button> :
         <button onClick ={handleSignin}>sign in</button>}
       {
         user.isSignedIn &&
         <div>
            <p>WELCOME  <b> {user.name}</b></p>
            <p>Email:  <b>{user.mail}</b></p>
            <img src={user.photo} alt="" />
            <AccessAlarmIcon></AccessAlarmIcon>
         </div> 
         
         
       }
       <h1>Our Own Authentication</h1>
      <form onSubmit={handleSubmit}>
        <h1>Our own Authentication</h1>
        <p>name : {user.name}</p>
        <p>Email:{user.email}</p>
        <p>password :{user.password}</p>

        <input type="text" name="name" onBlur={handleBlur} placeholder='your name' required/>
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder='your email address' required/>
       <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder='your password' required/>
       <br/>
        <input type="button" value="submit" />
     </form>
    </div>
  );
  
}

export default App;
