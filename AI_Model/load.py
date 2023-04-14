import numpy as np
import tensorflow as tf

load_model = tf.keras.models.load_model("mod.h5")
x = np.array([1])
y = np.array([1])
predict = load_model.predict([x,y])
print(predict)