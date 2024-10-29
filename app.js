document.addEventListener('DOMContentLoaded', function() {
    const operationSelect = document.getElementById('operation');
    const formContainer = document.getElementById('formContainer');
    const resultContainer = document.getElementById('result');

    // Update the form fields based on the selected operation
    operationSelect.addEventListener('change', updateFormFields);

    function updateFormFields() {
        const selectedOperation = operationSelect.value;
        formContainer.innerHTML = ''; // Clear the form container

        if (selectedOperation === 'getDrinks') {
            formContainer.innerHTML = '<p>No additional input needed. Click "Execute Operation" to fetch all drinks.</p>';
        } else if (selectedOperation === 'deleteDrink') {
            formContainer.innerHTML = `
                <label for="drinkId">Drink ID:</label>
                <input type="number" id="drinkId" placeholder="Enter Drink ID" required>
            `;
        } else if (selectedOperation === 'updateDrink') {
            formContainer.innerHTML = `
                <label for="drinkId">Drink ID:</label>
                <input type="number" id="drinkId" placeholder="Enter Drink ID">
                <label for="name">Drink Name:</label>
                <input type="text" id="name" placeholder="Enter Drink Name" required>
                <label for="description">Drink Description:</label>
                <input type="text" id="description" placeholder="Enter Drink Description" required>
            `;
        } else if (selectedOperation === 'addDrink') {
            formContainer.innerHTML = `
                <label for="name">Drink Name:</label>
                <input type="text" id="name" placeholder="Enter Drink Name" required>
                <label for="description">Drink Description:</label>
                <input type="text" id="description" placeholder="Enter Drink Description" required>
            `;
        }
    }

    // Executes the selected operation
    window.executeOperation = function() {
        const selectedOperation = operationSelect.value;

        if (selectedOperation === 'getDrinks') {
            getDrinks();
        } else if (selectedOperation === 'addDrink') {
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            if (name && description) addDrink(name, description);
        } else if (selectedOperation === 'updateDrink') {
            const drinkId = document.getElementById('drinkId').value;
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            if (drinkId && name && description) updateDrink(drinkId, name, description);
        } else if (selectedOperation === 'deleteDrink') {
            const drinkId = document.getElementById('drinkId').value;
            if (drinkId) deleteDrink(drinkId);
        }
    };

    // Fetch all drinks
    function getDrinks() {
        fetch('http://127.0.0.1:5000/drinks')
            .then(response => {
                if (!response.ok) {  // Check for a non-200 response
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.drinks.length === 0) {
                    resultContainer.innerHTML = `<p>No drinks found.</p>`;
                } else {
                    resultContainer.innerHTML = '<ul>' + data.drinks.map(drink => `<li>${drink.name}: ${drink.description}</li>`).join('') + '</ul>';
                }
            })
            .catch(error => {
                console.error('Error fetching drinks:', error);
                resultContainer.innerHTML = `<p>Error fetching drinks: ${error.message}</p>`;
            });
    }

    // Add a new drink
    function addDrink() {
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
    
        fetch('http://127.0.0.1:5000/drinks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, description: description })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add drink');
            }
            return response.json();
        })
        .then(data => {
            console.log('Drink added with ID:', data.id);
            resultContainer.innerHTML = `<p>Drink added successfully with ID: ${data.id}</p>`;
        })
        .catch(error => {
            console.error('Error adding drink:', error);
            resultContainer.innerHTML = `<p>Error adding drink: ${error.message}</p>`;
        });
    }
    

    // Update an existing drink
    function updateDrink(drinkId, name, description) {    
        fetch(`http://127.0.0.1:5000/drinks/${drinkId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, description: description })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update drink');
            }
            return response.json();
        })
        .then(data => {
            console.log('Drink updated:', data);
            resultContainer.innerHTML = `<p>${data.message}</p>`;
        })
        .catch(error => {
            console.error('Error updating drink:', error);
            resultContainer.innerHTML = `<p>Error updating drink: ${error.message}</p>`;
        });
    }
    

    // Delete a drink by ID
    function deleteDrink(drinkId) {
        // const id = document.getElementById('drinkId').value;
    
        fetch(`http://127.0.0.1:5000/drinks/${drinkId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete drink');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);
            resultContainer.innerHTML = `<p>${data.message}</p>`;
        })
        .catch(error => {
            console.error('Error deleting drink:', error);
            resultContainer.innerHTML = `<p>Error deleting drink: ${error.message}</p>`;
        });
    }
        

    // Initialize the form fields for the default operation
    updateFormFields();
});
