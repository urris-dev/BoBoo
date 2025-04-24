import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Projects from "@/pages/Projects/Projects.jsx";
import SignUp from '@/pages/SignUp/SignUp.jsx'

import './App.scss'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path={'/*'}
                        element={<Projects />}
                    />
                    <Route
                        path={'/signup/*'}
                        element={<SignUp />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
