import { useStateContext } from "../contexts/ContextProvider"
import { useRef, useState } from "react"
import { Plot } from "../components"

const Calculator = () => {
    const { color, graph, setGraph } = useStateContext()
    const [angle, setAngle] = useState("")
    const [comp, setComp] = useState("")
    const [mass, setMass] = useState(" ")
    const [grav, setGrav] = useState(" ")
    const [const_k, setConst_k] = useState(" ")
    const [obj_height, setObj_height] = useState(" ")
    const [can_height, setCan_height] = useState(" ")
    const [delta_x, setDelta_x] = useState(" ")
    const [initial_v_x, setInitial_v_x] = useState("")
    const [initial_v_y, setInitial_v_y] = useState("")
    const [initial_vs, setInitial_vs] = useState("")
    const [time, setTime] = useState("")
    const [delta_y, setDelta_y] = useState("")
    const [max_x, setMax_x] = useState("")
    const [max_y, setMax_y] = useState("")
    const [trajectory, setTrajectory] = useState([])
    const [max_range, setMax_range] = useState([])
    const Form = useRef(null)
    let deltaY, deltaX, initial_v, angle_rad

    function solveQuadratic(a, b, c, type){
        let disc = (b ** 2) - (4 * a * c)
        if(disc < 0) return NaN
        if(type === 0) return (-b + Math.sqrt(disc)) / (2 * a)
        return (-b - Math.sqrt(disc)) / (2 * a)
    }

    function calcTrajectory(x, type){
        if(type === 0) return (x * Math.tan(angle_rad) + (Number(grav) * (x ** 2)) / (2 * (initial_v ** 2) * (Math.cos(angle_rad) ** 2)))
        else return (Number(grav) * (x ** 2)) / (2 * (initial_v ** 2)) + ((initial_v ** 2) / (-2 * Number(grav)))
    }

    function safetyCheck(){
        let lim = (Number(grav) * (Number(delta_x) ** 2)) / (2 * (initial_v ** 2)) + ((initial_v ** 2) / (-2 * Number(grav)))
        if(deltaY > lim + 1) return true
        else if(deltaY > lim) deltaY = lim - 0.001
        return false
    }

    function visuals(){
        setTrajectory([])
        setMax_range([])
        let quad_a = Number(grav) / 2,
            quad_b = initial_v * Math.sin(angle_rad),
            quad_c = Number(can_height),
            quad_sol = solveQuadratic(quad_a, quad_b, quad_c, 1),
            lim_0 = initial_v * Math.cos(angle_rad) * quad_sol,
            lim_bottom = Math.sqrt(((initial_v ** 2) * ((-2 * Number(can_height) * Number(grav)) + (initial_v ** 2))) / (Number(grav) ** 2)),
            lim_y = Math.abs(Math.min(0, Math.min(Number(obj_height), Number(can_height))) - Math.max(Number(can_height) + (initial_v ** 2) / (-2 * Number(grav)), Number(obj_height)))
        for(let i = 0; i <= Math.max(lim_0, Number(delta_x)); i++){
            setTrajectory(trajectory => [...trajectory, calcTrajectory(i, 0)])
            if(i == Number(delta_x)) setTrajectory(trajectory => [...trajectory, null])
        }
        for(let i = 0; i <= Math.max(Math.max(lim_0, lim_y), lim_bottom); i++){
            setMax_range(max_range => [...max_range, calcTrajectory(i, 1)])
        }
        setInitial_v_x((initial_v * Math.cos(Math.atan(angle_rad))).toFixed(2))
        setInitial_v_y((initial_v * Math.sin(Math.atan(angle_rad))).toFixed(2))
        setTime((initial_v * Math.sqrt(2) / Math.abs(Number(grav))).toFixed(2))
        setMax_x(Math.max(lim_0, lim_bottom))
        setMax_y((initial_v ** 2) / (-2 * Number(grav)))
        setInitial_vs(initial_v.toFixed(2))
        setDelta_y(deltaY)
        setGraph(true)
    }
    
    const submissionHandler = (e) => {
        e.preventDefault()
        deltaY = Number(obj_height) - Number(can_height)
        deltaX = Number(delta_x)
        initial_v = Math.sqrt(Number(const_k) / Number(mass))
        if(deltaX == 0) deltaX = 0.001
        if(safetyCheck()){
            setAngle("NaN")
            setComp("NaN")
            return
        }
        let quad_a = (Number(grav) * (deltaX ** 2)) / (2 * (initial_v ** 2)),
            quad_b = deltaX,
            quad_c = ((Number(grav) * (deltaX ** 2)) / (2 * (initial_v ** 2))) - deltaY,
            quad_sol = solveQuadratic(quad_a, quad_b, quad_c, 0)
        if(quad_sol < 0) quad_sol = solveQuadratic(quad_a, quad_b, quad_c, 1) 
        angle_rad = Math.atan(quad_sol)
        visuals()
        setAngle((angle_rad * (180 / Math.PI)).toFixed(2) + "°")
        //setComp("100%")
    }

    const clearHandler = () => {
        Form.current.reset();
        setGraph(false)
        setTrajectory([])
        setMax_range([])
        setMax_x("")
        setMax_y("")
        setComp("")
        setAngle("")
        setInitial_v_x("")
        setInitial_v_y("")
        setTime("")
        setInitial_vs("")
        setDelta_y("")
    }

    return(
        <div className="m-6 p-6 pt-4 bg-gray-800 rounded-xl h-fit">
            <p className="mb-3 text-2xl font-bold tracking-tight text-white">Calculator</p>
            <hr className="" />
            <div className="overflow-hidden">
                <div className="w-fit float-left pt-6">
                    <form onSubmit={submissionHandler} ref={Form}>
                        <div class="relative z-0 w-48">
                            <input onChange={(e) => setMass(e.target.value)} class="w-44 block py-2 px-0 text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " style={{borderColor: color}}/>
                            <label for="floating_standard" class="pl-0.5 absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}>Masa (kg)</label>
                        </div>
                        <div className="m-6" /><div class="relative z-0 w-48">
                            <input onChange={(e) => setGrav(e.target.value)} class="w-44 block py-2 px-0 text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " style={{borderColor: color}}/>
                            <label for="floating_standard" class="pl-0.5 absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}> Gravedad (-m/s²)</label>
                        </div>
                        <div className="m-6" /><div class="relative z-0 w-48">
                            <input onChange={(e) => setConst_k(e.target.value)} class="w-44 block py-2 px-0 text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " style={{borderColor: color}}/>
                            <label for="floating_standard" class="pl-0.5 absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}>Constante (N/m)</label>
                        </div>
                        <div className="m-6" /><div class="relative z-0 w-48">
                            <input onChange={(e) => setObj_height(e.target.value)} class="w-44 block py-2 px-0 text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " style={{borderColor: color}}/>
                            <label for="floating_standard" class="pl-0.5 absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}>Altura del objetivo (m)</label>
                        </div>
                        <div className="m-6" /><div class="relative z-0 w-48">
                            <input onChange={(e) => setCan_height(e.target.value)} class="w-44 block py-2 px-0 text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " style={{borderColor: color}}/>
                            <label for="floating_standard" class="pl-0.5 absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}>Altura del disparador (m)</label>
                        </div>
                        <div className="m-6" /><div class="relative z-0 w-48">
                            <input onChange={(e) => setDelta_x(e.target.value)} class="w-44 block py-2 px-0 text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " style={{borderColor: color}}/>
                            <label for="floating_standard" class="pl-0.5 absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}>Distancia horizontal (m)</label>
                        </div>
                        <br />
                        <div className="mt-2">
                            <button type="submit" className="p-2 px-3 hover:drop-shadow-xl hover:bg-light-gray text-white" style={{ background: color, borderRadius: '10%' }}>Submit</button>
                            <button type="button" className="ml-3 p-2 px-3 hover:drop-shadow-xl bg-gray-400 text-white" style={{borderRadius: '10%' }} onClick={clearHandler}>Clear</button>
                        </div>
                        <div class="mt-12 relative z-0">
                            <input disabled="true" autoComplete="off" type="text" class="block py-2.5 px-5 text-sm bg-transparent border-2 rounded-lg appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" value={angle} placeholder=" " style={{borderColor: color}}/>
                            <label for="floating_standard" class="absolute text-sm bg-slate-800 px-2 -ml-2 text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-4 -z-15 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}><pre>Ángulo</pre></label>
                        </div>
                        <br />
                        <div className="relative z-0">
                            <input disabled="true" autoComplete="off" type="text" className="block py-2.5 px-5 text-sm bg-transparent border-2 rounded-lg appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" value={comp} placeholder=" " style={{borderColor: color}}/>
                            <label for="floating_standard" className="absolute text-sm bg-slate-800 px-2 -ml-2 text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-4 -z-15 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}><pre>Compresión</pre></label>
                        </div>
                    </form>
                </div>

                <div className="overflow-hidden text-right pt-8">

                    <div className="w-full inline-block" style={{height:"30.3rem"}}>
                        <div className="w-3/4 h-full float-right">
                            {(graph ? (<Plot data1={trajectory} data2={max_range} maxX={max_x} minY={Math.min(0, Math.min(Number(obj_height), Number(can_height)))} maxY={Math.max(Number(can_height)+Number(max_y), Number(obj_height))} start={can_height} tgtX={delta_x} tgtY={obj_height} />) : (<div />))}
                        </div>
                    </div>

                    <div className="mt-10 -pb-2 ">
                        <div className="inline-block relative z-0 mx-2">
                            <input disabled="true" autoComplete="off" type="text" className="w-20 block py-2.5 px-5 text-sm bg-transparent border-2 rounded-lg appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" value={delta_y} placeholder=" " style={{borderColor: color}}/>
                            <label for="floating_standard" className="absolute text-sm bg-slate-800 px-2 -ml-2 text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-4 -z-15 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}><pre>Δy</pre></label>
                        </div>
                        <div className="inline-block relative z-0 mx-2">
                            <input disabled="true" autoComplete="off" type="text" className="w-20 block py-2.5 px-5 text-sm bg-transparent border-2 rounded-lg appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" value={initial_vs} placeholder=" " style={{borderColor: color}}/>
                            <label for="floating_standard" class="absolute text-sm bg-slate-800 px-2 -ml-2 text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-4 -z-15 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}><pre>V<sub>i</sub></pre></label>
                        </div>
                        <div className="inline-block relative z-0 mx-2">
                            <input disabled="true" autoComplete="off" type="text" className="w-20 block py-2.5 px-5 text-sm bg-transparent border-2 rounded-lg appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" value={initial_v_x} placeholder=" " style={{borderColor: color}}/>
                            <label for="floating_standard" class="absolute text-sm bg-slate-800 px-2 -ml-2 text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-4 -z-15 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}><pre>V<sub>i,x</sub></pre></label>
                        </div>
                        <div className="inline-block relative z-0 mx-2">
                            <input disabled="true" autoComplete="off" type="text" className="w-20 block py-2.5 px-5 text-sm bg-transparent border-2 rounded-lg appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" value={initial_v_y} placeholder=" " style={{borderColor: color}}/>
                            <label for="floating_standard" class="absolute text-sm bg-slate-800 px-2 -ml-2 text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-4 -z-15 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}><pre>V<sub>i,y</sub></pre></label>
                        </div>
                        <div className="inline-block relative z-0 ml-2">
                            <input disabled="true" autoComplete="off" type="text" className="w-20 block py-2.5 px-5 text-sm bg-transparent border-2 rounded-lg appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" value={time} placeholder=" " style={{borderColor: color}}/>
                            <label for="floating_standard" class="absolute text-sm bg-slate-800 px-2 -ml-2 text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-4 -z-15 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}><pre>Tiempo</pre></label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Calculator