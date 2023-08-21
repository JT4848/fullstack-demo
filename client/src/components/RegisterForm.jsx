import { useState } from "react";




const RegisterForm = ({ setToken }) => {
  const [alert, setAlert] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, username, password }),
    });

    const data = await result.json();

    if (data.token) {
      setAlert("");
      setToken(data.token);
    } else {
      setAlert(<p>Cannot register at this time</p>);
    }
  };



  return(
    <>
    {alert}
      <form onSubmit={handleSubmit}>
        <label>
          First name: <input value={firstName} onChange={e => setFirstName(e.target.value)} />
        </label>
        <label>
          Last name: <input  value={lastName} onChange={e => setLastName(e.target.value)} />
        </label>
        <label>
          Username: <input  value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password: <input type="password"  value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit">Register</button>
      </form>
    </>
  )
}




export default RegisterForm;