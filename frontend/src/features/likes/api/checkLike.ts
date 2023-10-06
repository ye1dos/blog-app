import { useQuery } from "@tanstack/react-query";
import { api } from "../../../app/api";

const checkLike = async (
    userId: string,
    postId: string,
): Promise<any> => {
    const response = await api.get(
        `/posts/user/likes/?userId=${userId}&postId=${postId}`,
    );
    return response.data;
};

export const useCheckLikeQuery = (userId: string, postId: string) => {
    return useQuery({
        queryKey: ["likes", userId, postId],
        queryFn: () => checkLike(userId, postId),
        select: (data) => {
            console.log(data.data.attributes.results.length);
            return data.data.attributes.results.length > 0;
        },
    });
};
