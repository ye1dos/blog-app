interface IComment {
    data: any;
    id: string;
    content: string;
    updatedAt: string;
    author: IUser;
    postId: string;
}
