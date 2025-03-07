import {ReactElement} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import {EditProfile, Explore, ForgotPassword, Home, Messages, NotFound, Profile, SignIn, SignUp} from "../pages";
import {PostModal, ProtectedRoute} from "../components";

type MainRoute = {
    (): ReactElement;
}

export const MainRoute: MainRoute = (): ReactElement => {
    return (
        <Routes>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/forgot_password" element={<ForgotPassword/>}/>

            <Route path="/" element={<ProtectedRoute>
                <Home/>
            </ProtectedRoute>}/>

            <Route path="/post/:_id" element={
                <ProtectedRoute>
                    <PostModal />
                </ProtectedRoute>
            } />

            <Route path="/profile/:_id/post/:_id" element={
                <ProtectedRoute>
                    <PostModal />
                </ProtectedRoute>
            } />

            <Route path="/profile/:_id" element={
                <ProtectedRoute>
                    <Profile/>
                </ProtectedRoute>
            } />

            <Route path="/edit_profile" element={
                <ProtectedRoute>
                    <EditProfile/>
                </ProtectedRoute>
            } />

            <Route path="/explore" element={
                <ProtectedRoute>
                    <Explore/>
                </ProtectedRoute>
            } />

            <Route path="/messages" element={
                <ProtectedRoute>
                    <Messages/>
                </ProtectedRoute>
            } />

            <Route path="/404" element={
                <NotFound/>
            } />

            <Route path="*" element={<Navigate to="/404"/>} />

        </Routes>
    )
}