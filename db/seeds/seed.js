const db = require('../connection.js')
const format = require('pg-format')
const { convertTimestampToDate, createRef, formatComments } = require('./utils.js')


const seed = async ({genresData, usersData, worksData, artistsData, commentsData}) => {
    await db.query(`DROP TABLE IF EXISTS comments`)
    await db.query(`DROP TABLE IF EXISTS works;`)
    await db.query(`DROP TABLE IF EXISTS genres;`)
    await db.query(`DROP TABLE IF EXISTS users;`)
    await db.query(`DROP TABLE IF EXISTS artists;`)
    
    //genres
    await db.query(`CREATE TABLE genres(
        genre_id SERIAL PRIMARY KEY,
        slug VARCHAR,
        description VARCHAR
    );`)

    //users
    await db.query(`CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        username VARCHAR,
        name VARCHAR,
        avatar_url VARCHAR
    );`)

    //works
    await db.query(`CREATE TABLE works(
        work_id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        genre_id INT,
        FOREIGN KEY (genre_id) REFERENCES genres(genre_id),
        artist VARCHAR,
        caption VARCHAR,
        date INT,
        votes INT,
        gallery VARCHAR,
        submitted_by INT,
        FOREIGN KEY (submitted_by) REFERENCES users(user_id),
        submitted_at DATE,
        img_url VARCHAR
    );`)
    //artists
    await db.query(`CREATE TABLE artists(
        artist_id SERIAL PRIMARY KEY,
        name VARCHAR,
        wiki_url VARCHAR,
        is_artist BOOLEAN,
        birth_date INT,
        death_date INT,
        img_url VARCHAR
    )`)

    //comments
    await db.query(`CREATE TABLE comments(
        comment_id SERIAL PRIMARY KEY,
        work_id INT,
        FOREIGN KEY (work_id) REFERENCES works(work_id),
        author INT,
        FOREIGN KEY (author) REFERENCES users(user_id),
        body VARCHAR,
        votes INT,
        created_at DATE
    );`)

    //genres 
    const genresDataQueryStr = format('INSERT INTO genres (slug, description) VALUES %L;', genresData.map(({ slug, description }) => [slug, description]));
    const insertedGenres = await db.query(genresDataQueryStr)

    //users
    const usersDataQueryStr = format('INSERT INTO users (username, name, avatar_url) VALUES %L RETURNING*;', usersData.map(({username, name, avatar_url}) => [username, name, avatar_url]));
    const insertedUsers = await db.query(usersDataQueryStr)

    //works
    const formattedWorksData = worksData.map(convertTimestampToDate)
    const worksDataQueryStr = format('INSERT INTO works (title, genre_id, artist, caption, date, votes, gallery, img_url, submitted_by, submitted_at) VALUES %L;', formattedWorksData.map(({title, genre_id, artist, caption, date, votes, gallery, img_url, submitted_by, submitted_at}) => [title, genre_id, artist, caption, date, votes, gallery, img_url, submitted_by, submitted_at]))
    const insertedWorks = await db.query(worksDataQueryStr)

    //artists
    const artistsDataQueryStr = format('INSERT INTO artists (name, wiki_url, is_artist, birth_date, death_date, img_url) VALUES %L;', artistsData.map(({name, wiki_url, is_artist, birth_date, death_date, img_url}) => [name, wiki_url, is_artist, birth_date, death_date, img_url]));
    const insertedArtists = await db.query(artistsDataQueryStr)

    //comments
    const formattedCommentsData = commentsData.map(convertTimestampToDate)
    const usersIdLookUp = createRef(insertedUsers.rows, 'username', 'user_id')
    const organiseComments = formatComments(formattedCommentsData, usersIdLookUp)
    const commentsDataQueryStr = format('INSERT INTO comments (work_id, author, body, votes, created_at) VALUES %L;', organiseComments.map(({work_id, author, body, votes, created_at}) => [work_id, author, body, votes, created_at]));
    const insertedComments = await db.query(commentsDataQueryStr)
}

module.exports = seed;