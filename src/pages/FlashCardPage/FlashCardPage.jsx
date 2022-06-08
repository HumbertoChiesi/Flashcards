import React, {useEffect} from "react";
import {
    Typography,
    StyledEngineProvider,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Box,
    Pagination,
} from "@mui/material";
import {styled} from "@mui/system";
import DeleteButton from './DeleteButton'
import AddButton from "./AddButton";
import EditButton from "./EditButton";
import TagButton from "./TagButton";
import FlashCardService from "../../services/FlashCardService";
import CreateTagButton from "./CreateTagButton";
import HomeButton from "../components/HomeButton";
import LogoutButton from "../components/LogoutButton";
import ShareButton from "./ShareButton";
import Authenticator from "../../middlewares/Authenticator";

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
    marginLeft: '50px',
    display: 'inline-block',
    width: '148px',
    height: '150px',
})
const BoxStyled = styled(Box)({
    width: '1419px',
    height: '70px',
    backgroundColor: '#e5f2e4',
    marginTop: '15px',
    borderRadius: '50px',
    textAlign: 'center',
    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)'
})
const RowTypography = styled(Typography)({
    marginLeft: '10px',
    fontSize: '20px',
    fontFamily: 'Alice',
    color: '#58455b',
})

const FlashcardsPage = () => {
    Authenticator();

    const [menuApplication, setMenuApplication] = React.useState([])
    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState(0);
    const rowsPerPage = 6;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, menuApplication.length - (page-1) * rowsPerPage);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        getFlashCards()
    }, [])

    function getFlashCards(){
        FlashCardService.get("/flashcard/list",{
            params: {
                requester: token
            }
        }).then((response) => {
            console.log(response.data)
            setMenuApplication(response.data.flashCards);
            setPages(Math.ceil(response.data.totalFlashCards / 6))
        }).catch(
            function (error){
                alert("Não foi possivel carregar os flash cards!")
                console.log(error);
            }
        )
    }

    return (
        <StyledEngineProvider injectFirst>
            {<div>
                <MainDiv>
                    <ImgStyled src="https://cdn.zeplin.io/628f772ac9ae2e79fdc29973/assets/13b204f2-3f61-4a7e-b6c7-c9ae0c443ae5.png"/>
                    <TypographyStyled>Meus Flash Cards</TypographyStyled>
                    <HomeButton/>
                    <LogoutButton/>
                    <div style={{marginLeft: '50px'}}>
                        <AddButton func={getFlashCards}></AddButton>
                        <CreateTagButton></CreateTagButton>
                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableHead>
                                </TableHead>
                                <TableBody>
                                    {menuApplication
                                        .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                                        .map((row, index) => (
                                            <BoxStyled>
                                                <TableRow component={"div"} style={{borderCollapse: 'collapse'}} key={index}>
                                                    <TableCell align="left" component="th" scope="row" sx={{minWidth: '720px'}}>
                                                        <RowTypography>{row.question}</RowTypography>
                                                    </TableCell>
                                                    <TableCell align="left" component="th" scope="row" sx={{minWidth: '220px'}}>
                                                        {row.owner._id !== token
                                                        ? <RowTypography>Flashcard de {row.owner.username}</RowTypography>
                                                        : null}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row" sx={{minWidth: '50px', paddingTop: '15px'}}>
                                                        <EditButton func={getFlashCards} row={row} style={{display: 'inline-block'}}/>
                                                    </TableCell>
                                                    <TableCell component="th" scope="row" sx={{minWidth: '50px', paddingTop: '15px'}}>
                                                        <ShareButton row={row} style={{display: 'inline-block'}}/>
                                                    </TableCell>
                                                    <TableCell align="left" component="th" scope="row" sx={{minWidth: '200px', paddingTop: '15px'}}>
                                                        <TagButton row={row} style={{display: 'inline-block'}}/>
                                                    </TableCell>
                                                    <TableCell align='right' component="th" scope="row" sx={{minWidth: '50px', paddingTop: '15px'}}>
                                                        <DeleteButton func={getFlashCards} _id={row._id} style={{display: 'inline-block'}}/>
                                                    </TableCell>
                                                </TableRow>
                                            </BoxStyled>
                                        ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 75 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <Pagination
                                count={pages}
                                page={page}
                                onChange={handleChangePage}
                                showFirstButton={false}
                                showLastButton={false}
                                sx={{marginTop: '16px', marginLeft: (1512 -((pages+2)*38))/2 - 50 + "px"}}
                            />
                        </TableContainer>
                    </div>
                </MainDiv>
            </div>}
        </StyledEngineProvider>
    )
}

export default FlashcardsPage
