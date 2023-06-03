import "./EditModal.scss";
import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../components/config/firebase";

const Message = ({ setEditModal, post }) => {
  const [userName, setUserName] = useState("");
  const [hikeName, setHikeName] = useState("");
  const [userPost, setUserPost] = useState("");

  const updatePostContent = async (id) => {
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
              type="text"
              id="username"
              placeholder="Name"
              className="modal__body"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              id="hike"
              placeholder="Hike"
              className="modal__body"
              onChange={(e) => setHikeName(e.target.value)}
            />
            <textarea
              type="text"
              id="post"
              className="modal__body modal__content"
              onChange={(e) => setUserPost(e.target.value)}
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

export default Message;
