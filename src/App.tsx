import { Route, Routes } from 'react-router-dom';
import { AdminCallbackPage, HomePage, InitialPage, LinkItemsPage,  } from '@/pages';

function App() {
    return (
        <Routes>
            <Route index element={<InitialPage />} />
            <Route path='/admin/callback' element={<AdminCallbackPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/link_cards' element={<LinkItemsPage />} />
        </Routes>
    );
};

export default App;