package org.algorithm.algorithm.exception;

import jakarta.mail.SendFailedException;
import org.algorithm.algorithm.util.Const;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestController
@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(GlobalException.class)
    public ResponseEntity<Object> handleGlobalException(GlobalException ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                ex.getMessage()
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @ExceptionHandler(UpdateException.class)
    public ResponseEntity<Object> handleUpdateException(UpdateException ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage()
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<Object> handleSQLException(SQLException ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.NO_CONTENT.value(),
                ex.getMessage()
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.NO_CONTENT);
    }

    @ExceptionHandler(NicknameException.class)
    public ResponseEntity<Object> handleNicknameException(NicknameException ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                Const.CustomErrorCode.NICKNAME_DUPLICATED.value(),
                ex.getMessage()
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(EmailException.class)
    public ResponseEntity<Object> handleEmailException(EmailException ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                Const.CustomErrorCode.EMAIL_DUPLICATED.value(),
                ex.getMessage()
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(SendFailedException.class)
    public ResponseEntity<Object> handleSendFailedException(SendFailedException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                Const.CustomErrorCode.NICKNAME_DUPLICATED.value(),
                "메일 전송 실패: " + ex.getMessage()
        );
        // 적절한 HTTP 상태 코드 선택, 예: HttpStatus.INTERNAL_SERVER_ERROR
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Object> handleNotFoundException(NotFoundException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.NO_CONTENT.value(),
                ex.getMessage()
        );

        // 적절한 HTTP 상태 코드 선택, 예: HttpStatus.INTERNAL_SERVER_ERROR
        return new ResponseEntity<>(errorResponse, HttpStatus.NO_CONTENT);
    }



    // ErrorResponse 클래스 정의
    private static class ErrorResponse {
        private int errorCode;
        private String message;

        public ErrorResponse(int errorCode, String message) {
            this.errorCode = errorCode;
            this.message = message;
        }

        // getter 및 setter 메소드...
    }
}