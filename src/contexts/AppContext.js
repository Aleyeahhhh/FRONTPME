import React, { createContext, useContext, useEffect, useState } from 'react';
import GlobalContext from './GlobalContext';

const AppProvider = ({ children }) => {
    const [selectedEnterprise, setSelectedEnterprise] = useState(0); // for the selected entreprise from the array..set in the "src\layout\MainLayout\Header\ProfileSection\index.js"
    const [userProfile, setUserProfile] = useState([]); //for the incomming entreprise data ..set in the "src\layout\MainLayout\Header\ProfileSection\index.js"
    const [singlEntreprise, setSinglEntreprise] = useState({
        nom: '',
        adresse: '',
        description: '',
        email: '',
        tel: '',
        lien_logo: ''
    });

    // set in the "src\layout\MainLayout\Header\ProfileSection\index.js"

    return (
        <GlobalContext.Provider
            value={{ selectedEnterprise, setSelectedEnterprise, userProfile, setUserProfile, singlEntreprise, setSinglEntreprise }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default AppProvider;
