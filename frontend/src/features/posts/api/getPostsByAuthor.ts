import { useQuery } from "@tanstack/react-query";
import { api } from "../../../app/api";

const getPostsByAuthor = async (authorId: string): Promise<IPost[]> => {
    console.log(authorId);
    const response = await api.get(`/posts/?filters[user][id][$eq]=${authorId}&populate=*`);
    return response.data;
};

export const useGetPostsByAuthorQuery = (authorId: string) => {
    return useQuery({
        queryKey: ["posts", authorId],
        queryFn: () => getPostsByAuthor(authorId),
    });
};
