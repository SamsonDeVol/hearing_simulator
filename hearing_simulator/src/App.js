
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux/store'
import { Global, css } from '@emotion/react';

import Navbar from './components/Navbar'
import HomePage from './components/pages/homePage';
import AudioPage from './components/audioPage'
import AudiogramPage from './components/pages/audiogramPage';
import ContributorsPage from './components/pages/contributorsPage';
import SourcesPage from './components/pages/sourcesPage';
import NotFoundPage from './components/pages/notfoundPage';
import Footer from './components/pages/footer';

import './App.css';


function App() {
    return( 
        <div className="body">
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                    <div className="routes">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="use" element={<AudioPage />} />
                            <Route path="audiogram" element={<AudiogramPage />} />
                            <Route path="sources" element={<SourcesPage />} />
                            <Route path="contributors" element={<ContributorsPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </div>
                    <Footer />
                </BrowserRouter>
            </Provider>
        </div>
     )
}

export default App
