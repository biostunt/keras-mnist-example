import keras
from keras.layers import Flatten, Dense
import numpy as np
from keras.datasets import mnist


class NeuralNetwork:
    def __init__(self) -> None:
        self.model = keras.Sequential([
            Flatten(input_shape=(28, 28, 1)),
            Dense(128, activation='relu'),
            Dense(10, activation='softmax')
        ])
        self.model.compile(
            optimizer='adam',
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )

    def train(self):
        (x_train, y_train), (x_test, y_test) = mnist.load_data()
        x_train = x_train / 255
        x_test = x_test / 255
        y_train_cat = keras.utils.to_categorical(y_train, 10)
        self.model.fit(x_train, y_train_cat, batch_size=32,
                       epochs=5, validation_split=0.2)

    def predict(self, arr) -> float:
        res = self.model.predict(arr)
        return np.argmax(res, axis=1)
