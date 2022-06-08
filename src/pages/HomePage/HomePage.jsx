import React from "react";
import {
    Box,
    Typography,
    Link,
    StyledEngineProvider,
} from "@mui/material";
import {styled} from "@mui/system";
import Authenticator from "../../middlewares/Authenticator";
import HomeButton from "../components/HomeButton";
import LogoutButton from "../components/LogoutButton";

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
    fontSize: '96px',
    position: 'relative',
    display: 'inline-block',
    textAlign: 'center',
    marginTop: '50px',
    marginLeft: '523px',
    marginRight: '380px',
    fontFamily: 'Alice',
    color: '#58455b',
})
const BoxStyled = styled(Box)({
    width: 289,
    height: 300,
    color: '#58455b',
    backgroundColor: '#e5f2e4',
    borderRadius: '50px',
    position: 'relative',
    display: 'inline-block',
    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
})

const HomePage = () => {
    Authenticator();

    return (
        <StyledEngineProvider injectFirst>
            {<div>
                <MainDiv>
                    <TypographyStyled>Flash Cards</TypographyStyled>
                    <LogoutButton/>
                    <div style={{marginTop: '146px'}}>
                        <Link underline="hover" color="inherit" href="/studies">
                            <BoxStyled style={{marginLeft: '94px'}}
                                       component="img"
                                       src="https://cdn.zeplin.io/628f772ac9ae2e79fdc29973/assets/29396b5d-b783-47d5-b5a2-c533cc52b377.png">
                            </BoxStyled>
                        </Link>
                        <Link underline="hover" color="inherit" href="/flashcard">
                            <BoxStyled style={{marginLeft: '228px'}}
                                       component="img"
                                       src="https://cdn.zeplin.io/628f772ac9ae2e79fdc29973/assets/13b204f2-3f61-4a7e-b6c7-c9ae0c443ae5.png">
                            </BoxStyled>
                        </Link>
                        <Link underline="hover" color="inherit" href="/friends">
                            <BoxStyled style={{marginLeft: '228px'}}
                                       component="img"
                                       src="https://cdn.zeplin.io/628f772ac9ae2e79fdc29973/assets/82223366-f945-4a8a-a9b6-74374925c4b2.png">
                            </BoxStyled>
                        </Link>
                    </div>
                </MainDiv>
            </div>}
        </StyledEngineProvider>
    )
}

export default HomePage
