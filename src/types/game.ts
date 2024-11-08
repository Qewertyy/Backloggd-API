//Copyright 2023 Qewertyy, MIT License

export type userInfo = {
  profile: string;
  username: string;
  bio: string;
  favoriteGames?: favoriteGames[];
  recentlyPlayed?: recentlyPlayed[];
  recentlyReviewed?: recentlyReviewed[];
} & userStats;

export type favoriteGames = {
  name: string;
  image: string;
  mostFavorite?: boolean;
};

export type recentlyPlayed = {
  name: string;
  image: string;
  date?: string;
  rating?: number;
};

export type recentlyReviewed = {
  name: string;
  image: string;
  rating?: number;
  review?: string;
};

export type userStats = {
  [key: string]: number;
};
