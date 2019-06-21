const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message_1 = document.querySelector("#message-1");
const message_2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const location = search.value;

    message_1.textContent = "Loading...";
    message_2.textContent = "";

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {

    response.json().then((data) => {

        if (data.error) {

            console.log("Error");
            message_1.textContent = data.error;
            return;
        }

        console.log(data);
        message_1.textContent = data.location;
        message_2.textContent = data.forecast;
    })

})
    
})