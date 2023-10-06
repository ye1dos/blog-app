import { useMutation } from "@tanstack/react-query";
import { api } from "../../../app/api";
import { toast } from "react-toastify";

const updatePost = async (postId: string, data: any): Promise<any> => {
    const formData = new FormData();
    console.log(data);
    formData.append("files", data.postImg[0]);
    const uploadResponse: any = await api.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    const response = await api.put(`/posts/${postId}`, { data: { ...data, postImg: 'http://localhost:1337' + uploadResponse?.data[0].url + "" } });
    return response.data;
};

export const useUpdatePostMutation = (postId: string) => {
    return useMutation({
        mutationFn: (data: FormData) => updatePost(postId, data),
        onSuccess: () => {
            toast.success("Post has been successfully updated");
        },
    });
};
