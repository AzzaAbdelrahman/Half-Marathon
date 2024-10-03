// Sample data for training plan (you can extend this as needed)
const trainingPlan = [
    { week: 1, monday: "Rest", tuesday: "5 km easy run", wednesday: "Cross-training", thursday: "6 km easy run", friday: "Rest", saturday: "10 km run", sunday: "3 km long run" },
    { week: 2, monday: "Rest", tuesday: "3.5 km easy run", wednesday: "Cross-training", thursday: "6 km easy run", friday: "Rest", saturday: "6 km run", sunday: "12 km long run" }
];

// Function to display the training plan
function displayTrainingPlan() {
    const planDiv = document.getElementById('plan');
    trainingPlan.forEach(week => {
        const weekDiv = document.createElement('div');
        weekDiv.innerHTML = `<h3>Week ${week.week}</h3>
            <p>Monday: ${week.monday}</p>
            <p>Tuesday: ${week.tuesday}</p>
            <p>Wednesday: ${week.wednesday}</p>
            <p>Thursday: ${week.thursday}</p>
            <p>Friday: ${week.friday}</p>
            <p>Saturday: ${week.saturday}</p>
            <p>Sunday: ${week.sunday}</p>`;
        planDiv.appendChild(weekDiv);
    });
}

// Function to display progress in the table
function displayProgress() {
    const progressTable = document.querySelector('#progress-table tbody');
    progressTable.innerHTML = ''; // Clear previous progress entries

    // Get progress from localStorage or set to an empty array if none
    let savedProgress = JSON.parse(localStorage.getItem('progress')) || [];

    // Check if there is any progress data
    if (savedProgress.length === 0) {
        const noDataMessage = document.createElement('tr');
        noDataMessage.innerHTML = '<td colspan="6">No progress data available. Add your first run!</td>';
        progressTable.appendChild(noDataMessage);
    } else {
        savedProgress.forEach((run, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${run.date}</td>
                             <td>${run.distance}</td>
                             <td>${run.time}</td>
                             <td>${run.pace}</td>
                             <td>${run.notes}</td>
                             <td><button class="delete-btn" data-index="${index}">Delete</button></td>`;
            progressTable.appendChild(row);
        });

        // Add event listeners for the delete buttons
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', deleteRun);
        });
    }
}

// Function to handle deleting a run
function deleteRun(e) {
    const index = e.target.getAttribute('data-index'); // Get the index of the run to delete
    let savedProgress = JSON.parse(localStorage.getItem('progress')) || [];
    
    // Remove the run from the array
    savedProgress.splice(index, 1);
    
    // Update localStorage with the modified array
    localStorage.setItem('progress', JSON.stringify(savedProgress));
    
    // Refresh the table display
    displayProgress();
}

// Function to handle form submission
document.getElementById('run-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get values from the form
    const date = document.getElementById('date').value;
    const distance = document.getElementById('distance').value;
    const time = document.getElementById('time').value;
    const pace = document.getElementById('pace').value;
    const notes = document.getElementById('notes').value;

    // Create a new run object
    const newRun = { date, distance, time, pace, notes };

    // Get progress from localStorage or initialize an empty array
    let savedProgress = JSON.parse(localStorage.getItem('progress')) || [];

    // Add the new run to the progress array
    savedProgress.push(newRun);

    // Save the updated progress to localStorage
    localStorage.setItem('progress', JSON.stringify(savedProgress));

    // Update the table with new run
    displayProgress();

    // Clear the form
    document.getElementById('run-form').reset();
});

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    displayTrainingPlan();   // Display the training plan when the page loads
    displayProgress();       // Display any saved progress when the page loads
});
