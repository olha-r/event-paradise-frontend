const form = document.querySelector("form");

handleValidation(form);

function handleValidation(form) {
    for (const element of form.elements) {
        const elHelpText = document.getElementById(`${element.id}Help`);
        const type = element.type;
        if (type != "submit") {
            invalid(element, elHelpText)
            onChange(element, elHelpText);
        }
    }
}

//Change behaviour on ':invalid' fields
function invalid(element, elHelpText) {
    element.addEventListener("invalid", (event) => {
        event.preventDefault();
        element.classList.add("is-invalid");
        elHelpText.classList.add("text-danger");
        const firstInvalidField = form.querySelector('.is-invalid');
        const tooltip = tooltipInitialize(element);
        firstInvalidField.focus();
        tooltip.enable();
    });
}

function tooltipInitialize(element) {
    const opt = {
        placement: "top",
        trigger: "focus hover",
        title: "Ce champ est obligatoire."
    };
    return tooltip = bootstrap.Tooltip.getOrCreateInstance(element, opt);
}

// Add message to tooltip "error validation"
function tooltipMessage(element) {
    let message = "Ce champ est obligatoire.";
    const tooltip = bootstrap.Tooltip.getInstance(element);
    if (element.name == "rate" && element.validity.rangeUnderflow) {
        message = 'Doit être positif';
    } else if (element.name == "date" && element.validity.rangeUnderflow) {
        message = 'Doit être égale ou supérieure à aujourd’hui';
    } else {
        message;
    }
    tooltip.setContent({ '.tooltip-inner': message });
}

//Change fields behaviour when we input the values in fields
function onChange(element, elHelpText) {
    element.addEventListener("change", (event) => {
        event.preventDefault();
        const tooltip = bootstrap.Tooltip.getInstance(element);
        if (element.validity.valid) {
            if (tooltip) {
                tooltip.dispose();
            }
            element.classList.remove("is-invalid");
            element.classList.add("is-valid");
            elHelpText.classList.remove("text-danger");
            elHelpText.classList.add("text-success");
        } else {
            element.classList.add("is-invalid");
            elHelpText.classList.add("text-danger");
            const tooltip = tooltipInitialize(element);
            tooltipMessage(element);
            tooltip.enable();
        }
    });

}