import { useStateContext } from "../contexts/ContextProvider"
import { useRef, useState } from "react"
import { Plot } from "../components"

const Calculator = () => {
    const { color } = useStateContext()
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
    const [delta_ys, setDelta_ys] = useState("")
    const [max_y, setMax_y] = useState("")
    const [max_x, setMax_x] = useState("")
    const Form = useRef(null)
    let delta_y, initial_v, angle_rad

    const data = []
    for(let i = 0; i < 20; i++){
        data.push({i, i})
    }

    function solveQuadratic(a, b, c){
        let disc = (b**2) - (4*a*c), x
        if(disc < 0) return NaN
        x = (-b + Math.sqrt(disc)) / (2 * a)
        return x
    }

    function trayectory(x){
        return (x * Math.tan(angle_rad) + (Number(grav) * (x ** 2)) / (2 * (initial_v ** 2) * (Math.cos(angle_rad) ** 2)))
    }

    function safetyCheck(){
        let lim = (Number(grav) * (Number(delta_x) ** 2)) / (2 * (initial_v ** 2)) + ((initial_v ** 2) / (-2 * Number(grav)))
        if(delta_y > lim + 1) return true
        else if(delta_y > lim) delta_y = lim - 0.001
        return false
    }

    function visuals(quad_sol){
        setInitial_v_x((initial_v * Math.cos(Math.atan(quad_sol))).toFixed(2))
        setInitial_v_y((initial_v * Math.sin(Math.atan(quad_sol))).toFixed(2))
        setTime((initial_v * Math.sqrt(2) / Math.abs(Number(grav))).toFixed(2))
        setMax_y((initial_v ** 2) / (-2 * Number(grav)))
        setMax_x((initial_v ** 2) / (-1 * Number(grav)))
        setInitial_vs(initial_v.toFixed(2))
        setDelta_ys(delta_y.toFixed(2))
        let drop_time = (-2 * initial_v * Math.sin(angle_rad)) / Number(grav),
            lim = initial_v * Math.cos(angle_rad) * drop_time
        for(let i = 0; i <= lim; i++){
            data.push({x: i, y: trayectory(i)})
        }
    }
    
    const submissionHandler = (e) => {
        e.preventDefault()
        delta_y = Math.abs(Number(obj_height) - Number(can_height))
        initial_v = Math.sqrt(Number(const_k) / Number(mass))
        if(safetyCheck()){
            setAngle("NaN")
            setComp("NaN")
            return
        }
        let quad_a = (Number(grav) * (Number(delta_x) ** 2)) / (2 * (initial_v ** 2)),
            quad_b = Number(delta_x),
            quad_c = ((Number(grav) * (Number(delta_x) ** 2)) / (2 * (initial_v ** 2))) - delta_y,
            quad_sol = solveQuadratic(quad_a, quad_b, quad_c),
            angle_rad = Math.atan(quad_sol)
        visuals(quad_sol)
        setAngle((angle_rad * (180 / Math.PI)).toFixed(2) + "°")
        setComp("100%")
    }

    const clearHandler = () => {
        Form.current.reset();
        setComp("")
        setAngle("")
        setInitial_v_x("")
        setInitial_v_y("")
        setTime("")
        setInitial_vs("")
        setDelta_ys("")
    }

    return(
        <div className="m-6 p-6 pt-4 bg-gray-800 rounded-xl">
            <p className="mb-3 text-2xl font-bold tracking-tight text-white">Calculator</p>
            <hr className="" />
            <div className="overflow-hidden">
                <div className="w-fit float-left pt-6">
                    <form onSubmit={submissionHandler} ref={Form}>
                        <div class="relative z-0 w-40">
                            <input onChange={(e) => setMass(e.target.value)} class="block py-2 px-0 text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " style={{borderColor: color}}/>
                            <label for="floating_standard" class="pl-0.5 absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}>
                                Masa (kg)
                            </label>
                        </div>
                        <div className="m-6" /><div class="relative z-0 w-40">
                            <input onChange={(e) => setGrav(e.target.value)} class="block py-2 px-0 text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " style={{borderColor: color}}/>
                            <label for="floating_standard" class="pl-0.5 absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}> Gravedad (-m/s²)</label>
                        </div>
                        <div className="m-6" /><div class="relative z-0 w-40">
                            <input onChange={(e) => setConst_k(e.target.value)} class="block py-2 px-0 text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " style={{borderColor: color}}/>
                            <label for="floating_standard" class="pl-0.5 absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}>Constante (N/m)</label>
                        </div>
                        <div className="m-6" /><div class="relative z-0 w-40">
                            <input onChange={(e) => setObj_height(e.target.value)} class="block py-2 px-0 text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " style={{borderColor: color}}/>
                            <label for="floating_standard" class="pl-0.5 absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}>Altura del objetivo (m)</label>
                        </div>
                        <div className="m-6" /><div class="relative z-0 w-40">
                            <input onChange={(e) => setCan_height(e.target.value)} class="block py-2 px-0 text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " style={{borderColor: color}}/>
                            <label for="floating_standard" class="pl-0.5 absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}>Altura del disparador (m)</label>
                        </div>
                        <div className="m-6" /><div class="relative z-0 w-40">
                            <input onChange={(e) => setDelta_x(e.target.value)} class="block py-2 px-0 text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " style={{borderColor: color}}/>
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

                <div className="overflow-hidden text-right mx-2 pt-8">
                <div className="">
                    <div className="inline-block relative z-0 mx-2">
                        <input disabled="true" autoComplete="off" type="text" className="w-20 block py-2.5 px-5 text-sm bg-transparent border-2 rounded-lg appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" value={initial_vs} placeholder=" " style={{borderColor: color}}/>
                        <label for="floating_standard" class="absolute text-sm bg-slate-800 px-2 -ml-2 text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-4 -z-15 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}><pre>Vi</pre></label>
                    </div>
                    <div className="inline-block relative z-0 mx-2">
                        <input disabled="true" autoComplete="off" type="text" className="w-20 block py-2.5 px-5 text-sm bg-transparent border-2 rounded-lg appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" value={initial_v_x} placeholder=" " style={{borderColor: color}}/>
                        <label for="floating_standard" class="absolute text-sm bg-slate-800 px-2 -ml-2 text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-4 -z-15 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}><pre>Vi_X</pre></label>
                    </div>
                    <div className="inline-block relative z-0 mx-2">
                        <input disabled="true" autoComplete="off" type="text" className="w-20 block py-2.5 px-5 text-sm bg-transparent border-2 rounded-lg appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" value={initial_v_y} placeholder=" " style={{borderColor: color}}/>
                        <label for="floating_standard" class="absolute text-sm bg-slate-800 px-2 -ml-2 text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-4 -z-15 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}><pre>Vi_Y</pre></label>
                    </div>
                    <div className="inline-block relative z-0 mx-2">
                        <input disabled="true" autoComplete="off" type="text" className="w-20 block py-2.5 px-5 text-sm bg-transparent border-2 rounded-lg appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" value={time} placeholder=" " style={{borderColor: color}}/>
                        <label for="floating_standard" class="absolute text-sm bg-slate-800 px-2 -ml-2 text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-4 -z-15 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}><pre>Tiempo</pre></label>
                    </div>
                    <div className="inline-block relative z-0 ml-2">
                        <input disabled="true" autoComplete="off" type="text" className="w-20 block py-2.5 px-5 text-sm bg-transparent border-2 rounded-lg appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" value={delta_ys} placeholder=" " style={{borderColor: color}}/>
                        <label for="floating_standard" className="absolute text-sm bg-slate-800 px-2 -ml-2 text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-4 -z-15 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" style={{color: color}}><pre>Δy</pre></label>
                    </div>
                </div>

                <div className="w-3/4 h-96 float-right">
                    <div className="w-3/4 h-full float-right"><Plot data={data} maxX={max_x} maxY={max_y} className="" /></div>
                </div>
                </div>

            </div>
        </div>
    )
}

export default Calculator