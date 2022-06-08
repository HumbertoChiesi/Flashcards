import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import React, {useEffect} from "react";
import FlashCardService from "../../services/FlashCardService";
import Button from "@mui/material/Button";
import {styled} from "@mui/system";
import {Autocomplete, Backdrop, Box, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import tags from "./tags.json"
import users from "../FriendsPage/friends.json"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

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
    paddingRight: '15px'
})

const ShareButton = (props) => {
    const [menuApplication, setMenuApplication] = React.useState([])
    const [popUp, setpopUp] = React.useState(false)
    const [friendID, setfriendID] = React.useState("")

    const token = sessionStorage.getItem('token');
    const fcID = props.row._id;

    useEffect(() => {
        FlashCardService.get("/friend/list",{
            params: {
                requester: token
            }
        }).then((response) => {
            setMenuApplication(response.data.friends);
        }).catch(
            function (error){
                alert("Não foi possivel carregar os usuários!")
                console.log(error);
            }
        )
    },[])

    function handleShare(e){
        FlashCardService.post("/flashcard/share", {
            "requester": token,
            "friend": friendID,
            "flashCard": fcID
        }).then((response) => {
            console.log(response.data);
            setpopUp(false);
        }).catch(
            function (error){
                alert(error.response.data)
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
            {props.row.owner._id === token
                ?   <Button onClick={()=>{handlePopUp();}}>
                        <ShareIcon sx={{ color: '#886ca1', width: '30px', height: '30px'}}/>
                    </Button>
                :   <Button></Button>
            }
            {popUp === true
                ? <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={popUp}>
                    <BoxStyled>
                        <Button onClick={()=>{handlePopUp();}}><CloseIconStyled/></Button>
                        <TypographyStyled>Com quem deseja compartilhar</TypographyStyled>
                        <TypographyStyled>este flash card?</TypographyStyled>
                        <AutocompleteStyled
                            disablePortal
                            id="combo-box-demo"
                            options={menuApplication}
                            getOptionLabel={(option) => option.name + " / " + option.username}
                            onChange={(event, value) => setfriendID(value._id)}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Usuários" variant="standard"
                            />}
                        />
                        <ButtonStyled onClick={() => {handleShare();}} sx={{marginLeft: '234px'}}>
                            Compartilhar
                        </ButtonStyled>
                    </BoxStyled>
                </Backdrop>
                : null

            }
        </div>
    );
}

export default ShareButton
