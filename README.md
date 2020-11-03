# Finding Bestie
# flask-react-redux-group-project


# Features
## questionnaire
This app will ask questions about you. 


## Match compatibility based on question answers
A user is not able to see other profile photos since Finding Bestie matches friends using their answers to the questionnaire. 
Once a user submits the questionnaire, Finding Bestie will display 3 matches for that user. 
A user can view only 3 matched profiles but not their photos.
When a user clicks "BeBestie" and the other person accepts it, they will be able to send messages to each other directly. The status of both users will change to "Besties".  
If a either of the Dating users wants to break up, by clicking the "Block" button, Finding Bestie will automatically initiate the break up and the status of each user will change to "Searching".


## Avatar
A user can choose the avatar from "Finding Bestie".


## Report/Alert
A user can report inappropriate behavior to Finding Bestie. The violator's status will be changed to "Reported".

## Bonus: Adding Questions & Examples
## Bonus: Adding Rules for Matching Logic

## Bonus: Admin Role 
Admin can change the status of "Reported" depending on findings. 


# Flask React Project

This is the backend for the Flask React project.

## Getting started

1. Clone this repository

2. Install dependencies
   ```bash
   pipenv install --dev -r dev-requirements.txt --python=python3 && pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   python -m database && flask run
   ```
6. To run the React App in development, checkout the [README](./client/README.md) inside the client directory.




***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:
   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***


## Deploy to Heroku

1. Create a new project on Heroku
2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
4. Run
   ```bash
   heroku login
   ```
5. Login to the heroku container registry
   ```bash
   heroku container:login
   ```
6. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
7. Push your docker container to heroku from the root directory of your project.
   This will build the dockerfile and push the image to your heroku container registry
   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```
8. Release your docker container to heroku
   ```bash
   heroku container:release web -a {NAME_OF_HEROKU_APP}
   ```
9. set up your database:
   ```bash
   heroku run -a {NAME_OF_HEROKU_APP} python -m database
   ```
10. Under Settings find "Config Vars" and add any additional/secret .env variables.
11. profit
