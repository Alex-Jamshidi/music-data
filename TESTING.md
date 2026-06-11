**The website must contain a drop-down which lists four users.**
<br>Unit tests in script.test.mjs
<br><br>

**Selecting a user must display answers relevant to that user (see table below).**
<br>Tested on live site, selected users 1, 2 and 3 individually and compared to the given output data.
<br><br>

**User 4 has no data, so no questions apply to the user. Some intelligible statement should be shown to the user (e.g. “This user didn’t listen to any songs.”).**
<br>Unit tests in script.test.mjs
<br><br>

**If a question doesn’t apply (e.g. if no songs were ever listened to on a Friday night), the interface should completely hide the question and answer. Displaying the question and an empty result, or any kind of error, is not acceptable.**
<br>Tested on live site: User 3 does not show friday night or everyday questions.
<br><br>

**If fewer than three (but more than zero) genres were listened to the site should list the top genres listened to. It must not display text like “Top 3 genres”, but may say “Top genres” or “Top 2 genres” or similar.**
<br>Tested on live site:
<br>Users 1 and 3 display 3 genres with question "top 3 genres"
<br>User 2 displays single genres with question "top genre"
<br><br>

**Unit tests must be written for at least one non-trivial function.**
<br>Unit tests in script.test.mjs
<br><br>

**The website must score 100 for accessibility in Lighthouse**
<br>Landing page and all 4 users tested in snapshot with 100 accessibility
<br><br>

**Bonus points (which don’t mean anything):**
<br>Re-using code between the “most often” questions (i.e. questions 1, 2, 3, 4). - some code reused
<br>End-to-end tests. - some features end-to-end tested
