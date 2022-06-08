import React from "react";
import FlashCardService from "../../services/FlashCardService";
import Button from "@mui/material/Button";
import {styled} from "@mui/system";
import {Backdrop, Box, Checkbox, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const BoxStyled = styled(Box)({
    width: '850px',
    height: '720px',
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
const TextFieldStyled = styled(TextField)({
    mx: 'auto',
    borderRadius:30,
    backgroundColor: '#c8d6c4',
    display: 'inline-block',
    width: 602,
    height: 59,
    marginBottom: '30px',
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

const token = sessionStorage.getItem('token');

var row= {
    requester: token,
    flashCard: "",
    question: "",
    answers: [
        {
            text: "",
            isRightAnswer: false
        },
        {
            text: "",
            isRightAnswer: false
        },
        {
            text: "",
            isRightAnswer: false
        },
        {
            text: "",
            isRightAnswer: false
        },
        {
            text: "",
            isRightAnswer: false
        }
    ],
}


const EditButton = (props) => {
    const [popUp, setpopUp] = React.useState(false)
    const token = sessionStorage.getItem('token');

    row["flashCard"] = props.row._id;
    row["question"] = props.row.question;
    row["answers"] = props.row.answers;

    function handleAdd(e){
        console.log(row)
        FlashCardService.put("/flashcard/edit", row).then((response) => {
            console.log(response.row);
            props.func();
            setpopUp(false);
        }).catch(
            function (error){
                alert(error.response.data)
            }
        )
    }
    function handlePopUp(e){
        if (popUp){
            setpopUp(false)
        } else {
            setpopUp(true)
        }
    }
    function handleQuestion(e, question){
        row["question"] = question
    }
    function handleAnswer(e, index, text){
        row["answers"][index]["text"] = text
    }
    function handleCheck(e, index){
        row["answers"][index]["isRightAnswer"] === true
            ? row["answers"][index]["isRightAnswer"] = false
            : row["answers"][index]["isRightAnswer"] = true
    }

    return(
        <div>
            {props.row.owner._id === token
                ?   <Button onClick={()=>{handlePopUp();}}>
                        <EditOutlinedIcon sx={{ color: '#886ca1', width: '30px', height: '30px'}}/>
                    </Button>
                :   <Button></Button>
            }
            {popUp === true
                ? <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={popUp}>
                    <BoxStyled>
                        <Button style={{margin: '15px 15px 10px 780px'}} onClick={()=>{handlePopUp();}}>
                            <CloseIconStyled/>
                        </Button>
                        <TextFieldStyled label="Digite a pergunta" style={{width: '646px', display: 'block'}}
                                         onChange={e => handleQuestion(e, e.target.value)}
                                         defaultValue={props.row["question"]}
                                         fullWidth id="fullWidth"/>
                        <div style={{marginLeft: '100px'}}>
                            <div style={{display: 'block'}}>
                                <Checkbox color="default" onChange={e => handleCheck(e, 0)}
                                          defaultChecked={props.row["answers"][0]["isRightAnswer"]}/>
                                <TextFieldStyled label="Resposta 1"
                                                 onChange={e => handleAnswer(e, 0, e.target.value)}
                                                 defaultValue={props.row["answers"][0]["text"]}
                                                 fullWidth id="fullWidth"/>
                            </div>
                            <div style={{display: 'block'}}>
                                <Checkbox color="default" onChange={e => handleCheck(e, 1)}
                                          defaultChecked={props.row["answers"][1]["isRightAnswer"]}/>
                                <TextFieldStyled label="Resposta 2" onChange={e => handleAnswer(e, 1, e.target.value)}
                                                 defaultValue={props.row["answers"][1]["text"]}
                                                 fullWidth id="fullWidth"/>
                            </div>
                            <div style={{display: 'block'}}>
                                <Checkbox color="default" onChange={e => handleCheck(e, 2)}
                                          defaultChecked={props.row["answers"][2]["isRightAnswer"]}/>
                                <TextFieldStyled label="Resposta 3" onChange={e => handleAnswer(e, 2, e.target.value)}
                                                 defaultValue={props.row["answers"][2]["text"]}/>
                            </div>
                            <div style={{display: 'block'}}>
                                <Checkbox color="default" onChange={e => handleCheck(e, 3)}
                                          defaultChecked={props.row["answers"][3]["isRightAnswer"]}/>
                                <TextFieldStyled label="Resposta 4" onChange={e => handleAnswer(e, 3, e.target.value)}
                                                 defaultValue={props.row["answers"][3]["text"]}
                                                 fullWidth id="fullWidth"/>
                            </div>
                            <div style={{display: 'block'}}>
                                <Checkbox color="default" onChange={e => handleCheck(e, 4)}
                                          defaultChecked={props.row["answers"][4]["isRightAnswer"]}/>
                                <TextFieldStyled label="Resposta 5" onChange={e => handleAnswer(e, 4, e.target.value)}
                                                 defaultValue={props.row["answers"][4]["text"]}
                                                 fullWidth id="fullWidth"/>
                            </div>
                        </div>
                        <ButtonCC onClick={()=>{handleAdd();}} style={{marginLeft: '309px'}}>
                            Salvar
                        </ButtonCC>
                    </BoxStyled>
                </Backdrop>
                : null
            }
        </div>
    );
}

export default EditButton
