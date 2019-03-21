# PhotoClub-VoteServer

NodeJS server to serve HTML files and images.
Receives scores for photos from clients and stores them in a database. Using mySQL.

Socket:
Use socket.io to update clients when needed
Also for when clients want to switch to another photo

Login page: 
* Form with string input for user
* Enter:
	* voter for vote page
	* admin for admin page
	* projection for projection page

Vote page:
* Form with number input (3 categories)
* Submit vote button
	* Vote button also sends voteID and photoID
* NoScore button (enters NULL score)
	* OR just tell users to not enter any numbers in and null will be sent
* No pop-ups
* Add thumbnail of the photo they are currently scoring
* Form submits score to server, server then saves the score to database.
* Back and Forward button (change which photo to vote on)
* VoteID assigned when user joins
	* if prev VoteID assigned, the previous one will be used
	* id is stored in localstorage of user's browser
		* allows user to close tab and re-open tab but still have the same ID

Projection page:
* Shown on projection screen at the fron of the room
* Controlled from admin page
* Shows photo
	* changes with controls from admin page (code written, NOT tested)

Admin page:
* Admin can login to the page through the same login page using diff credentials.
* Controls for Projection page		

Notes:
* There will be between 1 and 20 photos.
* Each photo will be scored in 3 categories, between 1 and 10.

The final score for each photo will be out of 30.  It is a sum of the scores in all 3 categories.

For a single photo, average each category.  Note an artist will not score his own photo.  Therefore, the number of scores can differ per photo.  ex.  if you have 4 photos by 3 artists, then one artist "Bob", submitted 2 photos.  Bob will not score his own photos and his 2 photos will have scores from 2 people only.
