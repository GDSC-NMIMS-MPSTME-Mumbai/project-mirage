# Start from a Debian image with the latest version of Python, Node.js and Haskell
FROM debian:latest

# Install Python
RUN apt-get update && apt-get install -y python3 python3-pip

# Install curl and gnupg, which are needed to install Node.js
RUN apt-get update && apt-get install -y curl gnupg

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Install Haskell
RUN apt-get update && apt-get install -y ghc cabal-install
RUN apt-get install -y haskell-stack
# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install python3-venv to get the venv module
RUN apt-get install -y python3-venv

# Create a virtual environment
RUN python3 -m venv /opt/venv

# Activate the virtual environment
ENV PATH="/opt/venv/bin:$PATH"

# Install any needed packages specified in requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt

# Install Node.js dependencies
# TODO:Somebody figure this out why npm install is not working for Debian 
#RUN npm install

# Build Haskell app
RUN stack setup
RUN stack build

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run main.py when the container launches
CMD ["python3", "main.py"]