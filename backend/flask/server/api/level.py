POSSIBLE_DIFFICULTIES = 5
DEFAULT_TIME = 0
DEFAULT_NUM_QUESTIONS = 0
DEFAULT_DISTRIBUTION = [0, 0, 0, 0, 0]
DEFAULT_QUESTIONS = []
DEFAULT_MAX_SCORE = 100


class Level:
    def __init__(self, level_index):
        self._level_index = level_index
        self._possible_difficulties = POSSIBLE_DIFFICULTIES
        self._level_time = 0
        self._difficulty_distribution = DEFAULT_DISTRIBUTION
        self._total_num_questions = DEFAULT_NUM_QUESTIONS
        self._max_lvl_score = DEFAULT_MAX_SCORE
        self._questions = DEFAULT_QUESTIONS
        self._create_lvl()

    # Getter and setter for level_index
    @property
    def level_index(self):
        return self._level_index

    @level_index.setter
    def level_index(self, value):
        self._level_index = value

    # Getter and setter for possible_difficulties
    @property
    def possible_difficulties(self):
        return self._possible_difficulties

    @possible_difficulties.setter
    def possible_difficulties(self, value):
        self._possible_difficulties = value

    # Getter and setter for level_time
    @property
    def level_time(self):
        return self._level_time

    @level_time.setter
    def level_time(self, value):
        self._level_time = value

    # Getter and setter for question_distribution
    @property
    def difficulty_distribution(self):
        return self._difficulty_distribution

    @difficulty_distribution.setter
    def difficulty_distribution(self, value):
        self._difficulty_distribution = value

    # Getter and setter for total_num_questions
    @property
    def total_num_questions(self):
        return self._total_num_questions

    @total_num_questions.setter
    def total_num_questions(self, value):
        self._total_num_questions = value

    # Getter and setter for questions
    @property
    def questions(self):
        return self._questions

    @questions.setter
    def questions(self, value):
        self._questions = value

    def to_dict(self):
        """
        Convert the Level object to a dictionary.
        """
        return {
            'level_index': self._level_index,
            'level_time': self._level_time,
            'difficulty_distribution': self._difficulty_distribution,
            'total_num_questions': self._total_num_questions,
            'max_lvl_score': self._max_lvl_score,
            'questions': [
                {key: value for key, value in question.items() if key not in ('_id', 'question_id')}
                for question in self.questions
            ]
        }

    def _create_lvl(self):
        if self._level_index == 0:  # Default lvl to test endpoint with one questions
            self._total_num_questions = 1
            self._difficulty_distribution = [100, 0, 0, 0, 0]
