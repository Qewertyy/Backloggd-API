import axios, { Axios, AxiosError } from "axios";
import cheerio from "cheerio";
import config from "../config";
import { favoriteGames, recentlyPlayed, userInfo } from "../types/game";
import { extraxtGame } from "../utils/game";

async function getUserInfo(
  username: string
): Promise<userInfo | { error: string; status: number }> {
  const referer = `https://${config.baseUrl}/search/users/${username}`;
  const response = await axios
    .get(`https://${config.baseUrl}/u/${username}`, {
      headers: {
        ...config.headers,
        "Turbolinks-Referrer": referer,
        Referer: referer,
      },
    })
    .catch((err) => err);

  if (response instanceof AxiosError) {
    console.log(response.response?.status);
    let error, status;
    if (response.response?.status === 404) {
      error = "User not found";
      status = 404;
    } else {
      error = response.message;
      status = response.response?.status || 500;
    }
    return {
      error: error,
      status: status,
    };
  }
  const $ = cheerio.load(response.data);
  let userinfo: userInfo = {} as userInfo;
  userinfo.username = username;
  const hasBio = $("#bio-body").has("p").length === 0;
  const userBio = hasBio ? $("#bio-body").text().trim() : "Nothing here!"
  userinfo.bio = userBio;
  const favoriteGames: favoriteGames[] = [];
  const recentlyPlayed: recentlyPlayed[] = [];
  const favoritesDiv = $("#profile-favorites").children();
  const recentlyPlayedDiv = $("#profile-journal").children();
  const userStatsDiv = $("#profile-stats").children();
  const userStats: { [key: string]: number } = {};
  userStatsDiv.each((i, el) => {
    const value = $(el).children("h1").text();
    const key = $(el).children("h4").text();
    userStats[key] = parseInt(value);
  });
  favoritesDiv.each((i, el) => {
    const game = extraxtGame($(el));
    if (game) {
      const mostFavorite = el.attribs.class.includes("ultimate_fav");
      favoriteGames.push({ ...game, mostFavorite });
    }
  });
  recentlyPlayedDiv.each((i, el) => {
    const game = extraxtGame($(el));
    if (game) {
      recentlyPlayed.push({ ...game });
    }
  });
  userinfo.favoriteGames = favoriteGames;
  userinfo.recentlyPlayed = recentlyPlayed;
  userinfo = { ...userinfo, ...userStats };
  return userinfo;
}

export { getUserInfo };
