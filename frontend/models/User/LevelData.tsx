import UserData from "./UserData";


type LevelsData = {

    current_level_index: number;
    levels_highscores: number[];
    current_hp: number;
};

export default LevelsData;

export function convertUserDataToLevelsData(userData: UserData): LevelsData {
    const { current_level_index, levels_highscores, current_hp } = userData;
    return {
        current_level_index,
        levels_highscores,
        current_hp,
    };
}
