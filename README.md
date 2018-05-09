# PhotoClub-VoteServer

NodeJS server to serve HTML files and images.
Receives votes from clients and stores them in a database. User SQL or MongoDB.

Generate statistics from voting data? At least calculate mean.

Use socket.io to send in votes and broadcast imgs.
Access photos in files.

Generates a random code for each session.
Can use this code to id the images and their corresponding votes in database.
Clients will use the code to "Login" to the voting page from the login page.

Admin can login to the page through the same login page using credentials.
