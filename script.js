// Global Variables
let selectedYear = null;
let selectedMonth = null;
const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// Populate Year Dropdown
document.addEventListener("DOMContentLoaded", () => {
    const yearDropdown = document.getElementById("year-dropdown");
    const currentYear = new Date().getFullYear();
    const startYear = 2023;

    for (let year = startYear; year <= currentYear; year++) {
        const yearItem = document.createElement("div");
        yearItem.textContent = year;
        yearItem.classList.add("dropdown-item");
        yearItem.addEventListener("click", () => selectYear(year));
        yearDropdown.appendChild(yearItem);
    }
});

// Toggle Dropdown
function toggleDropdown(type) {
    const dropdown = document.getElementById(`${type}-dropdown`);
    dropdown.classList.toggle("show");
}

// Select Year
function selectYear(year) {
    selectedYear = year;
    document.querySelector(".dropdown-bar").textContent = `Ano Selecionado: ${year}`;
    document.getElementById("month-container").style.display = "block";
    document.getElementById("year-dropdown").classList.remove("show");

    // Populate Months
    const monthDropdown = document.getElementById("month-dropdown");
    monthDropdown.innerHTML = ""; // Clear previous months
    months.forEach((month, index) => {
        const now = new Date();
        if (year < now.getFullYear() || index <= now.getMonth()) {
            const monthItem = document.createElement("div");
            monthItem.textContent = month;
            monthItem.classList.add("dropdown-item");
            monthItem.addEventListener("click", () => selectMonth(month));
            monthDropdown.appendChild(monthItem);
        }
    });
}

// Select Month
function selectMonth(month) {
    selectedMonth = month;
    document.querySelector("#month-container .dropdown-bar").textContent = `Mês Selecionado: ${month}`;
    document.getElementById("month-dropdown").classList.remove("show");
    document.getElementById("form-section").style.display = "block";
}

// Generate PDF
document.getElementById("generate-pdf").addEventListener("click", () => {
    const imageFiles = document.getElementById("image-input").files;

    if (imageFiles.length === 0) {
        alert("Por favor, adicione pelo menos uma imagem para gerar o PDF.");
        return;
    }

    const pdf = new jspdf.jsPDF();
    const title = `${selectedMonth} ${selectedYear}`;

    // Add Cover Page
    pdf.setFontSize(20);
    pdf.text(`Relatório de ${title}`, 20, 20);

    // Add Images
    Array.from(imageFiles).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgData = e.target.result;
            if (index > 0) pdf.addPage();
            pdf.text("Anomalias", 10, 10);
            pdf.addImage(imgData, "JPEG", 10, 20, 180, 150);
            if (index === imageFiles.length - 1) {
                pdf.save(`${title}.pdf`);
            }
        };
        reader.readAsDataURL(file);
    });
});
