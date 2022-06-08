import {Box, Checkbox, Typography} from "@mui/material";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import React, {useEffect} from "react";
import {styled} from "@mui/styles";
import FlashCardService from "../../services/FlashCardService";
import Button from "@mui/material/Button";
import ReactCardFlip from 'react-card-flip';
import CardAnswer from "./CardAnswer";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import UTurnLeftOutlinedIcon from '@mui/icons-material/UTurnLeftOutlined';

const TypographyStyled = styled(Typography)({
    position: 'relative',
    display: 'inline-block',
    textAlign: 'center',
    fontFamily: 'Alice',
    color: '#58455b',
})
const BoxStyled = styled(Box)({
    width: '850px',
    height: '620px',
    backgroundColor: '#e5f2e4',
    marginTop: '15px',
    marginLeft: '331px',
    borderRadius: '50px',
    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)'
})
const ButtonStyled = styled(Button)({
    marginTop: '25px',
    borderRadius: '50px',
    textAlign: 'center',
})


const FlashCard = (props) => {
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [answers, setAnswers] = React.useState([false, false, false, false, false]);
    const [timesRight, setTimesRight] = React.useState(0)

    const token = sessionStorage.getItem('token');
    const userTag = sessionStorage.getItem("tag");

    const [menuApplication, setMenuApplication] = React.useState({
        answers: [
            {
                text: "",
            },
            {
                text: "",
            },
            {
                text: "",
            },
            {
                text: "",
            },
            {
                text: "",
            },
        ]
    })

    function getData(){
       if (userTag === ""){
           FlashCardService.get("/study",{
               params: {
                   owner: token,
               }
           }).then((response) => {
               setMenuApplication(response.data.flashCard)
               setAnswers([false, false, false, false, false])
           }).catch(
               function (error){
                   alert("Não foi possivel carregar as tags!" + error.response.data)
               }
           )
       } else {
           FlashCardService.get("/study",{
               params: {
                   owner: token,
                   tag: userTag
               }
           }).then((response) => {
               setMenuApplication(response.data.flashCard)
               setAnswers([false, false, false, false, false])
           }).catch(
               function (error){
                   alert("Não foi possivel carregar as tags!" + error.response.data)
               }
           )
       }
    }

    useEffect(() => {  getData()}, [])

    function isRight(skip){
        let answer = false
        if (!skip){
            let counter = 0
            for (let i = 0; i < 5; i++){
                if(menuApplication.answers[i].isRightAnswer !== answers[i]){
                    counter = counter + 1
                }
            }
            if(counter === 0){
                answer = true;
                setTimesRight(timesRight + 1);
            }
        }
        FlashCardService.post("/flashcard/answer",{
            "user": token,
            "userFlashCard": menuApplication.userFlashCard,
            "answeredRight": answer
        }).then((response) => {
        }).catch(
            function (error){
                alert(error.response.data)
            }
        )
    }

    function handleCheck(e, index){
        setAnswers([false, false, false, false, false])
        setAnswers([0 === index, 1 === index, 2 === index, 3 === index, 4 === index])
    }

    async function handleSkip(e) {
        setAnswers([false, false, false, false, false])
        isRight(true);
        await new Promise(r => setTimeout(r, 100));
        FlashCardService.get("/study", {
            params: {
                owner: token,
                tag: userTag
            }
        }).then((response) => {
            setMenuApplication(response.data.flashCard);
        }).catch(
            function (error) {
                alert("Não foi possivel carregar a tag!" + error.response.data)
            }
        )
    }

    return(
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div style={{marginLeft: '50px'}}>
                <BoxStyled>
                    <TypographyStyled style={{fontSize: '45px', marginLeft: '30px', marginRight: '30px', marginTop: '20px', maxHeight: '120px', height: '100%'}}>
                        {menuApplication.question}
                    </TypographyStyled>
                    <div style={{marginLeft: '25px'}}>
                        <div style={{display: 'block'}}>
                            <Checkbox color="default"
                                      checked={answers[0]}
                                      onChange={e => {handleCheck(e, 0)}}/>
                            <TypographyStyled style={{fontSize: '45px', marginLeft: '20px'}}>{menuApplication.answers[0].text}</TypographyStyled>
                        </div>
                        <div style={{display: 'block'}}>
                            <Checkbox color="default"
                                      checked={answers[1]}
                                      onChange={e => {handleCheck(e, 1)}}/>
                            <TypographyStyled style={{fontSize: '45px',  marginLeft: '20px'}}>{menuApplication.answers[1].text}</TypographyStyled>
                        </div>
                        <div style={{display: 'block'}}>
                            <Checkbox color="default"
                                      checked={answers[2]}
                                      onChange={e => {handleCheck(e, 2)}}/>
                            <TypographyStyled style={{fontSize: '45px',  marginLeft: '20px'}}>{menuApplication.answers[2].text}</TypographyStyled>
                        </div>
                        <div style={{display: 'block'}}>
                            <Checkbox color="default"
                                      checked={answers[3]}
                                      onChange={e => {handleCheck(e, 3)}}/>
                            <TypographyStyled style={{fontSize: '45px',  marginLeft: '20px'}}>{menuApplication.answers[3].text}</TypographyStyled>
                        </div>
                        <div style={{display: 'block', marginBottom: '20px'}}>
                            <Checkbox color="default"
                                      checked={answers[4]}
                                      onChange={e => {handleCheck(e, 4)}}/>
                            <TypographyStyled style={{fontSize: '45px',  marginLeft: '20px'}}>{menuApplication.answers[4].text}</TypographyStyled>
                        </div>
                    </div>
                    <ButtonStyled sx={{marginLeft: '25px', maxWidth: '120px', width: '100%'}} disabled={true}>
                        <CheckRoundedIcon sx={{color: '#58455b', width: '50px', height: '50px'}}/>
                        <TypographyStyled style={{fontSize: '40px'}}>{timesRight}</TypographyStyled>
                    </ButtonStyled>
                    <ButtonStyled onClick={()=>{setIsFlipped(!isFlipped); isRight(false);}} sx={{marginLeft: '199px'}}>
                        <UTurnLeftOutlinedIcon sx={{color: '#58455b', width: '50px', height: '50px'}}></UTurnLeftOutlinedIcon>
                        <TypographyStyled style={{fontSize: '30px'}}>Virar</TypographyStyled>
                    </ButtonStyled>
                    <ButtonStyled onClick={e => {handleSkip(e)}} sx={{marginLeft: '253px'}}>
                        <ArrowForwardIosIcon sx={{color: '#58455b', width: '50px', height: '50px'}}/>
                    </ButtonStyled>
                </BoxStyled>
            </div>

            <div style={{marginLeft: '50px'}}>
                <BoxStyled>
                    <TypographyStyled style={{fontSize: '45px', marginLeft: '25px', marginRight: '25px', marginTop: '20px', maxHeight: '120px', height: '100%'}}>
                        {menuApplication.question}
                    </TypographyStyled>
                    <div style={{marginLeft: '25px'}}>
                        <CardAnswer checked={answers[0]} isRight={menuApplication.answers[0].isRightAnswer} answer={menuApplication.answers[0].text}/>
                        <CardAnswer checked={answers[1]} isRight={menuApplication.answers[1].isRightAnswer} answer={menuApplication.answers[1].text}/>
                        <CardAnswer checked={answers[2]} isRight={menuApplication.answers[2].isRightAnswer} answer={menuApplication.answers[2].text}/>
                        <CardAnswer checked={answers[3]} isRight={menuApplication.answers[3].isRightAnswer} answer={menuApplication.answers[3].text}/>
                        <CardAnswer checked={answers[4]} isRight={menuApplication.answers[4].isRightAnswer} answer={menuApplication.answers[4].text}/>
                        <div style={{marginTop: '20px'}}>
                            <ButtonStyled sx={{maxWidth: '120px', width: '100%'}} disabled={true}>
                                <CheckRoundedIcon sx={{color: '#58455b', width: '50px', height: '50px'}}/>
                                <TypographyStyled style={{fontSize: '40px'}}>{timesRight}</TypographyStyled>
                            </ButtonStyled>
                            <ButtonStyled onClick={() => {getData(); setIsFlipped(false);}} sx={{marginLeft: '246px'}}>
                                <ArrowForwardIosIcon sx={{color: '#58455b', width: '50px', height: '50px'}}/>
                            </ButtonStyled>
                        </div>
                    </div>
                </BoxStyled>
            </div>
        </ReactCardFlip>
    )
}

export default FlashCard
