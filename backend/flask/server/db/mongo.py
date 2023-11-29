from datetime import datetime
from typing import Any
import exceptions
from uuid import uuid4
from pymongo import MongoClient
import json
from logger import logger
from pymongo.collection import ReturnDocument
from bson import ObjectId
import os
import random

# Magic numbers/constants
DIFFICULTY_LEVELS = 5
DEFAULT_HP = 3


# Decorator to handle exceptions and log debug information
def handle_exceptions(method):
    def wrapper(*args, **kwargs):
        try:
            res = method(*args, **kwargs)
            logger.debug(f"response of {method.__name__}:")
            logger.debug(res)
            return res
        except Exception as e:
            logger.error(f"An exception occurred in {method.__name__}: {e}")

    return wrapper


# Singleton metaclass for MongoDB connection
class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


# Base class for collections with common methods
class CollectionBase:
    def __init__(self, collection_name, db) -> None:
        self.collection_name = collection_name
        self.schema = self.load_schema(self.collection_name)
        self.collection = db[self.collection_name]

    @staticmethod
    def load_schema(collection_name):
        json_schema = None
        path = f"./db/schemas/{collection_name}.json"
        with open(path, 'r') as file:
            json_schema = json.load(file)
        if not json_schema:
            raise FileNotFoundError(f"{collection_name} schema is not found. path: {path}")
        return json_schema

    def drop(self):
        self.collection.drop()


# Users collection class
class Users(CollectionBase):
    def __init__(self, db) -> None:
        self.collection_name = "users"
        super().__init__(self.collection_name, db)

    @handle_exceptions
    def create_user(self, username: str, password: str, password_token: str):
        user_id = ObjectId()
        new_user = {
            "user_id": user_id,
            "username": username,
            "password": password,
            "password_token": password_token,
            "role": "default",
            "current_level_index": 0,
            "levels_highscores": [],
            "current_hp": DEFAULT_HP,
            "total_score": 0,
        }
        self.collection.insert_one(new_user)
        return user_id

    @handle_exceptions
    def is_username_exists(self, username: str):
        username_filter = {
            "username": username
        }
        res = self.collection.count_documents(filter=username_filter)
        return res > 0  # Simplify the return statement

    @handle_exceptions
    def get_user_by_id(self, user_id: str):
        res = self.collection.find_one({"user_id": ObjectId(user_id)})
        logger.info("get_user_by_id")
        return res

    def get_user_by_username(self, username: str):
        res = self.collection.find_one({"username": username})
        logger.info("get_user_by_username")
        return res

    @handle_exceptions
    def update_user_progress(self, user_id: str, new_level_highscores, new_level_index: int,
                             new_total_score: int, new_hp: int):
        self.collection.update_one({"user_id": ObjectId(user_id)},
                                   {"$set":
                                        {"levels_highscores.$": new_level_highscores,
                                         "current_level.$": new_level_index,
                                         "total_score.$": new_total_score, "current_hp.$": new_hp}})

    @handle_exceptions
    def update_user_hp(self, user_id: str, new_hp: int):
        self.collection.update_one({"user_id": ObjectId(user_id)}, {"$set": {"current_hp.$": new_hp}})


# Questions collection class
class Questions(CollectionBase):
    def __init__(self, db) -> None:
        self.collection_name = "questions"
        super().__init__(self.collection_name, db)

    @handle_exceptions
    def create_new_question(self,
                            question: list[dict],
                            possible_answers: list[dict],
                            difficulty: int,
                            right_answer_index: int,
                            explanation: str,
                            references: list[str]):
        new_question_data = {
            "question_id": ObjectId(),
            "question": question,
            "difficulty": difficulty,
            "possible_answers": possible_answers,
            "right_answer_index": right_answer_index,
            "explanation": explanation,
            "references": references
        }
        self.collection.insert_one(question)

    @handle_exceptions
    def create_new_questions(self, questions_data):
        """
        Create new questions and insert them into the database.
        :param questions_data: List of dictionaries representing question data.
        """
        new_questions_data = []

        for question_data in questions_data:
            new_question_data = {
                "question_id": ObjectId(),
                "question": question_data.get("question", []),
                "difficulty": question_data.get("difficulty", 0),
                "possible_answers": question_data.get("possible_answers", []),
                "right_answer_index": question_data.get("right_answer_index", 0),
                "explanation": question_data.get("explanation", ""),
                "references": question_data.get("references", [])
            }
            new_questions_data.append(new_question_data)

        if new_questions_data:
            self.collection.insert_many(new_questions_data)

    @handle_exceptions
    def get_batch_random_questions(self, total_num_questions, difficulty_distribution):
        if len(difficulty_distribution) != DIFFICULTY_LEVELS or sum(difficulty_distribution) != 100:
            raise ValueError("Invalid difficulty distribution")
        questions = []
        difficulty_distribution_sum = 0

        for difficulty in range(len(difficulty_distribution)):
            if difficulty_distribution_sum == 100:
                break
            num_questions = total_num_questions * difficulty_distribution[difficulty] // 100
            difficulty_questions_lst = list(self.collection.find({"difficulty": difficulty}))
            questions += random.sample(difficulty_questions_lst, num_questions)
            difficulty_distribution_sum += difficulty_distribution[difficulty]
        return questions


# MongoDB class with Singleton pattern
class MongoDB(metaclass=Singleton):
    def __init__(self, mongo_url, database_name) -> None:
        self.client = MongoClient(mongo_url)
        self.db = self.client[database_name]
        self.users = Users(self.db)
        self.questions = Questions(self.db)

    @property
    def Users(self):
        return self.users

    @property
    def Questions(self):
        return self.questions

    def close_connection(self):
        self.client.close()


# Function to initialize the MongoDB connection
def init_db():
    MONGO_URL = os.environ.get("CONFIG_MONGODB_URI", None)
    MONGO_DATABASE_NAME = os.environ.get("CONFIG_MONGO_DATABASE_NAME", None)
    if not MONGO_URL:
        raise exceptions.ConfigurationNotFoundError("Mongo Connection String URL Configuration is not found")
    if not MONGO_DATABASE_NAME:
        raise exceptions.ConfigurationNotFoundError("Mongo Database Name Configuration is not found")
    try:
        mongo = MongoDB(MONGO_URL, MONGO_DATABASE_NAME)
        return mongo
    except Exception as e:
        logger.error(e)
        raise Exception(f"URI: {MONGO_URL} ,database name: {MONGO_DATABASE_NAME}")


# Initializing MongoDB
logger.info("Initializing Mongodb ...")
mongo = init_db()
