import { useStateContext } from '../contexts/ContextProvider';

const About = () => {
    const { color } = useStateContext()
    
    return (
        <div className="m-6 p-6 pt-4 bg-gray-800 rounded-xl h-screen">
            <p className="mb-3 text-2xl font-bold tracking-tight text-white">About (WIP)</p>
            <hr className="" />
            <div className="pt-5 text-white text-lg font-normal text-justify">
                placeholder
            </div>
        </div>
    )
}

export default About