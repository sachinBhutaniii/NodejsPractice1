const people = ["leo", "neymar", "surez", "xavi"];
const num = [10, 11, 9, 6];

//console.log("People file data ", people);

// to use above data inside another file we HAVE to export it manually

// whatever we export here will be imported

module.exports = {
  people,
  num,
};
//above will be converted automatically to the below syntax under the hood
//onlt if we keep the names same (of what we have and what we are exporting)

/*
module.exports = {
  people: people,
  num: num,
};
*/
