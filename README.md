# DrinkManagerAPI
A Flask-based RESTful API for managing drinks, complete with a frontend interface for seamless user interaction.

**Files:**
1. [`application.py`](https://github.com/Sebastianutcn/DrinkManagerAPI/blob/main/application.py) provides a RESTful API for CRUD operations on drinks, utilizing SQLite as the database for data storage.
2. [`app.js`](https://github.com/Sebastianutcn/DrinkManagerAPI/blob/main/app.js) handles the frontend logic for interacting with the Flask API, including functions for fetching, adding, updating, and deleting drink records.
3. [`index.html`](https://github.com/Sebastianutcn/DrinkManagerAPI/blob/main/index.html) serves as the user interface for the Drink Manager, featuring a dropdown to select operations and dynamically updating forms based on user choices.
4. [`style.css`](https://github.com/Sebastianutcn/DrinkManagerAPI/blob/main/style.css) is a script used to install the agent for CodeDeploy on EC2 instance.
5. [`requirements`](https://github.com/Sebastianutcn/DrinkManagerAPI/blob/main/requirements.txt) is a file listing the Python package dependencies required for the Flask application, ensuring the correct environment setup for the Drink Manager project.

## Installation
- Refreshing package index
```
sudo apt update
```
* Installing Python3
```
sudo apt install python3
```
- Installing Flask
```
pip3 install flask
```
* Installing SQLAlchemy
```
pip3 install flask-sqlalchemy
```
- Creating the [`requirements`](https://github.com/Sebastianutcn/DrinkManagerAPI/blob/main/requirements.txt) file
```
pip3 freeze > requirements.txt
```
- Exporting the FLASK_APP variable
```
export FLASK_APP=application.py
```
* Installing CORS
```
pip install flask-cors
```
- Starting the Flask development server
```
flask run
```

