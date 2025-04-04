import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { LoadingSpinner, useDeskproAppEvents, useDeskproElements } from '@deskpro/app-sdk';
import { AdminCallbackPage, CreateItemPage, HomePage, InitialPage, ItemPage, LinkItemsPage, LogInPage } from '@/pages';
import { useStore } from '@/context/Store';
import { useLogIn } from '@/hooks';
import { Payload } from '@/types';

function App() {
    const [state] = useStore();
    const navigate = useNavigate();
    const { logOut } = useLogIn();
    const [isLoading] = useState(false);

    useDeskproElements(({ registerElement }) => {
        registerElement('refresh', {type: 'refresh_button'});
    });

    useEffect(() => {
        if (state.isAuth) navigate('/home');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.isAuth]);

    useDeskproAppEvents({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onElementEvent: (_: string, __: string, payload: Payload) => {
            switch (payload.type) {
                case 'logOut':
                    logOut();
    
                    break;
            };
        }
    });

    if (isLoading) {
        return <LoadingSpinner />
    };

    return (
        <Routes>
            <Route index element={<InitialPage />} />
            <Route path='/admin/callback' element={<AdminCallbackPage />} />
            <Route path='/log_in' element={<LogInPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/link_items' element={<LinkItemsPage />} />
            <Route path='/create_item' element={<CreateItemPage />} />
            <Route path='/item/:id' element={<ItemPage />} />
        </Routes>
    );
};

export default App;