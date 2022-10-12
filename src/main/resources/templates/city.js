
    function displayFormCreate() {
    document.getElementById("form1").reset()
    document.getElementById("form1").hidden = false;
}

    function getCity(city) {
    return `<tr>
            <td >${city.name}</td>
            <td >${city.country}</td>
            <td >${city.area}</td>
            <td >${city.population}</td>
            <td >${city.gdp}</td>
            <td >${city.description}</td>
                <td><a href="${city.id}" onclick="showFormUpdate(this)">Edit</a></td>
                <td><a href="${city.id}" onclick="deleteCity(this)">Delete</a></td>
                </tr>`
}


    function successHandler() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city",
        success: function (data) {
            console.log(data)
            let content =
                `<tr>
                        <td>Name</td>
                        <td>Country</td>
                        <td>Area</td>
                        <td>Population</td>
                        <td>GDP</td>
                        <td>Description</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>`;
            if (data == null) {
                document.getElementById("cityList").innerHTML = content;
            } else {
                for (let i = 0; i < data.length; i++) {
                    content += getCity(data[i]);
                }
                document.getElementById("cityList").innerHTML = content;
            }
        }
    })
}
    successHandler();



    function addNewCity(){
    let name = $('#name').val();
    let country = $('#country').val();
    let area = $('#area').val();
    let population = $('#population').val();
    let gdp = $('#gdp').val();
    let description = $('#description').val();
    let newCity = {
    name: name,
    country: country,
    area: area,
    population: population,
    gdp: gdp,
    description: description,
}
    $.ajax({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
},
    type: "POST",
    data: JSON.stringify(newCity),
    //tên API
    url: "http://localhost:8080/city",
    //xử lý khi thành công
    success: function () {
    successHandler();
}
});
    event.preventDefault();
}


    function deleteCity(element){
    let id = element.getAttribute("href");
    $.ajax({
    type: "DELETE",
    url: `http://localhost:8080/city/`+id,
    //xử lý khi thành công
    success: function () {
    successHandler();
},
});
    event.preventDefault();
}

    function showFormUpdate(element){
    let id = element.getAttribute("href");
    console.log(id);
    $.ajax({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
},
    type: "GET",
    url: `http://localhost:8080/city/${id}`,
    success: function (data) {
    console.log(data);
    console.log(id);
    $('#id').attr('value',`${data.id}`)
    $('#name').attr('value',`${data.name}`)
    $('#country').attr('value',`${data.country}`)
    $('#area').attr('value',`${data.area}`)
    $('#population').attr('value',`${data.population}`)
    $('#gdp').attr('value',`${data.gdp}`)
    $('#description').attr('value',`${data.description}`)
}
})
    event.preventDefault();
}

    function updateCity() {
    let id = $('#id').val();
    let name = $('#name').val();
    let country = $('#country').val();
    let area = $('#area').val();
    let population = $('#population').val();
    let gdp = $('#gdp').val();
    let description = $('#description').val();
    let newCity = {
    id: id,
    name: name,
    country: country,
    area: area,
    population: population,
    gdp: gdp,
    description: description,
}
    $.ajax({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
},
    type: "PUT",
    data: JSON.stringify(newCity),
    //tên API
    url: "http://localhost:8080/city/" + id,
    //xử lý khi thành công
    success: function () {
    successHandler();
}
});
    event.preventDefault();
}

