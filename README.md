# PhotoClub-VoteServer

NodeJS server to serve HTML files and images.
Receives scores for photos from clients and stores them in a database. Using SQL or MongoDB.

Notes:
There will be between 1 and 20 photos.
Each photo will be scored in 3 categories, between 1 and 10.

The final score for each photo will be out of 30.  It is a sum of the scores in all 3 categories.

For a single photo, average all the scores in a category.  Note that an artist will not score his own photo.  Thereofre, the number of scores will differ per photo.  ex.  if you have 4 photos by 3 artists, then one artist "Bob", submitted 2 photos.  Bob will not score his own photos.  Therefore, Bob's 2 photos will only have scores by the other 2 artists.

Sometimes the artist themsevles does cannot attend the meeting sessions.

Generate statistics from voting data? At least calculate mean.  
Generates a random code for each session. (aka session_code)
	-Can use this code to id the images and their corresponding votes in database.
	- Code will be displayed on the projector for everyone to see
Each user should get a unique-token, so that can go back and forth between their scores. (aka user_session_id)

Socket:
Use socket.io to broadcast imgs.
Access photos in directory. /Photos OR from database?

Login page: 
/Form with string input for the session code.
/Clients will enter the randomly generated code to login to the voting page from the login page.
And then be assigned their user_session_id
Check local storage/cookies for a previous cookie credential (namely user_session_id) from the SAME DAY.  If previous credential not found, prompt for username and look for that and session code.

Voting page:
/Form with number input (3 categories)
Submit vote button
	-Vote button also sends voteID and photoID
NoScore button (enters NULL score)
	-OR just tell users to not enter any numbers in
		-null will be sent
/No pop-ups
/Add thumbnail of the photo they are currently scoring
Form submits score to server, server then saves the score to database.
Return person's voting results after last photo?
/Back and Forward button (return to previous score)

NOPE>> After voting, goes to waiting page that waits for the admin to start the next vote.

Projection page:
/Controlled from admin page
/Shown on-screen
NOPE>> Controls to advance image displayed (CONTROLS ON ADMIN PAGE)
Will also show session_code at the start

Admin page:
/Admin can login to the page through the same login page using diff credentials.
Have active count of # votes shown to admin. So we know if everyone has voted or there are too many votes.  (good idea)
Function to start next vote, will broadcast the next image through socketio and begin the vote.
Pick an image from /Photos. 
OR
Query photo from database? maybe if it can be done

Results page: 
(Maybe just add this as a feature to Projection page)
After all voting is done. Admin can request a results page.
Will show each photo's stats (#votes, mean score)

Most important TODOs as of AUG20:
/-Matching data to persons (Session on vote screen)
-Matching voting data to photos
-MySQL database and querying for photos
Lesser:
-Math on scores with results at the end
-Admin page show status
-HTML page UI improvements