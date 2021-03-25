var username = " Fulanito";

document.getElementById("username").innerHTML = username;

const transactions = document.querySelector("#enter_transaction")
const transactionsSavings = document.querySelector("enter_transaction_savings");
const transactionType = document.querySelector("#transaction_type") 
const transactionTypeSavings = document.querySelector("#transaction_type_savings");
const transAmount = document.querySelector("#transaction_amount");
const transAmountSavings = document.querySelector("#transaction_amount_savings");
const transDescription = document.querySelector("#transaction_description");
const table = document.querySelector("#trans_table");
const tableSavings =  document.querySelector("#trans_table_savings");
const desc = document.querySelector("#desc");
const savingsStartingBalance = document.querySelector("#savings_balance");
const balanceInfo = document.querySelector("#balance_info");


let savingsAccount = {
    // Savings account.
    name: "savings",
    balance: 0,
    allTransactions: [],
    deposit: function (amount) {
        this.balance += amount;
        this.allTransactions.push({
            type: "deposit",
            amount: amount,
        })
    },
    withdraw: function (amount) {
        this.balance -= amount;
        this.allTransactions.push({
            type: "withdrawal",
            amount: amount,
        })
    },   
    debit: function (amount, purpose) {
        this.balance -= amount;
        this.allTransactions.push({
            type: "debit",
            amount: amount,
            purpose: purpose,
        });
    },
    transfer: function (amount, transferAccount) {
        this.balance -= amount;
        transferAccount.balance += amount;
        transferAccount.allTransactions.push({
            type: "transfer",
            amount: amount,
            purpose: "transfer",
        }),
        this.allTransactions.push({
            type: "transfer",
            amount: amount,
            purpose: "transfer",
        })
    }
}

hideStartingInfo(); // Call this at start to hide info until we need it.

function hideStartingInfo() {
    // Hides savings/checking info and transaction info. 
    hideToggle(savings_info); 
    hideToggle(transactions);  
}

function printTable(tableId, account, transferMessage) {
    // Prints items to table as they are entered.
    let newRow = tableId.insertRow(-1);5
    let newCell1 = newRow.insertCell(0);
    let newCell2 = newRow.insertCell(1);
    let newCell3 = newRow.insertCell(2);
    let newCell4 = newRow.insertCell(3);
    newCell1.innerHTML = account.allTransactions[account.allTransactions.length - 1].type;
    newCell3.innerHTML = account.allTransactions[account.allTransactions.length - 1].amount;
    newCell4.innerHTML = account.balance;
    if (account.allTransactions[account.allTransactions.length - 1].purpose != undefined) {
        if(account.allTransactions[account.allTransactions.length - 1].purpose === "transfer") {
            newCell2.innerHTML = transferMessage;
        } else {
            newCell2.innerHTML = account.allTransactions[account.allTransactions.length - 1].purpose;
        }
    } else {
        newCell2.innerHTML = "";
    }
}

function mainBankSavings() {
    // Checks which transaction button is selected and executes correct function.
    if (transactionTypeSavings.value === "Deposit") {
        runDepositSavings();
        transAmountSavings.value = "";
    } else if (transactionTypeSavings.value === "Withdraw") {
        runWithdrawSavings();
        transAmountSavings.value = "";
    } else if (transactionTypeSavings.value === "Transfer") {
        runTransferSavings();
        transAmountSavings.value = "";
    }
}

function runDepositSavings() {
    // Savings deposit.
    let howMuch = Number.parseFloat(transAmountSavings.value);
    if (isNaN(howMuch)) {
        alert("Enter Amount");
        } else if (howMuch <= 0) {
            alert("Enter positive number.")
        } else {
            savingsAccount.deposit(howMuch);
            displayAccountBalances(); 
            printTable(tableSavings, savingsAccount);
        } 
}

function runWithdrawSavings() {
    // Savings withdrawal.
    let howMuch = Number.parseFloat(transAmountSavings.value);
    if (isNaN(howMuch)) {
        alert("Enter Amount");
        } else if (howMuch <= 0) {
            alert("Enter positive number.");
        } else {
            if (savingsAccount.balance >= howMuch) {
                savingsAccount.withdraw(howMuch);
                displayAccountBalances();
                printTable(tableSavings, savingsAccount);
            } else {
                alert("Not enough funds for transaction.")
            }
    }  
}

function runTransferSavings() {
    // Transfer Savings to Checking.
    let howMuch = Number.parseFloat(transAmountSavings.value);
    if (isNaN(howMuch)) {
        alert("Enter Amount");
        } else if (howMuch <= 0) {
            alert("Enter positive number.");
        } else {
            if (savingsAccount.balance >= howMuch) {
                savingsAccount.transfer(howMuch, checkingAccount);
                displayAccountBalances();
                printTable(tableSavings, savingsAccount, "Transfer to Checking");
                printTable(table, checkingAccount, "Transfer from Savings");
            } else {
                alert("Not enough funds for transaction.")
            }
    }  
}

function displayAccountBalances () {
    // Displays current balance of both accounts.
    document.querySelector("#current_savings_balance").textContent = "Current Balance: $" + savingsAccount.balance;
}

function getStartingBalance() {
    // Get starting balance of both accounts.
    let saveStart = parseFloat(savingsStartingBalance.value);
    let saveFixed = parseFloat(saveStart.toFixed(2));
    if (isNaN(saveStart)) {
        alert("Enter starting balance.")
    } else {
        savingsAccount.balance = saveFixed;
        clearBox("balance_info");
        displayAccountBalances();
        hideToggle(savings_info);
        hideToggle(transactions);
        hideToggle(balanceInfo);
    } 
}

function clearBox(elementID) {
    // Clears element html.
    document.getElementById(elementID).innerHTML = "";
}

function checkTransType() {
    // Checks transaction type. If debit it then shows description box. If not debit it hides box.
    if (transactionType.value === "Debit") {
        desc.style.display = "block";
        transDescription.value = "";
    } else if (transactionType.value === "Deposit") {
        desc.style.display = "none";
    } else if (transactionType.value === "Withdraw") {
        desc.style.display = "none";
    } else if (transactionType.value === "Transfer") {
        desc.style.display = "none";
    }
}

function hideToggle(itemToHide) {
    // Toggle to hide items.
    if (itemToHide.style.display === "none") {
        itemToHide.style.display = "block";
    } else {
        itemToHide.style.display = "none";
    }
}

function validate(event) {
    // Limits input boxes to .00 decimal places. Use this function oninput for input boxess in html.
    let x = this.value;
    this.value = (x.indexOf(".") >= 0) ? (x.substr(0, x.indexOf(".")) + x.substr(x.indexOf("."), 3)) : x;
}

savingsStartingBalance.addEventListener("input", validate);
transAmount.addEventListener("input", validate);
transAmountSavings.addEventListener("input", validate);
document.querySelector("#submit_balance").addEventListener("click", getStartingBalance);
document.querySelector("#submit_transaction_savings").addEventListener("click", () => {
    mainBankSavings();
});
transactionType.addEventListener("click", checkTransType);