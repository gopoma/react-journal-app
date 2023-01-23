import { useEffect, useMemo, useState } from "react";

export const useForm = (initialFormState = {}, formValidations = {}) => {
    const [formState, setFormState] = useState(initialFormState);
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(initialFormState);
    }, [initialFormState]);

    const isFormValid = useMemo(() => {
        for(const formValidationValue of Object.values(formValidation)) {
            if(formValidationValue !== null) return false;
        }

        return true;
    }, [formValidation]);

    const onInputChange = (event) => {
        const {name, value} = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    const onFormReset = () => {
        setFormState(initialFormState);
    };

    const createValidators = () => {
        const formCheckedValues = {};

        for(const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        setFormValidation(formCheckedValues);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onFormReset,
        ...formValidation,
        isFormValid
    };
};