package hu.elte.alkfejl.restaurant.service.exceptionhandler;

import hu.elte.alkfejl.restaurant.entity.response.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;

@RestControllerAdvice
public class RequestExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleException(MethodArgumentNotValidException e) {
        String errorMessage = "";
        if (e.getBindingResult().hasGlobalErrors()) {
            errorMessage = e.getBindingResult().getGlobalErrors().get(0).getDefaultMessage();
        } else if (e.getBindingResult().hasFieldErrors()) {
            errorMessage = e.getBindingResult().getFieldErrors().get(0).getDefaultMessage();
        }

        return ResponseEntity.badRequest().body(new ErrorResponse(errorMessage));
    }
}
