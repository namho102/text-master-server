from bottle import route, run, post, request
from sklearn.externals import joblib

loaded_model = joblib.load('model/finalized_model2.sav')
vectorizer = joblib.load('model/vectorizer2.pk')


@post('/classifier')
def index():
    # sentence = request.forms.get('sentence')
    # print(sentence)
    # post_data = request.body.read()
    post_data = request.json
    
    sentence = request.json["sentence"]
    print(post_data)
    predict = loaded_model.predict(vectorizer.transform([sentence]))

    # print(predict[0])
    # print(predict)
    # return 'ahihi'
    return str(predict[0])

run(host='localhost', port=8080)