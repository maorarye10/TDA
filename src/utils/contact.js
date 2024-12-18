export const contact = (emailService) => {
    const form = document.querySelector(".contact__form");
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const textInputs = document.querySelectorAll('.contact__input');
    const selectInput = document.querySelector('.contact__select');

    emailService.init({
        publicKey: publicKey,
    });

    const validateForm = () => {
        textInputs.forEach((input) => {
            console.log(input.checkValidity());
        });

    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        validateForm();
        /* const templateParams = {
            user_name: textInputs[0].value,
            service: selectInput.options[selectInput.selectedIndex].text,
            car_model: textInputs[1].value,
            user_phone: textInputs[2].value,
        };
        emailService.send('service_h7g703f', 'template_q5pyhfg', templateParams).then(() => {
            alert("Success!");
        }, (error) => {
            console.log(error);
            alert("Failed to send email, check console for more info");
        }); */
    }

    form.addEventListener('submit', handleFormSubmit);
}