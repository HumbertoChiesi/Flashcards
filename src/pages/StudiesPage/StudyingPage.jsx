import React, {useEffect} from "react";
import {
    Typography,
    StyledEngineProvider,
    Box,
} from "@mui/material";
import {styled} from "@mui/styles";
import HomeButton from "../components/HomeButton";
import LogoutButton from "../components/LogoutButton";
import FlashCardService from "../../services/FlashCardService";
import Authenticator from "../../middlewares/Authenticator";
import FlashCard from "./FlashCard";
import Button from "@mui/material/Button";

const MainDiv = styled("div")({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 1512,
    height: 982,
    marginLeft: 'auto',
    marginRight: 'auto',
})
const TypographyStyled = styled(Typography)({
    position: 'relative',
    display: 'inline-block',
    textAlign: 'center',
    fontFamily: 'Alice',
    color: '#58455b',
})
const ImgStyled = styled("img")({
    marginLeft: '100px',
    display: 'inline-block',
    width: '148px',
    height: '150px',
})
const ButtonStyled = styled(Button)({
    width: '240px',
    height: '58px',
    backgroundColor: '#48324a',
    marginLeft: '313px',
    marginTop: '25px',
    borderRadius: '50px',
    textAlign: 'center',
    '&:hover': {
        backgroundColor: '#634466',
    },
})


const StudyingPage = () => {
    Authenticator();

    return (
        <StyledEngineProvider injectFirst>
            {<div>
                <MainDiv>
                    <ImgStyled src="https://cdn.zeplin.io/628f772ac9ae2e79fdc29973/assets/29396b5d-b783-47d5-b5a2-c533cc52b377.png"/>
                    <TypographyStyled style={{fontSize: '96px',  marginTop: '50px', marginLeft: '200px', marginRight: '200px', marginBottom: '50px',}}>Sessão de estudos</TypographyStyled>
                    <HomeButton/>
                    <LogoutButton/>
                    <FlashCard></FlashCard>
                </MainDiv>
            </div>}
        </StyledEngineProvider>
    )
}

export default StudyingPage
