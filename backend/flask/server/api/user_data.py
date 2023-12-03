from flask_restful import Resource
from .utils import custom_login_required
from flask import jsonify, request, make_response
from db import mongo


class Userdata(Resource):
    """
    A class representing the user data resource.
    This resource is accessible to logged-in users.
    Methods:
        get(self): Handles GET requests for the User Profile.
    """

    # @custom_login_required
    def get(self):
        data = request.get_json()
        user_data = mongo.Users.get_user_by_id(data["user_id"])
        return make_response(jsonify(user_data), 201)

    # @custom_login_required
    def post(self):
        data = request.get_json()

        if len(data) > 3: # Update all attributes at the end of a level
            mongo.Users.update_user_progress(data["user_id"], data["new_level_highscores"], data["new_level_index"],
                                            data["new_total_score"], data["new_hp"])
        else: # Update user hp
            mongo.Users.update_user_hp(data["user_id"], data["new_hp"])
        return make_response(jsonify({"success": "user data was updated successfully"}), 201)
