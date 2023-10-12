import { Math, Calculator, About } from "./pages"
import { Titlebar, Sidebar, Header } from "./components"
import { useStateContext } from './contexts/ContextProvider'

export const App = () => {
    const { menu, page } = useStateContext()

    return (
        <div className="absolute w-full bg-main-dark-bg">
                {(menu ? (
                    <div className="w-60"><Sidebar /></div>)
                    : <div />)}
                <div className="overflow-hidden">
                <Header />
                    {(page === "calculator" ? <Calculator /> : (
                        page === "math" ? <Math /> : (
                        page === "about" ? <About /> : <div>xd</div>
                    )))}
                </div>
        </div>
    )
}