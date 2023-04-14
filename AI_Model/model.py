import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow import keras
from sklearn.model_selection import train_test_split

#read data
header = ['userId', 'carId', 'rating', 'timestamp']
df = pd.read_csv("u.data",sep='\t',names=header)
df = df.drop('timestamp', axis=1)
train, test = train_test_split(df, test_size=0.2, random_state=42)
users = len(df.userId.unique())
cars = len(df.carId.unique())


#print for reference
print(users)
print(cars)
print(df)
size = 5

#model

#Car vector
car_input = tf.keras.layers.Input(shape=[1], name="Car-Input")
car_embedding = tf.keras.layers.Embedding(cars + 1, size, name="Car-Embedding")(car_input)
car_vec = tf.keras.layers.Flatten(name="Flatten-Cars")(car_embedding)

#User vector
user_input = tf.keras.layers.Input(shape=[1], name="User-Input")
user_embedding = tf.keras.layers.Embedding(users + 1, size, name="User-Embedding")(user_input)
user_vec = tf.keras.layers.Flatten(name="Flatten-Users")(user_embedding)

#Concatenate
conc = tf.keras.layers.Concatenate()([car_vec, user_vec])

#Fully connected
fc1 = tf.keras.layers.Dense(128, activation='relu')(conc)
fc2 = tf.keras.layers.Dense(32, activation='relu')(fc1)
out = tf.keras.layers.Dense(1)(fc2)

#Compile
model = tf.keras.Model([user_input, car_input], out)
model.compile('adam', 'mean_squared_error')

#Train
history = model.fit([train.userId, train.carId], train.rating, epochs=50, verbose=1)

#Save
model.save("mod.h5")