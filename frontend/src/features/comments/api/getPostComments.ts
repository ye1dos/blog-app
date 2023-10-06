import { api } from "../../../app/api";
import { useQuery } from "@tanstack/react-query";

export const getPostComments = async (postId: string): Promise<any> => {
    const response = await api.get(`/comments/?filters[post][id][$eq]=${postId}&populate=*`);
    return response.data;
};

export const usePostCommentsQuery = (postId: string) => {
    return useQuery({
        queryKey: ["comments", "post", postId],
        queryFn: () => getPostComments(postId),
    });
};
