import sqlite3
db = sqlite3.connect('db.sqlite')

db.execute('DROP TABLE IF EXISTS places')

db.execute('DROP TABLE IF EXISTS places')

cursor = db.cursor()

db.commit()
db.close()
