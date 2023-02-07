function get() {
  let req = new XMLHttpRequest();

  // XMLHttpRequest.open(method: string, url: string)
  req.open("GET", "http://localhost:3000/legos");

  req.onreadystatechange = () => {
    if (req.readyState === 4) {
      // JSON.parse() - convert to array.
      let arr = JSON.parse(req.response);

      let result = "";
      result += `<th>ID</th>
                 <th>Year</th>
                 <th>Amount Of Bricks</th>
                 <th>Price</th>
                 <th>Edit</th>
                 <th>Delete</th>`;


      for (const lego of arr) {
        result += `<tr>
                <td>${lego.id}</td>
                <td>${lego.year}</td>
                <td>${lego.amountOfBricks}</td>
                <td>${lego.price}</td>
                <td><button onclick="put('${lego.id}'), seccessUpdate()" class="btn btn-outline-primary text-center">Edit price</button></td>
                <td><button onclick="deletelego('${lego.id}'), seccessDelete()" class="btn btn-outline-danger text-center">Delete</button></td>
                </tr>`;
      }
      document.getElementById("legos").innerHTML = result;
    }
  };
  req.send();
}

function post() {
  // get all the values from the user
  let legoId = document.getElementById("legoId").value;
  let legoYear = document.getElementById("legoYear").value;
  let legorBricks = document.getElementById("legoBricks").value;
  let legoPrice = document.getElementById("legoPrice").value;

  let req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/legos/add");

  req.onreadystatechange = () => {
    // when we finish adding new lego - call the lego's list again
    if (req.readyState === 4) get();
  };

  req.setRequestHeader("Content-type", "application/json");

  req.send(
    JSON.stringify({
      id: legoId,
      year: legoYear,
      amountOfBricks: legorBricks,
      price: legoPrice,
    })
  );
}

function put(legoId) {
  let input = prompt("Enter a new price");

  let req = new XMLHttpRequest(); // Allows getting URL data.
  req.open("PUT", `http://localhost:3000/legos/update/${legoId}`);

  req.onreadystatechange = () => {
    if (req.readyState === 4) get();
  };

  req.setRequestHeader("Content-type", "application/json");

  req.send(JSON.stringify({ newprice: input }));
}

function deletelego(legoId) {
  let req = new XMLHttpRequest();
  req.open("DELETE", `http://localhost:3000/legos/delete/${legoId}`);

  req.onreadystatechange = () => {
    if (req.readyState === 4) get();
  };
  req.send();
}
