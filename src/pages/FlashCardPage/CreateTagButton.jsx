import React, {useEffect} from "react";
import FlashCardService from "../../services/FlashCardService";
import Button from "@mui/material/Button";
import {styled} from "@mui/system";
import {Backdrop, Box, Checkbox, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import StyleIcon from '@mui/icons-material/Style';


const BoxStyled = styled(Box)({
    width: '850px',
    height: '500px',
    backgroundColor: '#e5f2e4',
    borderRadius: '50px',
})
const CloseIconStyled = styled(CloseIcon)({
    width: '30px',
    height: '30px',
    display: 'block',
    color: '#886ca1',
})
const ButtonStyled = styled(Button)({
    width: '140px',
    height: '50px',
    float: 'right',
    backgroundColor: '#e5f2e4',
    marginRight: '43px',
    marginTop: '15px',
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
    display: 'block',
    '&:hover': {
        backgroundColor: '#634466',
    },
})
const TypographyStyled = styled(Typography)({
    fontSize: '32px',
    display: 'block',
    textAlign: 'center',
    fontFamily: 'Alice',
    marginTop: '30px',
    color: '#58455b',
})
const TextFieldStyled = styled(TextField)({
    mx: 'auto',
    borderRadius:30,
    backgroundColor: '#c8d6c4',
    display: 'block',
    width: 516,
    height: 65,
    marginTop: '50px',
    marginBottom: '50px',
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


const CreateTagButton = (props) => {
    const [popUp, setpopUp] = React.useState(false)
    const [userTag, setuserTag] = React.useState(false)

    const token = sessionStorage.getItem('token');

    function handlePopUp(e){
        if (popUp){
            setpopUp(false)
        } else {
            setpopUp(true)
        }
    }

    function handleCreateTag(e){
        FlashCardService.post("/tag/create",{
            "owner": token,
            "name": userTag
        }).then((response) => {
            console.log(response.data);
            window.location.reload();
        }).catch(
            function (error){
                alert(error.response.data)
            }
        )
    }

    return(
        <div>
            <ButtonStyled onClick={()=>{handlePopUp();}}>
                <StyleIcon sx={{ color: '#886ca1', width: '30px', height: '30px'}}></StyleIcon>
            </ButtonStyled>
            {popUp === true
                ? <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={popUp}>
                    <BoxStyled>
                        <Button style={{margin: '15px 15px 10px 780px'}} onClick={()=>{handlePopUp();}}>
                            <CloseIconStyled/>
                        </Button>
                        <TypographyStyled>Digite a tag que deseja criar</TypographyStyled>
                        <TextFieldStyled label={"Tag"} onChange={e => setuserTag(e.target.value)} fullWidth id="fullWidth"/>
                        <ButtonCC onClick={()=>{handleCreateTag();}} style={{marginLeft: '309px'}}>
                            Salvar
                        </ButtonCC>
                    </BoxStyled>
                </Backdrop>
                : null

            }
        </div>
    );
}

export default CreateTagButton
