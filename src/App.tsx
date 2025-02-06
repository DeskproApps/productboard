import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AdminCallbackPage, HomePage, InitialPage, LinkItemsPage, LogInPage,  } from '@/pages';
import { useStore } from './context/Store';

function App() {
    const [state] = useStore();
    const navigate = useNavigate();


    useEffect(() => {
        if (state.isAuth) navigate('/link_items');
    }, [state.isAuth]);

    return (
        <Routes>
            <Route index element={<InitialPage />} />
            <Route path='/admin/callback' element={<AdminCallbackPage />} />
            <Route path='/log_in' element={<LogInPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/link_items' element={<LinkItemsPage />} />
        </Routes>
    );
};

export default App;