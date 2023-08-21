import { useEffect, useState } from "react";





const Conductors = ({ token }) => {
  const [conductors, setConductors] = useState([])

  useEffect(() => {
    const fetchConductors = async () => {
      const result = await fetch("/api/conductors", {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      });
      const data = await result.json();
      setConductors(data);
    };

    fetchConductors();
  }, [])
  const formatConductor = (conductor) => {
    return (
      <div key={`Conductor_${conductor.id}`}>
        <h2>Conductor {conductor.id}</h2>
        <ul>
          <li>{conductor.name}</li>
          <li>{conductor.yearHired}</li>
          <li>Train number: {conductor.trainId}</li>
        </ul>
      </div>
    );
  };

  return (
    <>
      {conductors.map((c) => {
        return formatConductor(c);
      })}
    </>
  );
}



export default Conductors;