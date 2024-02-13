import sqlite3
from flask import Flask, render_template

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/')
def index():
    conn = get_db_connection()
    data = conn.execute('SELECT * FROM characters').fetchall()
    conn.close()
    
    return render_template('characters.html', characters=data)

@app.route('/0')
def index0():
    conn = get_db_connection()
    data = conn.execute('SELECT * FROM characters WHERE c_id = 0').fetchall()
    conn.close()
    data = data[0]
    return render_template('display.html', characters=data)

@app.route('/1')
def index1():
    conn = get_db_connection()
    data = conn.execute('SELECT * FROM characters WHERE c_id = 1').fetchall()
    conn.close()
    data = data[0]
    return render_template('display.html', characters=data)

@app.route('/2')
def index2():
    conn = get_db_connection()
    data = conn.execute('SELECT * FROM characters WHERE c_id = 2').fetchall()
    conn.close()
    data = data[0]
    return render_template('display.html', characters=data)

@app.route('/3')
def index3():
    conn = get_db_connection()
    data = conn.execute('SELECT * FROM characters WHERE c_id = 3').fetchall()
    conn.close()
    data = data[0]
    return render_template('display.html', characters=data)

@app.route('/4')
def index4():
    conn = get_db_connection()
    data = conn.execute('SELECT * FROM characters WHERE c_id = 4').fetchall()
    conn.close()
    data = data[0]
    return render_template('display.html', characters=data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)