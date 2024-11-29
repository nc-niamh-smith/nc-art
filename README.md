# Northcoders Art API

- View the data in `./db/data/` and use the ERD in `./ERD.png` in order to construct your seed file for testing.
- Production data doesn't exist! This is because realistically, you'll want to add your own favourite artworks.
- You can call your tables whatever you want! I would suggest  the db should be called `art-gallery-test`, `art-gallery-dev` and `art-gallery-prod` but it's up to you!

## List of possible Endpoints:

### Core:
GET /api/genres

GET /api

GET /api/works/:work_id

GET /api/works

GET /api/works/:work_id/comments

POST /api/works/:work_id/comments

PATCH /api/works/:work_id

DELETE /api/comments/:comment_id

GET /api/users

GET /api/works (queries)

GET /api/works/:work_id (comment count)

### Advanced: 

GET /api/artists

GET /api/artists/:artist_id

GET /api/works (sorting queries)

GET /api/users/:username

PATCH /api/comments/:comment_id

POST /api/artists

POST /api/works

GET /api/works (pagination)

GET /api/works/:work_id/comments (pagination)

POST /api/genres

DELETE /api/works/:work_id