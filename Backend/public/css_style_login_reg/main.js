const container = document.querySelector('.container')
const btnSignIn = document.querySelector('.btnSign-in')
const btnSignUp = document.querySelector('.btnSign-up')

btnSignIn.addEventListener('click', () => {
    container.classList.add('active')
})

btnSignUp.addEventListener('click', () => {
    container.classList.remove('active')
})

//  input anh CCCD
window.addEventListener('DOMContentLoaded', function() {
    var fileInput = document.getElementById('img_identity');
    var placeholderText = document.getElementById('placeholder-text');

    fileInput.addEventListener('change', function() {
        if (fileInput.value) {
            placeholderText.textContent = fileInput.value.split('\\').pop();
        } else {
            placeholderText.textContent = "Ảnh CCCD";
        }
    });
});