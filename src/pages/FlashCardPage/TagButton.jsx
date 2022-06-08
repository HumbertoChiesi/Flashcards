import React, {useEffect, useState} from "react";
import FlashCardService from "../../services/FlashCardService";
import Button from "@mui/material/Button";
import {styled} from "@mui/system";
import {Autocomplete, Backdrop, Box, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import file from "./tags.json";
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
    color: '#886ca1',
})
const TypographyStyled = styled(Typography)({
    fontSize: '32px',
    display: 'block',
    textAlign: 'center',
    fontFamily: 'Alice',
    color: '#58455b',

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
    marginTop: '30px',
    marginBottom: '50px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '15px',
})
const ButtonStyled = styled(Button)({
    width: '100px',
    height: '50px',
    float: 'right',
    backgroundColor: '#e5f2e4',
    marginTop: '15px',
    marginLeft: '630px',
    borderRadius: '50px',
    textAlign: 'center',
    '&:hover': {
        backgroundColor: '#cfdbce',
    },
})

const TagButton = (props) => {
    const [menuApplication, setMenuApplication] = React.useState([])
    const [popUp, setpopUp] = React.useState(false)
    const [tag, setTag] = React.useState("")

    const token = sessionStorage.getItem('token');

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

    function handleAdd(e){
        FlashCardService.put("/flashcard/edit",{
            "requester": token,
            "flashCard": props.row._id,
            "question": props.row.question,
            "answers": props.row.answers,
            "tag": tag
        }).then((response) => {
            console.log(response.data);
            window.location.reload();
        }).catch(
            function (error){
                alert(error.response.data)
                window.location.reload();
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
            <Button onClick={()=>{handlePopUp();}}>
                <LocalOfferOutlinedIcon sx={{ color: '#886ca1', width: '30px', height: '30px'}}/>
                <Typography style={{color: '#886ca1', maxWidth: '50px'}}>
                    {props.row.tag !== undefined
                    ? props.row.tag.name
                    : null}
                </Typography>
            </Button>
            {popUp === true
                ? <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={popUp}>
                    <BoxStyled>
                        <ButtonStyled onClick={()=>{handlePopUp();}}>
                            <CloseIconStyled sx={{ color: '#886ca1', width: '30px', height: '30px'}}></CloseIconStyled>
                        </ButtonStyled>
                        <TypographyStyled>Qual tag deseja escolher?</TypographyStyled>
                        <AutocompleteStyled
                            disablePortal
                            id="combo-box-demo"
                            options={menuApplication}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Tags"
                                    variant="standard"
                                />
                            )}
                            onChange={(event, value) => setTag(value._id)}
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

export default TagButton
