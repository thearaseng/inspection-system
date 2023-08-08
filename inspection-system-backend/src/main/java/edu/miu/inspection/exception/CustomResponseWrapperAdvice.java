package edu.miu.inspection.exception;

import org.springframework.core.MethodParameter;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import java.util.List;

@RestControllerAdvice
public class CustomResponseWrapperAdvice implements ResponseBodyAdvice<Object> {

    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType, Class selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {

        response.getHeaders().setAccessControlAllowOrigin("*");
        response.getHeaders().setAccessControlAllowMethods(List.of(HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.OPTIONS));
        response.getHeaders().setAccessControlAllowHeaders(List.of("Content-Type", "Accept", "X-Requested-With", "remember-me", "Cache-Control", "access_token"));
//        response.getHeaders().setAccessControlAllowHeaders(List.of("*"));
        response.getHeaders().setAccessControlMaxAge(3600);
        response.getHeaders().setAccessControlAllowCredentials(true);

        // If the body is already a CustomResponse (e.g., in case of error responses), return it as is

        if (body instanceof CustomResponse || body instanceof DefaultOAuth2AccessToken) {
            return body;
        }

        // If the body is not a CustomResponse, wrap it in a CustomResponse with statusCode 200 and "SUCCESS" message
        CustomResponse<Object> customResponse = new CustomResponse<>();
        customResponse.setStatusCode(HttpStatus.OK.value());
        customResponse.setMessage("SUCCESS");
        customResponse.setData(body);

        // Catch ResponseStatusException and set the status code and message from it
        if (body instanceof ResponseStatusException ex) {
            customResponse.setStatusCode(ex.getStatus().value());
            customResponse.setMessage(ex.getReason());
        }

        return customResponse;
    }

    @ExceptionHandler(ResponseStatusException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<CustomResponse> handleResponseStatusException(ResponseStatusException ex) {
        CustomResponse<Object> customResponse = new CustomResponse<>();
        customResponse.setStatusCode(ex.getStatus().value());
        customResponse.setMessage(ex.getStatus().getReasonPhrase());
        return ResponseEntity.status(ex.getStatus()).body(customResponse);
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<CustomResponse> handleGenericError(Exception ex) {
        CustomResponse<Object> customResponse = new CustomResponse<>();
        customResponse.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        customResponse.setMessage("ERROR");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(customResponse);
    }

}

