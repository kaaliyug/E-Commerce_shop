import React from "react";
import Footer from "./Footer"
import Header from "./Header";
import headerbackground from "../assets/header_background.webp"

export const Layout=({children})=>{
    return(
        <div className="container">
            <header style={{backgroundImage:`url(${headerbackground})`}}>
                <Header />
            </header>
            <main className="main-character">
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}