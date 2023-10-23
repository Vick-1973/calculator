import { useStateContext } from "../contexts/ContextProvider"
import Latex from "react-latex-next"
import 'katex/dist/katex.min.css'
import pic1 from "../assets/graphs.png"

const Math = () => {
    const { color } = useStateContext()
    const exp1 = `$\\Delta y = v_{i} \\, sin\\left(\\alpha\\right) \\, t + \\frac{1}{2}  g  t^{2}$`,
          exp2 = `$\\Delta x = v_{i} \\, cos\\left(\\alpha\\right) \\, t$`,
          exp3 = `$\\frac{1}{2}  k  x^{2} = \\frac{1}{2}  m v^{2}$`,
          exp4 = `$v_{i} = x \\sqrt{\\frac{k}{m}}$`,
          exp5 = `$t = \\frac{\\Delta x}{v_{i} \\, cos\\left(\\alpha\\right)}$`,
          exp6 = `$\\Delta y = v_{i} \\, sin\\left(\\alpha\\right) \\left( \\frac{\\Delta x}{v_{i} \\, cos\\left(\\alpha\\right)}\\right) + \\frac{1}{2} \\, g  \\left(\\frac{\\Delta x}{v_{i} \\, cos\\left(\\alpha\\right)}\\right)^{2}$`,
          exp7 = `$\\Delta y = tan\\left(\\alpha\\right) \\Delta x + \\frac{g \\, \\Delta x ^{2} \\, sec^{2}\\left(\\alpha\\right)}{2 v_{i}^{2}}$`,
          exp8 = `$sec^{2}\\left(\\theta\\right) = tan^{2}\\left(\\theta\\right) + 1$`,
          exp9 = `$0 = \\left(\\Delta x\\right)  tan\\left(\\alpha\\right) + \\left(\\frac{g \\, \\Delta x ^{2}}{2 v_{i}^{2}}\\right) tan^{2}\\left(\\alpha\\right) + \\left(\\frac{g \\, \\Delta x ^{2} \\, }{2 v_{i}^{2}} - \\Delta y \\right)$`,
          exp10 = `$\\alpha_{1} = tan^{-1}\\left(z_{1}\\right) $`,
          exp11 = `$\\alpha_{2} = tan^{-1}\\left(z_{2}\\right)$`,
          exp12 = `$y_{max} = \\frac{g x^{2}}{2v_{i}^{2}} - \\frac{v_{i}^{2}}{2g}$`,
          exp13 = `$y = \\frac{g x^{2}}{2 v_{i}^{2}} -$`
    
    return (
        <div className="m-6 p-6 pt-4 bg-gray-800 rounded-xl h-fit">
            <p className="mb-3 text-2xl font-bold tracking-tight text-white">Math</p>
            <hr className="" />
            <div className="pt-5 text-white text-base font-normal text-justify">
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
                Si fijamos la <span style={{color: color}}>velocidad inicial</span> del proyectil en un valor constante, el <span style={{color: color}}>ángulo</span> de lanzamiento puede ser modificado para obtener diferentes trayectorias. Notemos que todas estas trayectorias se encuentran por debajo de una parábola. Cualquier punto que se encuentre debajo de esta parábola puede ser alcanzado por el proyectil, por lo que la llamaremos <span style={{color: color}}>rango máximo</span>, y es única para cada valor de la velocidad inicial.
                <br />
                <div className="flex justify-center mt-4">
                    <img src={pic1} className="w-1/2 border-2 rounded-xl" style={{borderColor: color}} />
                </div>
                <br />
                <div className="flex justify-around text-lg">
                    <div className="inline-block text-black text-xl bg-white rounded-xl w-fit p-3">
                        <Latex>{exp12}</Latex>
                    </div>
                </div>
                <br />
                Podemos ver de la tercera ecuación que la velocidad de salida del proyectil es directamente proporcional al cuadrado de la <span style={{color: color}}>compresión</span>, por lo que si buscamos tener la velocidad inicial máxima, la compresión del resorte deberá ser del 100%, es decir, 1 metro. Con esta información, podemos despejar la tercera equación para la velocidad inicial. Dado que <span style={{color: color}}>k</span> y <span style={{color: color}}>m</span> son valores que conocemos, podemos calcular el valor de la <span style={{color: color}}>velocidad incial</span>.
                <br /><br />
                <div className="flex justify-around text-lg">
                    <div className="inline-block text-black text-xl bg-white rounded-xl w-fit p-3">
                        <Latex>{exp4}</Latex>
                    </div>
                </div>
                <br />
                Ahora tomamos la ecuación de desplazamiento horizontal, y la despejamos para el <span style={{color: color}}>tiempo</span>. Aunque aún no tenemos la información suficiente para darle un valor, usaremos esta expresión en otras partes de la solución
                <br /><br />
                <div className="flex justify-around text-lg">
                    <div className="inline-block text-black text-xl bg-white rounded-xl w-fit p-3">
                        <Latex>{exp5}</Latex>
                    </div>
                </div>
                <br />
                Pasamos a la ecuación de desplazamiento vertical y reemplazamos las <span style={{color: color}}>t</span> con la expresión que obtuvimos anteriormente.
                <br /><br />
                <div className="align-center text-lg">
                    <div className=" text-black text-xl mx-auto bg-white rounded-xl w-fit p-3">
                        <Latex>{exp6}</Latex>
                    </div>
                    <br />
                    <div className=" text-black text-xl mx-auto bg-white rounded-xl w-fit p-3">
                        <Latex>{exp7}</Latex>
                    </div>
                </div>
                <br />
                Aqui podemos usar una identidad trigonométrica para simplificar la ecuación y que el <span style={{color: color}}>ángulo</span> quede en términos de la misma función.
                <br /><br />
                <div className="align-center text-lg">
                    <div className=" text-black text-xl mx-auto bg-white rounded-xl w-fit p-3">
                        <Latex>{exp8}</Latex>
                    </div>
                    <br />
                    <div className=" text-black text-xl mx-auto bg-white rounded-xl w-fit p-3">
                        <Latex>{exp9}</Latex>
                    </div>
                </div>
                <br />
                Notamos que se forma una ecuación cuadrática en términos de la tangente del ángulo, y además vemos que todos los coeficientes tienen información que ya conocemos, es decir, sí les podemos dar un valor. De esta forma, resolvemos la ecuación con la fórmula general cuadrática y obtenemos dos soluciones.
                <br /><br />
                <div className="flex justify-around text-lg">
                    <div className="inline-block text-black text-xl mx-auto bg-white rounded-xl w-fit p-3">
                        <Latex>{exp10}</Latex>
                    </div>
                    <br />
                    <div className="inline-block text-black text-xl mx-auto bg-white rounded-xl w-fit p-3">
                        <Latex>{exp11}</Latex>
                    </div>
                </div>
                <br />
                Ambas soluciones son válidas, pero existirán casos en los que el resultado sea un ángulo negativo, o que la trayectoria del proyectil se encuentre con el obstáculo. Para revisar la segunda posibilidad, calculamos la distancia entre el proyectil y el obstáculo en su punto mas cercano, y si esta diferencia es menor a cierto límite, elegimos la otra solución. Aún con esta redundancia, existirán casos en los que ninguna de las soluciones sea apta, por lo que tendremos que repetir el proceso con una compresión del resorte menor. 
            </div>
        </div>
    )
}

export default Math