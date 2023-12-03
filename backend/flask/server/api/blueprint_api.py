from flask.blueprints import Blueprint
from flask_restful import Api
from .questions import Questions
from .user_data import Userdata
from .home import Home

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api.add_resource(Questions, "/questions")
api.add_resource(Userdata, "/user")
api.add_resource(Home, "/")
api.add_resource(Leaderboard, '/leaderboard')
