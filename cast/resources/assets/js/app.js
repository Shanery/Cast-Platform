
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Vue from 'vue'
import {HTTP} from '../../assets/http-common.js'
import main from './main.vue'
import example from './components/Example.vue'
import second from './components/second.vue'

import '../../../node_modules/bulma/css/bulma.css'
import '../sass/font-awesome-4.7.0/css/font-awesome.min.css'

import sidebardata from './dummy-data/sidebardata.js'

window.Event = new Vue({
  
})

window.UserData = new Vue({
  data: {
    sideData: sidebardata
  }
})

function filterContent(element, order, createElement) {
  if (element.tag == 'img') {
    return createElement(element.tag, {
      attrs: {
        src: element.src, 
        alt: element.alt
      }
    }) 
  } else {
    return createElement(element.tag, {
      style: {
        display: 'flex',
        'flex-direction': 'column',
        order: (order).toString()
      }
    },
    [element.value])
  }
}

function filterArray(element, order, createElement, filterContent) {

  // Filter Array
  if (Array.isArray(element)) {
    
    // Create & Populate Children For Array
    let children = []
    for (let i in element) {
      // Filter Image & Text
      children.push(filterContent(element[i],i,createElement));
    }
    return createElement('div', 
      {
        'class': 'group-wrap',
        style: {
          display: 'flex',
          'flex-direction': 'column',
          order: (order).toString()
        }
      },
      children
    )
  } else {
    return filterContent(element,order,createElement)
  }
}

Vue.component('text-el', {
  props: {
    element: [Object, Array],
    type: String,
    index: Number
  },
  render(createElement) {
    // Renders All Title Related Content
    if (this.type == 'title') {
      // Filter image vs text
      return filterArray(this.element, 0, createElement, filterContent);

    } 

    let selected = sidebardata.views.selected;
    let displayInfo = selected.item.displayInfo;
    let requested = [];

    // Only Render Display Info is Defined
    if (displayInfo.hasOwnProperty('options')) {
      requested = displayInfo.options.requested
    }

    // Example Requested Data: 
    /*
      {
        type: 'explanation',
        visible: true,
        priority: 1
      }
    */

    // For the Requested View
    // Check if it's visible
    // Filter if its text or an Image
    // And Check Whether It's a single element or and Array.

    let view = requested.find(view => view.type == this.type);
    let ord = view.priority;

    if (view.visible) {
      
      return filterArray(this.element, this.index * ord, createElement, filterContent);
        
    } else {
      return createElement();
    }
    
  }

    
});

const app = new Vue({
    el: '#app',
    render: h => h(main, {
      props: {
        sidebar: sidebardata,
      }
    })
});
