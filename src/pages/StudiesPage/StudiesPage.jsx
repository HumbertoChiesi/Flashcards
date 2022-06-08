import React, {useEffect} from "react";
import {
    Typography,
    StyledEngineProvider,
    Box,
    TextField, Autocomplete,
} from "@mui/material";
import {styled} from "@mui/styles";
import Button from "@mui/material/Button";
import HomeButton from "../components/HomeButton";
import LogoutButton from "../components/LogoutButton";
import Authenticator from "../../middlewares/Authenticator";
import FlashCardService from "../../services/FlashCardService";

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
    marginTop: '50px',
    marginLeft: '200px',
    marginRight: '200px',
    marginBottom: '50px',
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
const BoxStyled = styled(Box)({
    width: '709px',
    height: '500px',
    backgroundColor: '#e5f2e4',
    marginTop: '15px',
    marginLeft: '401px',
    borderRadius: '50px',
    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)'
})
const AutocompleteStyled = styled(Autocomplete)({
    borderRadius:30,
    backgroundColor: '#c8d6c4',
    display: 'block',
    width: 516,
    height: 65,
    marginTop: '30px',
    marginBottom: '50px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '15px',
    paddingRight: '15px'
})
const ButtonStyled = styled(Button)({
    width: '240px',
    height: '58px',
    backgroundColor: '#48324a',
    marginLeft: '234px',
    marginTop: '15px',
    borderRadius: '50px',
    textAlign: 'center',
    '&:hover': {
        backgroundColor: '#634466',
    },
})

const StudiesPage = () => {
    Authenticator();

    const [menuApplication, setMenuApplication] = React.useState([])
    let [userTag, setuserTag] = React.useState("")

    const token = sessionStorage.getItem('token');

    function handleTags(e){
        sessionStorage.removeItem('tag');
        sessionStorage.setItem('tag', userTag);
        FlashCardService.get("/study",{
            params: {
                owner: token,
                tag: userTag
            }
        }).then((response) => {
            window.location.href="http://localhost:3000/studying"
        }).catch(
            function (error){
                alert("A tag não possui nenhum card vinculado ainda!")
            }
        )
    }

    useEffect(() => {
        FlashCardService.get("/tag/list",{
            params: {
                requester: token
            }
        }).then((response) => {
            setMenuApplication(response.data);
        }).catch(
            function (error){
                alert("Não foi possivel carregar as tags!")
                console.log(error);
            }
        )
    }, [])

    return (
        <StyledEngineProvider injectFirst>
            {<div>
                <MainDiv>
                    <ImgStyled src="https://cdn.zeplin.io/628f772ac9ae2e79fdc29973/assets/29396b5d-b783-47d5-b5a2-c533cc52b377.png"/>
                    <TypographyStyled>Sessão de estudos</TypographyStyled>
                    <HomeButton/>
                    <LogoutButton/>
                    <div style={{marginLeft: '50px'}}>
                        <BoxStyled>
                            <TypographyStyled style={{fontSize: '35px', fontFamily: 'Alice',
                                marginLeft: '105', marginRight: '105'}}>
                                Escolha a Tag que deseja estudar
                            </TypographyStyled>
                            <AutocompleteStyled
                                id="tags-standard"
                                options={menuApplication}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Tag"
                                        placeholder="Tags"
                                    />
                                )}
                                onChange={(event, value) => setuserTag(value._id)}
                            />
                            <ButtonStyled onClick={()=>{handleTags();}}>
                                Confirmar
                            </ButtonStyled>
                        </BoxStyled>
                    </div>
                </MainDiv>
            </div>}
        </StyledEngineProvider>
    )
}

export default StudiesPage
