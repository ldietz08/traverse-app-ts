import "./Bulletin.scss";
import Posts from "../../components/posts/Posts";
import { useState } from "react";
import User from "../../assets/icons/user.png";
import Envelope from "../../assets/icons/envelope.svg";
import Trash from "../../assets/icons/trash-can.svg";
import Hikers from "../../assets/images/hikers-animated.png";
import { db, auth } from "../../components/config/firebase";
import { collection, addDoc } from "firebase/firestore";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function Bulletin() {
  const [userName, setUserName] = useState("");
  const [hikeName, setHikeName] = useState("");
  const [userPost, setUserPost] = useState("");

  //Reference the collection
  const postsCollectionRef = collection(db, "posts");

  const options = [
    "Watersprite Lake",
    "The Lions",
    "St.Mark's Summit",
    "Stawamus Chief",
    "Wedgemount Lake",
    "Grouse Grind",
    "Garibaldi Lake",
    "Al's Halbrich Ridge",
    "High Note Trail",
    "Mount Seymour",
    "Lynn Canyon",
    "Bowen Lookout",
    "BCMC Trail",
    "Crown Mountain",
    "Hollyburn Mountain",
    "Elfin Lakes",
  ];

  const addPost = async (e) => {
    e.preventDefault();
    try {
      await addDoc(postsCollectionRef, {
        userName: userName,
        hikeName: hikeName,
        content: userPost,
        userId: auth?.currentUser?.uid,
      });
      const form = document.querySelector(".form"); //switch to useRef
      form.reset();
    } catch (err) {
      console.log(err);
    }
  };

  // Add error handling, nullish coalescing
  return (
    <>
      <section className="bulletin">
        <div className="bulletin__msg">
          <img src={Hikers} className="bulletin__img" />
          <div className="bulletin__wrap">
            <form className="form">
              <h1>Create a new post</h1>
              <input
                className="bulletin__input"
                placeholder="Enter your name"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <Dropdown
                options={options}
                placeholder="Select a hike"
                onChange={(e) => {
                  setHikeName(e.value);
                }}
              />
              <input
                className="bulletin__input-body"
                placeholder="Have something to share with the community?"
                onChange={(e) => {
                  setUserPost(e.target.value);
                }}
              />
              <div className="btn__wrapper">
                <button className="btn" onClick={addPost}>
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
        <Posts />
      </section>
    </>
  );
}
