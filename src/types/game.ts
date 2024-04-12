//Copyright 2023 Qewertyy, MIT License

export type userInfo = {
    profile: string;
    username: string;
    bio: string;
    favoriteGames?: favoriteGames[];
    recentlyPlayed?: recentlyPlayed[];
} & userStats;

export type favoriteGames = {
    name: string;
    image: string;
    mostFavorite?: boolean;
};

export type recentlyPlayed = {
    name: string;
    image: string;
};

export type userStats = {
    [key: string]: number;
};