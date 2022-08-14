package com.daruken.mybodydiary.exception

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class MyExceptionHandler {

    @ExceptionHandler(value = [CommonException::class])
    fun commonExceptionHandler(e: CommonException) =
        ResponseEntity (
            CommonExceptionResponse(
                code = e.code,
                message = e.message?: "알 수 없는 오류",
            ),
            e.status,
        )
}