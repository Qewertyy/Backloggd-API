//Copyright 2023 Qewertyy, MIT License

import { Cheerio, Element } from "cheerio";

function extractGame(element: Cheerio<Element>) {
    const game = element.find("div.overflow-wrapper");
    const name = game.find("img").attr("alt");
    const image = game.find("img").attr("src");
    if (name && image) {
        return { name, image };
    }
    return null;
}

export { extractGame}