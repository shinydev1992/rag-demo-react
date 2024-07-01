// import "./App.css";
import ChatWidget from "./ChatWidget";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [theme, setTheme] = useState({});
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    try {
      const response = await axios.get(`https://ipapi.co/json/`);
      setLocation("User's Country name:" + response.data.country_name);
    } catch (err) {
      console.log("Unable to fetch detailed location information.");
    }
  };

  useEffect(() => {
    setTheme({
      palette: {
        mode: "light"
      },
      status: {
        maximized: "smooth",
        minimized: "bubble",
        themeColor: "#174ae7",
        alignTo: "right",
        sideSpacing: 10,
        bottomSpacing: 10
      }
    });
    getLocation();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <ChatWidget theme={theme} location={location} />
    </div>
  );
}

export default App;
