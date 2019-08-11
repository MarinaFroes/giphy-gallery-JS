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
      console.log(jsonResponse.pagination.total_count);

      if (jsonResponse.pagination.total_count === 0) {
        errorMessage = "No gif found. Try again";
      }

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

const populateGallery = (data, errorMessage) => {
  gifGallery.innerHTML = "";
  const errorParagraph = document.createElement("p");
  errorParagraph.setAttribute("class", "error-message");
  errorParagraph.innerText = errorMessage;

  if (errorMessage !== "") {
    gifGallery.appendChild(errorParagraph);
    return;
  }

  data.forEach(item => {
    const gifElement = document.createElement("img");
    gifElement.setAttribute('class', 'gif');
    gifElement.setAttribute('src', item.gifUrl);
    gifGallery.appendChild(gifElement);
  })
}

const getTrendingGifs = async () => { 
  data = await fetchData("trending", "");
  return populateGallery(data, errorMessage);
}

const handleSubmit = async (event) => {
  event.preventDefault();
  const userInput = event.target.search.value;
  data = await fetchData("search", userInput);
  document.getElementById("search-bar").reset();
  return populateGallery(data, errorMessage);
}

getTrendingGifs();



