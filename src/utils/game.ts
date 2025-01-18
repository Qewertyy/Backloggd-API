//Copyright 2023 Qewertyy, MIT License

import { Cheerio, CheerioAPI, Element } from "cheerio";
import { recentlyReviewed, userBadges } from "../types";

function extractGame(element: Cheerio<Element>) {
  const game = element.find("div.overflow-wrapper");
  const name = game.find("img").attr("alt");
  const image = game.find("img").attr("src");
  const date = element.find("p.mb-0.played-date").text();
  let rating;
  const ratingDiv = element
    .find("div.star-ratings-static div.stars-top")
    .attr("style");
  if (ratingDiv) {
    rating = calculateRating(ratingDiv);
  }
  if (name && image) {
    return { name, image, ...(date && { date }), ...(rating && { rating }) };
  }
  return null;
}

function extractRecentReviews($: CheerioAPI, element: Cheerio<Element>) {
  const games: recentlyReviewed[] = [];
  const div = element.children();
  div.find(".review-card").each((_i, el) => {
    const selector = $(el);
    const reviewId = selector.find(".review-body").attr("review_id");
    let rating;
    const ratingDiv = selector
      .find("div.row.star-ratings-static div.stars-top")
      .attr("style");
    if (ratingDiv) rating = calculateRating(ratingDiv);
    const game = extractGame(selector);
    if (reviewId && game?.name && game?.image) {
      games.push({
        ...game,
        review: selector.find(`#collapseReview${reviewId}`).text().trim(),
        ...(rating && { rating }),
      });
    }
  });
  return games;
}

function calculateRating(style: string) {
  const widthMatch = style.match(/width:\s*(\d+(\.\d+)?)%/);
  if (widthMatch && widthMatch[1]) {
    const widthPercentage = parseFloat(widthMatch[1]);
    return (widthPercentage / 100) * 5;
  }
  return null;
}

function extractBadges($: CheerioAPI, element: Cheerio<Element>) {
  const badges: userBadges[] = [];
  element.find(".badges .backlog-badge-cus-col").each((_i, el) => {
    const selector = $(el);
    const pTag = selector.find(".badge-tooltip");
    const id = pTag.attr("badge_id");
    const badgeDiv = selector.find(`#badge-${id}`);
    if (id && badgeDiv) {
      badges.push({
        id,
        image: pTag.find("img").attr("src"),
        name: badgeDiv.find(".badge-title").text().trim(),
        description: badgeDiv.find(".badge-desc").text().trim(),
      });
    }
  });
  return badges;
}

export { extractGame, extractRecentReviews, extractBadges };
