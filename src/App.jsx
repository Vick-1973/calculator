import { Math, Calculator, About } from "./pages"
import { Titlebar, Sidebar, Header } from "./components"
import { useStateContext } from './contexts/ContextProvider'

export const App = () => {
    const { menu, page } = useStateContext()

    return (
        <div className="absolute w-full h-screen select-none bg-main-dark-bg overflow-hidden">
                <Titlebar />
                {(menu ? (
                    <div className="w-60"><Sidebar /></div>)
                    : <div />)}
                <div className="overflow-hidden h-screen">
                <Header />
                    {(page === "calculator" ? <Calculator /> : (
                      page === "math" ? <Math /> : (
                      page === "about" ? <About /> : <div>xd</div>
                    )))}
                </div>
        </div>
    )
}