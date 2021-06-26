import React, {useContext, useState} from "react";
import getChampionIcon from "../util/getChampionIcon";
import getSummonerSpellUrl from '../util/getSummonerSpellUrl'
import "./MatchView.css";
import {
  ChampionDataContext,
  DDragonVersionContext,
  ItemDataContext,
  RuneDataContext,
  SumsDataContext,
} from "../hook";
import getRuneIcon from "../util/getRuneIcon";
import getItemIcon from "../util/getItemIcon";
import cx from "classnames";

const TEAM = {
  blue: 100,
  red: 200,
};

function Team(props) {
  const { participants, id } = props;
  const isBlue = id === TEAM.blue;

  return (
    <ul className={cx("team", { "team-blue": isBlue, "team-red": !isBlue })}>
      {participants.map((participant) => (
        <li className="team-member" key={participant.puuid}>
          <Summoner participant={participant} />
        </li>
      ))}
    </ul>
  );
}

function FullMatchDetail(props) {
  const { participants } = props;

  return (
    <div className="full-match-detail">
      <div className="tab-bar">
        <div className="tab">Overview</div>
        <div className="tab">Analytics</div>
        <div className="tab">Build</div>
      </div>
      {Array.from(participants.entries()).map(([id, participants]) => (
        <FullTeamDetail key={id} participants={participants} id={id} />
      ))}
    </div>
  );
}

function FullTeamDetail(props) {
  const { id, participants } = props;
  const isBlue = id === TEAM.blue;

  return (
    <table
      className={cx("full-data-table", {
        "table-blue": isBlue,
        "table-red": !isBlue,
      })}
    >
      <tr className="data-header">
        <th className="header-cell">{`${isBlue ? "Blue" : "Red"} Team`}</th>
        <th className="header-cell">KDA</th>
        <th className="header-cell">Vision</th>
        <th className="header-cell">CS</th>
        <th className="header-cell">Item</th>
      </tr>
      {participants.map((participant) => (
        <tr className="data-row" key={participant.puuid}>
          <td>
            <div className="chosen-options-name">
              <div className="chosen-sum-options">
                <ChampSprite
                  participant={participant}
                  isPlayer={false}
                  isTeamDetail={true}
                />
                <PerksSpells participant={participant} isTeamDetail={true} />
              </div>
              <p className="sum-name">{participant.summonerName}</p>
            </div>
          </td>
          <td>{`${participant.kills} / ${participant.deaths} / ${participant.assists}`}</td>
          <td>{participant.visionScore}</td>
          <td>
            {participant.totalMinionsKilled + participant.neutralMinionsKilled}
          </td>
          <td>
            <ItemsBlock participant={participant} isPlayer={false} />
          </td>
        </tr>
      ))}
    </table>
  );
}

function Item(props) {
  const { itemId } = props;
  const isNoItem = itemId === 0;
  const dDragon = useContext(DDragonVersionContext);
  const itemData = useContext(ItemDataContext);

  let itemInfo = Object.values(itemData.data).find(
    (item) => parseInt(item) === itemId
  );

  return isNoItem ? (
    <div className="item">
      <div className="no-item"></div>
    </div>
  ) : (
    <div className="item">
      <img
        className="item-sprite"
        src={getItemIcon(itemId, dDragon)}
        alt={`${itemInfo?.name}`}
      />
    </div>
  );
}

const ITEM_KEY_REGEX = /^item[0-6]$/;

function ItemsBlock(props) {
  const { participant, isPlayer } = props;

  let items = Object.fromEntries(
    Object.entries(participant).filter(([key]) => key.match(ITEM_KEY_REGEX))
  );
  console.log(items);

  return (
    <div
      className={cx({
        "player-item-block": isPlayer,
        "team-item-block": !isPlayer,
      })}
    >
      {Object.entries(items).map((item) => (
        <Item key={item[0]} itemId={item[1]} />
      ))}
    </div>
  );
}

function Summoner(props) {
  const { participant } = props;

  return (
    <div className="summoner">
      <ChampSprite participant={participant} />
      <div className="sum-name">{participant.summonerName}</div>
    </div>
  );
}

function ChampSprite(props) {
  const dDragon = useContext(DDragonVersionContext);
  const champData = useContext(ChampionDataContext);
  const { participant, isPlayer, isTeamDetail } = props;

  let champId = Object.values(champData.data).find(
    (champ) => parseInt(champ.key) === participant?.championId
  );

  return (
    <img
      className={`${
        isPlayer
          ? "player-sprite"
          : isTeamDetail
          ? "team-sprite"
          : "champ-sprite"
      }`}
      src={getChampionIcon(champId.id, dDragon)}
      alt={`${champId.id}`}
    />
  );
}

function PerksSpells(props) {
  const dDragon = useContext(DDragonVersionContext);
  const sumsData = useContext(SumsDataContext);
  const runeData = useContext(RuneDataContext);
  const { participant, isTeamDetail } = props;
  const allRunePage = runeData.flatMap((page) =>
    page.slots.flatMap((slot) => slot.runes)
  );

  let sum1 = Object.values(sumsData.data).find(
    (sums) => parseInt(sums.key) === participant?.summoner1Id
  );
  let sum2 = Object.values(sumsData.data).find(
    (sums) => parseInt(sums.key) === participant?.summoner2Id
  );
  let rune1 = allRunePage.find(
    (runes) => runes.id === participant?.perks?.styles[0].selections[0]?.perk
  );
  let rune2 = runeData.find(
    (runes) => runes.id === participant?.perks?.styles[1].style
  );

  return (
    <div className="perks-spells">
      <div className="spells-column">
        <img
          className={isTeamDetail ? "team-spell" : "sum-spell"}
          src={getSummonerSpellUrl(sum1?.id, dDragon)}
          alt={sum1}
        />
        <img
          className={isTeamDetail ? "team-spell" : "sum-spell"}
          src={getSummonerSpellUrl(sum2?.id, dDragon)}
          alt={sum2}
        />
      </div>
      <div className="runes-column">
        <img
          className={isTeamDetail ? "team-rune" : "sum-spell"}
          src={getRuneIcon(rune1?.icon)}
          alt={sum2}
        />
        <img
          className={isTeamDetail ? "team-rune" : "sum-spell"}
          src={getRuneIcon(rune2?.icon)}
          alt={sum2}
        />
      </div>
    </div>
  );
}

function MatchView(props) {
  const { match, puuid } = props;
  const participants = new Map();
  const champData = useContext(ChampionDataContext);
  const [showFull, setShowFull] = useState(false);

  let player;
  match.info.participants.forEach((participant) => {
    if (participant.puuid === puuid) {
      player = participant;
    }
    const teamId = participant.teamId;
    let team = participants.get(teamId);
    if (!team) {
      participants.set(teamId, (team = []));
    }
    team.push(participant);
  });
  console.log(participants);

  function getGameType() {
    switch (match.info.queueId) {
      case 400:
        return "Normal Draft";
      case 420:
        return "Ranked Solo/Duo";
      case 430:
        return "Normal Blind";
      case 440:
        return "Ranked Flex";
      case 450:
        return "ARAM";
      default:
        return "Customs";
    }
  }

  function displayFullData() {
    setShowFull((prev) => !prev);
  }

  return (
    <li className="match">
      <div className="main-match-data">
        <div className="match-details">
          {getGameType()}
          <p>Time placeholder</p>
          <p>{player.win ? "Victory" : "Defeat"}</p>
        </div>
        <div className="chosen-sum-options">
          <ChampSprite participant={player} isPlayer={true} />
          <PerksSpells participant={player} />
        </div>
        <div className="kda-info">
          <p>{`${player.kills} / ${player.deaths} / ${player.assists}`}</p>
        </div>
        <div className="macro-info">
          <p>Level</p>
          <p>CS score</p>
          <p>KP%</p>
        </div>
        <div className="players-items">
          <ItemsBlock participant={player} isPlayer={true} />
        </div>
        <div className="main-match-right">
          <div className="main-match-teams">
            {Array.from(participants.entries()).map(([id, participants]) => (
              <Team
                key={id}
                participants={participants}
                id={id}
                champData={champData}
              />
            ))}
          </div>
          <button
            className="dropdown-match-button"
            type={"button"}
            onClick={displayFullData}
          >
            Display
          </button>
        </div>
      </div>
      {showFull ? <FullMatchDetail participants={participants} /> : null}
    </li>
  );
}

export default MatchView;
