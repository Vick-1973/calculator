import { useStateContext } from '../contexts/ContextProvider';

const About = () => {
    const { color, setColor } = useStateContext()
    
    return (
        <div>
            About (WIP)
        </div>
    )
}

export default About