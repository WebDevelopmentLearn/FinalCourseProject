import {Navigate, Route, Routes} from "react-router-dom";
import {ReactElement} from "react";
import {ForgotPassword, Home, NotFound, SignIn, SignUp} from "../pages";

type MainRoute = {
    (): ReactElement;
}

export const MainRoute: MainRoute = (): ReactElement => {
    return (
        <Routes>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/forgot_password" element={<ForgotPassword/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404"/>} />
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