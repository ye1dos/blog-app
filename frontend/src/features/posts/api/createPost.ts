import { api } from "../../../app/api";
import { useMutation } from "@tanstack/react-query";

const createPost = async (data: any): Promise<any> => {
    const formData = new FormData();
    formData.append("files", data.postImg[0]);
    const uploadResponse: any = await api.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    const response = await api.post("/posts", { data: { ...data, postImg: 'http://localhost:1337' + uploadResponse?.data[0].url + "" } });
    return response.data;
};

export const useCreatePostMutation = () => {
    return useMutation({
        mutationFn: (postData: FormData) => createPost(postData),
    });
};
