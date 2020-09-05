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

  xhr.open("GET", `http://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function () {
    if (this.status === 200) {
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
      showError("Some Error Occured");
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
  }, 2000);
}
