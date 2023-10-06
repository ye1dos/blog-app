import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../app/api";
import cuid from "cuid";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/slices/authSlice";

const createComment = async (comment: Partial<IComment>): Promise<IComment> => {
    const response = await api.post("/comments/", { data: comment });
    return { data: response.data, post: comment.post };
};

export const useCreateCommentMutation = () => {
    const queryClient = useQueryClient();
    const author = useSelector(selectCurrentUser);
    return useMutation({
        mutationFn: (comment: Partial<IComment>) => createComment(comment),
        onMutate: async (comment) => {
            const queryKeys = ["comments", "post", comment.postId];
            await queryClient.cancelQueries(queryKeys);
            const previousComments =
                queryClient.getQueryData<IComment[]>(queryKeys);
            if (previousComments) {
                queryClient.setQueryData<IComment[]>(
                    queryKeys,
                    (oldComments) => {
                        const commentsCopy: IComment[] = JSON.parse(
                            JSON.stringify(oldComments),
                        );
                        const newComment = {
                            ...comment,
                            id: cuid(),
                            updatedAt: new Date().toISOString(),
                            author,
                        };
                        console.log(newComment);
                        commentsCopy.push(newComment as IComment);
                        return commentsCopy;
                    },
                );
            }

            return { previousComments };
        },
        onError: (_err, newComment, context) => {
            if (context?.previousComments) {
                queryClient.setQueryData<IComment[]>(
                    ["comments", "post", newComment.postId],
                    context.previousComments,
                );
            }
        },
        onSuccess: async (newComment) => {
            queryClient.invalidateQueries(["comments", "post", newComment.post]);
        },
        onSettled: (newComment) => {
            queryClient.invalidateQueries([
                "comments",
                "post",
                newComment?.postId,
            ]);
        },
    });
};
