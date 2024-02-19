# Project Mirage Contribution Guide

This file explains how to set-up and run the project locally




## Prerequisites

- Python 3.x installed
- Pip package manager installed
- Docker Installed (optional, needed only if you want to run the project using docker)


## Setup

### Setup using Docker


1. **Navigate to project directory**

   ```bash
   cd project-mirage
   ```
2. **Run the following command**

   ```bash
   docker-compose up
   ```
   - This will start the docker development server which will build an image and run the container. 
   
   - Open your web browser and go to http://127.0.0.1:5000/ or the port mentioned in the terminal to view the application.
   
   - And thats it. No need for any prerequisites.

   - Keeping the Development server running is recommended as it will automatically restart the server when changes are made to the code, instead of running the command again and again. 

   - Press `Ctrl+C` to stop the server.
   
   **Note: Running Docker is not recommended if you have a particularly slow PC**



### Default Setup


1. **Navigate to project directory**

   ```bash
   cd project-mirage
   ```

2. **Create a virtual environment (optional but recommended)**

   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment (venv):**

   - **For Windows:**

     ```bash
     venv\Scripts\activate
     ```

   - **For Mac/Linux:**
     ```bash
     source venv/bin/activate
     ```

4. **Installing dependencies**

   ```bash
   pip install -r requirements.txt


## Running the application

1. **Run the Flask application:**

   ```bash
   python main.py
   ```

This will start the development server.

Open your web browser and go to http://127.0.0.1:5000/ to view the application.


## Directory Structure

- **main.py:** Flask application script.
- **utils/generate.py:** Module containing the `generate_random` function.
- **static/styles/index.css:** CSS styles for the HTML template.
- **templates/index.html:** HTML template for the homepage.
