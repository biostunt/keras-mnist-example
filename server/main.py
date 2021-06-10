import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from nn import NeuralNetwork
import json

net = NeuralNetwork()
net.train()

app = FastAPI()
origins = [
    "http://localhost:1234",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/hello-world')
def hello_world():
    return {'isAlive': True}


class PredictData(BaseModel):
    data: list


@app.post('/predict')
def predict(data: PredictData):
    arr = data.data
    newArr = []
    slice_size = 28
    for i in range(0, len(arr), slice_size):
        newArr.append(arr[i:i+slice_size])
    np.expand_dims(newArr, 0)
    newArr = np.array([newArr], dtype=np.float)
    res = net.predict(newArr)
    res = res.tolist()
    return {'result': res[0]}
