const NavigationBottom = ({ trackingClick, profileClick, summaryClick }) => {
    return(
    <nav className="row text-center" style={{ backgroundColor: "#ADD8E6" }}>
        <div className="headBar" style={{display: "flex", height: "70px", justifyContent: "space-around", alignItems: "center"}}>
            {/* <button style={{border: "none", background: "none"}} onClick={() => summaryClick() }><h1 style={{ color: "white" }}> Summary </h1></button> */}
            <button style={{border: "none", background: "none"}} onClick={() => trackingClick() }><h1 style={{ color: "white" }}> Tracking </h1></button>
            <button style={{border: "none", background: "none"}} onClick={() => profileClick() }><h1 style={{ color: "white" }}> Profile </h1></button>
        </div>
    </nav>
    );
}

export default NavigationBottom;