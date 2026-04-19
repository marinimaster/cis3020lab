const updateDate = document.getElementById("update-date");
const movieName = document.getElementById('movie-name');
const crawlPage = document.getElementById('crawl-page');
const crawlText = document.getElementById('crawl-text');
const crawlCache = {};

updateDate.textContent = "2026-04-19"

function updateUI(movie, crawl){
    movieName.textContent = movie;
    crawlText.textContent = crawl
}

async function getCrawl(id){

    if(crawlCache[id]){
        updateUI(crawlCache[id].title, crawlCache[id].crawl);
        return;
    }
    
    try{

        const response = await fetch(`https://www.swapi.tech/api/films/${id}`);
        
        const data = await response.json();
        const crawl = data.result.properties.opening_crawl;
        const movie = data.result.properties.title;

        if(!response.ok){
            throw new Error(response.status)
        }

        movieName.textContent = movie;
        crawlText.textContent = crawl;

        crawlCache[id] = { title: movie, crawl: crawl };
        updateUI(movie, crawl);

    }catch(error){
        console.error(error);
        return null;
    }

}