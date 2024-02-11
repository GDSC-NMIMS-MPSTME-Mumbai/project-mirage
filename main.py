# Import necessary modules and functions from Flask
from flask import render_template, Flask, Response

# Import the generate_random function from the utils module
from utils.generate import generate_random

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

# Run the Flask application if this script is executed directly
if __name__ == '__main__':
    # Enabling debugging mode for easier development
    app.run(debug=True)
