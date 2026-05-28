import { useState, useCallback } from "react";

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name] && validate) {
      const fieldErrors = validate({ ...values, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || "" }));
    }
  }, [values, touched, validate]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (validate) {
      const fieldErrors = validate(values);
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || "" }));
    }
  }, [values, validate]);

  const validateAll = useCallback(() => {
    if (!validate) return true;
    const allErrors = validate(values);
    setErrors(allErrors);
    setTouched(Object.keys(initialValues).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
    return Object.keys(allErrors).length === 0;
  }, [values, validate, initialValues]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return { values, errors, touched, handleChange, handleBlur, validateAll, reset, setValues };
};

export default useForm;
