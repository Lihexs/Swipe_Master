from flask_restful import Resource
from flask import jsonify, make_response
from db import mongo
from logger import logger

class Leaderboard(Resource):
    def get(self):
        
        # You can optionally add query parameters to customize the leaderboard, such as the number of results
        limit = 10  # This can be a default value or retrieved from a query parameter
        leaderboard_data = mongo.Users.get_leaderboard(limit)

        # Return the leaderboard data in JSON format
        return make_response(jsonify({"leaderboard": leaderboard_data}), 201)
