import React from "react";
import Button from "@mui/material/Button";
import {styled} from "@mui/system";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const ExitToAppIconStyled = styled(ExitToAppIcon)({
    width: '50px',
    height: '50px',
    display: 'inline-block',
    color: '#58455b',
    marginBottom: '35px',
})



const LogoutButton = (props) => {
    function handleClick(){
        sessionStorage.removeItem('token');
        window.location.href="http://localhost:3000/login"
    }

    return(
        <Button onClick={()=>{handleClick();}} style={{display: 'inline-block', marginLeft: '15px'}}>
            <ExitToAppIconStyled/>
        </Button>
    );
}

export default LogoutButton
