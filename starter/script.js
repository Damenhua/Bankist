'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//displayMovement
const displayMovement = function (acc) {
  containerMovements.innerHTML = '';

  acc.movements.forEach(function (n, i) {
    const type = n > 0 ? 'deposit' : 'withdrawal';
    const html = `
       <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${n} €</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//calcuDisplayBalance
const calcuDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((total, curr) => (total += curr), 0);
  labelBalance.textContent = `${acc.balance} €`;
};

// calculateDisplaySum
const calculateDisplaySum = function (acc) {
  const dipositsum = acc.movements
    .filter(n => n > 0)
    .reduce((total, curr) => total + curr, 0);
  labelSumIn.textContent = `${dipositsum}€`;

  const withdrawalSum = acc.movements
    .filter(n => n < 0)
    .reduce((total, curr) => total + curr, 0);
  labelSumOut.textContent = `${withdrawalSum}€`;

  const interestSum = acc.movements
    .filter(n => n > 0)
    .map(n => (n * acc.interestRate) / 100)
    .filter(n => n >= 1)
    .reduce((total, curr) => total + curr, 0);
  labelSumInterest.textContent = `${interestSum}€`;
};

//creatUserName
const creatUserName = function (acc) {
  acc.forEach(function (name) {
    name.userName = name.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
creatUserName(accounts);

// updateUI
const updateUI = function (accounts) {
  displayMovement(accounts);
  calcuDisplayBalance(accounts);
  calculateDisplaySum(accounts);
};

// Log in Handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('LOG');
    // show UI and Welcome message
    labelWelcome.textContent = `Welcome back ${currentAccount.owner}`;
    containerApp.style.opacity = 100;
    // update balance, movements,summary
  }
  inputLoginPin.value = '';
  inputLoginUsername.value = '';
  inputLoginPin.blur();
  updateUI(currentAccount);
});

// TransferHandler
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(a => a.userName === inputTransferTo.value);
  console.log(amount, receiverAcc);
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.userName !== currentAccount.userName
  ) {
    // doing the transfer
    console.log('receiving...');
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI();
  }
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
const toUsdfunc = movements.map(i => i * eurToUsd);

/////////////////////////////////////////////////
