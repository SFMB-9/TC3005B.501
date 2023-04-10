import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow import keras
#from rMatrix import rMatrix
from sklearn.model_selection import train_test_split


#num_users, num_movies,x_train,x_val,y_train,y_val = dataP("ml-latest-small/ratings.csv")
header = ['userId', 'carId', 'rating', 'timestamp']
df = pd.read_csv("u.data",sep='\t',names=header)
df = df.drop('timestamp', axis=1)
train, test = train_test_split(df, test_size=0.2, random_state=42)
users = len(df.userId.unique())
cars = len(df.carId.unique())

print(users)
print(cars)
print(df)
size = 5

car_input = tf.keras.layers.Input(shape=[1], name="Car-Input")
car_embedding = tf.keras.layers.Embedding(cars + 1, size, name="Car-Embedding")(car_input)
car_vec = tf.keras.layers.Flatten(name="Flatten-Cars")(car_embedding)

user_input = tf.keras.layers.Input(shape=[1], name="User-Input")
user_embedding = tf.keras.layers.Embedding(users + 1, size, name="User-Embedding")(user_input)
user_vec = tf.keras.layers.Flatten(name="Flatten-Users")(user_embedding)

conc = tf.keras.layers.Concatenate()([car_vec, user_vec])

fc1 = tf.keras.layers.Dense(128, activation='relu')(conc)
fc2 = tf.keras.layers.Dense(32, activation='relu')(fc1)
out = tf.keras.layers.Dense(1)(fc2)

model = tf.keras.Model([user_input, car_input], out)
model.compile('adam', 'mean_squared_error')

history = model.fit([train.userId, train.carId], train.rating, epochs=10, verbose=1)
model.save("mod.h5")