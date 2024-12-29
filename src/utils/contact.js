export const contact = (emailService) => {
    const form = document.querySelector(".contact__form");
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const textInputs = document.querySelectorAll('.contact__input');
    const selectInput = document.querySelector('.contact__select');
    let isFormValid = true;

    emailService.init({
        publicKey: publicKey,
    });
    const isTextInputValid = (input) => {
        return input.checkValidity();
    }

    const isSelectInputValid = (input) => {
        if(input.selectedIndex !== 0){
            selectInput.classList.remove("contact__input-invalid");
            return true;
        }
        selectInput.classList.add("contact__input-invalid");
        return false;
    }

    const validateForm = () => {
        textInputs.forEach((input) => {
            const textInputValidity = isTextInputValid(input);
            if(!textInputValidity){
                isFormValid = false;
            }
        });
        const selectInputValidity = isSelectInputValid(selectInput);
        if(!selectInputValidity){
            isFormValid = false;
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        isFormValid = true;
        validateForm();

        if(!isFormValid){
            return;
        }

        const templateParams = {
            user_name: textInputs[0].value,
            service: selectInput.options[selectInput.selectedIndex].text,
            car_model: textInputs[1].value,
            user_phone: textInputs[2].value,
        };
        emailService.send('service_h7g703f', 'template_q5pyhfg', templateParams).then(() => {   
            form.reset();
            alert("Success!");
        }, (error) => {
            console.log(error);
            alert("Failed to send email, check console for more info");
        });
    }

    const handleInvalidInput = (e) => {
        e.target.classList.add("contact__input-invalid");
    }

    const handleTextInputChange = (e) => {
        if (isFormValid){
            return
        }

        const isInputValid = isTextInputValid(e.target);

        if (isInputValid){
            e.target.classList.remove("contact__input-invalid");
        }
    }

    const handleSelectInputChange = (e) => {
        if (isFormValid){
            return;
        }
        isSelectInputValid(e.target);
    }

    form.addEventListener('submit', handleFormSubmit);
    textInputs.forEach((input) => input.addEventListener("invalid", handleInvalidInput));
    textInputs.forEach((input) => input.addEventListener("input", handleTextInputChange))
    selectInput.addEventListener("change", handleSelectInputChange);
}