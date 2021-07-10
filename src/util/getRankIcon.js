import unranked from "../icons/rank_icons/unranked.png";
import ironI from "../icons/rank_icons/iron1.png";
import ironII from "../icons/rank_icons/iron2.png";
import ironIII from "../icons/rank_icons/iron3.png";
import ironIV from "../icons/rank_icons/iron4.png";
import bronzeI from "../icons/rank_icons/bronze1.png";
import bronzeII from "../icons/rank_icons/bronze2.png";
import bronzeIII from "../icons/rank_icons/bronze3.png";
import bronzeIV from "../icons/rank_icons/bronze4.png";
import silverI from "../icons/rank_icons/silver1.png";
import silverII from "../icons/rank_icons/silver2.png";
import silverIII from "../icons/rank_icons/silver3.png";
import silverIV from "../icons/rank_icons/silver4.png";
import goldI from "../icons/rank_icons/gold1.png";
import goldII from "../icons/rank_icons/gold2.png";
import goldIII from "../icons/rank_icons/gold3.png";
import goldIV from "../icons/rank_icons/gold4.png";
import platI from "../icons/rank_icons/platinum1.png";
import platII from "../icons/rank_icons/platinum2.png";
import platIII from "../icons/rank_icons/platinum3.png";
import platIV from "../icons/rank_icons/platinum4.png";
import diamondI from "../icons/rank_icons/diamond1.png";
import diamondII from "../icons/rank_icons/diamond2.png";
import diamondIII from "../icons/rank_icons/diamond3.png";
import diamondIV from "../icons/rank_icons/diamond4.png";
import master from "../icons/rank_icons/master.png";
import grandmaster from "../icons/rank_icons/grandmaster.png";
import challenger from "../icons/rank_icons/challenger.png";

const RANK = new Map();

function registerRank(tier) {
  RANK.set(tier.id, tier);
}

registerRank({
  id: "UNRANKED",
  name: "Unranked",
  tiers: {
    I: unranked,
  },
});

registerRank({
  id: "IRON",
  name: "Iron",
  tiers: {
    I: ironI,
    II: ironII,
    III: ironIII,
    IV: ironIV,
  },
});

registerRank({
  id: "BRONZE",
  name: "Bronze",
  tiers: {
    I: bronzeI,
    II: bronzeII,
    III: bronzeIII,
    IV: bronzeIV,
  },
});

registerRank({
  id: "SILVER",
  name: "Silver",
  tiers: {
    I: silverI,
    II: silverII,
    III: silverIII,
    IV: silverIV,
  },
});

registerRank({
  id: "GOLD",
  name: "Gold",
  tiers: {
    I: goldI,
    II: goldII,
    III: goldIII,
    IV: goldIV,
  },
});

registerRank({
  id: "PLATINUM",
  name: "Platinum",
  tiers: {
    I: platI,
    II: platII,
    III: platIII,
    IV: platIV,
  },
});

registerRank({
  id: "DIAMOND",
  name: "Diamond",
  tiers: {
    I: diamondI,
    II: diamondII,
    III: diamondIII,
    IV: diamondIV,
  },
});

registerRank({
  id: "MASTER",
  name: "Master",
  tiers: {
    I: master,
  },
});

registerRank({
  id: "GRANDMASTER",
  name: "Grandmaster",
  tiers: {
    I: grandmaster,
  },
});

registerRank({
  id: "CHALLENGER",
  name: "Challenger",
  tiers: {
    I: challenger,
  },
});

export default RANK;
