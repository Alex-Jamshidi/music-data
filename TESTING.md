    The website must contain a drop-down which lists four users.
    Selecting a user must display answers relevant to that user (see table below).
    The code written to calculate the answers to the questions must seem like it could handle different data if it were supplied, including the following edge-cases:
        User 4 has no data, so no questions apply to the user. Some intelligible statement should be shown to the user (e.g. “This user didn’t listen to any songs.”).
        If a question doesn’t apply (e.g. if no songs were ever listened to on a Friday night), the interface should completely hide the question and answer. Displaying the question and an empty result, or any kind of error, is not acceptable.
        If fewer than three (but more than zero) genres were listened to the site should list the top genres listened to. It must not display text like “Top 3 genres”, but may say “Top genres” or “Top 2 genres” or similar.
    Unit tests must be written for at least one non-trivial function.
    The website must score 100 for accessibility in Lighthouse

Bonus points (which don’t mean anything):

    Re-using code between the “most often” questions (i.e. questions 1, 2, 3, 4).
    End-to-end tests.
