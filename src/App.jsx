import { Math, Calculator, About } from "./pages"
import { Titlebar, Sidebar, Header } from "./components"
import { useStateContext } from './contexts/ContextProvider'

export const App = () => {
    const { menu, page } = useStateContext()

    return (
        <div className="absolute w-full bg-main-dark-bg h-fit">
            <Titlebar />
                <Header />
                {(menu ? <Sidebar /> : <></>)}
            <div className="overflow-hidden">
                {(page === "calculator" ? <Calculator /> : (
                    page === "math" ? <Math /> : (
                    page === "about" ? <About /> : <div>xd</div>
                )))}
            </div>
        </div>
    )
}