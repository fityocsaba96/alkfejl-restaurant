package hu.elte.alkfejl.restaurant.service.exceptionhandler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RequestExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleException(MethodArgumentNotValidException e) {
        String errorMessage = "";
        if (e.getBindingResult().hasGlobalErrors()) {
            errorMessage = e.getBindingResult().getGlobalErrors().get(0).getDefaultMessage();
        } else if (e.getBindingResult().hasFieldErrors()) {
            errorMessage = e.getBindingResult().getFieldErrors().get(0).getDefaultMessage();
        }

        return ResponseEntity.badRequest().body(errorMessage);
    }
}
