import { useStateContext } from '../contexts/ContextProvider';
import pic1 from "../assets/subm.png"
import pic2 from "../assets/solve.png"
import pic3 from "../assets/quad.png"

const Code = () => {
    const { color, setPage } = useStateContext()
    
    return(
        <div className="m-6 p-6 pt-4 bg-gray-800 rounded-xl h-fit">
            <p className="mb-3 text-2xl font-bold tracking-tight text-white">Code</p>
            <hr className="" />
            <div className="pt-5 text-white text-base font-normal text-justify">
                La mayor parte del código está dedicado al funcionamiento de la propia aplicación y de todos sus complementos. A grandes razgos, la página principal siempre está siendo renderizada, y utilizamos el menú desplegable para elegir la sección adecuada y renderizarla sobre lo demás. Todo el código de la calculadora (a excepción de la gráfica) está contenido en la sección de <button onClick={() => setPage("calculator")}><span className="hover:underline" style={{color: color}}>Calculator</span></button>. 
                <br /><br />

                Utilizamos un <span style={{color: color}}>formulario</span> para recoger todos los datos de entrada y poder detectar cuando se envie la información. El botón de <span style={{color: color}}>Submit</span> completa el envio del formulario y activa una serie de funciones secundarias. Como la aplicación está programada con <a href="https://reactjs.org" target="_blank" className="hover:underline" style={{color:color}}>React</a>, todos los datos son ingresados con el <i>hook</i> de <span style={{color: color}}>useState</span>, que contiene un <i>getter</i> (para leer los datos) y un <i>setter</i> (para modificar los datos). En general, usaremos el <i>getter</i> con la especificación de que es una variable tipo <span style={{color: color}}>Number</span> (número), pero en ocasiones declararemos otra variable global para manejar los datos más fácilmente.

                <br /><br />
                <p className="text-xl font-bold mb-1" style={{color:color}}>
                    solveQuadratic
                </p>
                <hr className="mb-3" />
                Es una función de apoyo que aplica la fórmula general cuadrática. Recibe los coeficientes de una ecuación cuadrática como argumentos, y regresa un arreglo con las dos soluciones, o un <span style={{color: color}}>NaN</span> si es que no hay ninguna.
                <div className="flex justify-center">
                    <img src={pic3} className="w-3/5" style={{borderColor: color}} />
                </div>

                <p className="text-xl font-bold mb-1" style={{color:color}}>
                    sumbissionHandler
                </p>
                <hr className="mb-3" />
                Esta función de tipo <i>handler</i> es llamada directamente tras el envio del formulario, y como el comportamiento por defecto es de refrescar la página, por lo que debemos evitar esto explícitamente. Desde aquí llamamos también a las funciones <i>solve()</i> y <i>visuals()</i>, que manejan los cálculos generales y los datos visuales respectivamente. Una vez que se han completado, actualizamos los datos del <span style={{color: color}}>ángulo</span> (que debe ser convertido de radianes a grados) y la <span style={{color: color}}>compresión</span>.
                <div className="flex justify-center">
                    <img src={pic1} className="w-1/2" style={{borderColor: color}} />
                </div>

                <p className="text-xl font-bold mb-1" style={{color:color}}>
                    solve
                </p>
                <hr className="mb-3" />
                Esta función maneja todos los cálculos principales, y actualiza las variables globales de <i>angle_rad</i> (ángulo en radianes) y <i>compression</i> (compresión). Guardamos el desplazamiento vertical y horizontal, y la velocidad inicial (calculada según el proceso matemático) en variables globales. Notamos que la función admite un argumento <i>factor</i> que está siendo utilizado aquí, y representa la compresión del resorte. Dado que ésta función puede llegar a ser utilizada varias veces, el factor se usa para los casos particulares, aunque su valor por defecto será de 1. También verificamos el caso particular de que el desplazamiento horizontal sea 0. En este caso, el programa no daría un resultado válido por las otras funciones que utilizamos, así que le asignamos un valor mínimo.
                <br /><br />
                Hacemos una revisión con la función de <i>safetyCheck()</i>. Si el objetivo esta fuera de rango, se define que no hay solución y salimos de la función. Finalmente asignamos los coeficientes para la ecuación cuadrática del procedimiento, y pasamos los resultados obtenidos de <i>solveQuadratic()</i> a <i>extremeCases()</i>, que maneja los casos extremos para revisar que no haya problemas con las soluciones. 
                <div className="flex justify-center">
                    <img src={pic2} className="w-3/5" style={{borderColor: color}} />
                </div>
                <p className="text-xl font-bold mb-1" style={{color:color}}>
                    safetyCheck
                </p>
                <hr className="mb-3" />
                Verifica que las coordenadas del objetivo se encuentren dentro del <span style={{color: color}}>rango máximo</span> con una tolerancia de 0.001 metros
            </div>
        </div>
    )
}

export default Code