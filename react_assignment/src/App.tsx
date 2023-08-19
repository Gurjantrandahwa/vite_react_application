import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import {Container} from "@mui/material";
import Homepage from "./Pages/Homepage";
import Posts from "./components/Posts/Posts";
import Departments from "./components/Departments/Departments";

const App = () => {

    return <Router>
        <Container maxWidth={"xl"}>
            <Routes>
                <Route path={"/"} element={<Homepage/>}/>
                <Route path={"/posts"} element={<Posts/>}/>
                <Route path={"/departments"} element={<Departments/>}/>
            </Routes>
        </Container>

    </Router>
};

export default App;
