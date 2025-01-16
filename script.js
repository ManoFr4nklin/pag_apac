function toggleDropdown() {
    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', () => {
    const dropdownContent = document.querySelector('.dropdown-content');
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonthIndex = today.getMonth(); // Índice do mês atual (0-11)
    const startYear = 2023;

    // Adiciona os anos no dropdown
    for (let year = startYear; year <= currentYear; year++) {
        const yearDiv = document.createElement('div');
        yearDiv.textContent = `Ano: ${year}`;
        yearDiv.style.fontWeight = 'bold';
        yearDiv.style.cursor = 'pointer';

        yearDiv.addEventListener('click', () => {
            showMonths(year);
        });

        dropdownContent.appendChild(yearDiv);
    }

    function showMonths(year) {
        // Limpa o dropdown antes de exibir os meses
        dropdownContent.innerHTML = '';

        // Botão para voltar aos anos
        const backButton = document.createElement('div');
        backButton.textContent = '← Voltar aos Anos';
        backButton.style.fontWeight = 'bold';
        backButton.style.cursor = 'pointer';
        backButton.style.marginBottom = '10px';

        backButton.addEventListener('click', () => {
            dropdownContent.innerHTML = '';
            for (let year = startYear; year <= currentYear; year++) {
                const yearDiv = document.createElement('div');
                yearDiv.textContent = `Ano: ${year}`;
                yearDiv.style.fontWeight = 'bold';
                yearDiv.style.cursor = 'pointer';

                yearDiv.addEventListener('click', () => {
                    showMonths(year);
                });

                dropdownContent.appendChild(yearDiv);
            }
        });

        dropdownContent.appendChild(backButton);

        // Determina os meses a exibir
        const monthsToShow = year === currentYear ? months.slice(0, currentMonthIndex + 1) : months;

        monthsToShow.forEach((month) => {
            const monthLink = document.createElement('a');
            monthLink.href = '#';
            monthLink.textContent = `${month} ${year}`;
            dropdownContent.appendChild(monthLink);
        });
    }
});
