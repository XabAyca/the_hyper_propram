import { PageList } from "./PageList";

const api_key ='key=8ccee3eb357e48fab74975641971037e'

const allLogos = (platform)=>{
  let list = []
  platform.forEach(platform => {
    if(platform.platform.slug =='pc'){
      list.push("<a name='pc' href=''><img class='logo-platform' src='../src/images/windows.svg'></a>")
    }else if (platform.platform.slug =='playstation'){
      list.push("<a name='playstation' href=''><img class='logo-platform' src='../src/images/ps4.svg'></a>")
    }else if (platform.platform.slug =='xbox'){
      list.push("<a name='xbox' href=''><img class='logo-platform' src='../src/images/xbox.svg'></a>")
    }else if (platform.platform.slug =='ios'){
      list.push("<a name='mobile' href=''><img class='logo-platform' src='../src/images/mobile.svg'></a>")
    }else if (platform.platform.slug =='mac'){
      list.push("<a name='mac' href=''><img class='logo-platform' src='../src/images/mac.svg'></a>")
    }else if (platform.platform.slug =='linux'){
      list.push("<a name='linux' href=''><img class='logo-platform' src='../src/images/linux.svg'></a>")
    }else if (platform.platform.slug =='nintendo'){
      list.push("<a name='nintendo' href=''><img class='logo-platform' src='../src/images/switch.svg'></a>")
    }
  })
  return list.join(' ')
};

const searchGame = () => {
  let search = document.getElementById("findgame").value;
  if (search == "") {
    search = PageList();
  } else {
    search = "&search=" + search;
  }
  return PageList(search);
};

const showMore = () =>{
  let allCard = document.getElementsByClassName('cardGame');
  let hiddenList = document.getElementsByClassName('hidden-card');
  if(hiddenList.length>15){
    for(let i=0;i<18;i++){
      allCard[i].classList.remove('hidden-card')
    }
  }else{
    for(let i=0;i<27;i++){
      allCard[i].classList.remove('hidden-card')
    }
    document.getElementById('show-more').remove()
  }
}

const searchPlatformList = () => {
  let cards = document.querySelectorAll('.cardGame');
  let platform =document.querySelector('#selected-plat').value;
  cards.forEach(card => {
    let isCorrect = false
    card.querySelectorAll('.logo a').forEach(logo => {
      if(logo.name == platform){
        isCorrect = true
      }
    })
    if(isCorrect){
      card.classList.remove('hidden-card');
    }else{
      card.classList.add('hidden-card');
    }
  })
}

///// TO DO
// const getStudios = (id)=>{
//   let result =''
//   fetch(`https://api.rawg.io/api/games/${id}?`+api_key)
//   .then((response) => response.json())
//   .then((response) => {
//     let studios = [];
//     response.developers.forEach(developer=>{
//       let temp = developer.name
//       studios.push(temp)
//     })
//     result = studios.join(', ')
//     return result
//   })
// }



export {allLogos,searchGame,showMore,api_key,searchPlatformList}