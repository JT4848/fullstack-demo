import { useEffect, useState } from "react";

const Trains = ({ token }) => {
  const [trains, setTrains] = useState([]);
  const [year, setYear] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [color, setColor] = useState("");
  const [range, setRange] = useState("");



  const handleCreate = async (e) => {
    e.preventDefault();
    console.log('creating trains')
    const result = await fetch("/api/trains", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({ year, fuelType, color, range }),
    })
    const data = await result.json();
    console.log("created trains", data);
  }


  useEffect(() => {
    
    const fetchTrains = async () => {
      const result = await fetch("/api/trains", {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      });
      const data = await result.json();
      setTrains(data);
    };

    fetchTrains();
  }, []);

  const formatTrain = (train) => {
    return (
      <div key={`Train_${train.id}`}>
        <h2>Train {train.id}</h2>
        <ul>
          <li>{train.color}</li>
          <li>{train.fuelType}</li>
          <li>Year: {train.year}</li>
          <li>Range: {train.range}</li>
        </ul>
      </div>
    );
  };



  return (
    <>
    <button>Create new train</button>
    <form onSubmit={handleCreate}>
      <label>
        Year: <input value={year} onChange={e => setYear(e.target.value)}/>
      </label>
      <label>
        Fueltype: <input value={fuelType} onChange={e => setFuelType(e.target.value)}/>
      </label>
      <label>
        Color: <input value={color} onChange={e => setColor(e.target.value)}/>
      </label>
      <label>
        Range: <input value={range} onChange={e => setRange(e.target.value)}/>
      </label>
      <button type="submit">Create</button>
    </form>
      {trains.map((t) => {
        return formatTrain(t);
      })}
    </>
  );
};

export default Trains;
