package com.daruken.mybodydiary.web.dto

class NaverLoginDto () {
    var resultcode: Int = 0
    var message: String = ""
    var response: ResponseNaverLoginDto? = null
    var token: String = ""

    constructor(resultcode: Int, message: String, response: ResponseNaverLoginDto, token: String) : this() {
        this.resultcode = resultcode
        this.message = message
        this.response = response
        this.token = token
    }
}

class ResponseNaverLoginDto () {
    var id: String = ""
    var email: String = ""
    var name: String = ""

    constructor(id: String, email: String, name: String) : this() {
        this.id = id
        this.email = email
        this.name = name
    }

}