import { Route, Routes } from 'react-router-dom';
import { AdminCallbackPage, InitialPage } from '@/pages';

function App() {
    return (
        <Routes>
            <Route index element={<InitialPage />} />
            <Route path="/admin/callback" element={<AdminCallbackPage />} />
        </Routes>
    );
};

export default App;