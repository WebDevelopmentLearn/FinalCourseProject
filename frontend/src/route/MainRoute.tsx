import {Route, Routes} from "react-router-dom";
import {ReactElement} from "react";
import {SignIn, SignUp} from "../pages";

type MainRoute = {
    (): ReactElement;
}

export const MainRoute: MainRoute = (): ReactElement => {
    return (
        <Routes>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
        </Routes>
    )
}

// const MainRoute: ReactElement = (): ReactElement => {
//     return (
//         <Routes>
//             <Route path="/" element={<Home/>}/>
//             <Route path="/about" element={<About/>}/>
//             <Route path="/contact" element={<Contact/>}/>
//         </Routes>
//     )
//
// }