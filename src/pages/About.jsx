import { useStateContext } from '../contexts/ContextProvider';

const About = () => {
    const { color, setColor } = useStateContext()
    
    return (
        <div>
            about yoo
        </div>
    )
}

export default About