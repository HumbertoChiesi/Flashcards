import React, {useEffect} from "react";
import FlashCardService from "../../services/FlashCardService";
import Button from "@mui/material/Button";
import {styled} from "@mui/system";
import {Autocomplete, Backdrop, Box, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from "@mui/icons-material/Add";

const BoxStyled = styled(Box)({
    width: '700px',
    height: '405px',
    backgroundColor: '#e5f2e4',
    borderRadius: '50px',
})
const CloseIconStyled = styled(CloseIcon)({
    width: '30px',
    height: '30px',
    display: 'block',
    color: '#886ca1',
    margin: '15px 20px 0 639px'
})
const TypographyStyled = styled(Typography)({
    fontSize: '32px',
    display: 'block',
    textAlign: 'center',
    fontFamily: 'Alice',
    color: '#58455b',
})
const ButtonStyled = styled(Button)({
    width: '100px',
    height: '50px',
    backgroundColor: '#e5f2e4',
    marginTop: '15px',
    marginLeft: '1315px',
    borderRadius: '50px',
    textAlign: 'center',
    '&:hover': {
        backgroundColor: '#cfdbce',
    },
})
const ButtonCC = styled(Button)({
    width: '240px',
    height: '58px',
    borderRadius: '50px',
    backgroundColor: '#48324a',
    fontSize: '22px',
    fontFamily: 'Alice',
    marginTop: '20px',
    '&:hover': {
        backgroundColor: '#634466',
    },
})
const AutocompleteStyled = styled(Autocomplete)({
    borderRadius:30,
    backgroundColor: '#c8d6c4',
    display: 'block',
    width: 516,
    height: 65,
    marginTop: '50px',
    marginBottom: '50px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '15px',
    paddingRight: '15px'
})

const AddButton = (props) => {
    const [menuApplication, setMenuApplication] = React.useState([])
    const [popUp, setpopUp] = React.useState(false)
    const [ID, setID] = React.useState("")

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        FlashCardService.get("/friend/possibilities",{
            params: {
                requester: token
            }
        }).then((response) => {
            setMenuApplication(response.data);
        }).catch(
            function (error){
                alert("Não foi possivel carregar os usuario com possibilidade de amizade!")
                console.log(error);
            }
        )
    }, [])


    function handleAdd(e){
        FlashCardService.post("/friend/add", {
            "requester": token,
            "friend": ID
        }).then((response) => {
            console.log(response.data);
            props.func();
            setpopUp(false);
        }).catch(
            function (error){
                alert("Could not Add friend: " + error)
            }
        );
    }

    function handlePopUp(e){
        if (popUp){
            setpopUp(false)
        } else {
            setpopUp(true)
        }
    }

    return(
        <div>
            <ButtonStyled onClick={()=>{handlePopUp();}}>
                <AddIcon sx={{ color: '#886ca1', width: '30px', height: '30px'}}></AddIcon>
            </ButtonStyled>
            {popUp === true
                ? <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={popUp}>
                    <BoxStyled>
                        <Button onClick={()=>{handlePopUp();}}><CloseIconStyled/></Button>
                        <TypographyStyled>Nome do usuário que deseja adicionar</TypographyStyled>
                        <AutocompleteStyled
                            disablePortal
                            id="combo-box-demo"
                            options={menuApplication}
                            getOptionLabel={(option) => option.username}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Tags"
                                />
                            )}
                            onChange={(event, value) => setID(value._id)}
                        />
                        <ButtonCC onClick={()=>{handlePopUp();}} sx={{marginLeft: '85px', marginRight: '56px'}}>
                            Cancelar
                        </ButtonCC>
                        <ButtonCC onClick={()=>{handleAdd();}}>
                            Confirmar
                        </ButtonCC>
                    </BoxStyled>
                </Backdrop>
                : null

            }
        </div>
    );
}

export default AddButton
