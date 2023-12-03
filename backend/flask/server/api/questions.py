from flask_restful import Resource
from flask import jsonify, request, make_response
from db import mongo
from .level import Level


class Questions(Resource):
    def get(self):
        data = request.get_json()

        # Ensure that the request data contains the expected key
        if "level_index" not in data:
            return make_response(jsonify({"error": "Missing 'level_index' in the request data"}), 400)

        new_lvl = Level(data["level_index"])

        total_num_questions = new_lvl.total_num_questions
        difficulty_distribution = new_lvl.difficulty_distribution
        questions = mongo.Questions.get_batch_random_questions(total_num_questions, difficulty_distribution)

        new_lvl.questions = questions
        return make_response(jsonify({"Level": new_lvl.to_dict()}), 201)

    def post(self):
        """
        A method that receives an array of questions with all parameters and adds them to the database.
        """
        data = request.get_json()
        # Multi question insertion
        mongo.Questions.create_new_questions(data["questions"])

        # Single question insertion
        # for question in data["questions"]:
        #     mongo.Questions.create_new_question(question["question"], question["difficulty"], question["possible_answers"],
        #                                         question["right_answer_index"], question["explanation"], question["references"])
        return make_response(jsonify({"success": "questions were submitted successfully"}), 201)
