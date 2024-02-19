# Import necessary modules and functions from Flask
from flask import render_template, Flask, Response,send_from_directory,request

# Import the generate_random function from the utils module
from utils.generate import generate_random

# Import the FileSystemLoader and Environment classes from the jinja2 module
from jinja2 import Environment, FileSystemLoader

import subprocess

# Create a Flask web application instance
app = Flask(__name__) 

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

@app.get('/soundfont/acoustic_grand_piano-ogg.js') 
def soundfont():
    return send_from_directory('static/soundfont', 'acoustic_grand_piano-ogg.js')

@app.route('/3d-piano-player')
def piano_player():
    return render_template('3d-piano-player.html')

@app.route('/find-in-pi', methods=['POST'])
def find_in_pi():
    number = request.json['number']
    result = subprocess.run(['./main.hs'], input=number, text=True, capture_output=True)
    return result.stdout

# Run the Flask application if this script is executed directly
if __name__ == '__main__':
    # Enabling debugging mode for easier development
    app.run(host='0.0.0.0', port=5000,debug=True)
