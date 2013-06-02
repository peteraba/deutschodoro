# Deutschodoro #

Deutschodoro is a combination of German language quizzes and a time management technique called Pomodoro.

## Pomodoro ##

The idea behind Pomodoro is that you are most productive when working in short, intensive work periods separated by short breaks. While most people would usually read Facebook messages, get a coffee or smoke during breaks, for learners of the German language it could be a fun and useful to answer German language related questions instead. Using the Pomodoro technique is optional, you can ask for new quizzes any time.

## Options ##

 It will be mandatory for one to set the level of her German skill which will affect the words used for the quizzes and possibly change the set of quiz types to be used. Deutschodoro also keeps some limited statistics about results of the quizzes. It saves the results of the last quizzes by each word used along with the date and time the quiz was answered. Currently the scores are calculated on the fly, which means that giving the wrong answer will immediately increase the changes of having a quiz containing the same word again. Still, the logic will prevent showing the same word twice in a set of three quizzes. (This last feature is yet to be developed.)

## Implementation notes ##

Deutschodoro is currently written as a purely frontend application which means it requires no server support, all data is stored in the users browser. Because of that, statistics are not be permanently preserved therefore changing of computer, browser or even a simple browser cleaning will leave the user without statistics. This might change in the future if users demand it, but it would require a larger set of architectural changes and likely much time to be invested.

The primary platform of the application is and will be the chrome extension platform, but it's also available on the official website: deutschodoro.com. Opera, Firefox extensions and mobile native versions are planned, but are not on the roadmap yet.

## Contribution ##

Pull requests, feature request are welcome.

Non-technical people can also help by downloading the dictionary and improving it, as that is easier to review. Please use the csv file for it You can send those to my gmail address for which my username is thoer81. ;)