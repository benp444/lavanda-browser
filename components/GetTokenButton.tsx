"use client";
import styles from "./TextInputWithButton.module.css";

import { useState } from "react";

export default function TextInputWithButton() {

    const [token, setToken] = useState("")


    const handleClick = async () => {
        try {
            console.log("Token attempting to retrieve token:")

            const res = await fetch("/api/lav-auth");
            const accessToken = await res.json();
            setToken(accessToken.token)
            console.log("Token received:", token)
            console.log("got data from users next API: " + accessToken)
            console.log("DATA TYPE:", typeof token)
            console.log("IS ARRAY:", Array.isArray(token))
            console.log("DATA:", token)
            console.log("keys:", Object.keys(accessToken))
        } catch (err) {
            console.error("Failed to get token", err)
        }
    }

    return (
        <div className={styles["input-container"]}>
            <button type="button" onClick={handleClick}>Submit</button>
            {token && (
                <div style={{ marginTop: "10px" }}>
                    Token: {token}
                </div>
            )}
        </div>
    );
}

