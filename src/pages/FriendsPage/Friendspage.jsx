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
import file from "./friends.json"
import DeleteButton from './DeleteButton'
import AddButton from "./AddButton";
import Authenticator from "../../middlewares/Authenticator";
import FlashCardService from "../../services/FlashCardService";
import HomeButton from "../components/HomeButton";
import LogoutButton from "../components/LogoutButton";

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
    marginRight: '350px',
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
    height: '60px',
    backgroundColor: '#e5f2e4',
    marginTop: '15px',
    borderRadius: '50px',
    textAlign: 'center',
    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)'
})
const RowTypography = styled(Typography)({
    marginLeft: '10px',
    fontSize: '23px',
    fontFamily: 'Alice',
    color: '#58455b',
})

const FriendsPage = () => {
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
        getFriends();
    }, [])

    function getFriends(){
        FlashCardService.get("/friend/list",{
            params: {
                requester: token
            }
        }).then((response) => {
            setMenuApplication(response.data.friends);
            setPages(Math.ceil(response.data.totalFriends / 6))
        }).catch(
            function (error){
                alert("Não foi possivel carregar a lista de amigos!" + error)
                console.log(error);
            }
        )
    }

    return (
        <StyledEngineProvider injectFirst>
            {<div>
                <MainDiv>
                    <ImgStyled src="https://cdn.zeplin.io/628f772ac9ae2e79fdc29973/assets/82223366-f945-4a8a-a9b6-74374925c4b2.png"/>
                    <TypographyStyled>Meus Amigos</TypographyStyled>
                    <HomeButton/>
                    <LogoutButton/>
                    <div style={{marginLeft: '50px'}}>
                        <AddButton func={getFriends}></AddButton>
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
                                                    <TableCell align="left" component="th" scope="row" sx={{minWidth: '609px'}}>
                                                        <RowTypography sx={{marginLeft: '50px'}}>{row.name}</RowTypography>
                                                    </TableCell>
                                                    <TableCell align="left" component="th" scope="row" sx={{minWidth: '609px'}}>
                                                        <RowTypography sx={{marginLeft: '50px'}}>{row.username}</RowTypography>
                                                    </TableCell>
                                                    <TableCell align='right' component="th" scope="row" sx={{minWidth: '190px', paddingTop: '10px'}}>
                                                        <DeleteButton friendshipId={row.friendshipId} sx={{width: '30px', height: '30px'}}/>
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

export default FriendsPage
