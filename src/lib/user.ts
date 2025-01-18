import axios, { Axios, AxiosError } from "axios";
import { load } from "cheerio";
import config from "../config";
import { favoriteGames, recentlyPlayed, userInfo } from "../types";
import {
  extractBadges,
  extractGame,
  extractRecentReviews,
} from "../utils/game";

async function getUserInfo(
  username: string
): Promise<userInfo | { error: string; status: number }> {
  const referer = `${config.baseUrl}/search/users/${username}`;
  const response = await axios
    .get(`${config.baseUrl}/u/${username}`, {
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
  const $ = load(response.data);
  let userinfo = {} as userInfo;
  userinfo.username = username;
  userinfo.profile =
    $("meta[property='og:image']").attr("content") ||
    "https://backloggd.b-cdn.net/no_avatar.jpg";
  const hasBio = $("#bio-body").has("p").length === 0;
  userinfo.bio = hasBio ? $("#bio-body").text().trim() : "Nothing here!";
  const favoriteGames: favoriteGames[] = [];
  const recentlyPlayed: recentlyPlayed[] = [];
  const favoritesDiv = $("#profile-favorites").children();
  const recentlyPlayedDiv = $("#profile-journal").children();
  const userStatsDiv = $("#profile-stats").children();
  const userBadgesDiv = $("#profile-sidebar").children();
  const userStats: { [key: string]: number } = {};
  userStatsDiv.each((i, el) => {
    const value = $(el).children("h1").text();
    const key = $(el).children("h4").text();
    userStats[key] = parseInt(value);
  });
  favoritesDiv.each((_i, el) => {
    const game = extractGame($(el));
    if (game) {
      const mostFavorite = el.attribs.class.includes("ultimate_fav");
      favoriteGames.push({
        ...game,
        ...(mostFavorite && { mostFavorite }),
      });
    }
  });
  recentlyPlayedDiv.each((i, el) => {
    const game = extractGame($(el));
    if (game) {
      recentlyPlayed.push({ ...game });
    }
  });
  userinfo.badges = extractBadges($, userBadgesDiv);
  userinfo.favoriteGames = favoriteGames;
  userinfo.recentlyPlayed = recentlyPlayed;
  userinfo.recentlyReviewed = extractRecentReviews($, $("div.row.mb-3"));
  return { ...userinfo, ...userStats };
}

export { getUserInfo };
