import { useState } from "react";

export const useForm = (initialFormState = {}) => {
    const [formState, setFormState] = useState(initialFormState);

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

    return {
        ...formState,
        formState,
        onInputChange,
        onFormReset
    };
};