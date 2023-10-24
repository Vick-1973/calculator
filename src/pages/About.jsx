import { useStateContext } from '../contexts/ContextProvider';

const About = () => {
    const { color, setPage } = useStateContext()
    
    return (
        <div className="m-6 p-6 pt-4 bg-gray-800 rounded-xl">
            <p className="mb-3 text-2xl font-bold tracking-tight text-white">About</p>
            <hr className="" />
            <div className="pt-5 text-white text-lg font-normal text-justify">
                <p className="text-base text-white">
                    Rotas es un programa cuya principal función es calcular el ángulo de lanzamiento y la compresión de un cañón de resorte, tal que el proyectil lanzado pueda llegar a cierto objetivo, evitando un obstáculo. El usuario ingresa datos como la distancia al objetivo, la masa del proyectil, etc. y el programa muestra el resultado final, al igual que una gráfica de la situación.
                </p>
                
                <br />
                <p className="text-xl font-bold mb-2" style={{color:color}}>
                    FAQ's
                </p>
                <hr className="dark:border-gray-600"/>
                
                <p className="text-base font-bold text-white mt-5">
                    - ¿Para qué es esto?
                </p>
                <p className="text-base  text-white">
                    Esta página fue desarrollada como nuestra aportación al <a href="https://concursoopendoors.up.edu.mx" target="_blank" className="hover:underline" style={{color:color}}>Concurso Open Doors de Ingenierías y Arquitectura</a> (para la sección de tiro parabólico), organizado por la Universidad Panamericana. Además de la calculadora principal, puedes encontrar información sobre los procedimientos en la sección de <button onClick={() => setPage("math")}><span className="hover:underline" style={{color:color}}>Math</span></button>.
                </p>

                <p className="text-base font-bold text-white mt-5">
                    - ¿Quiénes forman el equipo?
                </p>
                <p className="text-base  text-white">
                    Somos un equipo de 5° semestre de <a href="https://lincolnschool.edu.mx" target="_blank" className="hover:underline" style={{color:color}}>Lincoln School</a>, formado por Esteban Martinez, Braulio Milanes y Veronica Hinojosa.
                </p>

                <p className="text-base font-bold text-white mt-5">
                    - ¿Cómo está hecha la página?
                </p>
                <p className="text-base  text-white">
                    Esta página fue desarrollada en Javascript y HTML, con ayuda de <a href="https://reactjs.org" target="_blank" className="hover:underline" style={{color:color}}>React</a> y <a href="https://tailwindcss.com" target="_blank" className="hover:underline" style={{color:color}}>TailwindCSS</a>, además de algunos complementos como <a href="https://d3js.org" target="_blank" className="hover:underline" style={{color:color}}>D3.js</a> para las gráficas, <a href="https://github.com/harunurhan/react-latex-next" target="_blank" className="hover:underline" style={{color:color}}>react-latex-next</a> para las ecuaciones en LaTeX, <a href="https://firebase.google.com" target="_blank" className="hover:underline" style={{color:color}}>Firebase</a> para el hosting y <a href="https://www.electronjs.org" target="_blank" className="hover:underline" style={{color:color}}>Electron</a> para construir los ejecutables. El código fuente es de uso libre y se encuentra <a href="https://github.com/arepo90/calculator" target="_blank" className="hover:underline" style={{color:color}}>aquí</a>.
                </p>

                <p className="text-base font-bold text-white mt-5">
                    - ¿Cómo se usa?
                </p>
                <p className="text-base font-bold text-white">
                    La función principal de este programa se encuentra en <button onClick={() => setPage("calculator")}><span className="hover:underline" style={{color:color}}>Calculator</span></button>. Aqui puedes ingresar los datos necesarios (con unidades del sistema internacional) y hacer click en 'Submit' para ver los resultados. En caso de que no exista una solución posible, se mostrara 'NaN' en los resultados. Para hacer cambios, puedes modificar los datos directamente o hacer click en 'Clear' para limpiar todos los datos. 
                </p>

                <p className="text-base font-bold text-white mt-5">
                    - ¿Por qué se llama 'Rotas'?
                </p>
                <p className="text-base  text-white">
                    Significa algo similar a 'Ruedas' en latin y aparece en el <a href="https://wikipedia.org/wiki/Sator_Square" target="_blank" className="hover:underline" style={{color:color}}>Cuadrado Sator</a>. Fuera de eso, no tiene ningún otro significado.
                </p>

                <p className="text-base font-bold text-white mt-5">
                    - ¿Porqué algunas partes está en inglés y otras en español?
                </p>
                <p className="text-base  text-white">
                    No hay razón. Algunos componentes y secciones de la página web son recicladas de otros proyectos, por lo que puede haber mezclas de idiomas.
                </p>

                <p className="text-base font-bold text-white mt-5">
                    - ¿Cuánto tiempo tardaron en hacer el programa? / ¿Cuántos errores tiene todavía?
                </p>
                <p className="text-base  text-white">
                    Si.
                </p>

                <br />
                <p className="text-xl font-bold mb-2" style={{color:color}}>
                    Contact
                </p>
                <hr className="dark:border-gray-600"/>
                <p className="text-base  text-white mt-5">
                    - Arepo90@proton.me<br />
                    - <a href="https://github.com/arepo90" target="_blank" className="hover:underline" style={{color:color}}>Github</a>
                </p>
            </div>
        </div>
    )
}

export default About