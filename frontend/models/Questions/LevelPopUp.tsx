import LevelsData from "../User/LevelData";

type Level = {

    total_num_questions: number;
    level_time : number;
    max_lvl_score : number[];
    questions : JSON;
    current_hp: number;

};

export default Level;
