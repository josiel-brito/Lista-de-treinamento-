const peopleData = {
    1: {
        name: "João Silva",
        trainings: [
            { name: "Treinamento A", validity: "2024-01-15" },
            { name: "Treinamento B", validity: "2024-02-20" },
            { name: "Treinamento C", validity: "2024-03-10" }
        ]
    },
    2: {
        name: "Maria Oliveira",
        trainings: [
            { name: "Treinamento D", validity: "2024-04-25" },
            { name: "Treinamento E", validity: "2024-05-30" },
            { name: "Treinamento F", validity: "2024-06-15" }
        ]
    },
    3: {
        name: "Carlos Pereira",
        trainings: [
            { name: "Treinamento G", validity: "2024-07-10" },
            { name: "Treinamento H", validity: "2024-08-20" },
            { name: "Treinamento I", validity: "2024-09-25" }
        ]
    }
};

const adminPassword = "1234"; // Senha de teste

function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

function showTraining() {
    const trainingNumber = document.getElementById('training-number').value;
    const trainingContainer = document.getElementById('training-container');
    const inputContainer = document.getElementById('input-container');
    const trainingList = document.getElementById('training-list');
    const personName = document.getElementById('person-name');

    if (peopleData[trainingNumber]) {
        const person = peopleData[trainingNumber];
        trainingList.innerHTML = '';
        personName.textContent = `${person.name}`;

        person.trainings.forEach(training => {
            const validityDate = new Date(training.validity);
            const currentDate = new Date();
            const timeDiff = validityDate - currentDate;
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            let rowClass = '';

            if (daysDiff > 180) {
                rowClass = 'white';
            } else if (daysDiff > 0) {
                rowClass = 'yellow';
            } else {
                rowClass = 'red';
            }

            const row = `<tr class="${rowClass}">
                <td>${training.name}</td>
                <td>${formatDate(training.validity)}</td>
            </tr>`;
            trainingList.insertAdjacentHTML('beforeend', row);
        });

        inputContainer.style.display = 'none';
        trainingContainer.style.display = 'block';
    } else {
        alert('Número de treinamento inválido');
    }
}

function goBack() {
    const trainingContainer = document.getElementById('training-container');
    const inputContainer = document.getElementById('input-container');
    const trainingNumberInput = document.getElementById('training-number');

    trainingNumberInput.value = '';
    trainingContainer.style.display = 'none';
    inputContainer.style.display = 'block';
}

function showFilterInput() {
    const filterInput = document.getElementById('training-filter');
    filterInput.style.display = 'inline';
    filterInput.focus();
}

function filterTrainings() {
    const filter = document.getElementById('training-filter').value.toLowerCase();
    const rows = document.querySelectorAll('#training-list tr');

    rows.forEach(row => {
        const trainingName = row.cells[0].textContent.toLowerCase();
        if (trainingName.includes(filter)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function showUpdateField() {
    document.getElementById('update-field-container').style.display = 'block';
}

function cancelUpdate() {
    document.getElementById('update-field-container').style.display = 'none';
}

function updateDate() {
    const newDate = document.getElementById('new-date').value;
    const password = document.getElementById('password').value;

    if (password === adminPassword) {
        document.getElementById('update-date').textContent = newDate;
        cancelUpdate();
    } else {
        alert('Senha incorreta!');
    }
}
