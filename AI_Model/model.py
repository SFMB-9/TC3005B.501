import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow import keras
from data import dataP

num_users, num_movies,x_train,x_val,y_train,y_val = dataP("ml-latest-small/ratings.csv")
size = 50

class RecommenderNet(tf.keras.Model):
    def __init__(self, num_users, num_movies, embedding_size, **kwargs):
        super(RecommenderNet, self).__init__(**kwargs)
        self.num_users = num_users
        self.num_movies = num_movies
        self.embedding_size = embedding_size
        self.user_embedding = tf.keras.layers.Embedding(
            num_users,
            embedding_size,
            embeddings_initializer="he_normal",
            embeddings_regularizer= tf.keras.regularizers.l2(1e-6),
        )
        self.user_bias =  tf.keras.layers.Embedding(num_users, 1)
        self.movie_embedding =  tf.keras.layers.Embedding(
            num_movies,
            embedding_size,
            embeddings_initializer="he_normal",
            embeddings_regularizer= tf.keras.regularizers.l2(1e-6),
        )
        self.movie_bias =  tf.keras.layers.Embedding(num_movies, 1)

    def call(self, inputs):
        user_vector = self.user_embedding(inputs[:, 0])
        user_bias = self.user_bias(inputs[:, 0])
        movie_vector = self.movie_embedding(inputs[:, 1])
        movie_bias = self.movie_bias(inputs[:, 1])
        dot_user_movie = tf.tensordot(user_vector, movie_vector, 2)
        x = dot_user_movie + user_bias + movie_bias
        return tf.nn.sigmoid(x)
    
model = RecommenderNet(num_users, num_movies, size)

model.compile(
    loss=tf.keras.losses.BinaryCrossentropy(),
    optimizer=keras.optimizers.Adam(learning_rate=0.001),
)

history = model.fit(
    x=x_train,
    y=y_train,
    batch_size=64,
    epochs=5,
    verbose='auto',
    validation_data=(x_val, y_val),
)