import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import React from "react";
import FlashCardService from "../../services/FlashCardService";
import Button from "@mui/material/Button";
import {styled} from "@mui/system";
import {Backdrop, Box, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';

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
const AtentionIconStyled = styled(ContactSupportOutlinedIcon)({
    width: '120px',
    height: '120px',
    color: '#886ca1',
    marginRight: '290px'
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

const DeleteButton = (props) => {
    const [popUp, setpopUp] = React.useState(false)

    const friendshipId = props.friendshipId
    const token = sessionStorage.getItem('token');

    console.log(friendshipId)

    function handleDelete(e){
        FlashCardService.delete("/friend/delete", {
            data:{
                "friendship": friendshipId
            }
        }).then((response) => {
            console.log(response.data);
            window.location.reload();
        }).catch(
            function (error){
                alert("Could not delete the friendship: " + error)
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
               <DeleteOutlinedIcon sx={{ color: '#886ca1' }}/>
           </Button>
           {popUp === true
               ? <Backdrop
                   sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                   open={popUp}>
                   <BoxStyled>
                       <Button onClick={()=>{handlePopUp();}}><CloseIconStyled/></Button>
                       <AtentionIconStyled/>
                       <TypographyStyled>Tem certeza que deseja desfazer</TypographyStyled>
                       <TypographyStyled>esta amizade?</TypographyStyled>
                       <ButtonStyled onClick={()=>{handlePopUp();}}>Cancelar</ButtonStyled>
                       <ButtonStyled onClick={()=>{handleDelete();}} sx={{marginRight: '85px', marginLeft: '56px'}}>
                           Confirmar
                       </ButtonStyled>
                   </BoxStyled>
                 </Backdrop>
               : null

           }
       </div>
   );
}

export default DeleteButton
