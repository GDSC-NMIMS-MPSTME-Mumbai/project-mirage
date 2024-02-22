# Import necessary modules and functions from Flask
from flask import render_template, Flask, Response, session, request, redirect
import pyrebase

# Import the generate_random function from the utils module
from utils.generate import generate_random

# Create a Flask web application instance
app = Flask(__name__)

# Initializing firebase app and user authentication
config = {
    "apiKey": "AIzaSyDlq0E6KA4cnxqweE4EcnyRFtCCFqUNc4I",
    "authDomain": "ai-germ-site.firebaseapp.com",
    "projectId": "ai-germ-site",
    "storageBucket": "ai-germ-site.appspot.com",
    "messagingSenderId": "429718411683",
    "appId": "1:429718411683:web:d80cfd48a3afe57f32e216",
    "measurementId": "G-7R47RXR1VS",
    "databaseURL" : ""
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

app.secret_key = 'secret'

# Define a route for the root URL ('/')
@app.route('/')
def hello_world():
    # Render the 'index.html' template 
    return render_template('index.html')

@app.route('/pixel-art')
def pixel_art():
    return render_template('pixel-art.html')

# Define a route for the '/generate-random' URL
@app.route('/generate-random')
def generate():
    # Call the generate_random function from the utils module
    number = generate_random()
    
    # Return the generated number as a plain text response
    return Response(str(number), content_type='text/plain')

@app.route('/filter')
def filter():
    return render_template('filter.html')

# Route for login
@app.route('/login', methods=['POST','GET'])
def login():
    if 'user' in session:
        return redirect('/pixel-art')
    # Gets email and password and signs in user
    if request.method == 'POST':
        email = request.form.get('email')
        pwd = request.form.get('password')
        try:
            session['user'] = email
            user = auth.sign_in_with_email_and_password(email,pwd)
            return render_template('pixel-art.html', email=email)
        except:
            return 'Failed to login'
    return render_template('login.html')

# Route for register
@app.route('/register', methods=['POST','GET'])
def register():
    if 'user' in session:
        return redirect('/pixel-art')
    # Gets email and password and creates user
    if request.method == 'POST':
        email = request.form.get('email')
        pwd = request.form.get('password')
        try:
            session['user'] = email
            user = auth.create_user_with_email_and_password(email,pwd)
            return render_template('pixel-art.html')
        except:
            return 'Failed to register'
    
    return render_template('register.html')

@app.route('/logout')
def logout():
    session.pop('user')
    return redirect('/pixel-art')

# Run the Flask application if this script is executed directly
if __name__ == '__main__':
    # Enabling debugging mode for easier development
    app.run(debug=True)
