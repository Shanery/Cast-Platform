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