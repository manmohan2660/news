let carddata = document.querySelector(".carddata");
let searchbtn = document.getElementById("searchbtn");
let inputdata = document.getElementById("inputdata");
const key = process.env.API_KEY; // Get API key securely

// Function to load API key from config.json
const getAPIKey = async () => {
    const response = await fetch("./config.json");
    const data = await response.json();
    return data.API_KEY;
};

const getdata = async (input) => {
    try {
        const key = await getAPIKey(); // Load API key dynamically
        let res = await fetch(`https://newsapi.org/v2/everything?q=${input}&apiKey=${key}`);
        let jsondata = await res.json();

        if (!jsondata.articles || jsondata.articles.length === 0) {
            carddata.innerHTML = `<p>No results found</p>`;
            return;
        }

        carddata.innerHTML = "";
        jsondata.articles.forEach((article) => {
            if (!article.urlToImage) return;

            let divs = document.createElement("div");
            divs.classList.add("card");

            divs.innerHTML = `
                <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" alt="News Image">
                <h3>${article.title}</h3>
                <p>${article.description ? article.description.slice(0, 140) + "..." : "No description available"}</p>
            `;

            carddata.appendChild(divs);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        carddata.innerHTML = `<p>Error fetching news. Please try again later.</p>`;
    }
};

window.addEventListener("load", () => getdata("india"));

searchbtn.addEventListener("click", () => {
    let inputtext = inputdata.value.trim();
    if (inputtext) getdata(inputtext);
});
