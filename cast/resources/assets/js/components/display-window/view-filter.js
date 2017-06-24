let tagDictionary = {
  "Read View": {
    tagName: 'div',
    options: {
      'class': 'display'
    },
    // Optional
    // childrenWrapper: {
    //   tagName: 'section',
    //   options: {
    //     'class': 'text-block'
    //   }
    // },
    childrenType: 'text-el'
  }
}

// Gets a option and then returns the formatting

export default function (options) {
  if (options.hasOwnProperty('type')) {
    return tagDictionary[options.type]
  } else {
    return {
      tagName: 'div',
      option: {},
      childrenType: 'p'
    }
  }
 
}