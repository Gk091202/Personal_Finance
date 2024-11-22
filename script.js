// script.js

document.addEventListener("DOMContentLoaded", () => {
    const transactions = [];
    const transactionForm = document.getElementById("transaction-form");
    const transactionList = document.getElementById("transactions");
    const totalIncome = document.getElementById("total-income");
    const totalExpense = document.getElementById("total-expense");
    const balance = document.getElementById("balance");
    const chartCanvas = document.getElementById("spending-chart");
    let chart;

    // Update Summary
    function updateSummary() {
        const income = transactions
            .filter(t => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions
            .filter(t => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);

        totalIncome.textContent = `$${income}`;
        totalExpense.textContent = `$${expense}`;
        balance.textContent = `$${income - expense}`;
    }

    // Render Transactions
    function renderTransactions() {
        transactionList.innerHTML = "";
        transactions.forEach((t, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
        <span>${t.description} - $${t.amount}</span>
        <span class="${t.type}">${t.type.toUpperCase()}</span>
        <button onclick="removeTransaction(${index})">❌</button>
      `;
            transactionList.appendChild(li);
        });
    }

    // Remove Transaction
    window.removeTransaction = index => {
        transactions.splice(index, 1);
        renderTransactions();
        updateSummary();
        updateChart();
    };

    // Update Chart
    function updateChart() {
        const income = transactions
            .filter(t => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions
            .filter(t => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);

        if (chart) chart.destroy();

        chart = new Chart(chartCanvas, {
            type: "pie",
            data: {
                labels: ["Income", "Expenses"],
                datasets: [
                    {
                        data: [income, expense],
                        backgroundColor: ["#4CAF50", "#f44336"]
                    }
                ]
            }
        });
    }

    // Add Transaction
    transactionForm.addEventListener("submit", e => {
        e.preventDefault();
        const description = document.getElementById("description").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const type = document.getElementById("type").value;

        transactions.push({ description, amount, type });
        renderTransactions();
        updateSummary();
        updateChart();

        transactionForm.reset();
    });
});
