import { useStateContext } from '../contexts/ContextProvider';
import pic1 from "../assets/subm.png"
import pic2 from "../assets/solve.png"

const Code = () => {
    const { color, setPage } = useStateContext()
    
    return(
        <div className="m-6 p-6 pt-4 bg-gray-800 rounded-xl h-fit">
            <p className="mb-3 text-2xl font-bold tracking-tight text-white">Code</p>
            <hr className="" />
            <div className="pt-5 text-white text-base font-normal text-justify">
                La mayor parte del código está dedicado al funcionamiento de la propia aplicación y de todos sus complementos. A grandes razgos, la página principal siempre está siendo renderizada, y utilizamos el menú desplegable para elegir la sección adecuada y renderizarla sobre lo demás. Todo el código de la calculadora (a excepción de la gráfica) está contenido en la sección de <button onClick={() => setPage("calculator")}><span className="hover:underline" style={{color: color}}>Calculator</span></button>. 
                <br /><br />
                Utilizamos un <span style={{color: color}}>formulario</span> para recoger todos los datos de entrada y poder detectar cuando se envie la información. El botón de <span style={{color: color}}>Submit</span> completa el envio del formulario y activa una función <i>handler</i> para manejar los cálculos principales (<i>solve()</i>) y los datos visuales (<i>visuals()</i>). Contamos con variables globales del <span style={{color: color}}>ángulo</span> y de la <span style={{color: color}}>compresión</span>, que son modificados dentro de <i>solve()</i>. Dado que el comportamiento usual de un formulario es refrescar la página, debemos evitarlo explícitamente, y como el resultado del ángulo se dará en radianes, también debemos hacer una conversión a grados.
                Notemos que la función tiene un parámetro que se utiliza en casos extremos para modificar la compresión inicial del resorte, como se describe en la sección de <button onClick={() => setPage("math")}><span className="hover:underline" style={{color: color}}>Math</span></button>.
                <div className="flex justify-center">
                    <img src={pic1} className="w-1/2" style={{borderColor: color}} />
                </div>
                La función de <i>solve()</i> maneja los cálculos principales
                <div className="flex justify-center">
                    <img src={pic2} className="w-3/5" style={{borderColor: color}} />
                </div>
            </div>
        </div>
    )
}

export default Code