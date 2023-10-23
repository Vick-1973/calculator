import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();
const { getCurrentWindow } = window.require("@electron/remote")

export const ContextProvider = ({ children }) => {
    const currentWindow = getCurrentWindow()

    const [maximized, setMaximized] = useState(currentWindow.isMaximized())
    const [color, setColor] = useState("#03C9D7")
    const [menu, setMenu] = useState(false)
    const [page, setPage] = useState("about")
    const [graph, setGraph] = useState(false)

    return (
        <StateContext.Provider value={{ color, setColor, menu, setMenu, maximized, setMaximized, page, setPage, graph, setGraph }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);