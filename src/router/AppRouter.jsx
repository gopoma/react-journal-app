import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth";
import { JournalRoutes } from "../journal";
import { types } from "../store/auth";
import { CheckingAuth } from "../ui/components/CheckingAuth";
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {
    const { status } = useCheckAuth();

    if(status === types.checking) {
        return (<CheckingAuth/>);
    }

    return (
        <Routes>
            { 
                status === types.authenticated
                 ? <Route path="/*" element={<JournalRoutes/>}/>            
                 : <Route path="/auth/*" element={<AuthRoutes/>}/>
            }
            <Route path="/*" element={<Navigate to="/auth/login"/>}/>
¿        </Routes>
    );
};