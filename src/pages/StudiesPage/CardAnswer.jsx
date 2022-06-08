import {Checkbox, Typography} from "@mui/material";
import React from "react";
import {styled} from "@mui/styles";


const TypographyStyled = styled(Typography)({
    position: 'relative',
    display: 'inline-block',
    textAlign: 'center',
    fontFamily: 'Alice',
    fontSize: '45px',
    marginLeft: '20px'
})

const CardAnswer = (props) => {
    const right = props.isRight

    return(
        <div>
            {right === true
                ? <div style={{display: 'block'}}>
                    <Checkbox color="success"
                              checked={props.checked}/>
                    <TypographyStyled sx={{color: '#2e7d32'}}>{props.answer}</TypographyStyled>
                </div>
                : <div style={{display: 'block'}}>
                    <Checkbox sx={{color: '#b83055',  '&.Mui-checked': {color: '#b83055',}}}
                              checked={props.checked}/>
                    <TypographyStyled sx={{color: '#b83055'}}>{props.answer}</TypographyStyled>
                </div>
            }
        </div>
    )
}

export default CardAnswer
