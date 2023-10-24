import { useStateContext } from '../contexts/ContextProvider';
import { MdOutlineCancel } from 'react-icons/md';
import logo from "../assets/logo.png"

export const Sidebar = () => {
    const { setMenu, color, page, setPage } = useStateContext()

    return (
        <div className="w-60 float-left h-screen bg-secondary-dark-bg sticky top-24">
            <div className="items-center ml-5 my-3 h-11">
                <div className="inline-block">
                    <img src={logo} className="inline-block w-10 mr-3 mb-3" />
                    <span className="inline-block text-xl font-bold text-white">Rotas</span>
                    <button type="button" onClick={() => setMenu(false)} style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }} className="p-2 ml-16 text-2xl hover:bg-light-gray">
                        <MdOutlineCancel />
                    </button>
                </div>
            </div>
            <div className="mt-6 ml-2">
                <p className="text-gray-400 mx-3 -mb-1">HOME</p>
                <button className="w-full text-left" onClick={() => setPage("calculator")}>
                    <p className="m-3 ml-2 pl-4 p-3 rounded-lg text-white hover:text-gray-700 hover:bg-light-gray" style={{background: (page === "calculator" ? color : ""), color: (page === "calculator" ? "white" : "")}}>Calculator</p>
                </button>
                <p className="text-gray-400 mx-3 -mb-1">PAGES</p>
                <button className="w-full text-left" onClick={() => setPage("math")}>
                    <p className="m-3 ml-2 pl-4 p-3 rounded-lg text-white hover:text-gray-700 hover:bg-light-gray" style={{background: (page === "math" ? color : ''), color: (page === "math" ? "white" : "")}}>Math</p>
                </button>
                <button className="w-full text-left" onClick={() => setPage("about")}>
                    <p className="m-3 ml-2 -my-1 pl-4 p-3 rounded-lg text-white hover:text-gray-700 hover:bg-light-gray" style={{background: (page === "about" ? color : ''), color: (page === "about" ? "white" : "")}}>About</p>
                </button>
                <button className="w-full text-left" onClick={() => setPage("code")}>
                    <p className="m-3 ml-2 pl-4 p-3 rounded-lg text-white hover:text-gray-700 hover:bg-light-gray" style={{background: (page === "code" ? color : ''), color: (page === "code" ? "white" : "")}}>Code</p>
                </button>
            </div>
        </div>
    )
}

export default Sidebar