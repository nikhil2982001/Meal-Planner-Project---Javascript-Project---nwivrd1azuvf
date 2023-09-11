import { getAuth ,GoogleAuthProvider,signInWithPopup, signOut } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
// import {isUserLoggedIn} from "./App.js";
const firebaseConfig = {
    apiKey: "AIzaSyBN_MVFsfI2BUj1f3VBHlBWSW7pSNddTJQ",
    authDomain: "meal-planner-49300.firebaseapp.com",
    projectId: "meal-planner-49300",
    storageBucket: "meal-planner-49300.appspot.com",
    messagingSenderId: "296800973746",
    appId: "1:296800973746:web:9df0c58bdcad49d1edaaab",
    measurementId: "G-C7P8KCK0BY"
};

const app = initializeApp(firebaseConfig);
const provider=new GoogleAuthProvider();
const auth=getAuth(app);

export async function loginGoogle(){
    try{
        const result=await signInWithPopup(auth,provider)
        const user=result.user;
        let loginButtonElem = document.getElementById("log");
        let userInfoElem = document.getElementById("user-info");
        let userNameElem = document.getElementById("user-name");
        loginButtonElem.classList.add("hidden");
        userNameElem.textContent = `${user.displayName}`;
        userInfoElem.classList.remove("hidden");
        console.log(result)
        // isUserLoggedIn = true;
        localStorage.setItem("isUserLoggedIn", true);
    }catch(err){
        console.log(err)
    }
}

export async function logout() {
    try {
        await signOut(auth);
        let loginButtonElem = document.getElementById("log");
        let userInfoElem = document.getElementById("user-info");
        loginButtonElem.classList.remove("hidden");
        userInfoElem.classList.add("hidden");
        // isUserLoggedIn= false;
        localStorage.setItem("isUserLoggedIn", false);
    } catch (err) {
        console.log(err);
        console.log("Error logging out");
    }
}

