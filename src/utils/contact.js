export const contact = (emailService) => {
    const form = document.querySelector(".contact__form");
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
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
        const submitBtn = document.querySelector(".contact__submit");
        const submitBtnText = document.querySelector(".contact__submit > span");
        const submitBtnSvg = document.querySelector(".contact__submit > img");

        isFormValid = true;
        validateForm();

        if(!isFormValid){
            return;
        }

        submitBtn.disabled = true;
        submitBtnText.textContent = "...שולח";
        submitBtnSvg.style.display = "none";
        submitBtn.classList.add("contact__submit-loading");

        const templateParams = {
            user_name: textInputs[0].value,
            service: selectInput.options[selectInput.selectedIndex].text,
            car_model: textInputs[1].value,
            user_phone: textInputs[2].value,
        };

        emailService.send(serviceId, templateId, templateParams).then(() => {   
            form.reset();
            submitBtn.classList.remove("contact__submit-loading");
            submitBtn.classList.add("contact__submit-success");
            submitBtnText.textContent = "!נשלח";
            setTimeout(() => {
                submitBtn.classList.remove("contact__submit-success");
                submitBtn.disabled = false;
                submitBtnText.textContent = "שלח פרטים";
                submitBtnSvg.style.display = "block";
            }, 3000);
        }, (error) => {
            submitBtn.classList.remove("contact__submit-loading");
            submitBtn.classList.add("contact__submit-error");
            submitBtnText.textContent = "שגיאה";
            setTimeout(() => {
                submitBtn.classList.remove("contact__submit-error");
                submitBtn.disabled = false;
                submitBtnText.textContent = "שלח פרטים";
                submitBtnSvg.style.display = "block";
            }, 3000);
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