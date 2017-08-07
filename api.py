from bottle import route, run, request, response, Bottle
import functions
import time
import numpy as np
from PIL import Image

repository = 'E:\\Users\\Marty\\Anaconda2\\envs\\tensorflow\\repo\\'

app = Bottle()

@app.hook('after_request')
def enable_cors():
    """
    You need to add some headers to each request.
    Don't use the wildcard '*' for Access-Control-Allow-Origin in production.
    """
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
@app.route('/cancer', method='POST')
def upload():
   #print("Recieved Request")
   image = request.files.get('image')
   img = Image.open(image.file)
   arr = np.array(img)
   result = functions.classifyImg(arr)
   data = str(result[0][0]) + ',' + str(result[0][1])
   t = str(time.time())
   image.save(repository + t + '-' + str(result[0][1]) + image.filename)
   return(data)
run(app, host='192.168.1.165', port=8080)