import sqlite3
db = sqlite3.connect('touristguidedb5.sqlite')


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
db.execute('DELETE FROM places')

db.execute('DROP TABLE IF EXISTS users')
db.execute('''CREATE TABLE users(
    user_id integer PRIMARY KEY AUTOINCREMENT,
    name text NOT NULL,
    email text NOT NULL,
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
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2Fstreetart.png?alt=media&token=36440518-7de8-4926-b74c-7eeb3d08a4e4', 
    '316, Beach St, Georgetown, 10300 George Town, Penang','24 hours ',0,'not available', 'not available')
''')

cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('Sky Suites','Featuring sea views, Sky Suites provides accommodation with a balcony and a kettle, around 2.8 km from 1st Avenue Penang. ',
    'hotel','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/hotels%2Fskysuites.png?alt=media&token=2e007109-e159-4719-8f32-bd0c54d58ff3', 
    '348, Chulia St, Georgetown, 10200 George Town, Penang. ','10am – 8 pm',2,'http://sky-suites.penanghotels.org/en/', 'not available')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('Eastern & Oriental Hotel','This Penang 5 star hotel institution was built by the famous Iranian architects Sarkies brothers in 1885, having hosted all sorts of international celebrities during their trips to the island.',
    'hotel','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/hotels%2Feasternandoriental.png?alt=media&token=8b0b3500-7fda-49ef-86f3-44a4b4918a2a', 
    '10, Lebuh Farquhar, George Town. ','10am – 8 pm',4,'https://www.eohotels.com/', '04-222 2000')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('The Prestige','One of the latest addition in Penang’s 5-star hotel scene is the Prestige, which occupies a restored building tucked between the sea at Pengkalan Weld and Beach Street — only a five minutes walk away from the charms of Penang Little India. ',
    'hotel','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/hotels%2Ftheprestige.png?alt=media&token=ab5db05f-e80e-4c7d-91a9-03905a433f29', 
    '8, Gat Lebuh Gereja, George Town. ','10am – 8 pm',3,'https://theprestige.my/', '04-217 5888')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('Angsana Teluk Bahang','Opened in October 2020 as the first Malaysian property by trusted brand Angsana, the 250 rooms are all sea-facing, with cozy little balconies, large bathrooms with tubs, and a style that mix ultra-modern-chic with shades of Peranakan style. ',
    'hotel','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/hotels%2Fangsanatelukbahang.png?alt=media&token=44da169a-34fe-4e50-b2da-47453146cfa3', 
    '11, Jalan Teluk Bahang. ','10am – 8 pm',5,'https://www.angsana.com/malaysia/penang', '04-817 0888')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('Park Royal Hotel','A trusted, long-standing property developed around a beautiful free-form swimming pool surrounded by lush tropical grounds, Park Royal is one of the best 5-star hotels along Batu Ferringhi beach.',
    'hotel','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/hotels%2Fparkroyalhotel.png?alt=media&token=6da88934-eb6f-4e84-a9ec-7123b2f6e741', 
    'PARKROYAL Penang Resort, Batu Ferringhi Beach. ','10am – 8 pm',3,'not available', '04-886 2288')
''')

cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('Chef in the truck','CHEF IN THE TRUCK EXCLUSIVE CATERING has expanded and secured our reputation as one of the top caterers in Penang and has been providing excellent services with highly guaranteed experiences.',
    'food','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/foods%2Fchefinthetruck.png?alt=media&token=2422a232-e112-4d48-8822-f9c809ba0541', 
    '33, Lebuh Farquhar, 10200 Georgetown, Pulau Pinang, Malaysia. ','10am – 6 pm daily',4,'http://www.chefinthetruck.com/', '+(6019) 332-1933')
''')

cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('Kota Catering','Grasping the art of Malaysian cuisine, this halal certified catering service will work with you according to your budget and interest.',
    'food','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/foods%2Fkotacatering.png?alt=media&token=82dd9a51-f7e4-4704-85a4-3f7b7acdda07', 
    'Jalan Tun Sheh Barakbah 10200 Penang, Malaysia. ','10am – 6 pm daily',3,'not available', '019-332 1933')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('Jaya Catering','Branching out like rabbits across the island, Jaya Catering is a well-known chain of Indian Restaurant and boy they are good at serving appetizing Indian meals any time of the day.',
    'food','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/foods%2Fjayacatering.png?alt=media&token=a32b3237-fdf0-4727-b059-9608d0cee055', 
    '349-N, Jalan Sultan Azlan Shah, Taman Tun Sardon, 11700 Gelugor, Pulau Pinang. ','24 hours',4,'https://jayacatering6581989.business.site/', '04-658 1989')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('China House','China house is a traditional compound of 3 heritage buildings, linked by an open air courtyard and converted into 14 spaces comprising shops, cafes, restaurants, and galleries.',
    'food','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/foods%2Fchinahouse.png?alt=media&token=38012e9c-cf15-4024-a25f-8927cf922883', 
    '153, Beach St, Georgetown, 10300 George Town, Penang. ','9:30am – 11pm ',3,'https://www.chinahouse.com.my/', '04-263 7299')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('Jelutong Night Market','Jelutong Market is a popular wet market in Jelutong, Penang. The actual market building faces Jalan Penaga, but the stalls line up much of Jalan Penaga and Ipoh Lane.',
    'food','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/foods%2Fjelutongnightmarket.png?alt=media&token=5c9b7f2a-a62a-445f-99e3-6e7b2b52844a', 
    ' 22, Jalan Penaga, Kampung Dua Bukit, 11600 George Town, Pulau Pinang. ','6pm - 12am',2,'not available', 'not available')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,operatinghours,priceRange,website,contact)
    VALUES('Sister Yao’s Char Koay Kak','Char koay kak is a type of radish cake stir-fried in a thick black soy sauce with preserved radish, bean sprouts, and eggs. It’s known as chai tow kueh or “carrot cake” in Singapore. ',
    'food','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/foods%2FChar-Koay-Kak-at-Sister-Yao.png?alt=media&token=51379df5-7648-42ac-8dbd-05de177b18ce', 
    '94, Lorong Macalister, George Town, 10400 George Town, Pulau Pinang, Malaysia. ','7am–1pm daily',1,'not available', 'not available')
''')

cursor.execute('''
    INSERT INTO users(name,email,password)VALUES('anthony','anthony@gmail.com','anthony')
''')
cursor.execute('''
    INSERT INTO users(name,email,password)VALUES('Elisa','elisa@gmail.com', 'elisa')
''')
cursor.execute('''
    INSERT INTO users(name,email,password)VALUES('Weldon','weldon@gmail.com', 'weldon')
''')


cursor.execute('''
    INSERT INTO ratings_and_reviews(place_id,date,ratingStars,comment)VALUES(1,'Thu, Aug 18, 2022', 3,'This is a nice place.')
''')
cursor.execute('''
    INSERT INTO ratings_and_reviews(place_id,date,ratingStars,comment)VALUES(2,'Thu, Aug 18, 2022', 3,'This is a nice place.')
''')
cursor.execute('''
    INSERT INTO ratings_and_reviews(place_id,date,ratingStars,comment)VALUES(3,'Thu, Aug 18, 2022', 3,'This is a nice place.')
''')
cursor.execute('''
    INSERT INTO ratings_and_reviews(place_id,date,ratingStars,comment)VALUES(4,'Thu, Aug 18, 2022', 3,'This is a nice place.')
''')
cursor.execute('''
    INSERT INTO ratings_and_reviews(place_id,date,ratingStars,comment)VALUES(11,'Thu, Aug 18, 2022', 3,'This is a nice hotel.')
''')
cursor.execute('''
    INSERT INTO ratings_and_reviews(place_id,date,ratingStars,comment)VALUES(12,'Thu, Aug 18, 2022', 3,'This is a nice hotel.')
''')
cursor.execute('''
    INSERT INTO ratings_and_reviews(place_id,date,ratingStars,comment)VALUES(17,'Thu, Aug 18, 2022', 3,'This is a nice food.')
''')
cursor.execute('''
    INSERT INTO ratings_and_reviews(place_id,date,ratingStars,comment)VALUES(18,'Thu, Aug 18, 2022', 3,'This is a nice food.')
''')
cursor.execute('''
    INSERT INTO ratings_and_reviews(place_id,date,ratingStars,comment)VALUES(19,'Thu, Aug 18, 2022', 3,'This is a nice food.')
''')

db.commit()
db.close()
