## Tasks 

### CORE: GET /api/genres

Should:
- be available on endpoint: ```/api/genres```
- get all genres

Responds with:
- an array of genre objects, each of which should have the following properties:

 - slug
 - description


As this is the first endpoint, you will need to set up your testing suite. 

Consider what errors could occur with this endpoint - as this is the first one, you may wish to also consider general errors when making any type of request to your api. The errors that you identify (and write code for) should be fully tested.

Note: although you may consider handling a 500 error in your app, we would not expect you to explicitly test for this.




### CORE: GET /api

Description

Should:

    be available on /api.
    provide a description of all other endpoints available.

Responds with:

    An object describing all the available endpoints on your API

You can find an (incomplete) example of this response in the endpoints.json file which should be built upon as more features are added to your app. Hint - this file is not just a guide for what your response should look like, but can actually be used when implementing the endpoint.

This /api endpoint will effectively act as documentation detailing all the available endpoints and how they should be interacted with.

Each endpoint should include:

    a brief description of the purpose and functionality of the endpoint.
    which queries are accepted.
    what format the request body needs to adhere to.
    what an example response looks like.

You will be expected to test for this endpoint responding with an accurate JSON object. You will also be expected to update this JSON object for every endpoint you complete. This will be very helpful to your future self when it comes to using your API in the Front End block of the course! Note: how might you make this test dynamic so that it doesn't need to be updated whenever new endpoint info is added to the JSON object?


### CORE: Get /api/works/work_id

Description

Should:

    be available on /api/works/:work_id
    get a work by its id.

Responds with:

    a work object, which should have the following properties:
        work_id
        title
        genre_id
        artist
        caption
        date
        votes
        gallery
        submitted_by
        submitted_at
        img_url

Consider what errors could occur with this endpoint, and make sure to test for them.

Remember to add a description of this endpoint to your /api endpoint. 


### CORE: Get /api/works

Description

Should:

    be available on /api/works
    get all works

Responds with:

    an works array of work objects, each of which should have the following properties:
        work_id
        title
        genre_id
        artist
        date
        votes
        gallery
        submitted_by
        submitted_at
        img_url
        comment_count, which is the total count of all the comments with this work_id. You should make use of queries to the database in order to achieve this.

In addition:

    the works should be sorted by submitted_at in descending order.
    there should not be a caption property present on any of the work objects

Consider what errors could occur with this endpoint, and make sure to test for them.

Remember to add a description of this endpoint to your /api endpoint. 


### CORE: Get /api/works/:work_id/comments

Description

Should:

    be available on /api/works/:work_id/comments.
    get all comments for an work.

Responds with:

    an array of comments for the given work_id of which each comment should have the following properties:
        comment_id
        work_id
        author
        body
        votes
        created_at

Comments should be served with the most recent comments first.

Consider what errors could occur with this endpoint, and make sure to test for them.

Remember to add a description of this endpoint to your /api endpoint. 