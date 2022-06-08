import React from "react";
import Button from "@mui/material/Button";
import {styled} from "@mui/system";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const HomeOutlinedIconStyled = styled(HomeOutlinedIcon)({
    width: '50px',
    height: '50px',
    display: 'inline-block',
    color: '#58455b',
    marginBottom: '35px',
})



const HomeButton = (props) => {
    function handleClick(){
        window.location.href="http://localhost:3000/home"
    }

    return(
        <Button onClick={()=>{handleClick();}} style={{display: 'inline-block'}}>
            <HomeOutlinedIconStyled/>
        </Button>
    );
}

export default HomeButton
