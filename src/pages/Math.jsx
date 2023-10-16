import { useStateContext } from "../contexts/ContextProvider"
import Latex from "react-latex-next"
import 'katex/dist/katex.min.css'
import pic1 from "../assets/graphs.png"

const Math = () => {
    const { color } = useStateContext()

    const exp1 = `$\\Delta y = v_{i} \\, sin(\\alpha) \\, t + \\frac{1}{2}  g  t^{2}$`,
          exp2 = `$\\Delta x = v_{i} \\, cos(\\alpha) \\, t$`,
          exp3 = `$\\frac{1}{2}  k  x^{2} = \\frac{1}{2}  m v^{2}$`,
          exp4 = `$v_{i} = \\sqrt{\\frac{k}{m}}$`
    
    return (
        <div className="m-6 p-6 pt-4 bg-gray-800 rounded-xl h-fit">
            <p className="mb-3 text-2xl font-bold tracking-tight text-white">Math</p>
            <hr className="" />
            <div className="pt-5 text-white text-lg font-normal text-justify">
                Comenzamos con las ecuaciones de desplazamiento horizontal, desplazamiento vertical, y conservación de energía. De las variables presentes, el usuario ingresa las <span style={{color: color}}>distancias</span> verticales y horizontales, la <span style={{color: color}}>gravedad</span>, la <span style={{color: color}}>masa</span> del proyectil, y la <span style={{color: color}}>constante elástica</span> del resorte.
                <br/><br/>
                <div className="flex justify-around text-lg">
                    <div className="inline-block text-black text-xl bg-white rounded-xl w-fit p-3">
                        <Latex>{exp1}</Latex>
                    </div>
                    <div className="inline-block text-black text-xl bg-white rounded-xl w-fit p-3">
                        <Latex>{exp2}</Latex>
                    </div>
                    <div className="inline-block text-black text-xl bg-white rounded-xl w-fit p-3">
                        <Latex>{exp3}</Latex>
                    </div>
                </div>
                <br />
                Si fijamos la velocidad inicial del proyectil en un valor constante, el ángulo de lanzamiento puede ser modificado para obtener diferentes trayectorias. Notemos que todas estas trayectorias se encuentran por debajo de una parábola. Cualquier punto que se encuentre debajo de esta parábola puede ser alcanzado por el proyectil, por lo que la llamaremos <span style={{color: color}}>rango máximo</span>, y es única para cada valor de la velocidad inicial.
                <br />
                <div className="flex justify-center mt-4">
                    <img src={pic1} className="w-1/2 border-2 rounded-xl" style={{borderColor: color}} />
                </div>
                <br />
                Podemos ver de la tercera ecuación que la velocidad de salida del proyectil es directamente proporcional al cuadrado de la compresión, por lo que si buscamos tener la velocidad inicial máxima, la compresión del resorte deberá ser del 100%, es decir, 1 metro. Con esta información, podemos despejar la tercera equación para la velocidad inicial.
                <br />
                <div className="flex justify-around text-lg">
                    <div className="inline-block text-black text-xl bg-white rounded-xl w-fit p-3">
                        <Latex>{exp4}</Latex>
                    </div>
                </div>
                Dado que <span style={{color: color}}>k</span> y <span style={{color: color}}>m</span>
            </div>
        </div>
    )
}

export default Math