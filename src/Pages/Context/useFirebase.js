import initializeAuthentication from "../Firebase/Firebase.init";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, reload} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAdminAuthentication from "../Firebase/Firebase.admin.init";
// const admin = require("firebase-admin");

initializeAuthentication();
// initializeAdminAuthentication();

const useFirebase = () =>{
    const [user, setUser] = useState([]);
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loans, setLoans] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState('');
    const [admin, setAdmin] = useState(false);
    const GoogleProvider = new GoogleAuthProvider();
    const auth = getAuth();
    const savedUser = (email, displayName, isAdmin, method) => {
        const user = {email, displayName, isAdmin};
        console.log("user: ", user);
        fetch('http://localhost:5000/users', {
          method: method,
          headers : {
            'content-type': 'application/json'
          },
          body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(result =>{
          console.log(result);
        })
     
     }
    //  const userFound = (email)=>{
    //   let userProfile = {};
    //   fetch(`http://localhost:5000/users/${email}`)
    //   .then(res => res.json())
    //   .then(result =>{
    //      userProfile = result;
    //   })
    //   return userProfile;
    //  }

     const RegisterNewUser = (name, email, password, isAdmin, history) =>{
        setIsLogin(true); 
       createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
             // Signed in 
             // const user = userCredential.user;
             setError('');
            //  const newUser = {displayName: name, email}
            //  setUser(newUser);
             savedUser(email, name, isAdmin, 'POST');
            // const profileUser = setUser(userFound(email))
             updateProfile(auth.currentUser, {
               displayName: name
             })
             .then(()=>{
 
             })
             .catch((error)=>{
 
             })
              history('/login');
           })
           .catch((error) => {
             // const errorCode = error.code;
             const errorMessage = error.message;
             setError(errorMessage);
           })
           .finally(()=>{setIsLogin(false)});
     }

     const LoginUser = (email, password, location, history) => {
        setIsLogin(true); 
      fetch(`http://localhost:5000/users/${email}`)
      .then(res => res.json())
      .then(result =>{
        //  console.log("result: ", result);
         setUser(result);
         auth.isAdmin = result.isAdmin;
         signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
           history(location?.state?.from || '/home');
             // const user = userCredential.user;
             setError('');   
           })
           .catch((error) => {
             setError(error.message);
           })
           .finally(()=>{setIsLogin(false)});
      })
      }
    const SignInWithGoogle = () =>{
       return signInWithPopup(auth, GoogleProvider)
        // .then((result) => {
            
        //     // const user = result.user;
        //     // setUser(user);
        //   }).catch((error) => {
           
        //     const errorMessage = error.message;
        //     setError(errorMessage);
        //   });
    }
    const LogOut= () => {
        // setIsLogin(true);
        signOut(auth)
        .then(()=>{
            setUser([]);
        })
        .finally(()=>{setIsLogin(false)})
    }

    useEffect(() =>{
        onAuthStateChanged(auth, user=>{
             if(user)
              {
               
                console.log("user: ", user)
                 setUser(user);
              }
              else{
                setUser({});
              }
              setIsLogin(false);
           })
       }, [])

   useEffect(()=>{
       fetch('http://localhost:5000/loans')
       .then(res => res.json())
       .then(result =>{
        console.log("loans results: ", result)
           setLoans(result)
       })

   }, [])

  //  useEffect(() => {
  //   fetch(`http://localhost:5000/users/${user.email}`)
  //   .then(res => res.json())
  //   .then(data =>setAdmin(data.admin));
  // }, [user.email]);
    return {
        admin,
        RegisterNewUser,
        LoginUser,
        loans,
        SignInWithGoogle,
        user,
        LogOut,
        isLogin,
        setIsLogin
    }
}

export default useFirebase;