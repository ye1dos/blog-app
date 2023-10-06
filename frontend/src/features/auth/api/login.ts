import { useMutation } from "@tanstack/react-query";
import { api } from "../../../app/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type ILoginCredentials = {
    username: string;
    password: string;
};

const login = async (
    user: ILoginCredentials,
): Promise<{ user: IUser }> => {
    const credentials = {
        identifier: user.username,
        password: user.password,
    }
    const response = await axios.post("http://localhost:1337/api/auth/local", credentials);
    localStorage.setItem("jwt", response.data.jwt);
    return response.data;
};

export const useLoginMutation = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (formData: ILoginCredentials) => login(formData),
        onSuccess: (data) => {
            dispatch(setCredentials({ user: data.user }));
            navigate("/");
        },
    });
};
