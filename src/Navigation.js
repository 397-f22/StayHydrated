import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navigation = () =>{
    return(
        <nav className="row text-center" style={{ backgroundColor: "#ADD8E6" }}>
             <div className="headBar" style={{display: "flex", height: "70px", justifyContent: "center", alignItems: "center"}}>
                <h1 className="heading " style={{ color: "white" }}> Stay Hydrated </h1>
            </div>
        </nav>
    )
}

export default  Navigation;