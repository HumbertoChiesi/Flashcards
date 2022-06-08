import React, {useState} from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    Link,
    StyledEngineProvider,
} from "@mui/material";
import FlashCardService from "../../services/FlashCardService";
import {styled} from "@mui/system";
import Authenticator from "../../middlewares/Authenticator";

const BoxStyled = styled(Box)({
    width: 519,
    height: 671,
    backgroundColor: '#e5f2e4',
    borderRadius: '50px',
    outline: '1px solid #000',
    position: 'absolute',
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
})
const TextFieldStyled = styled(TextField)({
    mx: 'auto',
    borderRadius:30,
    backgroundColor: '#c8d6c4',
    display: 'block',
    width: 325,
    height: 65,
    marginTop: '30px',
    marginLeft: 'auto',
    marginRight: 'auto',
    '& label.Mui-focused': {
        color: 'black',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 0,
            borderRadius: 30,
        },
        '&:hover fieldset': {
            border: 0,
            borderRadius: 30
        },
        '&.Mui-focused fieldset': {
            border: 0,
            borderRadius: 30
        },
    }
})
const ButtonStyled = styled(Button)({
    backgroundColor: '#463249',
    color: '#c8d6c4',
    display: 'block',
    marginTop: '65px',
    borderRadius:30,
    width: 325,
    height: 65,
    marginLeft: 'auto',
    marginRight: 'auto',
    '&:hover': {
        backgroundColor: '#634466',
    },
})
const TypographyStyled = styled(Typography)({
    display: 'block',
    marginTop: '79px',
    marginBottom: '68px',
    textAlign: 'center',
})
const LinkStyled = styled(Link)({
    display: 'block',
    textAlign: 'center',
    marginTop: '13px',
})


const RegisterPage = () => {
    const [Name, setName] = useState('');
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const token = sessionStorage.getItem('token');

    if (token !== null){
        window.location.href="http://localhost:3000/home";
    }

    function setToken(userToken) {
        sessionStorage.setItem('token', userToken);
    }

    function sendSolicitation() {
        FlashCardService.post("/user/create", {
            "name": Name,
            "username": Username,
            "password": Password
        }).then((response) => {
            console.log(response.data);
            setToken(response.data._id);
            window.location.href="http://localhost:3000/home";
        }).catch(
            function (error){
                alert(error.response.data)
            }
        )

    }

    return (
        <StyledEngineProvider injectFirst>
            {<BoxStyled>
                <TypographyStyled variant="h5">Flash Cards</TypographyStyled>
                <TextFieldStyled onChange={e => setName(e.target.value)}
                                 label="Digite seu nome"
                                 fullWidth id="fullWidth"
                />
                <TextFieldStyled onChange={e => setUsername(e.target.value)}
                                 label="Digite seu nome de suário"
                                 fullWidth id="fullWidth"
                />
                <TextFieldStyled onChange={e => setPassword(e.target.value)}
                                 label="Digite sua Senha"
                                 type="password"
                                 fullWidth id="fullWidth"
                />
                <ButtonStyled onClick={sendSolicitation}
                              variant="contained">Cadastrar</ButtonStyled>
                <LinkStyled underline="hover" color="inherit" href="/login">Fazer Login</LinkStyled>
            </BoxStyled>}
        </StyledEngineProvider>
    )
}

export default RegisterPage
