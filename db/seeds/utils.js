exports.convertTimestampToDate = ({ submitted_at, created_at, ...otherProperties }) => {
    if (!submitted_at) {
      if(!created_at) return { ...otherProperties };
      else return {created_at: new Date(created_at), ...otherProperties}
    };
    return { submitted_at: new Date(submitted_at), ...otherProperties };
}
exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};


  
  exports.formatComments = (comments, idLookup) => {
    return comments.map((comment) => {
      const newComment = {...comment};
      const authorName = newComment.author
      newComment.author = idLookup[authorName]
      return newComment
    })

  };