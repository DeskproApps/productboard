import { Route, Routes } from 'react-router-dom';
import { AdminCallbackPage, HomePage, InitialPage } from '@/pages';

function App() {
    return (
        <Routes>
            <Route index element={<InitialPage />} />
            <Route path='/admin/callback' element={<AdminCallbackPage />} />
            <Route path='/home' element={<HomePage />} />
        </Routes>
    );
};

export default App;