package com.daruken.mybodydiary.controller

import com.daruken.mybodydiary.entity.User
import com.daruken.mybodydiary.repository.UserRepository
import com.daruken.mybodydiary.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
class UserController (
    private val userService: UserService,
    private val passwordEncoder: PasswordEncoder
        ){

    @GetMapping("/api/users")
    fun getUsers(): ResponseEntity<*> {
        return ResponseEntity.ok(userService.findAllUser())
    }

    @PostMapping("/api/users")
    fun createUser(@RequestBody user: User): ResponseEntity<*> {
        val localUser: User = User(user.id, user.email, passwordEncoder.encode(user.password))

        return ResponseEntity.ok(userService.createUser(localUser))
    }

    @GetMapping("/api/login")
    fun checkLogin(@RequestParam id: String): ResponseEntity<*> {
        return ResponseEntity.ok().body(true)
    }

    @PostMapping("/api/login")
    fun login(@RequestBody user: User): ResponseEntity<*> {
        val dbUser: Optional<User> = userService.findUser(user.id)
        if(dbUser.isEmpty) {
            return ResponseEntity.ok().body(false)
        }

        if(!passwordEncoder.matches(user.password, dbUser.get().password)) {
            return ResponseEntity.ok().body(false)
        }

        return ResponseEntity.ok(userService.login(user))
    }
}