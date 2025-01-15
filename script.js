function toggleDropdown() {
    document.querySelector('.dropdown-content').classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', () => {
    const dropdownContent = document.querySelector('.dropdown-content');
    const currentYear = new Date().getFullYear();
    const startYear = 2023;

    for (let year = startYear; year <= currentYear; year++) {
        const yearLink = document.createElement('a');
        yearLink.href = '#';
        yearLink.textContent = year;
        yearLink.addEventListener('click', (e) => {
            e.preventDefault();
            showMonths(year);
        });
        dropdownContent.appendChild(yearLink);
    }
});

function showMonths(year) {
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outobro', 'Novembro', 'Dezembro'
    ];
    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.innerHTML = ''; 

    months.forEach(month => {
        const monthLink = document.createElement('a');
        monthLink.href = '#';
        monthLink.textContent = `${month} ${year}`;
        dropdownContent.appendChild(monthLink);
    });
}