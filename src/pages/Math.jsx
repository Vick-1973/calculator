import { useStateContext } from "../contexts/ContextProvider"
import { Plot } from "../components"

const Math = () => {
    const { color, setColor } = useStateContext()

    function maxRange(x){
       // return (Number(grav) * (x ** 2)) / (2 * (initial_v ** 2)) + ((initial_v ** 2) / (-2 * Number(grav)))
        return (x )
    }

    const data = [{x: 0, y: 0}]

    for(let i = 0; i < 20; i++){
        let b = maxRange(i)
        data.push({x: i, y: b})
    }
    
    return (
        <div>
            math yoo
            <Plot data={data} />
        </div>
    )
}

export default Math