import { useStateContext } from '../contexts/ContextProvider';
import { AiOutlineMenu } from 'react-icons/ai'
import logo from "../assets/logo.png"

const Header = () => {
    const { color, menu, setMenu, setPage } = useStateContext();

    return (
        <div className="flex justify-between py-2 pr-6 pl-4 bg-zinc-900 w-full sticky top-8">
            <div>
                <button type="button" onClick={() => setMenu(!menu)} className="relative text-xl rounded-full p-3">
                    <span className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2" />
                    <div style={{color: color}} className="hover:bg-light-gray p-2 -m-2 rounded-full">
                        <AiOutlineMenu/>
                    </div>
                </button>
            </div>
            <div className="flex justify-between items-center mr-3">
                <button onClick={() => setPage("calculator")} className="items-center gap-3 mt-1 mb-1 flex text-xl font-bold text-white">
                    <img src={logo} className="w-10" />
                    <span>Rotas</span>
                </button>
            </div>
        </div>
    )
}

export default Header