import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { tasks } from '@/data.js'
import Dashboard from '@/pages/Dashboard/Dashboard.jsx'
import SignUp from '@/pages/SignUp/SignUp.jsx'

import './App.scss'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path={'/'}
                        element={<Dashboard tasks={tasks} />}
                    />
                    <Route
                        path={'/signup'}
                        element={<SignUp />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
