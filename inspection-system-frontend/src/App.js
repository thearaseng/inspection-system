import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import { Button, Space } from "antd";

function App() {
  return (
    <div className="App">
      <Header />
      <br />
      <br />
      <br />
      <br />
      <Button type="dashed">Button</Button>
    </div>
  );
}

export default App;
