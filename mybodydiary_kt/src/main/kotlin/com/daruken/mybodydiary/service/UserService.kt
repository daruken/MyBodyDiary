package com.daruken.mybodydiary.service

import com.daruken.mybodydiary.entity.User
import com.daruken.mybodydiary.repository.UserRepository
import com.daruken.mybodydiary.response.ResponseUser
import com.daruken.mybodydiary.security.JwtTokenProvider
import org.springframework.http.HttpStatus
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
        val responseUser = ResponseUser(token)

        return ResponseEntity.ok().body(responseUser)
    }
}
