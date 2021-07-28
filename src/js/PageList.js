import dayjs from "dayjs";
import { allLogos,showMore,searchGame,api_key,searchPlatformList} from './tools';
import moment from "moment";

const today = dayjs().format('YYYY-MM-DD');
const oneYearofToday = dayjs().add(1, 'year').format('YYYY-MM-DD');

const PageList = (argument = "") => {

  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {
      let finalURL = url + api_key + `&dates=${today},${oneYearofToday}&ordering=-added&page_size=27`;
      if (argument) {
        finalURL = url + api_key + argument+ `&ordering=-added&page_size=27`;
      }
      fetch(`${finalURL}`)
      .then((response) => response.json())
      .then((response) => {
        response.results.forEach((article) => {
        let tags = [];
        article.tags.forEach(tag=> tags.push(tag.name))
          tags = tags.join(", ")
          let logos = allLogos(article.parent_platforms)
          articles += `
            <div class="cardGame hidden-card">
              <div class="image">
                <div class='infos'>
                  <h4>${moment(article.released).format("MMM Do, YY")}</h4>
                  <h4>${article.rating}/5 - ${article.ratings_count} votes</h4>
                  <p>${tags}</p>
                </div>
                <img src=${article.background_image}>
              </div>
              <a class=internal-link href="#pagedetail/${article.id}">${article.name}</a>
              <div class='logo'>
                ${logos}
              </div>
            </div>
            `;
        });
        document.querySelector(".page-list .articles").innerHTML += articles;
        document.querySelector(".btn-more").innerHTML =`<a id=show-more>Show more</a>`
        document.querySelector('#show-more').addEventListener('click',showMore)
        
        let cardList = document.getElementsByClassName('cardGame')
        
        for(let i=0; i<9;i++){
          cardList[i].classList.remove('hidden-card')
        }
      });
      
    };

    fetchList(`https://api.rawg.io/api/games?`,cleanedArgument);
    
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class='hero'>
          <h1>Welcome,</h1>
          <p>The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame, the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best, brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies, groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure</p>
        </div>
        <select id="selected-plat" aria-label="Default select example">
        </select>
        <div class="articles"></div>
        <div class="btn-more"></div>
      </section>
    `;

    preparePage();

  };

  fetch(`https://api.rawg.io/api/platforms/parents?`+api_key)
  .then((response) => response.json())
  .then((response) => {
    let optionValues = '<option selected>Plateform: Any</option>';
    response.results.forEach((x)=>{
      if(x.slug == 'ios' || x.slug == 'android'){
        optionValues += `<option value="mobile">${x.name}</option>`
      }else{
        optionValues += `<option value="${x.slug}">${x.name}</option>`
      }
    });
  document.querySelector('#selected-plat').innerHTML= optionValues;
  document.getElementById('selected-plat').addEventListener('change', searchPlatformList)
  })
  document.querySelector("#findgame").addEventListener('keypress', (event) =>{
    if(event.key === 'Enter'){ 
      searchGame()
    };
  }) 
  document.querySelector('form svg').addEventListener('click', searchGame)

  render();

};

export  {PageList,allLogos}
