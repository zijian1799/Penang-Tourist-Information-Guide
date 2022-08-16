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
    VALUES('Clan Jetties','Busy, scenic destination featuring a traditional village of rustic houses on stilts over the water.',
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2Fclanjetties.png?alt=media&token=d47ebf47-5539-4c1e-a0fa-31904dc8ad4a', 
    'Pengkalan Weld, George Town, 10300 George Town, Pulau Pinang.',0,'Allday 9am – 9pm ',3,'', '019-5935333')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,favourite,operatinghours,priceRange,website,contact)
    VALUES('Entopia by Penang Butterfly Farm','Contemporary indoor/ outdoor place with live butterflies & other insects, plus interactive workshops.',
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2Fpenangbutterflyfarm.png?alt=media&token=43531e94-5b07-44b5-8317-7b2faf1b4740', 
    'No. 830, Jalan Teluk Bahang, Teluk Bahang, 11050 Tanjung Bungah, Pulau Pinang',0,'Allday 9am – 5pm Wednesday Closed',2,'http://www.entopia.com/', '04-8888111')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,favourite,operatinghours,priceRange,website,contact)
    VALUES('Penang Hill Funicular','Penang Hill is also known by the Malay name Bukit Bendera, which actually refers to Flagstaff Hill, the most developed peak. ',
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2Fpenanghillfunicular.png?alt=media&token=4a01ac6c-2442-4aa0-9c51-8d5476e6fbf0', 
    'Jalan Stesen, Bukit Bendera Air Itam, 11500 George Town, Pulau Pinang',0,'Allday Furnicular 630am, then 7am – 10pm hourly',2,'https://www.penanghill.gov.my/index.php/en/tickets', '04-8288880')
''')
cursor.execute('''
    INSERT INTO places(name,description,category,image,location,favourite,operatinghours,priceRange,website,contact)
    VALUES('Fort Cornwallis','Fort Cornwallis is a bastion fort in George Town, Penang, Malaysia, built by the British East India Company in the late 18th Century.',
    'attraction','https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2Ffortcornwallis.png?alt=media&token=0e5db46c-183e-4fec-961e-d2cc5de4c4ff', 
    'Jalan Tun Syed Sheh Barakbah, Geogre Town, 10200 George Town, Pulau Pinang. ',0,'Allday 9am – 10pm ',0,'', '04-2639855')
''')

db.commit()
db.close()
