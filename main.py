# Import necessary modules and functions from Flask
from flask import render_template, Flask, Response,request
import random

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

@app.route('/filter')
def filter():
    return render_template('filter.html')

@app.route("/thalacalculator",methods=["POST","GET"])
def thala():
    numbers = ""
    final_val = None
    thala = False
    i = 0
    numbers = request.form.get("expression")
    check = []
    if numbers:
        numbers = numbers.strip()
        ops = ["*","+","-","/","%"]
        opsval = numbers.count(" ")
        i = 0
        while i!=(5**opsval):
            opslst = ""
            ans_val = ""
            for x in range(opsval):
                opslst += random.choice(ops)
            opslst += " "
            try:
                numlist = list(map(int,numbers.split(" ")))
            except ValueError:
                if len(numbers) == 7:
                    numlist = list(numbers)
                    for x in range(len(numlist)):
                        numlist[x]+="+"
                    final_val = "".join(numlist)
                    final_val = final_val[:-1]
                    thala = True
                    break
                else:
                    thala = False
                    final_val = "Not Thala"
                    break
            for x in range(len(numlist)):
                ans_val += str(numlist[x])+opslst[x]
            if opslst not in check:
                check.append(opslst)
                i+=1
                try:
                    if (eval(ans_val) == 7) or (eval(ans_val) == 7.0):
                        print("Thala For a Reason")
                        final_val = ans_val
                        thala = True
                except ZeroDivisionError:
                    pass
            else:
                pass
        if thala == False and i == 5**opsval:
            final_val = "Not Thala"
    else:
        numbers = ""
    return render_template("thalacalci.html",final_val=final_val,numbers=numbers,thala=thala)
# Run the Flask application if this script is executed directly
if __name__ == '__main__':
    # Enabling debugging mode for easier development
    app.run(debug=True)
