
import React, { useState, useEffect } from "react";

const App = () => {
  const [countries, setCountries] = useState([]); // Initial value as empty array
  const [states, setStates] = useState([]); // Initial value as empty array
  const [cities, setCities] = useState([]);
  const [selState, setSelState] = useState("");
  const [selCountry, setSelCountry] = useState("");
  const [selCity, setSelCity] = useState("");

  // Fetch countries when the component mounts
  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (selCountry) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${encodeURIComponent(
          selCountry
        )}/states`
      )
        .then((res) => res.json())
        .then((data) => setStates(data))
        .catch((err) => console.error("Error fetching states:", err));
    } else {
      setStates([]); // Reset states if no country is selected
    }
  }, [selCountry]);

  // Fetch cities when a state is selected
 useEffect(() => {
  if (selCountry && selState) {
    fetch(
      `https://crio-location-selector.onrender.com/country=${encodeURIComponent(
        selCountry
      )}/state=${encodeURIComponent(selState)}/cities`
    )
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error("Error fetching cities:", err));
  } else {
    setCities([]); // Reset cities if no state is selected
  }
}, [selCountry, selState]);


  return (
    <div style={{ paddingTop:"100px",textAlign:"center"}}>
      <h1>Select Location</h1>
      
      {/* Country Dropdown */}
      <select 
        style={{
          margin:"10px",
          padding:"5px",
        }}
        name="country"
        id="country"
        value={selCountry}
        onChange={(e) => {
          setSelCountry(e.target.value);
          setSelState(""); // Reset state
          setSelCity(""); // Reset city
          setStates([]); // Clear states
          setCities([]); // Clear cities
        }}
        >
        <option value="" disabled>
          Select Country
        </option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>

      {/* State Dropdown */}
      <select
         style={{
          margin:"10px",
          padding:"5px",
        }}
        name="state"
        id="state"
        value={selState}
        onChange={(e) => {
          setSelState(e.target.value);
          setSelCity(""); // Reset city
          setCities([]); // Clear cities
        }}
        disabled={!selCountry} // Disable state dropdown if no country selected
      >
        <option value="" disabled>
          Select State
        </option>
        {states.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
      {/* City Dropdown */}
      <select
         style={{
          margin:"10px",
          padding:"5px",
        }}
        name="city"
        id="city"
        value={selCity}
        onChange={(e) => setSelCity(e.target.value)}
        disabled={!selState} // Disable state dropdown if no country selected
      >
        <option value="" disabled>
          Select City
        </option>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
       {/* Display Selection */}
       {selCity && (
        <span>
          You Selected 
          <span style={{fontWeight:"bold"}}>{selCity}</span>, 
          <span style={{fontWeight:"bolder"}}>{selState}</span>, 
          <span style={{fontWeight:"lighter"}}>{selCountry}</span>.
        </span>
      )}
    </div>
  );
};

export default App;


