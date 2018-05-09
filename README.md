# PhotoClub-VoteServer

NodeJS server to serve HTML files and images.
Receives scores for photos from clients and stores them in a database. Using SQL or MongoDB.

Notes:
Generate statistics from voting data? At least calculate mean.

Socket:
Use socket.io to broadcast imgs.
Access photos in directory. /Photos

Login:
Generates a random code for each session.
Can use this code to id the images and their corresponding votes in database.
Clients will use the code to "login" to the voting page from the login page.

Voting page:
After voting, goes to waiting page that waits for the admin to start the next vote.
	-Currently stays on the same page

Admin:
Admin can login to the page through the same login page using credentials.
Have active count of # votes shown to admin. So we know if everyone has voted.
Start next vote, will broadcast next image and begin the vote.
Pick an image from /Photos.

Results page?:
After all voting is done. Admin can request a results page.
Will show each photo's stats (#votes, mean score)