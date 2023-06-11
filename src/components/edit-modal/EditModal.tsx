import "./EditModal.scss";
import React, { FC, SetStateAction, Dispatch, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../components/config/firebase";

interface PostShape {
  id: string;
  userName: string;
  hikeName: string;
  content: string;
}

interface Props {
  setEditModal: Dispatch<SetStateAction<boolean>>;
  post: any;
}

const EditModal: FC<Props> = ({ setEditModal, post }) => {
  const [userName, setUserName] = useState<string>("");
  const [hikeName, setHikeName] = useState<string>("");
  const [userPost, setUserPost] = useState<string>("");

  const updatePostContent = async (id: string): Promise<void> => {
    const postDoc = doc(db, "posts", id);
    await updateDoc(postDoc, {
      userName: userName,
      hikeName: hikeName,
      content: userPost,
    });
  };

  return (
    <div className="modal">
      <div className="modal__container">
        <div className="modal__close-wrapper">
          <button className="modal__close" onClick={() => setEditModal(false)}>
            x
          </button>
        </div>
        <div className="title">
          <h1>Edit post</h1>
        </div>
        <form className="modal__form">
          <div className="body">
            <input
              id="username"
              placeholder="Name"
              className="modal__body"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserName(e.target.value)
              }
            />
            <input
              id="hike"
              placeholder="Hike"
              className="modal__body"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setHikeName(e.target.value)
              }
            />
            <textarea
              id="post"
              className="modal__body modal__content"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setUserPost(e.target.value)
              }
            />
          </div>
          <div className="modal__btn-wrapper">
            <button
              className="modal__btn modal__btn--cancel"
              onClick={() => setEditModal(false)}
            >
              Cancel
            </button>
            <button
              className="modal__btn"
              onClick={() => {
                updatePostContent(post.id);
                setEditModal(false);
              }}
            >
              Update post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
