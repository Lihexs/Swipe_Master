from flask_restful import Resource
from flask import jsonify, request, make_response
from flask_bcrypt import Bcrypt
from flask_caching import Cache
from .utils import is_valid
from db import mongo

bcrypt = Bcrypt()

online_users = []

def connect_user(user):
    """

    """
    online_users.append(user)


def disconnect_user(user):
    """

    """
    online_users.remove(user)


def is_user_online(user):
    """

    """
    return user in online_users


class Login(Resource):
    """

    """
    def post(self):
        """

        """
        data = request.get_json()

        # Check if the required fields are provided in the request JSON
        if 'username' not in data or 'password' not in data:
            return jsonify({'message': 'Username and password are required.'}), 400

        # Get username and password from the request
        unsanitized_username = data['username']
        unsanitized_password = data['password']

        # Sanitize and validate username and password
        username = is_valid(unsanitized_username)
        password = is_valid(unsanitized_password)

        if not username or not password:
            # If validation fails, return a general error message
            return make_response(jsonify({'error': 'Invalid username or password'}), 401)

        # Check if the username exists in the DB
        if mongo.Users.is_username_exists(data['username']):
            user = mongo.Users.get_user_by_username(username)
            user_id = user['user_id']

            if is_user_online(str(user_id)):
                return make_response(jsonify({'error': 'Already logged in'}), 401)

            # Check if the provided password matches the stored hashed password
            stored_password_hash = user["password"]
            stored_token = user["password_token"]
            if bcrypt.check_password_hash(stored_password_hash, stored_token + password):
                # Successful login

                user = mongo.Users.get_user_by_username(username)
                user_id = user['user_id']

                connect_user(str(user_id))  # Add user to the online users array
                return make_response(jsonify(str(user_id)), 200)

        # If login fails, return a general error message
        return make_response(jsonify({'error': 'Incorrect username or password'}), 401)

class Logout(Resource):
    """

    """
    def post(self):
        """

        """
        data = request.get_json()

        # Check if the required fields are provided in the request JSON
        if 'user_id' not in data:
            return make_response(jsonify({'message': 'User id is required.'}), 400)

        # Get user id from the request
        unsanitized_user_id = data['user_id']

        # Sanitize and validate username and password
        user_id = is_valid(unsanitized_user_id)

        if not user_id:
            # If validation fails, return a general error message
            return make_response(jsonify({'error': 'Invalid user id'}), 401)

        # Remove user from logged in array.
        if is_user_online(user_id):
            disconnect_user(user_id)
            return make_response(jsonify({'success': 'User logged out successfully'}), 401)
        else:
            return make_response(jsonify({'error': 'User is not logged in'}), 401)
