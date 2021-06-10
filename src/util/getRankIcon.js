import ironIcon from '../rank_icons/Emblem_Iron.png';
import bronzeIcon from '../rank_icons/Emblem_Bronze.png';
import silverIcon from '../rank_icons/Emblem_Silver.png';
import goldIcon from '../rank_icons/Emblem_Gold.png';
import platIcon from '../rank_icons/Emblem_Platinum.png';
import diamondIcon from '../rank_icons/Emblem_Diamond.png';
import masterIcon from '../rank_icons/Emblem_Master.png';
import grandmasterIcon from '../rank_icons/Emblem_Grandmaster.png';
import challengerIcon from '../rank_icons/Emblem_Challenger.png';

const RANK = new Map();

function registerRank(tier) {
    RANK.set(tier.id, tier);
}

registerRank({
    id: "IRON",
    name: "Iron",
    icon: ironIcon,
})

registerRank({
    id: "BRONZE",
    name: "Bronze",
    icon: bronzeIcon,
});

registerRank({
    id: "SILVER",
    name: "Silver",
    icon: silverIcon,
});

registerRank({
    id: "GOLD",
    name: "Gold",
    icon: goldIcon,
});

registerRank({
    id: "PlATINUM",
    name: "Platinum",
    icon: platIcon,
});

registerRank({
    id: "DIAMOND",
    name: "Diamond",
    icon: diamondIcon,
});

registerRank({
    id: "MASTER",
    name: "Master",
    icon: masterIcon,
});
registerRank({
    id: "GRANDMASTER",
    name: "Grandmaster",
    icon: grandmasterIcon,
});
registerRank({
    id: "CHALLENGER",
    name: "Challenger",
    icon: challengerIcon,
});

export default RANK;


