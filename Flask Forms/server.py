from flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/')
def function():
    return render_template('task1.html')

@app.route('/result', methods=['GET', 'POST'])
def function2():    
    if(request.method == 'POST'):
        one = request.form.get('one')
        two = request.form.get('two')
        return render_template('result.html', one=one, two=two)
    a = request.form.get('a')
    a1 = "Tired" if request.form.get('a1') else ''
    b = "Sad" if request.form.get('b') else ''
    c = "Mad" if request.form.get('c') else ''
    d = "Happy" if request.form.get('d') else ''
    e = "Excited" if request.form.get('e') else ''

    q1 = "Blue"
    q2 = "Earth"
    ans1 = "Correct" if request.form.get('input1') == q1 else 'Incorrect'
    ans2 = "Correct" if request.form.get('input2') == q2 else 'Incorrect'
    return render_template('result.html', a=a, a1=a1, b=b, c=c, d=d, e=e, ans1=ans1,ans2=ans2)

app.debug = True
if __name__ == '__main__':
	app.run(host='0.0.0.0', port = 80)