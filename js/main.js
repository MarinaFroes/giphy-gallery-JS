const gifGallery = document.getElementById("gif-gallery");

let data = [];
let errorMessage = "";

fetchData = async (type, userInput) => {
  const endpoint = `https://api.giphy.com/v1/gifs/${type}?api_key=catBjjoSXxZlwG8tEqcHcRnoSEpoDphA&q=${userInput}&limit=10&offset=0&rating=G&lang=en`;
  
  try {
    const response = await fetch(endpoint);
    
    if (response.status === 200) {
      const jsonResponse = await response.json();
      const gifDataArray = [];
      for (let i = 0; i < jsonResponse.data.length; i++) {
        gifDataArray.push({
          gifId: jsonResponse.data[i].id,
          gifUrl: jsonResponse.data[i].images.fixed_height.url
        })
      }
      data = gifDataArray;
      return data;
    }
  }
  catch (error) {
    errorMessage = error;
    console.log(error);
  }
}

const populateGallery = (data) => {
  gifGallery.innerHTML = "";
  data.forEach(item => {
    const gifElement = document.createElement("img");
    gifElement.setAttribute('class', 'gif');
    gifElement.setAttribute('src', item.gifUrl);
    gifGallery.appendChild(gifElement);
  })
}

const getTrendingGifs = async () => { 
  data = await fetchData("trending", "");
  return populateGallery(data);
}

const handleSubmit = async (event) => {
  event.preventDefault();
  const userInput = event.target.search.value;
  data = await fetchData("search", userInput);
  return populateGallery(data);
}

getTrendingGifs();



