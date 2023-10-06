import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../app/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { setCredentials } from "../../auth/slices/authSlice";

const updateUser = async (
    data: Partial<IUser> & { avatarPath: string },
    userId: string,
): Promise<any> => {
    const { avatarPath, avatar, ...userData } = data;
    const formData = new FormData();
    formData.append("files", avatar);
    const uploadResponse: any = await api.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    const response = await api.put(
        `/users/${userId}`,
        {
            ...userData,
            avatar: "http://localhost:1337" + uploadResponse?.data[0].url + "",
        },
    );
    return response.data;
};

export const useUpdateUserMutation = (userId: string) => {
    const dispatch = useDispatch<AppDispatch>();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userData: Partial<IUser> & { avatarPath: string }) =>
            updateUser(userData, userId),
        onMutate: async (updatedUser) => {
            const queryKeys = ["users", "user", updatedUser.id];
            await queryClient.cancelQueries(queryKeys);
            const previousUser = queryClient.getQueryData<IUser>(queryKeys);
            if (previousUser) {
                queryClient.setQueryData<IUser>(queryKeys, (oldUser) => {
                    const newUser = {
                        ...updatedUser,
                        id: oldUser?.id,
                        avatar: updatedUser.avatarPath,
                    };
                    return newUser as IUser;
                });
            }
            return { previousUser };
        },
        onError: (_err, newUser, context) => {
            if (context?.previousUser) {
                queryClient.setQueryData<IUser>(
                    ["users", "user", newUser.id],
                    context.previousUser,
                );
            }
        },
        onSettled: (newUser) => {
            queryClient.invalidateQueries(["users", "user", newUser?.id]);
        },
        onSuccess: (data) => {
            dispatch(setCredentials({ user: data }));
        },
    });
};
