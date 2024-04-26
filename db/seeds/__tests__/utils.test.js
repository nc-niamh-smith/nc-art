const {
  convertTimestampToDate,
  createRef,
  formatComments,
} = require("../utils");

describe("convertTimestampToDate", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test("converts a submitted_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { submitted_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.submitted_at).toBeDate();
    expect(result.submitted_at).toEqual(new Date(timestamp));
  });
  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDate(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});

describe("createRef", () => {
  test("returns an empty object, when passed an empty array", () => {
    const input = [];
    const actual = createRef(input);
    const expected = {};
    expect(actual).toEqual(expected);
  });
  test("returns a reference object when passed an array with a single items", () => {
    const input = [{ title: "title1", article_id: 1, name: "name1" }];
    let actual = createRef(input, "title", "article_id");
    let expected = { title1: 1 };
    expect(actual).toEqual(expected);
    actual = createRef(input, "name", "title");
    expected = { name1: "title1" };
    expect(actual).toEqual(expected);
  });
  test("returns a reference object when passed an array with many items", () => {
    const input = [
      { title: "title1", article_id: 1 },
      { title: "title2", article_id: 2 },
      { title: "title3", article_id: 3 },
    ];
    const actual = createRef(input, "title", "article_id");
    const expected = { title1: 1, title2: 2, title3: 3 };
    expect(actual).toEqual(expected);
  });
  test("does not mutate the input", () => {
    const input = [{ title: "title1", article_id: 1 }];
    const control = [{ title: "title1", article_id: 1 }];
    createRef(input);
    expect(input).toEqual(control);
  });
});

describe("formatComments", () => {
  test("returns an empty array, if passed an empty array", () => {
    const comments = [];
    expect(formatComments(comments, {})).toEqual([]);
    expect(formatComments(comments, {})).not.toBe(comments);
});
test("converts author value to the user_id when passed a single comment object", () => {
    const comments = [{ author: "ant" }];
    const idLookup = {"ant": 1}
    const formattedComments = formatComments(comments, idLookup)
    expect(formattedComments[0].author).toEqual(1)
})
  test("converts author value to the user_id", () => {
    const comments = [{ author: "ant" }, { author: "bee" }];
    const idLookup = {"ant": 1, "bee" : 2};
    const formattedComments = formatComments(comments, idLookup);
    expect(formattedComments[0].author).toEqual(1);
    expect(formattedComments[1].author).toEqual(2);
});
test("should not mutate the original input", () => {
    const comments = [{ author: "ant" }, { author: "bee" }];
    const idLookup = {"ant": 1, "bee" : 2};
    const commentsCopy = [{ author: "ant" }, { author: "bee" }];
    const idLookupCopy = {"ant": 1, "bee" : 2};
    formatComments(comments, idLookup);
    expect(comments).toEqual(commentsCopy)
    expect(idLookup).toEqual(idLookupCopy)
})
});
