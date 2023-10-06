import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const register = async ({ avatar, ...credentials }: any): Promise<any> => {
    const formData = new FormData();
    formData.append("files", avatar);
    const photo = await axios.post("http://localhost:1337/api/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    if (photo) {
        credentials.avatar = 'http://localhost:1337' + photo?.data[0].url + "";
    }
    const response = await axios.post("http://127.0.0.1:1337/api/auth/local/register", { ...credentials });
    localStorage.setItem("jwt", response.data.jwt);
    return response.data;
};

export const useRegisterMutation = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (credentials: FormData) => register(credentials),
        onSuccess: (data) => {
            dispatch(setCredentials({ user: data.user }));
            navigate("/");
        },
    });
};
