
from flask_restful import Resource
from flask import jsonify, request, make_response
from db import mongo


class Home(Resource):
    """
    A class representing the homepage endpoint of the server.
    """
    # Test page
    def get(self):
        """
        A method that returns a message when you reach the server.
        :return: A simple message.
        """
        return make_response(jsonify({"success":"You have reached the server"}), 201)