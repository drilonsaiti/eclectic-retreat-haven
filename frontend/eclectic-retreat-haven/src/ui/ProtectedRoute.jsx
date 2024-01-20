import {useGetToken} from "../services/useGetToken.js";
import styled from "styled-components";
import Spinner from "./Spinner.jsx";
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useGetRole} from "../services/useGetRole.js";
import AccessDenied from "./AccessDenied.jsx";
import BookingDetail from "../features/bookings/BookingDetail.jsx";
import Checkin from "../pages/Checkin.jsx";
import Accommodations from "../pages/Accommodations.jsx";
import Account from "../pages/Account.jsx";

const FullPage = styled.div`
height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`

const ProtectedRoute = ({ children,adminOnly,userOnly }) => {
    const { goToLogin, isLoading, token } = useGetToken();
    const navigate = useNavigate();

    const {roles,isLoading:isLoadingRole} = useGetRole();

    useEffect(() => {
        if (goToLogin) {
            navigate("/login");
        }
    }, [goToLogin, navigate]);

    if (isLoading || isLoadingRole) {
        return <FullPage><Spinner/></FullPage>;
    }

    const hasAdminRole = roles ==="ROLE_ADMIN";
    const hasUserRole = roles === "ROLE_USER";
    if (adminOnly && !hasAdminRole) {
        return <FullPage><AccessDenied /></FullPage>;
    }

    if (userOnly && !hasUserRole) {
        return <FullPage><AccessDenied /></FullPage>;
    }

    return children;


};

export default ProtectedRoute;