let wheel = document.querySelector('.wheel');
let spinBtn = document.querySelector('.spinBtn');
let form = document.getElementById("userForm");
let container = document.querySelector('.container');
let value = Math.ceil(Math.random() * 3600);
let claimBtn = document.getElementById("claimBtn")
let spin_btn_counter = 0;
let popupForm = document.getElementById('popupForm');
let closeFormBtn = document.getElementById('closeFormBtn');
let popFormBtn = document.getElementById('pop-form-submit');

// Spin button click handler
spinBtn.onclick = function(){
    claimBtn.style.display = "block";
    value += Math.ceil(Math.random() * 3600);
    wheel.style.transform = "rotate(" + value + "deg)";
    spin_btn_counter = spin_btn_counter + 1;
    if (spin_btn_counter >= 4) {
        popupForm.style.display = 'flex'; // Display the form as a flexbox
        spin_btn_counter = 0;
    }
}

// Open the form when the button is clicked
claimBtn.onclick = function() {
    popupForm.style.display = 'flex'; // Display the form as a flexbox
    spin_btn_counter = 0;
}

popFormBtn.onclick = function(event) {
    event.preventDefault()
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzS3MMVJwPpCruPKSx_DEBJa8A09yajhKITnqJKIlRvCscPPnFl7PMqPevSdBUhNPt5/exec';

    fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`
    })
    .then(response => response.text())
    .then(result => {
        console.log('Success:', result);
        document.getElementById("rewardForm").reset(); // Reset the form fields
        popupForm.style.display = 'none';
        spin_btn_counter = 0;
        claimBtn.style.display = 'none';
    })
    .catch(error => console.error('Error:', error));

}