async function postData(data = {}) {
    // Default options are marked with *
    const response = await fetch('https://apis-khdmatic.herokuapp.com/services-requests', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    return response.json(); // parses JSON response into native JavaScript objects
}

function addRequest() {
    const form = document.getElementById('contactForm');
    const submitSuccessMessage = document.getElementById('submitSuccessMessage');
    const submitErrorMessage = document.getElementById('submitErrorMessage');
    const requiredError = document.getElementById('requiredError');
    const spinner = document.getElementById('spinner');

    const fullName = form.name.value;
    const email = form.email.value;
    const phoneNumber = form.phone.value;
    const details = form.message.value;
    const service = form.service.value;
    

    form.name.value = "";
    form.email.value = "";
    form.phone.value = "";
    form.message.value = "";
    form.service.value = "";

    spinner.classList = 'd-inline-block spinner-border text-light';
    submitErrorMessage.classList = 'd-none';
    submitSuccessMessage.classList = 'd-none';

    if (fullName !== '' && email !== '' && details !== '' && service !== 'اختر خدمة') {
        postData({
            fullName,
            email,
            phoneNumber,
            details,
            service
        }).then((data) => {
            submitErrorMessage.classList = 'd-none';
            submitSuccessMessage.classList = 'd-block';
            spinner.classList = 'd-none';
            requiredError.classList = 'd-none';
        }).catch(error => {
            submitErrorMessage.classList = 'd-block';
            submitSuccessMessage.classList = 'd-none';
            spinner.classList = 'd-none';
            requiredError.classList = 'd-none';
        });
    } else {
        requiredError.classList = 'd-block';
        submitErrorMessage.classList = 'd-none';
        submitSuccessMessage.classList = 'd-none';
        spinner.classList = 'd-none';
    }

}