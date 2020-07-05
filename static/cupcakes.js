const BASE_URL = "http://127.0.0.1/5000/api";

/**
 * Creates HTML for a new cupcake
 */

function createCupcakeHTML(cupcake) {
    return `
        <div data-cupcake-id=${cupcake.id}>
            <li>
                ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
                <button class="delete-button">Delete</button>
            </li>
            <img class="cupcake-img" src="${cupcake.image}">
        </div>
    `;
}

/**
 * Retrieve cupcake information (GET request) from API and append to ul using createCupcakeHTML
 */

async function showCupcakes() { //this function will retrieve cupcake from API and append to list in HTML
    const response = await axios.get(`${BASE_URL}/cupcakes`) //might need /api/cupcakes not sure yet

    for (let cupcake of response.data.cupcakes) {
        let newCupcake = $(createCupcakeHTML(cupcake)); //this will produce the HTML
        $("#cupcake-list").append(newCupcake);
    }
}

/**
 * Retrieves form information (POST request), appends to DOM, and resets form after submit
 */

$("#cupcake-form").on("submit", async function(event) {
    event.preventDefault();

    let flavor = $("#form-flavor").val();
    let size = $("#form-size").val();
    let rating = $("#form-rating").val();
    let image = $("#form-image").val();

    const cupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, 
        {
            flavor, rating, size, image
        });

    let newCupcake = $(createCupcakeHTML(cupcakeResponse.data.cupcake));
    $("#cupcake-list").append(newCupcake);
    $("#cupcake-form").trigger("reset");
});

/**
 * Deletes selected cupcake from DOM
 */

$("#cupcake-list").on("click", ".delete-button", async function(event) {
    event.preventDefault();

    let $cupcake = $(e.target).closest("div");
    let cupcakeid = $cupcake.attr("data-cupcake-id"); //get id of selected cupcake

    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeid}`);
    $cupcake.remove()
})