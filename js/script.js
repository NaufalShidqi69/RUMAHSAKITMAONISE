document.addEventListener("DOMContentLoaded", function () {

    const riskForm = document.getElementById("riskForm");
    const resultModalElement = document.getElementById("resultModal");
    const resultModal = new bootstrap.Modal(resultModalElement);

    const modalTitle = document.getElementById("modalTitle");
    const modalPercent = document.getElementById("modalPercent");
    const modalDescription = document.getElementById("modalDescription");
    const modalIcon = document.getElementById("modalIcon");
    const modalIconWrapper = modalIcon.parentElement;

    riskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const gender = document.querySelector('input[name="gender"]:checked').value;
        const smoker = document.querySelector('input[name="smoker"]:checked').value;
        const weight = parseFloat(document.getElementById("weight").value);
        const height = parseFloat(document.getElementById("height").value);
        const age = document.getElementById("age").value;
        const bp = document.getElementById("bp").value;

        if (!weight || !height || !age || !bp) {
            alert("Harap isi semua data dengan lengkap.");
            return;
        }

        let score = 0;

        if (age === "40-59") score += 2;
        if (age === "60+") score += 4;

        if (gender === "male") score += 1;

        if (smoker === "yes") score += 3;

        if (bp === "elevated") score += 2;
        if (bp === "high") score += 5;

        const bmi = weight / ((height / 100) ** 2);
        if (bmi >= 25 && bmi < 30) score += 2;
        if (bmi >= 30) score += 4;

        let riskLevel, riskPercent, riskDesc, riskColorClass, iconClass, iconName;

        if (score <= 3) {
            riskLevel = "Berisiko rendah";
            riskPercent = "7%";
            riskDesc = "Selamat, risiko jantung Anda termasuk dalam kategori <b>Rendah / Low Risk</b>. Jaga terus kondisi kesehatan jantung Anda dengan melakukan pemeriksaan jantung rutin.";
            riskColorClass = "risk-low";
            iconClass = "icon-low";
            iconName = "bi-shield-check";
        } else if (score <= 8) {
            riskLevel = "Berisiko sedang";
            riskPercent = "35%";
            riskDesc = "Risiko jantung Anda termasuk dalam kategori <b>Sedang / Medium Risk</b>. Kami merekomendasikan untuk berkonsultasi dengan dokter dan mengubah gaya hidup.";
            riskColorClass = "risk-medium";
            iconClass = "icon-medium";
            iconName = "bi-exclamation-triangle";
        } else {
            riskLevel = "Berisiko tinggi";
            riskPercent = "70%";
            riskDesc = "Risiko jantung Anda termasuk dalam kategori <b>Tinggi / High Risk</b>. Sangat disarankan untuk segera berkonsultasi dengan dokter spesialis jantung.";
            riskColorClass = "risk-high";
            iconClass = "icon-high";
            iconName = "bi-heartbreak";
        }

        modalTitle.classList.remove("risk-low", "risk-medium", "risk-high");
        modalIconWrapper.classList.remove("icon-low", "icon-medium", "icon-high");
        modalIcon.classList.remove("bi-shield-check", "bi-exclamation-triangle", "bi-heartbreak");

        modalTitle.textContent = riskLevel;
        modalTitle.classList.add(riskColorClass);
        
        modalPercent.textContent = riskPercent;
        
        modalDescription.innerHTML = riskDesc;
        
        modalIconWrapper.classList.add(iconClass);
        modalIcon.classList.add(iconName);

        resultModal.show();
    });
});