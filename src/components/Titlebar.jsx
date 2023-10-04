import { useEffect } from "react"
import { IoCloseOutline, IoContractOutline, IoExpandOutline, IoRemove } from "react-icons/io5"
import logo from "../assets/logo.png"
import { useStateContext } from '../contexts/ContextProvider';

const { getCurrentWindow, app } = window.require("@electron/remote")

export const Titlebar = () => {
    const currentWindow = getCurrentWindow()
    const { maximized, setMaximized } = useStateContext()

    const onMinimize = () => currentWindow.minimize()
    const OnMaximize = () => {
        setMaximized(!currentWindow.isMaximized())
        currentWindow.isMaximized() ? currentWindow.unmaximize() : currentWindow.maximize()
    }
    const onQuit = () => app.quit()

    return (
        <div className="title-bar sticky top-0">
            <div className="absolute pt-1 pl-32 w-5/6 app-name-container select-none">
                <p>Rotas Calculator</p>
            </div>
            <div className="window-controls-container">
                <button title="Minimize" className="minimize-button focus:outline-none hover:bg-gray-700" onClick={onMinimize}>
                    <IoRemove />
                </button>
                <button title="Maximize" className="min-max-button focus:outline-none hover:bg-gray-700" onClick={OnMaximize}>
                    {maximized ? <IoContractOutline /> : <IoExpandOutline />}
                </button>
                <button title="Close" className="close-button focus:outline-none hover:bg-gray-700" onClick={onQuit}>
                    <IoCloseOutline />
              </button>
            </div>
        </div>
    )
}

export default Titlebar