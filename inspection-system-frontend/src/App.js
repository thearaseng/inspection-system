import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store";
import MainApp from "./pages/Main/MainApp";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<MainApp/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
