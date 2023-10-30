import { Math, Calculator, About, Code } from "./pages"
import { Titlebar, Sidebar, Header } from "./components"
import { useStateContext } from './contexts/ContextProvider'

export const App = () => {
    const { menu, page } = useStateContext()

    return (
        <div className="absolute w-full select-none bg-main-dark-bg h-fit">
            <Titlebar />
                <Header />
                {(menu ? <Sidebar /> : <></>)}
            <div className="overflow-hidden">
                {(page === "calculator" ? <Calculator /> : (
                    page === "math" ? <Math /> : (
                    page === "about" ? <About /> : (
                    page === "code" ? <Code /> : 
                    <div>xd</div>
                ))))}
            </div>
        </div>
    )
}