package org.algorithm.algorithm.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class NotFoundException extends RuntimeException{
    public NotFoundException(String m){ super(m);}

}
