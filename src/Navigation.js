import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {signInWithGoogle, signOut, useUserState, useData } from './utilities/firebase.js';

export const SignInButton = () => (
    <button className="ms-auto btn btn-dark m-1 p-2"
        onClick={() => signInWithGoogle()}>
      Sign In
    </button>
  );
  
  
  export const SignOutButton = () => (
    <button className="ms-auto btn btn-dark m-1 p-2"
        onClick={() => signOut()}>
      Sign Out
    </button>
  );

const Navigation = () =>{
    const [user] = useUserState();

    return(
        <nav className="row text-center" style={{ backgroundColor: "#ADD8E6" }}>
             <div className="headBar" style={{display: "flex", height: "70px", justifyContent: "center", alignItems: "center"}}>
                <h1 className="heading " style={{ color: "white" }}> Stay Hydrated </h1>
                {user ? <p className="ms-auto" id="welcome">Welcome, {user.displayName}</p> : <p className="ms-auto" id="welcome">Welcome guest.</p>}
                { user ? <SignOutButton /> : <SignInButton /> }
            </div>
        </nav>
    )
}

export default  Navigation;