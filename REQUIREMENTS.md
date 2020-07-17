For this project you'll make a movie library that allows you to search for movies and add them to the a watchlist.

Start with a form that lets you type in the name of a movie. Once you hit send the form is then going to send an API GET request to the movie database API (https://www.themoviedb.org/) and display that movie's information in the form of a Bootstrap Card (or equivalent).

The movie card should display the searched movie's poster image, movie title, description (overview) and vote average.

Add a button to the movie card that will allow you to click it and add that movie to your watch list.

To set up a watch list, you'll need to create a new Firebase database. Make a new collection called 'Watchlist'.

To test your database, create at least one record of real movie information in the Firebase application to test connecting to your database and showing the data from the database inside your application. You can display your watchlist on a new route called 'Watchlist". They will have the same format for each card (a Bootstrap card), but on the watch list page you will only need to display the movie's poster image, title, vote average and a button labeled 'Watched'.

If you click the 'Watched' button, your application will then archive that movie into a list of Watched movies.

I will leave this part open ended so you can use your imagination to determine how you want to keep track of and show all the movies you've watched.
