import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth";
import { JournalRoutes } from "../journal";
import { types } from "../store/auth";
import { CheckingAuth } from "../ui/components/CheckingAuth";

export const AppRouter = () => {
    const { status } = useSelector(state => state.auth);

    if(status === types.checking) {
        return (<CheckingAuth/>);
    }

    return (
        <Routes>
            <Route path="/auth/*" element={<AuthRoutes/>}/>
            <Route path="/*" element={<JournalRoutes/>}/>
        </Routes>
    );
};