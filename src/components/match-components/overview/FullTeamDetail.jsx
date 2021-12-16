import React from "react";
import cx from "classnames";
import "./FullTeamDetail.css";
import ChampSprite from "../ChampSprite";
import PerksSpells from "../PerksSpells";
import ItemsBlock from "./ItemsBlock";
import TeamObjectiveInfo from "./TeamObjectiveInfo";
import CsDetail from "./CsDetail";
import WardDetails from "./WardDetails";
import KdaDetail from "./KdaDetail";
import DamageDetail from "./DamageDetail";

export default function FullTeamDetail(props) {
  const { id, participants, team, duration, TEAM, maxDamage, isRemake } = props;
  const isBlue = id === TEAM.blue;
  let index = 1;

  return (
    <div className="team-detail">
      <div
        className={cx("full-data-table", {
          "table-blue": isBlue,
          "table-red": !isBlue,
        })}
      >
        <div className="full-data-table-header">
          <div className="data-header">
            <div className="header-cell table-detail-name">
              <TeamObjectiveInfo
                id={id}
                participants={participants}
                team={team}
                isBlue={isBlue}
                isRemake={isRemake}
              />
            </div>
            {/*<div className="header-cell">Tier</div>*/}
            <div className="header-cell table-detail-kda">KDA</div>
            <div className="header-cell table-detail-vision">Vision</div>
            <div className="header-cell table-detail-cs">CS</div>
            <div className="header-cell table-detail-dmg">Damage</div>
            <div className="header-cell table-detail-item">Item</div>
          </div>
        </div>
        <div>
          {participants.map((participant) => {
            let id = participant.puuid;
            if (id === "BOT") {
              id = id + index;
              index++;
            }

            return (
              <div className="data-row" key={id}>
                <div className="data-row-section">
                  <div className="chosen-options-name table-detail-name">
                    <div className="chosen-sum-options">
                      <ChampSprite
                        participant={participant}
                        isPlayer={false}
                        isTeamDetail={true}
                      />
                      <PerksSpells
                        participant={participant}
                        isTeamDetail={true}
                      />
                    </div>
                    <div className="sum-name-container">
                      <p className="sum-name">{participant.summonerName}</p>
                    </div>
                  </div>
                </div>
                {/*<td>*/}
                {/*  <TierDetail name={participant.summonerName} />*/}
                {/*</td>*/}
                <div className="data-row-section">
                  <KdaDetail
                    kills={participant.kills}
                    deaths={participant.deaths}
                    assists={participant.assists}
                  />
                </div>
                <div className="data-row-section">
                  <WardDetails
                    visionScore={participant.visionScore}
                    wardsPlaced={participant.wardsPlaced}
                    wardsKilled={participant.wardsKilled}
                    redsPlaced={participant.detectorWardsPlaced}
                  />
                </div>
                <div className="data-row-section">
                  <CsDetail
                    duration={duration}
                    cs={
                      participant.totalMinionsKilled +
                      participant.neutralMinionsKilled
                    }
                  />
                </div>
                <div className="data-row-section">
                  <DamageDetail
                    damage={participant.totalDamageDealtToChampions}
                    maxDamage={maxDamage}
                  />
                </div>
                <div className="data-row-section">
                  <ItemsBlock participant={participant} isPlayer={false} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
