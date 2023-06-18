import './Bulletin.scss';
import Posts from '../../components/posts/Posts';
import React, { FormEvent, ChangeEvent, FC, useState} from 'react';
import User from '../../assets/icons/user.png';
import Envelope from '../../assets/icons/envelope.svg';
import Trash from '../../assets/icons/trash-can.svg';
import Hikers from '../../assets/images/hikers-animated.png';
import { db, auth } from '../../components/config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Bulletin: FC = () => {
  const formEl = useRef();

  const [userName, setUserName] = useState<string>('');
  const [hikeName, setHikeName] = useState<string>('');
  const [userPost, setUserPost] = useState<string>('');

  //Reference the collection
  const postsCollectionRef = collection(db, 'posts');

  const options: string[] = [
    'Watersprite Lake',
    'The Lions',
    "St.Mark's Summit",
    'Stawamus Chief',
    'Wedgemount Lake',
    'Grouse Grind',
    'Garibaldi Lake',
    "Al's Halbrich Ridge",
    'High Note Trail',
    'Mount Seymour',
    'Lynn Canyon',
    'Bowen Lookout',
    'BCMC Trail',
    'Crown Mountain',
    'Hollyburn Mountain',
    'Elfin Lakes',
  ];

  const addPost = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await addDoc(postsCollectionRef, {
        userName: userName,
        hikeName: hikeName,
        content: userPost,
        userId: auth?.currentUser?.uid,
      });
      formEl.current.reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className='bulletin'>
        <div className='bulletin__msg'>
          <img src={Hikers} className='bulletin__img' />
          <div className='bulletin__wrap'>
            <form className='form' onSubmit={addPost} ref={formEl}>
              <h1>Create a new post</h1>
              <input
                className='bulletin__input'
                placeholder='Enter your name'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserName(e.target.value)
                }
              />
              <Dropdown
                options={options}
                placeholder='Select a hike'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setHikeName(e.target.value)
                }
              />
              <input
                className='bulletin__input-body'
                placeholder='Have something to share with the community?'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserPost(e.target.value)
                }
              />
              <div className='btn__wrapper'>
                <button className='btn' type='submit'>
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
};
export default Bulletin;
