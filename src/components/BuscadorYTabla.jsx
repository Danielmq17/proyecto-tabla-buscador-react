import { useEffect, useState } from "react";

export const BuscadorYTabla = () => {
  
  //Hooks de datos, busqueda y seteo de los mismos
  const [datos, setDatos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  
  const url = "https://jsonplaceholder.typicode.com/users";
  //Llamada a la api para traer los datos de la web
  const apiFetch = () => {
    fetch(url)
      .then((response) => response.json())
      .then((api) => setDatos(api));
  };

  //Para cuando se haga el efecto de seteo de la api
  useEffect(() => {
    apiFetch();
  }, []);

  //Funcion de busqueda en el input
  const buscador = (e) => {
    setBusqueda(e.target.value);
  };

  //Filtrado de datos en la tabla
  const resultado = !busqueda
    ? datos
    : datos.filter((dato) =>
        dato.name.toLowerCase().includes(busqueda.toLowerCase())
      );

  return (
    <div className="container">
      <br />
      <input
        type="text"
        onChange={buscador}
        value={busqueda}
        placeholder="Ingrese el nombre de la persona. Ejemplo: Glenna Reichert"
        className="form-control"
      />
      <br />

      <table className="table text-center" border={2}>
        <thead style={{ background: "blue" }}>
          <tr>
            <td>Name</td>
            <td>Email</td>
          </tr>
        </thead>
        {resultado.map((dato) => {
          return (
            <tbody key={dato.id}>
              <tr>
                <td>{dato.name}</td>
                <td>{dato.email}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};
