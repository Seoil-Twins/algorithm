package com.college.algorithm.validation;


import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.PropertyAccessorFactory;

import java.util.Optional;

public class AtLeastOneOfValidator implements ConstraintValidator<ValidAtLeastOnField, Object> {
    private String[] fields;
    private int max;
    private String message;

    @Override
    public void initialize(ValidAtLeastOnField annotation) {
        this.fields = annotation.fields();
        this.max = annotation.max();
        this.message = annotation.message();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        BeanWrapper wrapper = PropertyAccessorFactory.forBeanPropertyAccess(value);

        int matches = countNumberOfMatches(wrapper);

        if (matches > this.max) {
            setValidationErrorMessage(context, "파라미터 최대 허용 개수를 초과하였습니다.");
            return false;
        } else if (matches == 0) {
            setValidationErrorMessage(context, message);
            return false;
        }

        return true;
    }

    private int countNumberOfMatches(BeanWrapper wrapper) {
        int matches = 0;
        for (String field : this.fields) {
            Object value = wrapper.getPropertyValue(field);
            boolean isPresent = detectOptionalValue(value);

            if (value != null && isPresent) {
                matches++;
            }
        }
        return matches;
    }

    @SuppressWarnings("rawtypes")
    private boolean detectOptionalValue(Object value) {
        if (value instanceof Optional) {
            return ((Optional) value).isPresent();
        }
        return true;
    }

    // 기존 에러 메세지를 무시하고, 새로운 메세지를 생성
    private void setValidationErrorMessage(ConstraintValidatorContext context, String template) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(template).addConstraintViolation();
    }
}
