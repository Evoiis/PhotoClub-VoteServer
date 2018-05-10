# PhotoClub-VoteServer

NodeJS server to serve HTML files and images.
Receives scores for photos from clients and stores them in a database. Using SQL or MongoDB.

Notes:
Generate statistics from voting data? At least calculate mean.
Generates a random code for each session.
	-Can use this code to id the images and their corresponding votes in database.

Socket:
Use socket.io to broadcast imgs.
Access photos in directory. /Photos

Login page:
Form with string input
Clients will use the randomly generated code to login to the voting page from the login page.

Voting page:
Form with number input
Form submits score to server, server then saves the score to database.
After voting, goes to waiting page that waits for the admin to start the next vote.

Admin page:
Admin can login to the page through the same login page using diff credentials.
Have active count of # votes shown to admin. So we know if everyone has voted or there are too many votes.
Function to start next vote, will broadcast the next image through socketio and begin the vote.
Pick an image from /Photos.

Results page?:
After all voting is done. Admin can request a results page.
Will show each photo's stats (#votes, mean score)