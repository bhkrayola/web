from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('links.html')

@app.route('/act1/scene1')
def foo():
    return render_template('scene1.html')


@app.route('/act1/scene2')
def foobar():
    return render_template('scene2.html')
    
app.debug = True
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
