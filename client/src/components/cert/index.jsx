import React from "react";
import styles from "./styles.module.css";

const Cert = () => {
return(
    <div>
        <nav className={styles.navbar}>
        <h1>Request your certificate</h1>
        <button className={styles.white_btn} >
        Logout
        </button>
        </nav>
        <div
            style={{
            padding: "30px",
            marginBottom: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            }}
        >
            <h2 style={{ color: "#f34646", marginBottom: "30px" }}>
                Welcome to 10X!
            </h2>
            {/* <img src="././Nardos.png" alt="User Certificate" width="500" height="300"/> */}
            <button>
                Download Certificate
            </button>
</div>
</div>
);
}

export default Cert