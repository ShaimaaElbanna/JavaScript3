'use strict';

{ 
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status < 400) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.keys(options).forEach((key) => {
      const value = options[key];
      if (key === 'text') {

        elem.innerText = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }



  function draw(parent, obj) {
    parent.innerHTML = ""
    const theData = createAndAppend("div", parent,{class:"theData"});
    const Repositoryh2   = createAndAppend("h2", theData,{text:"Repository : "})
    const Repository   = createAndAppend("p", theData,{text:obj.name})
   if (obj.description != null){
    const descriptionh2   = createAndAppend("h2", theData,{text:"\n Description : "})
    const Description   = createAndAppend("p", theData,{text:obj.description})
  }
  if (obj.forks != null){
    const Forksh2 = createAndAppend("h2", theData,{text:"\nForks :	"})
    const Forks  = createAndAppend("p", theData,{text:obj.forks})
  }
  if (obj.updated_at != null){
    const Updatedh2 = createAndAppend("h2", theData,{text:"\nUpdated at :	"})
    let date = new Date(obj.updated_at);
    const Updated  = createAndAppend("p", theData,{text: date})
    console.log(obj);
  }
    
    fetchJSON(obj.contributors_url, (err, data) => {
      console.log(data)
      const Contributions = createAndAppend("div", parent,{class:"Contributions"});
      const row = createAndAppend("div",Contributions,{class: "row"});
        for (let i = 0; i < data.length; i++){
          const column = createAndAppend("div", row,{class:"column"})
          createAndAppend("img",column,{src:data[i].avatar_url, class:"photo"})
          const card = createAndAppend("div", column,{class: "card"});
          const container = createAndAppend("div", card,{class:"container"})
          createAndAppend ("h2",container,{text:data[i].login})
          createAndAppend("p",container,{text: data[i].contributions, class:"numbers"})
          let theLink = createAndAppend("a",container,{class: "link",href:data[i].html_url, class:"profile", target: "self"})
          createAndAppend("button", theLink,{text:"Profile", class:"button"})
        }
  })
}

  function Dropdown (list, parent) {
    const main = createAndAppend("div",root,{class:"main"})
    const log = createAndAppend("h2",main,{text: "HYF Repositories",class:"logo",src:"hyf.png" })
    const select = createAndAppend("select", main)
     list.sort();
    for (let i =0; i < list.length; i++){
      
      const option = createAndAppend("option",select, {value: i, text : list[i].name}) 
    list.sort((a,b) => {
     return a.name.localeCompare(b.name) 
    });
    }
    const boxes = createAndAppend("div", root,{class:"boxes"})
    select.onchange = function () {
      console.log(select.value)
      draw(boxes, list[select.value])
    }
  
    return select
  }

  function main(url) {
    fetchJSON(url, (err, data) => {
      const root = document.getElementById('root');
      console.log(data[0].description)
      const namesMenu = Dropdown(data, root)

      if (err) {
        createAndAppend('div', root, { text: err.message, class: 'alert-error' });
      } else {
//       createAndAppend('pre', root, { text: JSON.stringify(data, null, 2) });
      }
    });
  }

  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

  window.onload = () => main(HYF_REPOS_URL);
}
