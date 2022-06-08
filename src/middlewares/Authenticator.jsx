import React from "react";

function Authenticator (props){
    const token = sessionStorage.getItem('token');

    if (token === null){
        window.location.href="http://localhost:3000/login";
    }
}

export default Authenticator
