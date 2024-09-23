showdata()

function showdata() {
    const stdtable = document.getElementById("tblStd");

    let body = `
                <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Guardian's Name</th>
                    <th>Guardian's Contact</th>
                </tr>`;

    fetch("http://localhost:8080")
        .then((res) => res.json())
        .then((data) => {
            data.forEach(element => {
                body += `<tr>
                    <td>GSI0${element.stuID}</td>
                    <td>${element.name}</td>
                    <td>${element.stuAge}</td>
                    <td>${element.stuContact}</td>
                    <td>${element.guaAddress}</td>
                    <td>${element.guaName}</td>
                    <td>${element.guaContact}</td>
                </tr>`;
            });
            body += `</table>`;  // Close the table tag
            stdtable.innerHTML = body;
        })
        .catch((error) => console.error(error));
}

function clearfields() {
    document.getElementById("stdName").value = "";
    document.getElementById("stdAge").value = "";
    document.getElementById("stdContact").value = "";
    document.getElementById("stdAdd").value = "";
    document.getElementById("guaName").value = "";
    document.getElementById("guaContact").value = "";
}

function addStd() {
    if (!stdName.value.length == 0 && !stdAge.value.length == 0 && !stdContact.value.length == 0 && !stdAdd.value.length == 0 && !guaName.value.length == 0 && !guaContact.value.length == 0) {

        let name = document.getElementById("stdName").value;
        let age = document.getElementById("stdAge").value;
        let contact = document.getElementById("stdContact").value;
        let address = document.getElementById("stdAdd").value;
        let gname = document.getElementById("guaName").value;
        let gcontact = document.getElementById("guaContact").value;

        clearfields();

        console.log(name + " " + age);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "stuAge": age,
            "stuContact": contact,
            "name": name,
            "guaName": gname,
            "guaAddress": address,
            "guaContact": gcontact
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/add", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

        alert("Student added Succesfully");
        showdata()

    } else {
        alert("Please fill all the fields");
    }
}

function search() {
    // Get the search value
    let searchName = document.getElementById("schBar").value;
    console.log(searchName);

    // Define the request options
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    // Fetch data from the specified URL with the search term
    fetch(`http://localhost:8080/find-by-name/${encodeURIComponent(searchName)}`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                console.log('Network response was not ok');
            }
            return response.json(); // assuming your API returns JSON data
        })
        .then((data) => {
            const errorLabel = document.getElementById("searchError");

            if (data.length > 0) {
                const student = data[0]; // Access the first element of the array
                console.log(student);
                document.getElementById("stdNamesch").disabled = false;
                document.getElementById("stdAgesch").disabled = false;
                document.getElementById("stdContactsch").disabled = false;
                document.getElementById("stdAddsch").disabled = false;
                document.getElementById("guaNamesch").disabled = false;
                document.getElementById("guaContactsch").disabled = false;

                // Populate the form fields with the fetched data
                document.getElementById("stdIDsch").value = student.stuID;
                document.getElementById("stdNamesch").value = student.name;
                document.getElementById("stdAgesch").value = student.stuAge;
                document.getElementById("stdContactsch").value = student.stuContact;
                document.getElementById("stdAddsch").value = student.guaAddress;
                document.getElementById("guaNamesch").value = student.guaName;
                document.getElementById("guaContactsch").value = student.guaContact;

                // Hide the error message
                errorLabel.style.display = "none";
            } else {
                // Display "Invalid Search" if no results found
                errorLabel.style.display = "block";
                clearFormFields();
            }
        })
        .catch((error) => {
            console.error(error);
            document.getElementById("titlesearch").innerHTML = `Error: ${error}`;
            document.getElementById("searchError").style.display = "block";
            clearFormFields();
        });
}

// Function to clear form fields when no results are found or an error occurs
function clearFormFields() {
    document.getElementById("stdIDsch").value = '';
    document.getElementById("stdNamesch").value = '';
    document.getElementById("stdAgesch").value = '';
    document.getElementById("stdContactsch").value = '';
    document.getElementById("stdAddsch").value = '';
    document.getElementById("guaNamesch").value = '';
    document.getElementById("guaContactsch").value = '';
}

function updateStd() {
    if (!stdAddsch.value.length == 0 && !stdNamesch.value.length == 0 && !stdAgesch.value.length == 0 && !stdContactsch.value.length == 0 && !guaContactsch.value.length == 0 && !guaNamesch.value.length == 0) {
        let id = document.getElementById("stdIDsch").value;
        let name = document.getElementById("stdNamesch").value;
        let age = document.getElementById("stdAgesch").value;
        let contact = document.getElementById("stdContactsch").value;
        let address = document.getElementById("stdAddsch").value;
        let gname = document.getElementById("guaNamesch").value;
        let gcontact = document.getElementById("guaContactsch").value;

        clearfields();

        console.log(name + " " + age);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "stuID": id,
            "stuAge": age,
            "stuContact": contact,
            "name": name,
            "guaName": gname,
            "guaAddress": address,
            "guaContact": gcontact
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/add", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

        alert("Student Details updated Successfully");
        showdata();
        clearFormFields();

    } else {
        alert("Please fill all the fields");
    }
}

function deleteStd(){

    let id = document.getElementById("stdIDsch").value;
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
      };

    fetch(`http://localhost:8080/delete/${encodeURIComponent(id)}`, requestOptions)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Failed to delete the student');
        }
        return response.text();
    })
    .then((result) => {
        console.log(result);
        alert("Student deleted successfully");
        clearFormFields() // Clear the input fields after deletion
        showdata();    // Refresh the data display if necessary
    })
    .catch((error) => {
        console.error(error);
        alert("Error deleting student. Please try again.");
    });

}



