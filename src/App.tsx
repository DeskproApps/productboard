import { Route, Routes } from 'react-router-dom';
import InitialPage from '@/pages';

function App() {
    return (
        <Routes>
            <Route index element={<InitialPage />} />
        </Routes>
    );
};

export default App;