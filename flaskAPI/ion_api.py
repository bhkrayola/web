from flask import Flask, render_template, request
import requests                             # third party - not flask
import json

app = Flask(__name__)

@app.route('/')
def hello_requests():

    tjhsst_url = "https://api.weather.gov/points/38.8186,-77.1689"
    r = requests.get(tjhsst_url)    

    j = json.loads(r.text)
    new_url = j['properties']['forecast']
    print(new_url)
    r2 = requests.get(new_url)
    j2 = json.loads(r2.text)
    temperature = j2['properties']['periods'][0]['temperature']

    #29.717154, -95.404182
    rice_url = "https://api.weather.gov/points/29.717154,-95.404182"
    r = requests.get(rice_url)   
    j = json.loads(r.text)
    new_url = j['properties']['forecast'] 
    r2 = requests.get(new_url)
    j2 = json.loads(r2.text)
    temperature2 = j2['properties']['periods'][0]['temperature']




    return render_template('foo.html', temperature=temperature, temperature2=temperature2)

@app.route('/form_handler', methods=['GET','POST'])
def function():
    long = request.form.get('long')
    lat = request.form.get('lat')
    url = "https://api.weather.gov/points/"+lat+","+long
    print(url)
    r = requests.get(url)    
    j = json.loads(r.text)
    if j['status'] == 404:
        print("hi")
        temperature = 'Invalid location'
        return render_template('foo2.html', temperature=temperature)

    print (j['status'])
    new_url = j['properties']['forecast']
    print(new_url)
    r2 = requests.get(new_url)
    j2 = json.loads(r2.text)
    if j2['status'] == "404":
        temperature = 'Invalid location'
    else:
        temperature = j2['properties']['periods'][0]['temperature']

    return render_template('foo2.html', temperature=temperature)


app.debug = True
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)