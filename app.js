// Listen for submit
document.getElementById("joke-form").addEventListener("submit", function (e) {
  //Hide REsults
  document.getElementById("jokes").style.display = "none";
  //Show Loader
  document.getElementById("loader").style.display = "block";
  // Display Results
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

//Calculate Results
function calculateResults(e) {
  //Hide Loader

  //Get Input Field
  const number = document.getElementById("amount").value;

  //Ajax
  const xhr = new XMLHttpRequest();

  xhr.open("GET", `https://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function () {
    if (this.status === 200) {
      if (!(isNaN(number) || number < 1)) {
        document.getElementById("loader").style.display = "none";
        document.getElementById("jokes").style.display = "block";
        const res = JSON.parse(this.responseText).value;
        let output = "";
        res.forEach((re) => {
          output += `
          <li>${re.joke}</li>
          `;
        });
        document.getElementById("joke-list").innerHTML = output;
        console.log(this.responseText);
      } else {
        document.getElementById("loader").style.display = "none";
        showError("Enter a number greter than 0");
      }
    }
  };

  xhr.send();
}

function showError(error) {
  // Create a Div
  const errorDiv = document.createElement("div");
  // Add Class
  errorDiv.className = "alert alert-danger";
  // Add error Text
  errorDiv.innerText = error;
  // Get DOM Elements

  const heading = document.querySelector(".heading");

  //Insert Error above Heading
  heading.insertAdjacentElement("afterend", errorDiv);

  // Clear Error
  setTimeout(() => {
    errorDiv.remove();
  }, 3000);
}
