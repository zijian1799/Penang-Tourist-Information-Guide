import sqlite3
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


def users_get_row_as_dict(row):
    row_dict = {
        'user_id': row[0],
        'name': row[1],
        'email': row[2],
        'birthDate': row[3],
        'password': row[4],
    }

    return row_dict


    
def reviews_get_row_as_dict(row):
    row_dict = {
        'reviews_id': row[0],
        'place_id': row[1],
        'date': row[2],
        'ratingStars': row[3],
        'comment': row[4],
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
def show(category):
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


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port, debug=True)