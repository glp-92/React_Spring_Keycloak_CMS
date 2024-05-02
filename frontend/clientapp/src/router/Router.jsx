import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Logout from "../pages/logout/Logout";
import Search from "../pages/search/Search";
import Post from "../pages/post/Post";
import NotFound from "../pages/notfound/NotFound";
import Writer from "../pages/writer/Writer";
import AdminPannel from "../pages/adminPannel/AdminPannel";
import Footer from '../components/footer/Footer.jsx'
import NavBar from '../components/navbar/Navbar.jsx'

import DependsLogged from "./DependsLogged";

export const Router = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route element={<DependsLogged />}>
                    <Route exact path="/logout" element={<Logout />} />
                </Route>
                <Route path="/search" element={<Search />} />
                <Route path="/post/:postSlug" element={<Post />} />
                <Route exact path="/notfound" element={<NotFound />} />
                <Route element={<DependsLogged />}>
                    <Route exact path="/wpannel" element={<AdminPannel />} />
                </Route>
                <Route element={<DependsLogged />}>
                    <Route path="/wpannel/writer" element={<Writer />} />
                </Route>
                <Route path="*" element={<Navigate to="/notfound" />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}