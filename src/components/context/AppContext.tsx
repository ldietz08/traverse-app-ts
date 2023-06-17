import React, { createContext, useContext } from 'react';
import { useState } from 'react';

interface HikeProps {
  id: string;
  image: string;
  location: string;
}

const AppContext = createContext<{
  favorites: HikeProps[];
  addToFavorites: (item: HikeProps) => void;
  removeFromFavorites: (item: string) => void;
}>({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('An error has occurred');
  }
  return context;
};

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<HikeProps[]>([]);

  const addToFavorites = (hike: HikeProps) => {
    const oldFaves = [...favorites];

    const newFaves = oldFaves.concat(hike);
    setFavorites(newFaves);
  };
  const removeFromFavorites = (id: string) => {
    const oldFaves = [...favorites];
    const newFaves = [...oldFaves.filter((hike) => hike.id !== id)];

    setFavorites(newFaves);
  };
  return (
    <AppContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
