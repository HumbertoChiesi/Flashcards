import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import HomePage from "../pages/HomePage/HomePage";
import StudiesPage from "../pages/StudiesPage/StudiesPage";
import FlashCardPage from "../pages/FlashCardPage/FlashCardPage";
import FriendsPage from "../pages/FriendsPage/Friendspage";
import StudyingPage from "../pages/StudiesPage/StudyingPage";



const Router = () => {
    return(
        <BrowserRouter>
            <App>
                <Routes>
                    <Route exact path="/"  element={<LoginPage/>}/>
                    <Route exact path="/login"  element={<LoginPage/>}/>
                    <Route exact path="/register"  element={<RegisterPage/>}/>
                    <Route exact path="/home"  element={<HomePage/>}/>
                    <Route exact path="/studies"  element={<StudiesPage/>}/>
                    <Route exact path="/studying"  element={<StudyingPage/>}/>
                    <Route exact path="/flashcard"  element={<FlashCardPage/>}/>
                    <Route exact path="/friends"  element={<FriendsPage/>}/>
                </Routes>
            </App>
        </BrowserRouter>
    )
}

export default Router
