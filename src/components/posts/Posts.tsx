import "../../pages/bulletin/Bulletin.scss";
import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../assets/icons/user.png";
import Envelope from "../../assets/icons/envelope.svg";
import Trash from "../../assets/icons/trash-can.svg";
import Edit from "../../assets/icons/edit-icon.svg";
import Hikers from "../../assets/images/hikers-animated.png";
import EditModal from "../../components/edit-modal/EditModal";
import { db, auth } from "../../components/config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

interface Post {
  id: string;
  userName?: string;
  hikeName?: string;
  content?: string;
}

const Posts: FC = () => {
  const navigate = useNavigate();

  const [editModal, setEditModal] = useState<boolean>(false);
  const [updatedPost, setUpdatedPost] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  //Reference the collection
  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id: string): Promise<void> => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  const getPosts = async (): Promise<void>  => {
    try {
      const data = await getDocs(postsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, [deletePost]);

  return (
    <section className="bulletin__post">
      {posts.map((post) => {
        return (
          <div className="bulletin__wrapper" key={post.id}>
            <div className="bulletin__user">
              <div>
                <img
                  className="bulletin__user-image"
                  src={User}
                  alt="TraVerse user profile pic"
                ></img>
              </div>
              <div>
                <h1>{post.userName}</h1>
              </div>
              <div className="bulletin__date">
                <h1>{new Date().toLocaleDateString()}</h1>
              </div>
            </div>
            <h3>{post.hikeName}</h3>
            <div className="bulletin__user-post">
              <p className="bulletin__content">{post.content}</p>
            </div>
            <button className="btn--edit" onClick={() => setEditModal(true)}>
              <img src={Edit} alt="Edit icon" />
            </button>
            {editModal === true && (
              <EditModal post={post} setEditModal={setEditModal} />
            )}
            <button className="btn--delete" onClick={() => deletePost(post.id)}>
              <img src={Trash} alt="Trash can icon" />
            </button>
          </div>
        );
      })}
      <div className="bulletin__wrapper">
        <div className="bulletin__user">
          <div>
            <img
              className="bulletin__user-image"
              src={User}
              alt="TraVerse user profile pic"
            ></img>
          </div>
          <div>
            <h1>Layla</h1>
          </div>
          <div className="bulletin__date">
            <h1>12/13/22</h1>
          </div>
        </div>
        <h3>Crown Mountain</h3>
        <div className="bulletin__user-post">
          <p className="bulletin__content">
            Hi everyone. I'm planning a trip to Crown Mountain on Saturday. I
            have two available seats :) Let me know if you're interested in
            joining!
          </p>
        </div>
        <div>
          <button className="btn--msg">
            <img
              className="bulletin-icon"
              src={Envelope}
              alt="Envelope icon"
            ></img>
          </button>
        </div>
      </div>
      <div className="bulletin__wrapper">
        <div className="bulletin__user">
          <div>
            <img
              className="bulletin__user-image"
              src={User}
              alt="TraVerse user profile pic"
            ></img>
          </div>
          <div>
            <h1>Carlos</h1>
          </div>
          <div className="bulletin__date">
            <h1>11/24/22</h1>
          </div>
        </div>
        <h3>The Lions</h3>
        <div className="bulletin__user-post">
          <p className="bulletin__content">
            Started at cypress lodge hiked all the way up to the west lion. But
            couldn’t go any further because the snow is so deep! Bring your
            icers.
          </p>
          <img
            className="bulletin-icon"
            src={Envelope}
            alt="Envelope icon"
          ></img>
        </div>
      </div>
      <div className="bulletin__wrapper">
        <div className="bulletin__user">
          <div>
            <img
              className="bulletin__user-image"
              src={User}
              alt="TraVerse user profile pic"
            ></img>
          </div>
          <div>
            <h1>Reyna</h1>
          </div>
          <div className="bulletin__date">
            <h1>08/18/22</h1>
          </div>
        </div>
        <h3>Stawamus Chief</h3>
        <div className="bulletin__user-post">
          <p className="bulletin__content">
            A hiker I met encountered a black bear and a couple of km later I
            heard some huffs and puffs and some movement from the trees next to
            me. I spent the rest of the hike singing out loud.
          </p>
          <img
            className="bulletin-icon"
            src={Envelope}
            alt="Envelope icon"
          ></img>
        </div>
      </div>
      <div className="bulletin__wrapper">
        <div className="bulletin__user">
          <div>
            <img
              className="bulletin__user-image"
              src={User}
              alt="TraVerse user profile pic"
            ></img>
          </div>
          <div>
            <h1>Max</h1>
          </div>
          <div className="bulletin__date">
            <h1>07/29/22</h1>
          </div>
        </div>
        <h3>St.Mark's Summit</h3>
        <div className="bulletin__user-post">
          <p className="bulletin__content">
            Approximately 6-6.5hr round trip. Quite a few muddy sections as you
            get closer to the summit. Definitely carry mosquito repellant, lots
            of them on the trail throughout.
          </p>
          <div className="envelope">
            <img
              className="bulletin-icon"
              src={Envelope}
              alt="Envelope icon"
            ></img>
          </div>
        </div>
      </div>
      <div className="bulletin__wrapper">
        <div className="bulletin__user">
          <div>
            <img
              className="bulletin__user-image"
              src={User}
              alt="TraVerse user profile pic"
            ></img>
          </div>
          <div>
            <h1>Jon</h1>
          </div>
          <div className="bulletin__date">
            <h1>06/25/22</h1>
          </div>
        </div>
        <h3>Sunshine Coast Trail</h3>
        <div className="bulletin__user-post">
          <p className="bulletin__content">
            Amazing trail- so well marked and maintained. You can feel the love
            that goes into it. We did about 100k in 6 days, from Sarah Point to
            Lewis lake.
          </p>
          <div className="envelope">
            <img
              className="bulletin-icon"
              src={Envelope}
              alt="Envelope icon"
            ></img>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default Posts;
