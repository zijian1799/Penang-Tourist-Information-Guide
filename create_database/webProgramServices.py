from os import access
import sqlite3
from unicodedata import name
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser

DB = 'touristguidedb5.sqlite'

def places_get_row_as_dict(row):
    row_dict = {
        'place_id': row[0],
        'name': row[1],
        'description': row[2],
        'category': row[3],
        'image': row[4],
        'location': row[5],
        'operatinghours': row[6],
        'priceRange': row[7],
        'website': row[8],
        'contact': row[9],
    }

    return row_dict

def user_get_row_as_dict(row):
    row_dict = {
        'user_id': row[0],
        'name': row[1],
        'email': row[2],        
        'password': row[3],
    }

    return row_dict
    
def reviews_get_row_as_dict(row):
    row_dict = {
        'reviews_id': row[0],
        'place_id': row[1],
        'user_id': row[2],
        'date': row[3],
        'ratingStars': row[4],
        'comment': row[5],
    }

    return row_dict

def reviews_users_get_row_as_dict(row):
    row_dict = {
        'review_user_id': row[0],
        'date': row[1],
        'ratingStars': row[2],
        'comment': row[3],
        'user_user_id': row[4],
        'name':row[5],
    }

    return row_dict

def favourite_get_row_as_dict(row):
    row_dict = {
        'favourite_id': row[0],
        'place_id': row[1],
        'user_id': row[2],
    }

    return row_dict
    
app = Flask(__name__)

@app.route('/api/places', methods=['GET'])
def index():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM places ORDER BY name')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = places_get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

@app.route('/api/places/<string:category>', methods=['GET'])
def show_category(category):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM places WHERE category=?', (str(category),))
    rows = cursor.fetchall()
    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = places_get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

@app.route('/api/login', methods=['POST'])
def get_user():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users WHERE name=?', (str(username),))
    data = cursor.fetchone()
    db.close()

    if data:
        row_as_dict = user_get_row_as_dict(data)
        if row_as_dict['name'] != username or row_as_dict['password'] != password:        
            return jsonify(None), 401
        else:
            return jsonify(row_as_dict), 200
    else:  
        return jsonify(None), 200    

@app.route('/api/register', methods=['POST'])
def create_user():
    new_user = (
        request.json['username'],
        request.json['email'],
        request.json['password'],
    )
            
    db = sqlite3.connect(DB)
    cursor = db.cursor()  
    cursor.execute('''INSERT INTO users(name,email,password)VALUES(?,?,?)''',new_user)

    user_id = cursor.lastrowid 

    db.commit()
    
    response = {
        'id': user_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response),201

@app.route('/api/places/<int:id>', methods=['GET'])
def show(id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM places WHERE place_id=?', (int(id),))
    row = cursor.fetchone()
    db.close()

    if row:
        row_as_dict = places_get_row_as_dict(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200


@app.route('/api/reviews/<int:place_id>', methods=['GET'])
def show_review(place_id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT ratings_and_reviews.user_id,ratings_and_reviews.date,ratings_and_reviews.ratingStars,ratings_and_reviews.comment,users.user_id,users.name FROM ratings_and_reviews JOIN users ON ratings_and_reviews.user_id = users.user_id WHERE ratings_and_reviews.place_id=?', (int(place_id),))
    rows = cursor.fetchall()
    print('test')
    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = reviews_users_get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_review_users(user_id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users WHERE user_id=?', (int(user_id),))
    row = cursor.fetchone()
    db.close()

    if row:
        row_as_dict = user_get_row_as_dict(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200

@app.route('/api/reviews', methods=['POST'])
def store_review():
    if not request.json:
        abort(404)

    new_review = (
        request.json['place_id'],
        request.json['user_id'],
        request.json['date'],
        request.json['ratingStars'],
        request.json['comment'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        INSERT INTO ratings_and_reviews(place_id,user_id,date,ratingStars,comment)
        VALUES(?,?,?,?,?)
    ''', new_review)

    review_id = cursor.lastrowid

    db.commit()

    response = {
        'id': review_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

@app.route('/api/userreview/<int:user_id>', methods=['GET'])
def show_specific_review(user_id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('SELECT ratings_and_reviews.user_id,ratings_and_reviews.date,ratings_and_reviews.ratingStars,ratings_and_reviews.comment,users.user_id,users.name FROM ratings_and_reviews JOIN users ON ratings_and_reviews.user_id = users.user_id WHERE ratings_and_reviews.user_id=?',(int(user_id),))
    row = cursor.fetchone()
    print('test')
    # print(rows)

    db.close()

    # rows_as_dict = []
    if row:
        row_as_dict = reviews_users_get_row_as_dict(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port, debug=True)