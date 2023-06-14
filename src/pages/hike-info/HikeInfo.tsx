import './HikeInfo.scss';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Rating from '../../assets/icons/rating.png';

interface Hikes {
  id: string;
  name: string;
  location: string;
  difficulty: string;
  time: string;
  length: string;
  elevation: string;
  season: string;
  image: string;
  description: string;
  map: string;
}

const HikeInfo: FC = () => {
  const params = useParams();
  const [hikeInfo, setHikeInfo] = useState<Hikes[]>([]);

  const BACK_END_URL: string = `${import.meta.env.VITE_API_URL}/${params.id}`;

  useEffect(() => {
    const fetchHikes = () => {
      axios
        .get(BACK_END_URL)
        .then((response) => {
          setHikeInfo(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchHikes();
  }, [params.id]);

  return (
    <>
      <section className='information'>
        {hikeInfo.map((hike) => (
          <main className='info__container' key={hike.id}>
            <div className='info__wrapper'>
              <div className='info__img-wrapper'>
                <div className='info'>
                  <div className='info__heading'>
                    <h2 className='info__title'>{hike.name}</h2>
                  </div>
                  <p className='info__location'>{hike.location}</p>
                  <div className='info__details'>
                    <p className='info__difficulty'>
                      <span className='info__details--bold'>Difficulty: </span>
                      {hike.difficulty}
                    </p>
                    <p className='info__time'>
                      <span className='info__details--bold'>Time: </span>
                      {hike.time}
                    </p>
                  </div>
                  <div className='info__details'>
                    <p className='info__length'>
                      <span className='info__details--bold'>Length: </span>
                      {hike.length}
                    </p>
                    <p className='info__elevation'>
                      <span className='info__details--bold'>Elevation: </span>
                      {hike.elevation}
                    </p>
                  </div>
                  <div className='info__season-container'>
                    <p className='info__season'>
                      <span className='info__details--bold'>Season: </span>
                      {hike.season}
                    </p>
                  </div>
                  <div className='info__rating-container'>
                    <img
                      className='info__rating'
                      src={Rating}
                      alt='star rating'
                    ></img>
                  </div>
                </div>
                <img
                  className='info__img'
                  src={hike.image}
                  alt='Moutainous region'
                ></img>
              </div>
              <div className='info__container'>
                <div>
                  <p className='info__text'>{hike.description}</p>
                </div>
              </div>
            </div>
          </main>
        ))}
      </section>
      <div className='info__map'>
        {hikeInfo.map((hike) => (
          <img
            className='info__img-map'
            src={hike.map}
            alt='Map of trail'
            key={hike.id}
          ></img>
        ))}
      </div>
    </>
  );
};

export default HikeInfo;
