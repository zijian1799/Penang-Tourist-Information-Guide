import sqlite3
db = sqlite3.connect('db.sqlite')

cursor = db.cursor()

cursor.execute('''
    INSERT INTO places(name,description,category,image,location,favourite,operatinghours,priceRange,website,contact)
    VALUES('The Habitat Penang','Educational & fun attraction showing off the area’s pristine rainforest while teaching about it ',
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2FhabitatPenangHill.png?alt=media&token=d93b3cd8-a257-4f53-ad46-9c03e1129ec3', 
    'Jalan Stesen, Bukit Bendera Air Itam, 11500 George Town, Pulau Pinang.',0,'Allday 9am-7pm',2,'https://thehabitat.my/', '019-6457741')
''')

cursor.execute('''
    INSERT INTO places(name,description,category,image,location,favourite,operatinghours,priceRange,website,contact)
    VALUES('The Habitat Penang','Educational & fun attraction showing off the area’s pristine rainforest while teaching about it ',
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2FhabitatPenangHill.png?alt=media&token=d93b3cd8-a257-4f53-ad46-9c03e1129ec3', 
    'Jalan Stesen, Bukit Bendera Air Itam, 11500 George Town, Pulau Pinang.',0,'Allday 9am-7pm',2,'https://thehabitat.my/', '019-6457741')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,favourite,operatinghours,priceRange,website,contact)
    VALUES('The Habitat Penang','Educational & fun attraction showing off the area’s pristine rainforest while teaching about it ',
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2FhabitatPenangHill.png?alt=media&token=d93b3cd8-a257-4f53-ad46-9c03e1129ec3', 
    'Jalan Stesen, Bukit Bendera Air Itam, 11500 George Town, Pulau Pinang.',0,'Allday 9am-7pm',2,'https://thehabitat.my/', '019-6457741')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,favourite,operatinghours,priceRange,website,contact)
    VALUES('The Habitat Penang','Educational & fun attraction showing off the area’s pristine rainforest while teaching about it ',
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2FhabitatPenangHill.png?alt=media&token=d93b3cd8-a257-4f53-ad46-9c03e1129ec3', 
    'Jalan Stesen, Bukit Bendera Air Itam, 11500 George Town, Pulau Pinang.',0,'Allday 9am-7pm',2,'https://thehabitat.my/', '019-6457741')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,favourite,operatinghours,priceRange,website,contact)
    VALUES('The Habitat Penang','Educational & fun attraction showing off the area’s pristine rainforest while teaching about it ',
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2FhabitatPenangHill.png?alt=media&token=d93b3cd8-a257-4f53-ad46-9c03e1129ec3', 
    'Jalan Stesen, Bukit Bendera Air Itam, 11500 George Town, Pulau Pinang.',0,'Allday 9am-7pm',2,'https://thehabitat.my/', '019-6457741')
''')

db.commit()
db.close()
