from bottle import route, run, post, request


@post('/classifier')
def index():
    # sentence = request.forms.get('sentence')
    # print(sentence)
    # post_data = request.body.read()
    post_data = request.json
    print(post_data)
    sentence = request.json["sentence"]
    print(sentence)

    return 'hello from the server side'

run(host='localhost', port=8080)