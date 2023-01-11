import React, {useState} from "react";

const Home = () => {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);


    function handleInput(e) {
        setInput(e.target.value);
    }

    const handleClick = () => {
        if (input.length === 0) {
            alert("Debe ingresar un valor")
        } else {
            setTodos(todos.concat([input]));
			setInput("")
        }
    }

    const clickBorrar = () => {
        setTodos([])
    }


    return (
        <div className="container">

            <div className="m-auto tamañoDiv padding-superior">
                <div className="p-4 color-de-fondo">
                    <h4 className="pb-3 text-light">
                        A continuación ingrese su tarea a realizar</h4>
                    <div className="input-group mb-3">
                        <button onClick={handleClick}
                            className="btn btn-success"
                            type="button"
							style={{backgroundColor:"rgb(110, 19, 214)"}}
                            id="button-addon1">Ingresar Tarea</button>
                        <input onChange={handleInput}
                            type="text"
                            className="form-control"
                            placeholder=""
							value={input}
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"/>
                    </div>
                    <div id="contenedorTodos" className="text-light">
                        {
                        todos.map((item, index) => (
                            <div className="row d-flex m-2"  style={{borderRadius:"20px",backgroundColor: "rgb(110, 19, 214)"}}>
                                <div className="col-6">
                                    <h5 className="m-2">{item}</h5>
                                </div>
                                <div className="col-6 text-end">
                                    <i class="fas fa-trash-alt align-items-end m-2 pt-1"
                                        onClick={
                                            () => setTodos(todos.filter((elementoDiv, currentIndex) => index != currentIndex))
                                    }></i>
                                </div>
                            </div>
                        ))
                    } </div>
                    <div id="contadorTodos">
                        <p className="text-light mt-3">Faltan por realizar {
                            todos.length
                        }
                            &nbsp;tareas</p>
                    </div>
                    <button onClick={clickBorrar}
                        className="btn btn-warning"
                        type="button"
                        id="button-addon1">Borrar Todo</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
