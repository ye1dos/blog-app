import { api } from "../../../app/api";
import { useQuery } from "@tanstack/react-query";

export const getSinglePost = async (postId?: string): Promise<IPost> => {
    const response = await api.get(`/posts/${postId}?populate=*`);
    console.log("response", response.data)
    return response.data;
};

export const useGetSinglePostQuery = (postId?: string) => {
    return useQuery({
        queryKey: ["posts", "single", postId],
        queryFn: () => getSinglePost(postId),
        enabled: !!postId,
    });
};
