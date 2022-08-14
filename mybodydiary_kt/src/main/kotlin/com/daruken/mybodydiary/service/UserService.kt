package com.daruken.mybodydiary.service

import com.daruken.mybodydiary.domain.user.User
import com.daruken.mybodydiary.domain.user.UserRepository
import com.daruken.mybodydiary.web.dto.ResponseUserDto
import com.daruken.mybodydiary.security.JwtTokenProvider
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService(private val userRepository: UserRepository, private val jwtTokenProvider: JwtTokenProvider) {

    fun findAllUser(): ResponseEntity<*> {
        val users =  userRepository.findAll()

        return ResponseEntity.ok(users)
    }

    fun findUser(id: String): Optional<User> {
        return userRepository.findById(id)
    }

    fun existsUser(id: String): Boolean {
        return userRepository.existsById(id)
    }

    fun createUser(user: User): ResponseEntity<*> {
        userRepository.save(user)

        return ResponseEntity.ok().body(true)
    }

    fun login(user: User): ResponseEntity<*> {
        val token: String = jwtTokenProvider.createToken(user.id)
        val responseUserDto = ResponseUserDto(token)

        return ResponseEntity.ok().body(responseUserDto)
    }
}
