import React, { createContext, useState, useContext } from 'react';

// Create a Context for the CMS settings
const CMSContext = createContext();

// Create a Provider component
export const CMSProvider = ({ children }) => {
    const [settings, setSettings] = useState({});

    return (
        <CMSContext.Provider value={{ settings, setSettings }}>
            {children}
        </CMSContext.Provider>
    );
};

// Custom hook to use the CMS context
export const useCMS = () => useContext(CMSContext);
