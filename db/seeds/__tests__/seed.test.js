const db = require('../../connection.js');
const seed = require('../seed.js');
const data = require('../../data/test-data');

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("seed", () => {
    describe("creating tables", () => {
        describe("genres table", () => {
            test("genres table exists", async () => {
                const query = await db.query(
                    `SELECT EXISTS (
                        SELECT FROM
                        information_schema.tables
                        WHERE
                        table_name = 'genres'
                    );`
                )
                const exists = query.rows[0].exists;
                expect(exists).toBe(true);
            })
            test("genres table has a genre_id column as serial primary key", async () => {
                const query = await db.query(
                    `SELECT column_name, data_type, column_default
                    FROM information_schema.columns
                    WHERE table_name = 'genres'
                    AND column_name = 'genre_id';`
                )
                const column = query.rows[0]
                expect(column.column_name).toBe("genre_id");
                expect(column.data_type).toBe("integer");
                expect(column.column_default).toBe(
                    "nextval('genres_genre_id_seq'::regclass)"
                );
            });
            test("genres table has a slug column as VARCHAR", async () => {
                const query = await db.query(
                    `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'genres'
                    AND column_name = 'slug';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('slug');
                expect(column.data_type).toBe('character varying')
            })
            test("genres table has a description column as VARCHAR", async () => {
                const query = await db.query(
                    `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'genres'
                    AND column_name ='description';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('description');
                expect()
            })
        })
        describe("users table", () => {
            test("users table exists", async () => {
                const query = await db.query(
                    `SELECT EXISTS (
                        SELECT FROM
                        information_schema.tables
                        WHERE
                        table_name = 'users'
                    );`
                )
                const exists = query.rows[0].exists;
                expect(exists).toBe(true);
            })
            test("users table has a user_id column as a serial primary key", async () => {
                const query = await db.query(
                    `SELECT column_name, data_type, column_default
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'user_id';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe("user_id");
                expect(column.data_type).toBe("integer");
                expect(column.column_default).toBe(
                    "nextval('users_user_id_seq'::regclass)"
                );
            });
            test("users table has a username column as VARCHAR", async () => {
                const query = await db.query(
                    `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'username';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('username');
                expect(column.data_type).toBe('character varying');
            });
            test("users table has a name column as VARCHAR", async () => {
                const query = await db.query(
                    `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'name';`
                );
                const column = query.rows[0];
                expect(column.column_name).toBe('name');
                expect(column.data_type).toBe('character varying');
            });
            test("users table has an avatar_url column as VARCHAR", async () => {
                const query = await db.query(
                    `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'avatar_url';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('avatar_url');
                expect(column.data_type).toBe('character varying');
            });
        });
        describe("works table", () => {
            test("works table exists", async () => {
                const query = await db.query(
                    `SELECT EXISTS (
                        SELECT FROM
                        information_schema.tables
                        WHERE
                        table_name = 'works'
                    );`
                )
                const exists = query.rows[0].exists;
                expect(exists).toBe(true);
            })
            test("works table has a work_id column as serial primary key", async () => {
                const query = await db.query(
                    `SELECT column_name, data_type, column_default
                    FROM information_schema.columns
                    WHERE table_name = 'works'
                    AND column_name = 'work_id';`
                )
                const column = query.rows[0]
                expect(column.column_name).toBe("work_id");
                expect(column.data_type).toBe("integer");
                expect(column.column_default).toBe(
                    "nextval('works_work_id_seq'::regclass)"
                );
            })
            test("works table has a title column as VARCHAR", async () => {
                const query = await db.query(
                    `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'works'
                    AND column_name = 'title';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('title');
                expect(column.data_type).toBe('character varying')
            })
            test("works table has a genre column as INT reference to genres.genre_id", async () => {
                const columnQuery = await db.query(
                    `SELECT data_type, column_name
                    FROM information_schema.columns
                    WHERE table_name = 'works'
                    AND column_name ='genre_id';`
                )
                const constraintQuery = await db.query(
                    `SELECT table_name, constraint_name, constraint_type
                    FROM information_schema.table_constraints
                    WHERE table_name = 'works'
                    AND constraint_name = 'works_genre_id_fkey';`
                )
                const constraint = constraintQuery.rows[0];
                const column = columnQuery.rows[0]
                expect(column.column_name).toBe('genre_id')
                expect(column.data_type).toBe('integer')
                expect(constraint.table_name).toBe('works')
                expect(constraint.constraint_name).toBe('works_genre_id_fkey')
                expect(constraint.constraint_type).toBe('FOREIGN KEY')
            })
            test("works table has an artist column as VARCHAR", async () => {
                const query = await db.query(
                    `SELECT data_type, column_name
                    FROM information_schema.columns
                    WHERE table_name = 'works'
                    AND column_name = 'artist';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('artist');
                expect(column.data_type).toBe('character varying')
            })
            test("works table has a caption column as VARCHAR", async () => {
                const query = await db.query(
                    `SELECT data_type, column_name
                    FROM information_schema.columns
                    WHERE table_name = 'works'
                    AND column_name = 'caption';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('caption');
                expect(column.data_type).toBe('character varying')
            })
            test("works table has a date column as INT", async () => {
                const query = await db.query(
                    `SELECT data_type, column_name
                    FROM information_schema.columns
                    WHERE table_name = 'works'
                    AND column_name = 'date';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('date');
                expect(column.data_type).toBe('integer')
            })
            test("works table has a votes column as INT", async () => {
                const query = await db.query(
                    `SELECT data_type, column_name
                    FROM information_schema.columns
                    WHERE table_name = 'works'
                    AND column_name = 'votes';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('votes');
                expect(column.data_type).toBe('integer')
            })
            test("works table has a gallery column as VARCHAR", async () => {
                const query = await db.query(
                    `SELECT data_type, column_name
                    FROM information_schema.columns
                    WHERE table_name = 'works'
                    AND column_name = 'gallery';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('gallery');
                expect(column.data_type).toBe('character varying')
            })
            test("works table has an img_url column as VARCHAR", async () => {
                const query = await db.query(
                    `SELECT data_type, column_name
                    FROM information_schema.columns
                    WHERE table_name = 'works'
                    AND column_name = 'img_url';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('img_url');
                expect(column.data_type).toBe('character varying')
            })
            test("works table has a submitted_by column as INT reference to users.user_id", async () => {
                const columnQuery = await db.query(
                    `SELECT data_type, column_name
                    FROM information_schema.columns
                    WHERE table_name = 'works'
                    AND column_name = 'submitted_by';`
                )
                const constraintQuery = await db.query(
                    `SELECT *
                    FROM information_schema.table_constraints
                    WHERE table_name = 'works'
                    AND constraint_name = 'works_submitted_by_fkey';`
                )
                const column = columnQuery.rows[0];
                const constraint = constraintQuery.rows[0];
                expect(column.column_name).toBe('submitted_by');
                expect(column.data_type).toBe('integer')
                expect(constraint.table_name).toBe('works')
                expect(constraint.constraint_name).toBe('works_submitted_by_fkey');
                expect(constraint.constraint_type).toBe('FOREIGN KEY')
            })
            test("works table has a submitted_at column as date", async () => {
                const columnQuery = await db.query(
                    `SELECT data_type, column_name
                    FROM information_schema.columns
                    WHERE table_name = 'works'
                    AND column_name = 'submitted_at';`
                )
                
                const column = columnQuery.rows[0];
                expect(column.column_name).toBe('submitted_at');
                expect(column.data_type).toBe('date');
            });
        });
        describe("artists table", () => {
            test('artists table exists', async () => {
                const query = await db.query(
                    `SELECT EXISTS (
                        SELECT FROM
                        information_schema.tables
                        WHERE
                        table_name = 'artists'
                    );`
                )
                const exists = query.rows[0].exists;
                expect(exists).toBe(true);
            });
            test('artists table has a name column as VARCHAR', async () => {
                const query = await db.query(
                    `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'artists'
                    AND column_name = 'name';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('name');
                expect(column.data_type).toBe('character varying')
            });
            test('artists table has a wiki_url column as VARCHAR', async () => {
                const query = await db.query(
                    `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'artists'
                    AND column_name = 'wiki_url';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('wiki_url');
                expect(column.data_type).toBe('character varying')
            });
            test('artists table has an is_artist column as a BOOLEAN', async () => {
                const query = await db.query(
                    `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'artists'
                    AND column_name = 'is_artist';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('is_artist');
                expect(column.data_type).toBe('boolean')
            });
            test('artists table has a birth_date column as an INT', async () => {
                const query = await db.query(
                    `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'artists'
                    AND column_name = 'birth_date';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('birth_date');
                expect(column.data_type).toBe('integer')
            });
            test('artists table has a death_date column as an INT', async () => {
                const query = await db.query(
                    `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'artists'
                    AND column_name = 'death_date';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('death_date');
                expect(column.data_type).toBe('integer')
            });
            test('artists table has a img_url column as an VARCHAR', async () => {
                const query = await db.query(
                    `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'artists'
                    AND column_name = 'img_url';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('img_url');
                expect(column.data_type).toBe('character varying')
            });
            test('artists table has an artist_id column as a serial primary key', async () => {
                const query = await db.query(
                    `SELECT column_name, data_type, column_default
                    FROM information_schema.columns
                    WHERE table_name = 'artists'
                    AND column_name = 'artist_id';`
                )
                const column = query.rows[0]
                expect(column.column_name).toBe("artist_id");
                expect(column.data_type).toBe("integer");
                expect(column.column_default).toBe(
                    "nextval('artists_artist_id_seq'::regclass)"
                );
            });
        })
        describe("comments table", () => {
            test("comments table should exist", async () => {
                const query = await db.query(
                    `SELECT EXISTS (
                        SELECT FROM
                        information_schema.tables
                        WHERE
                        table_name = 'comments'
                    );`
                )
                const exists = query.rows[0].exists;
                expect(exists).toBe(true);
            })
            test("comments table should have comment_id column that is a serial primary key", async () => {
                const query = await db.query(
                    `SELECT column_name, data_type, column_default
                    FROM information_schema.columns
                    WHERE table_name = 'comments'
                    AND column_name = 'comment_id';`
                )
                const column = query.rows[0]
                expect(column.column_name).toBe("comment_id");
                expect(column.data_type).toBe("integer");
                expect(column.column_default).toBe(
                    "nextval('comments_comment_id_seq'::regclass)"
                );
            })
            test("comments table should have work_id column that is a reference to works.works_id", async () => {
                const columnQuery = await db.query(
                    `SELECT data_type, column_name
                    FROM information_schema.columns
                    WHERE table_name = 'comments'
                    AND column_name ='work_id';`
                )
                const constraintQuery = await db.query(
                    `SELECT table_name, constraint_name, constraint_type
                    FROM information_schema.table_constraints
                    WHERE table_name = 'comments'
                    AND constraint_name = 'comments_work_id_fkey';`
                )
                const constraint = constraintQuery.rows[0];
                const column = columnQuery.rows[0]
                expect(column.column_name).toBe('work_id')
                expect(column.data_type).toBe('integer')
                expect(constraint.table_name).toBe('comments')
                expect(constraint.constraint_name).toBe('comments_work_id_fkey')
                expect(constraint.constraint_type).toBe('FOREIGN KEY')
            })
            test("comments table should have an author column that is a reference to users.user_id", async () => {
                const columnQuery = await db.query(
                    `SELECT data_type, column_name
                    FROM information_schema.columns
                    WHERE table_name = 'comments'
                    AND column_name ='author';`
                )
                const constraintQuery = await db.query(
                    `SELECT table_name, constraint_name, constraint_type
                    FROM information_schema.table_constraints
                    WHERE table_name = 'comments'
                    AND constraint_name = 'comments_author_fkey';`
                )
                const constraint = constraintQuery.rows[0];
                const column = columnQuery.rows[0]
                expect(column.column_name).toBe('author')
                expect(column.data_type).toBe('integer')
                expect(constraint.table_name).toBe('comments')
                expect(constraint.constraint_name).toBe('comments_author_fkey')
                expect(constraint.constraint_type).toBe('FOREIGN KEY')
            })
            test("comments table should have a body column that is a VARCHAR", async () => {
                const query = await db.query(
                    `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'comments'
                    AND column_name = 'body';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('body');
                expect(column.data_type).toBe('character varying')
            })
            test("comments table should have a votes column that is an INT", async () => {
                const query = await db.query(
                    `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'comments'
                    AND column_name = 'votes';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('votes');
                expect(column.data_type).toBe('integer')
            });
            test("comments table should have a created_at column that is a DATE", async () => {
                const query = await db.query(
                    `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'comments'
                    AND column_name = 'created_at';`
                )
                const column = query.rows[0];
                expect(column.column_name).toBe('created_at');
                expect(column.data_type).toBe('date')
            })
        })
    });
    describe("inserting data", () => {
        describe("genres table", () => {
            test('should have a genre_id as an int, slug as string and description as string', async() => {
                const {rows} = await db.query(`SELECT * FROM genres;`)
                expect(rows.length).toBeGreaterThan(0)
                rows.forEach((genre) => {
                    expect(typeof genre.genre_id).toBe('number')
                    expect(typeof genre.slug).toBe('string')
                    expect(typeof genre.description).toBe('string')
                })
            })
        })
        describe("users table", () => {
            test('should have username, user_id, name and avatar_url properties with relevant data types', async() => {
                const {rows} = await db.query(`SELECT * FROM users;`)
                expect(rows.length).toBeGreaterThan(0)
                rows.forEach((user) => {
                    expect(typeof user.username).toBe('string')
                    expect(typeof user.name).toBe('string')
                    expect(typeof user.avatar_url).toBe('string')
                    expect(typeof user.user_id).toBe('number')
                })
            })
        })
        describe("works table", () => {
            test('should have title, work_id, genre, artist, caption, date, votes, gallery, img, submitted_by and submitted_at properties with relevant data types', async() => {
                const {rows} = await db.query(`SELECT * FROM works;`)
                expect(rows.length).toBeGreaterThan(0)
                rows.forEach((work) => {
                    expect(typeof work.title).toBe('string');
                    expect(typeof work.work_id).toBe('number');
                    expect(typeof work.genre_id).toBe('number');
                    expect(typeof work.artist).toBe('string');
                    expect(typeof work.caption).toBe('string');
                    expect(typeof work.date).toBe('number');
                    expect(typeof work.votes).toBe('number');
                    expect(typeof work.gallery).toBe('string');
                    expect(typeof work.img_url).toBe('string');
                    expect(typeof work.submitted_by).toBe('number');
                    expect(typeof work.submitted_at).toBe('object');
                })
            })
        })
        describe("artists table", () => {
            test('should have name, wiki_url, is_artist, birth_date, death_date, img_url and artist_id properties with relevant data types', async() => {
                const {rows} = await db.query(`SELECT * FROM artists;`)
                expect(rows.length).toBeGreaterThan(0)
                rows.forEach((artist) => {
                    expect(typeof artist.name).toBe('string');
                    expect(typeof artist.wiki_url).toBe('string');
                    expect(typeof artist.is_artist).toBe('boolean');
                    expect(typeof artist.birth_date).toBe('number');
                    expect(typeof artist.death_date).toBe('number');
                    expect(typeof artist.img_url).toBe('string');
                    expect(typeof artist.artist_id).toBe('number');
                })
            })
        })
        describe("comments table", () => {
            test('should have work_id, author, body, votes, created_at and comment_id properties with relevant data types', async() => {
                const {rows} = await db.query(`SELECT * FROM comments;`)
                expect(rows.length).toBeGreaterThan(0)
                rows.forEach((comment) => {
                    expect(typeof comment.work_id).toBe('number');
                    expect(typeof comment.author).toBe('number');
                    expect(typeof comment.body).toBe('string');
                    expect(typeof comment.votes).toBe('number');
                    expect(typeof comment.created_at).toBe('object');

                })
            })
        })
    })
});