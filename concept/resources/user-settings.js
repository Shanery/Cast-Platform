// Placeholder User Settings

var userSettings = {
  goals: [],
  todos: []
}


// Goals
var proc = {
    title: "Process",
    subOptions: [
      {
        title: "Views",
        subOptions: [
          {
            title: "Goals"
          },
          {
            title: "Alternatives"
          },
          {
            title: "Examples"
          },
          {
            title: "Practice"
          }
        ]
      },
      {
        title: "Checklist",
        subOptions: [
          {
            title: "Practice"
          },
          {
            title: "Hello my friend"
          },
          {
            title: "Whatever"
          },
        ]
      }
    ]
  };

  var goals = [];
  goals.push({
    title: "Learning Skills",
    subOptions: [proc]
  });

userSettings["goals"] = goals;


export {userSettings};
  // You need 

var documentationInfo = [];

documentationInfo.push({
  displayType: "normal",
  title: "Intro",

});


// Question is how do I have the thing being created dynamically display the views. (read the data and know how to display it)...
documentationInfo.push({
  title: "Point of Views",
  displayType: "convLayer",
  layers: []
});
// Need to change the way Description Works so that it has more parts... more semantic


/*
description: {
    text: "hello",
    description: "This is a really hard thing to do haha"
  },
  otherReps
{
    layerType: "GOAL",
    title: String,
    description: Object,
    otherReps: [Object] (edges... The edge document describes the change.),
    
    *Optional*
    Desired Properties of Product...
     -> Output properties & Tests

  }
  REP
  {
    title: String (This describes re-representation goal),
    description: {Object...
      text: String,
      graph: Future Graph Structure},
    otherReps: []
    
    *Optional*
    Transform type: eg. Conversion into action

  }
*/
// var {title: 'User Goals'}
// var {title: 'UI'}
// var {title: 'Features'}
// var {title: 'Functions'}
// var {title: 'File Organization'}

export {documentationInfo};