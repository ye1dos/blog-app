import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/slices/authSlice";
import { CustomContainer } from "../../../components/Layout/CustomContainer";
import { useGetSinglePostQuery } from "../api/getSinglePost";
import { CommentSection } from "../../comments/components/CommentSection";
import RenderedPost from "../components/RenderedPost";
import { Spinner } from "../../../components/Elements/Spinner";
import { useState } from "react";
import EditorTabs from "../components/EditorTabs";

const Post = () => {
    const { postId } = useParams();
    const user = useSelector(selectCurrentUser);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const { data: post, isSuccess, isLoading } = useGetSinglePostQuery(postId);

    if (!isSuccess) {
        return null;
    }
    if (isLoading) {
        return <Spinner />;
    }

    return (
        <CustomContainer maxWidth="xl">
            {isEdit ? (
                <EditorTabs postId={post.data.id} isEdit={isEdit} />
            ) : (
                <>
                    <RenderedPost
                        title={post.data.attributes.title}
                        content={post.data.attributes.content}
                        preview={post.data.attributes.preview}
                        isEditAllowed={post.data.attributes.user.data.id === user?.id}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        postImg={post.data.attributes.postImg}
                    />
                    <CommentSection postId={postId || ""} />
                </>
            )}
        </CustomContainer>
    );
};

export default Post;
