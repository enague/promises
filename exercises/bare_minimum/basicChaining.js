/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promiseConstructors = require('./promiseConstructor');
var promisification = require('./promisification');


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return promiseConstructors.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(username) {
      if (!username) {
        throw new Error('User does not exist!')
      } else {
        return username;
      }
    })
    .then(function(username) {
      return promisification.getGitHubProfileAsync(username) 
    })
    .then(function(username) {
      return new Promise(function(fulfill,reject) {
        fs.writeFile(writeFilePath, JSON.stringify(username), 'utf8', function (err) {
          if (err) reject(err);
          else fulfill(username);
        });  
      });
    })
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
