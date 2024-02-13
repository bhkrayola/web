import sqlite3
from flask import Flask, render_template, jsonify

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def hello_world():
    return render_template('hello.html')

@app.route("/upvote")
def upvote():
    conn = get_db_connection()
    current_votes = conn.execute('SELECT v_upvote FROM votes').fetchone()
    new_votes = current_votes['v_upvote'] + 1
    conn.execute('UPDATE votes SET v_upvote = ?', (new_votes,))
    conn.commit()
    conn.close()
    return str(new_votes)

@app.route("/downvote")
def downvote():
    conn = get_db_connection()
    current_votes = conn.execute('SELECT v_downvote FROM votes').fetchone()
    new_votes = current_votes['v_downvote'] + 1
    conn.execute('UPDATE votes SET v_downvote = ?', (new_votes,))
    conn.commit()
    conn.close()
    return str(new_votes)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
