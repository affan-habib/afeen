// src/App.jsx
import React from 'react';
import TopBar from './components/TopBar';
import PagesPanel from './components/PagesPanel';
import CanvasArea from './components/CanvasArea';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
    return (
        <ErrorBoundary>
            <div className="flex flex-col h-screen">
                <TopBar />
                <div className="flex flex-1">
                    <PagesPanel />
                    <CanvasArea />
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default App;
