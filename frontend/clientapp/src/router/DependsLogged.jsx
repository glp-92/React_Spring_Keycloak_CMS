import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import NotFound from '../pages/notfound/NotFound';
import { ValidateToken } from '../util/requests/ValidateToken';
import Loading from '../components/loading/Loading';

import Box from '@mui/material/Box';

const DependsLogged = () => {

    /*const fetchTokenValid = async () => {
        let isValid = await ValidateToken();
        return isValid;
    }
    const { tokenValid, error, isLoading } = useQuery('data', fetchTokenValid);
    console.log(tokenValid);*/

    const [tokenValid, setTokenValid] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTokenValid = async () => {
            setIsLoading(true);
            let isValid = await ValidateToken();
            setTokenValid(isValid);
            setIsLoading(false);
        }
        fetchTokenValid();
    }, []);

    return (
        <Box sx={{ flex:1, display: 'flex', flexDirection: 'column', width: '100%', marginBottom: 3, marginTop: 2 }}>
            {
                isLoading ? (
                    <Loading height={300} />
                ) : (
                    tokenValid ? (
                        <Outlet />
                    ) :
                        <NotFound />
                )
            }
        </Box>
    )
}

export default DependsLogged