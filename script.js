fetch('https://example.com/data.json')
  .then(response => response.json())
  .then(data => {
    const myArray = data.myData; // Assuming the JSON response contains an array called "myData"
    console.log(myArray); // Do something with the array here
  })
  .catch(error => console.error(error));



