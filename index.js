"use strict";

const mockData = require("./mockData.js").data;
const prompt = require("prompt-sync")();
console.log(mockData.length);

// Your code here
console.log("Welcome to the Winc Winc dating app!");
console.log(
  "Please profile the following questions to find your perfect match."
);

const questions = {
  first_name: "What is your first name?",

  last_name: "What is your last name?",

  age: "What is your age?",

  gender: "What is your gender? (F, M, X)",

  gender_interest: "Which genders are you interested in dating? (F, M, X)",

  location: "Where do you live? (rural or city)",

  min_age_interest: "What is the minimum age you are interested in?",

  max_age_interest: "What is the maximum age you are interested in?",
};

//  get relevant data from the user
const profile = {};

let numericInput;

console.log("start");

for (const question in questions) {

  while (questions) {
    const answer = prompt(questions[question] + ">");
    profile[question] = answer;

    if (answer === "") {
      console.log("Please answer the question");
      continue;
    }

    if (answer === " ") {
      console.log("its not a valid input, try again !");
      continue;
    }

    if (
      questions[question] === "What is your age?" ||
      questions[question] === "What is the minimum age you are interested in?" ||
      questions[question] === "What is the maximum age you are interested in?"
    ) {
      numericInput = Number(answer);
      if (Number.isNaN(numericInput)) {
        console.log("the age should be a number!");
        continue;
      }
      if (numericInput < 18) {
        console.log("You must be at least 18 years old to use this app.");
        continue;
      }
    }

    if (
      questions[question] === "What is your gender? (F, M, X)" ||
      questions[question] === "Which genders are you interested in dating? (F, M, X)"
    ) {
      if (answer !== "F" && answer !== "M" && answer !== "X") {
        console.log("Please choose between F, M, X");
        continue;
      }
    }
    if (questions[question] === "Where do you live? (rural or city)") {
      if (answer !== "rural" && answer !== "city") {
        console.log("Please choose between rural or city");
        continue;
      }
    }
    if (questions.max_age_interest || questions.min_age_interest) {
      const minAgeInterest = Number(profile.min_age_interest);
      const maxAgeInterest = Number(profile.max_age_interest);
      if (minAgeInterest >= maxAgeInterest) {
        console.log("The maximum age should be higher than the minimum age");
        continue;
      }
    }

    break;
  }
}

console.log(profile);
console.log("Thank you for your answers");

//  match the user with another person based on certain preferences.
let matches = [];

for (const person of mockData) {

  let ageMatch = false;
  let genderMatch = false;
  let locationMatch = false;

  if (profile.min_age_interest <= person.age <= profile.max_age_interest) {
    if (person.min_age_interest <= profile.age <= person.max_age_interest) {
      // console.log("age match");
      ageMatch = true;
    }
  }
  if (person.gender_interest === profile.gender) {
    if (person.gender === profile.gender_interest) {
      // console.log("gender match");
      genderMatch = true;
    }
  }
  if (person.location === profile.location) {
    // console.log("location match");
    locationMatch = true;
  }
  if (ageMatch && genderMatch && locationMatch) {
    // console.log("You have a match!");
    // console.log(person);
    matches.push(person);
  } else {
    // console.log("no match");
  }
}

//  show the user the matches.
console.log(`you have ${matches.length} match!`);

for (const match of matches) {
  console.log(match.first_name, match.last_name, match.age, match.location);
}
