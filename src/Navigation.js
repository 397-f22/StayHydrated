import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {signInWithGoogle, signOut, useUserState } from './utilities/firebase.js';

export const SignInButton = () => (
    <button className="btn btn-dark"
        onClick={() => signInWithGoogle()}>
      Sign In
    </button>
  );
  
  
  export const SignOutButton = () => (
    <button className="btn btn-dark"
        onClick={() => signOut()}>
      Sign Out
    </button>
  );

const Navigation = ({profileClick}) =>{
    const [user] = useUserState();

    return(
        <nav className="row text-center" style={{ backgroundColor: "#ADD8E6", height: "70px" }}>
             <div className="headBar" style={{display: "flex", height: "70px", justifyContent: "space-between", alignItems: "center"}}>
                <h1 className="heading" style={{ color: "white", marginLeft:"20px" }}> Stay Hydrated </h1>
                {/* {user ? <p className="ms-auto" id="welcome">Welcome, {user.displayName}</p> : <p className="ms-auto" id="welcome">Welcome guest.</p>} */}
                { user
                  ? <div>
                      <SignOutButton />
                      <button style={{border: "none", background: "none", marginRight: "15px"}} onClick={() => {profileClick()}}>
                        <img src={user.photoURL} onClick={() => {profileClick()}} style={{height: "45px", borderRadius: "50%"}}></img>
                      </button>
                    </div>
                  : <div style={{marginRight: "15px"}}><SignInButton /></div> }
            </div>
        </nav>
    )
}

export default  Navigation;