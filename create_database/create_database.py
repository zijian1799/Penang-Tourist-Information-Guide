import sqlite3
db = sqlite3.connect('touristguidedb3.sqlite')

db.execute('DROP TABLE IF EXISTS places')
db.execute('''CREATE TABLE places(
    place_id integer PRIMARY KEY AUTOINCREMENT,
    name text NOT NULL,
    description text NOT NULL,
    category text NOT NULL,
    image text NOT NULL,
    location text NOT NULL,
    operatinghours text NOT NULL,
    priceRange integer NOT NULL,
    website text NOT NULL,
    contact text NOT NULL
)''')

db.execute('DROP TABLE IF EXISTS users')
db.execute('''CREATE TABLE users(
    user_id integer PRIMARY KEY AUTOINCREMENT,
    name text NOT NULL,
    email text NOT NULL,
    birthDate text NOT NULL,
    password text NOT NULL
)''')

db.execute('DROP TABLE IF EXISTS ratings_and_reviews')
db.execute('''CREATE TABLE ratings_and_reviews(
    reviews_id integer PRIMARY KEY AUTOINCREMENT,
    place_id integer NOT NULL,
    date text NOT NULL,
    ratingStars text NOT NULL,
    comment text NOT NULL,
    FOREIGN KEY(place_id) REFERENCES places(place_id)
)''')

db.execute('DROP TABLE IF EXISTS favourite_places')
db.execute('''CREATE TABLE favourite_places(
    favourite_id integer PRIMARY KEY AUTOINCREMENT,
    place_id integer NOT NULL,
    user_id integer NOT NULL,
    FOREIGN KEY(place_id) REFERENCES places(place_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
)''')

cursor = db.cursor()

cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('The Habitat Penang','Educational & fun attraction showing off the area’s pristine rainforest while teaching about it ',
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2FhabitatPenangHill.png?alt=media&token=d93b3cd8-a257-4f53-ad46-9c03e1129ec3', 
    'Jalan Stesen, Bukit Bendera Air Itam, 11500 George Town, Pulau Pinang.','Allday 9am - 7pm',2,'https://thehabitat.my/', '019-6457741')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('Clan Jetties','Busy, scenic destination featuring a traditional village of rustic houses on stilts over the water.',
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2Fclanjetties.png?alt=media&token=d47ebf47-5539-4c1e-a0fa-31904dc8ad4a', 
    'Pengkalan Weld, George Town, 10300 George Town, Pulau Pinang.','Allday 9am – 9pm ',3,'not available', '019-5935333')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('Entopia by Penang Butterfly Farm','Contemporary indoor/ outdoor place with live butterflies & other insects, plus interactive workshops.',
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2Fpenangbutterflyfarm.png?alt=media&token=43531e94-5b07-44b5-8317-7b2faf1b4740', 
    'No. 830, Jalan Teluk Bahang, Teluk Bahang, 11050 Tanjung Bungah, Pulau Pinang','Allday 9am – 5pm Wednesday Closed',2,'http://www.entopia.com/', '04-8888111')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('Penang Hill Funicular','Penang Hill is also known by the Malay name Bukit Bendera, which actually refers to Flagstaff Hill, the most developed peak. ',
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2Fpenanghillfunicular.png?alt=media&token=4a01ac6c-2442-4aa0-9c51-8d5476e6fbf0', 
    'Jalan Stesen, Bukit Bendera Air Itam, 11500 George Town, Pulau Pinang','Allday 6:30am - 11pm',2,'https://www.penanghill.gov.my/index.php/en/tickets', '04-8288880')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('Fort Cornwallis','Fort Cornwallis is a bastion fort in George Town, Penang, Malaysia, built by the British East India Company in the late 18th Century.',
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2Ffortcornwallis.png?alt=media&token=0e5db46c-183e-4fec-961e-d2cc5de4c4ff', 
    'Jalan Tun Syed Sheh Barakbah, Geogre Town, 10200 George Town, Pulau Pinang. ','Allday 9am – 10pm ',0,'not available', '04-2639855')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('Penang War Museum','Visitors can explore tunnels, war exhibits & related artifacts at this former fort with a dark past.',
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2Fpenangwarmuseum.png?alt=media&token=bfb6090d-98b7-4e4e-9345-9b174260e24f', 
    'Jalan Batu Maung, 11960 Batu Maung, Pulau Pinang.','Allday 9am – 6pm ',0,'not available', '04-2639855')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('Batu Ferringhi Night Market','Dozens of small shops & roadside stalls selling food, accessories & clothing till past midnight. ',
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2Fbatuferringhinightmarket.png?alt=media&token=63a59c44-b155-4640-a69f-06bbb5bd04a4', 
    'Jalan Pantai Batu, Taman Pantai Batu, 11200 Tanjong Bungah, Pulau Pinang. ','Allday 7pm – 12am  ',3,'not available', '018-2834117')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('Kek Lok Si Temple','The Kek Lok Si Temple is the largest Buddhist temple in Malaysia and an important pilgrimage centre for Buddhists from Southeast Asia.',
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2FKekLokSi.png?alt=media&token=0e927244-0c57-4cd4-8e6e-4fac02696238', 
    'Kek Lok Si Temple, Jln Balik Pulau, 11500 Air Itam, Penang.','Allday 8:30am – 5:30pm ',0,'not available', '04-8283317')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('Penang National Park','The Penang National Park spans 1,213ha of land and sea and is used by scientists, researchers, and nature lovers to explore its natural treasure.',
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2Fpenangnationalpark.png?alt=media&token=b6841145-eadb-4aa6-95aa-8bd45b50c499', 
    'Pejabat Taman Negara P. Pinang jalan Hassan Abbas, 11050 George Town, Penang. ','Allday 8:00am – 5:00pm ',0,'https://www.wildlife.gov.my/index.php/en/public/2016-05-10-02-34-43/peta', '04-8813530')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('Penang Street Art','UNESCO World Heritage Site featuring graphic street art depicting the life of the people of Penang.',
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2Fpenangnationalpark.png?alt=media&token=b6841145-eadb-4aa6-95aa-8bd45b50c499', 
    '316, Beach St, Georgetown, 10300 George Town, Penang','24 hours ',0,'not available', 'not available')
''')


cursor.execute('''
    INSERT INTO users(name,email,birthDate,password)VALUES('anthony','anthony@gmail.com', 20000715,'anthony')
''')


db.commit()
db.close()
