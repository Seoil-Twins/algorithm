package org.algorithm.algorithm.exception;

import org.springframework.http.HttpStatus;

public class SQLException extends RuntimeException {
    public SQLException(HttpStatus status, String message) {
        super(message);
    }
}
