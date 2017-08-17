from bottle import  request, response
import bottle
from sklearn.externals import joblib

loaded_model = joblib.load('model/finalized_model2.sav')
vectorizer = joblib.load('model/vectorizer2.pk')

def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        # set CORS headers
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

        if bottle.request.method != 'OPTIONS':
            # actual request; reply with the actual response
            return fn(*args, **kwargs)

    return _enable_cors

class EnableCors(object):
    name = 'enable_cors'
    api = 2

    def apply(self, fn, context):
        def _enable_cors(*args, **kwargs):
            # set CORS headers
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

            if request.method != 'OPTIONS':
                # actual request; reply with the actual response
        		return fn(*args, **kwargs)
                

        return _enable_cors


app = bottle.app()

@app.post('/classifier')
@enable_cors
def index():
    # sentence = request.forms.get('sentence')
    # print(sentence)
    # post_data = request.body.read()
    # post_data = request.json
    # print(request.body.read())
    # print(request.json)
    
    sentence = request.body.read()
    # print(post_data)
    predict = loaded_model.predict(vectorizer.transform([sentence]))

    # print(predict[0])
    # print(predict)
    # return 'ahihi'
    return str(predict[0])


@app.get('/classifier')
def index():
    return str('hihiihi')


# app.install(EnableCors())
app.run(host='localhost', port=8080)