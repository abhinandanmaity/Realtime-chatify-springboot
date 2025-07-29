package com.RealtimeChatify.App.Payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
//@NoArgsConstructor
//@AllArgsConstructor
public class ApiResponse {

    private String message;
    private boolean success;

    // Constructor with parameters
    public ApiResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    // Default constructor (required for frameworks like Jackson)
    public ApiResponse() {
    }

    // Getters and setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
