import { allLogos,api_key,storeIcons } from './tools'
import moment from "moment";

const PageDetail = (argument = "") => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");


    const fetchGame = (url, argument) => {
      let finalURL = url + argument + '?'+api_key ;
      fetch(`${finalURL}`
      )
        .then((response) => response.json())
        .then((response) => {
          let {stores, tags, genres, publishers, platforms ,rating, ratings_count, website, background_image, name, released, description, developers } = response;
          
          // Create all games details & internal link
          let articleDOM = document.querySelector(".page-detail .article-detail");
          document.querySelector("div.hero-detail").innerHTML=`<img src=${background_image}>`
          if(website==''){
            document.querySelector("div.hero-detail").innerHTML+=`<a class=web-btn >No Website yet ...</a>`
          }else{
            document.querySelector("div.hero-detail").innerHTML+=`<a class=web-btn target='_blank' href=${website}>Check Website  ▶</a>`
          };
          articleDOM.querySelector("h1.title").innerHTML = `${name},`;
          articleDOM.querySelector("h3.votes").innerHTML = `${rating}/5 - ${ratings_count} votes`;
          articleDOM.querySelector("div.description").innerHTML += description;
          if(released==null){
            articleDOM.querySelector(".release").innerHTML += "<p>Coming soon...</p>";
          }else{ 
            articleDOM.querySelector(".release").innerHTML += `<p>${moment(released).format('ll')}</p>`;
          }
          let allDevelopers = []
          developers.forEach(element => {
            allDevelopers.push(`<a class='internal-link' href='#pagelist/&developers=${element.id}'>${element.name}</a>`)
          }); 
          articleDOM.querySelector(".developer").innerHTML += `<p>${allDevelopers.join(", ")}</p>`;
          
          let allPlatforms = [] 
          platforms.forEach(element =>{
            allPlatforms.push(`<a class='internal-link' href='#pagelist/&platforms=${element.platform.id}'>${element.platform.name}</a>`)
          }); 
          articleDOM.querySelector(".platforms").innerHTML += `<p>${allPlatforms.join(", ")}</p>`; 
          
          let allPublishers = [] 
          publishers.forEach(element => {
            allPublishers.push(`<a class='internal-link' href='#pagelist/&publishers=${element.id}'>${element.name}</a>`)
          }); 
          articleDOM.querySelector(".publisher").innerHTML += `<p>${allPublishers.join(", ")}</p>`; 

          let allGenre = [] 
          genres.forEach(element => {
            allGenre.push(`<a class='internal-link' href='#pagelist/&genres=${element.id}'>${element.name}</a>`)
          }); 
          articleDOM.querySelector(".genre").innerHTML += `<p>${allGenre.join(", ")}</p>`;

          let allTags = [] 
          tags.forEach(element => {
            allTags.push(`<a class='internal-link' href='#pagelist/&tags=${element.id}'>${element.name}</a>`)
          }); 
          articleDOM.querySelector(".tags").innerHTML += `<p>${allTags.join(", ")}</p>`;
          
          stores.forEach(store=>{
            articleDOM.querySelector(".stores").innerHTML += `
              <div class='block-stores'>
                <div>
                  <a target='_blank' class='store' href=http://${store.store.domain}>${store.store.name} </a> 
                </div>  
                <div>
                  ${storeIcons[store.store.slug]}
                </div>
              </div>`;
          });

          // Fetch screenshots
          fetch(`https://api.rawg.io/api/games/${response.id}/screenshots?`+api_key)
          .then((response) => response.json())
          .then((response) => {
            for(let i=0; i<4;i++){
              articleDOM.querySelector(".screenshots").innerHTML += `<img src=${response.results[i].image}>`
            }
            document.querySelector('.trailer').setAttribute('poster',`${response.results[4].image}`)
          })
          fetch(`https://api.rawg.io/api/games/${response.id}/game-series?`+api_key)
          .then((response) => response.json())
          .then((response) => {
            if(response.results.length > 1){
              for(let i=0; i<6;i++){
                let tags = [];
                response.results[i].tags.forEach(tag=> tags.push(tag.name))
                tags = tags.join(", ")
                let logos = allLogos(response.results[i].parent_platforms)
                articleDOM.querySelector(".similar-games").innerHTML +=
                `<div class="cardGame">
                  <div class="image">
                    <div class='infos'>
                      <h4>${moment(response.results[i].released).format('ll')}</h4>
                      <h4>${response.results[i].rating}/5 - ${response.results[i].ratings_count} votes</h4>
                      <p>${tags}</p>
                    </div>
                    <img src=${response.results[i].background_image}>
                  </div>
                  <a  class=internal-link href="#pagedetail/${response.results[i].id}">${response.results[i].name}</a>
                  <div class='logo'>
                    ${logos}
                  </div>
                </div>`
              }
            }else{
              articleDOM.querySelector(".similar-games").innerHTML += '<p>No similar game found ...</p>'
            }
          })
        });
        
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class=hero-detail>
        </div>
        <div class="article-detail">
          <div class=title-block>
            <h1 class="title"></h1>
            <h3 class=votes></h3>
          </div>
          <div class="description">
            <h2>Description</h2>  
          </div>
          <div class='details'>
            <div class='block-details'>
              <div class='top-details'>
                <div class=release>
                <h2>Release Date</h2>
                </div>
                <div class=developer>
                <h2>Developer</h2>
                </div>
              </div>
              <div>
                <div class=genre>
                <h2>Genre</h2>
                </div>
              </div>
            </div>
            <div class='block-details'>
              <div class='top-details'>
                <div class=platforms>
                <h2>Platforms</h2>
                </div>
                <div class=publisher>
                <h2>Publisher</h2>
                </div>
              </div>
              <div>
                <div class=tags>
                <h2>Tags</h2>
                </div>
              </div>
            </div>
          </div>
          <h3>BUY</h3>
          <div class=stores>
          </div>
          <h3>TRAILER</h3>
          <div>
            <video class='trailer' controls="false" poster='' width="100%" src="./src/images/thp.mp4"  type="video/mp4">
              Sorry, your browser doesn't support embedded videos.
            </video>
          </div>
          <h3>SCREENSHOTS</h3>
          <div class=screenshots>
          </div>
          <h3>SIMILAR GAMES</h3>
          <div class=similar-games>
          </div>
        </div>
        
      </section>
    `;

    preparePage();
  };

  render();
};

export default PageDetail