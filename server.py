from keras.models import load_model
from keras.applications import imagenet_utils
from keras import backend as K
from keras.preprocessing.image import img_to_array
from PIL import Image

import flask
import io
import numpy as np

app = flask.Flask(__name__)

model = load_model('best_model.h5') 
model.compile(loss='binary_crossentropy', optimizer='rmsprop', metrics=['accuracy'])
model._make_predict_function()

def prepare_image(image, target):
    if (image.mode != "RGB"):
            image = image.convert("RGB")
    image = image.resize(target)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)

    return image

@app.route("/predict", methods=["POST"])
def predict():
    print('predict')
    data = {"success": False}
    if flask.request.method == "POST":
        print('post')
        print(flask.request.files)
        if flask.request.files.get("image"):
            print('image')
            image = flask.request.files["image"].read()
            image = Image.open(io.BytesIO(image))
            image = prepare_image(image, target = (150,150))
            preds = model.predict(image, verbose = 1)
            print(preds)
            #results = imagenet_utils.decode_predictions(preds)
            data["predictions"] = []
            if preds[0][0] == 0.: 
                data["success"] = True 
        

    resp = flask.make_response(flask.jsonify(data))
    
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Credentials'] = True
    resp.headers['Access-Control-Request-Method'] = 'POST'

    return resp

if __name__ == "__main__":
    print(("* Loading Keras model and Flask starting server..."
        "please wait until server has fully started"))
    app.run()

