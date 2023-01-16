import React, {useState, useEffect} from "react";


const Home = () => {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);
    const [todosEnServer, setTodosEnServer] = useState([])

    function handleInput(e) {
        setInput(e.target.value);
    }

    const handleClick = () => {
        if (input.length === 0) {
            alert("Debe ingresar un valor")
        } else {
            setTodos([...todos, {"label":input, "done":false}]);
			setInput("")
        }}

    const clickBorrar = () => {
        setTodos([])
    }


    useEffect(() => {
        userPush()     
    }, [])

  useEffect(() => {
    getTodos()
  uptdateTodos()
  },[todos])


  function userPush(){
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/locomotion`,
    {method: 'POST', 
    headers: {
        'Content-Type': 'application/json'},
    body: JSON.stringify([])
  })
    .then((response)=>response.json())
    .then((data)=>console.log(data))
}

    function getTodos(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/locomotion`,
		{method: 'GET', 
		headers: {
			'Content-Type': 'application/json'}
	  })
		.then((response)=>response.json())
		.then((data)=>setTodosEnServer(data))
	}


    function uptdateTodos(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/locomotion`,
		{method: 'PUT', 
		headers: {
			'Content-Type': 'application/json'},
		body: JSON.stringify(todos)
	  })
		.then((response)=>response.json())
		.then((data)=>console.log(todosEnServer))
	}

   /* function killTodos(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/locomotion`,
		{method: 'DELETE', 
		headers: {
			'Content-Type': 'application/json'}
	  })
		.then((response)=>response.json())
		.then((data)=>console.log(data))
	} */


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
                            style={
                                {backgroundColor: "rgb(110, 19, 214)"}
                            }
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
                        
                        <ul>{todos.map((todo, i) => (
                            <li key={i}>
                              {todo.label}
                              <button className="btn" onClick={() => setTodos(todos.filter((elemento, currentIndex) => i != currentIndex))}>
                                <i className="fas fa-trash-alt align-items-end m-2 pt-1" />
                              </button>
                            </li>
                          ))}</ul>
                        
                    } </div>

                    {/* Aquí vamos a contar los todos que se encuentren en el lado del servidor */}
                    <div id="contenedorTodos" className="text-light">
                        <h5>Todos en el servidor</h5>
                        
                        {/* <p>{todosEnServer.length}</p> */}
                        
{
            <ul>
    {
    todosEnServer.map((todo, i)=>{
    return (<li key={i}>{todo.label}</li>)
    })
    }
</ul>  }
                        
                        </div>

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
