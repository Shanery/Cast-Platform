const data = {
	currentTab: "Views",
  tabs: [
    {
      title: "Views",
      icon: "fa fa-tv"
    },
    {
      title: "Guides",
      icon: "fa fa-sitemap"
    },
    {
      title: "Goals",
      icon: "fa fa-bullseye"
    },
    {
      title: "Options",
      icon: "fa fa-gear"
    }
  ],
  search: {
    views: '',
    guides: '',
    goals: '',
    options: ''
  },

  views: {
    selected: {
      item: {name: ""}
    },
    listItems: []
  }

};

let readView = {
  type: 'Read View',
  presets: [{name: 'Default', 
    options: {
      requested: [
        {
          type: 'explanation',
          visible: true,
          priority: 1
        },
        {
          type: 'examples',
          visible: true,
          priority: 1
        }
      ],
      fontSize: [{
        size: 'small'
      },
      {
        size: 'medium'
      },
      {
        size: 'large'
      }]
    }
  }],
  options: {
    requested: [
      {
        type: 'explanation',
        visible: true,
        priority: 1
      },
      {
        type: 'examples',
        visible: true,
        priority: 1
      }
    ],
    fontSize: [{
      size: 'small'
    },
    {
      size: 'medium'
    },
    {
      size: 'large'
    }]
  }
}

let intro = {
	
	name: 'Introduction',
	// Sidebar Extra Tabs
	subViews: [],

	// Content
	content: {
		type: 'text',
		value: [
			{
				title: {
          tag: "h3",
  				value: "Introduction to Cast"
			  }
      },
      {
        title: {
          tag: "img",
          src: "/imgs/Code-1076536.jpg",
          alt: "Header image"
        }
      },
			{
				explanation: {
          tag: "p",
  				value: "Cast is a way of creating and representing knowledge in concepts. We can think about knowledge as facts and concepts as a way if organizing and making use of those facts. Knowledge by itself doesn't do much. When we are thinking and solving problems, we aren't only recalling facts, we are using this knowledge for a particular purpose or function. Concepts are a way of giving knowledge functionality. The result is information that:"
			  }
      },
			{
				explanation: {
          tag: "li",
  				value: "Explains its' significance and uses"
			  }
      },
			{
				explanation: {
          tag: "li",
  				value: "Can be adapted to solve specific user goals such as learning a skill or designing a piece of software"
			  }
      },
			{
				explanation: {
          tag: "li",
  				value: "Adapts the presentation of information to a user's preferences"
			  }
      },   
      {
				explanation: {
          tag: "p",
  				value: "Cast does this by allowing you to use and create structures for information. For example:"
			  },
        examples: [{
          tag: "p",
          value: "The Technical Rate of Substitution (TRS): Imagine that you you are a company or factory. The TRS describes the amount of input A you swap for input B in order to keep the same amount of output. For example, if you had 2 automatic juicers and 6 workers squeezing juice by hand to create 10L of juice, the TRS would mean the number of workers you would replace for one automatic juicer and still produce 10L of juice."
        },
        {
          tag: "p",
          value: "Expected Value: The average value you would expect to get if you repeat an experiment in the long run. For example, the expected value of rolling a six-sided dice is 3.5. If you rolled a dice many many times, in the long run, the average value of the dice roll would approach 3.5."
        },
        {
          tag: "p",
          value: "Without structure, to the regular person, these two pieces of information might seem completely unrelated. However they are related in a more subtle way. They are related in that they both provide a way of figuring out an optimal choice."
        },
        {
          tag: "p",
          value: "The Technical Rate of Substitution can tell you the cheapest way to produce a certain amount of output while The Expected Value can tell you the best way to handle risk, like making bets in blackjack."
        },
        {
          tag: "p",
          value: "Having this structured understanding of information provides two main benefits. Firstly, structure helps you categorize and learn the information you are taking in. For example, trying to remember the Secondly, once you learn how to use the structure, you can use your past experience to help you understand and solve problems with new information. Mathematics is a perfect example of how learning one structure (algebra) can help you solve problems across a broad range of areas. You start of by defining relationships (different equations), then you figure out some of the values, and then you can calculate the unknown values that you are interested in!"
        },
        {
          tag: "p",
          value: "There are many more very useful structures (which we will call templates) to learn."
        }
        ]
      },
      {
				explanation: {
          tag: "p",
  				value: "Want to learn more?"
			  }
      },
      {
				explanation: {
          tag: "p",
				  value: "Go to the documentation page! Tutorials coming soon."
			  }
      }
		]
	},

	// Display Type
	displayInfo: readView
};

let documentation = {
	name: 'Documentation',
	content: {
    type: 'text',
    value: [
      {
        explanation: {
        tag: "h3",
          value: "How to Cast Works"
        }
      },
      {
        explanation: {
          tag: "p",
          value: "Cast is primarily a way of organizing information into useful chunks (concepts). You create different ways of thinking about objects (levels of abstraction) and store/retrieve them depending on your goals or preferences."
        }
      },
      {
        explanation: {
          tag: "p",
          value: "The first idea you should try and wrap your head around is that of flexible viewing options. Start by going to the options panel on the left sidebar."
        }
      },
      {
        explanation: {
          tag: "p",
          value: "This sidebar will have view options. Each type of view has it's own set of view options. This page is a 'Read View'. It has the presets: Theory, Examples first, integrated, and use example. These will affect the organization of the page. Theory only displays explanations, while examples lets you jump in the deep end so to speak."
        }
      }

    ]
  },
	subViews: [],
	displayInfo: readView
}


let backend = {
	name: "Backend",
	// Sidebar Extra Tabs
	subViews: [],

	// Content
	content: [{
		type: 'text',
		
	}],

	// Display Type
	displayInfo: readView
};

documentation.subViews.push(backend);

data.views.listItems.push(intro);
data.views.listItems.push(documentation);

let items = data.views.listItems;



export default data;