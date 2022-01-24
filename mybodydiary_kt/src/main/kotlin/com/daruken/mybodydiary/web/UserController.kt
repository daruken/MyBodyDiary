package com.daruken.mybodydiary.web

import com.daruken.mybodydiary.domain.user.User
import com.daruken.mybodydiary.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/user")
class UserController(
    private val userService: UserService,
    private val passwordEncoder: PasswordEncoder
) {

    @GetMapping("/")
    fun getUsers(): ResponseEntity<*> {
        return ResponseEntity.ok(userService.findAllUser())
    }

    @PostMapping("/signup")
    fun createUser(@RequestBody user: User): ResponseEntity<*> {
        val localUser: User = User(user.id, user.email, passwordEncoder.encode(user.password))

        return ResponseEntity.ok(userService.createUser(localUser))
    }

    @GetMapping("/check-login")
    fun checkLogin(@RequestParam(required = false, defaultValue = "") id: String): ResponseEntity<*> {
        return ResponseEntity.ok().body(true)
    }

    @PostMapping("/login")
    fun login(@RequestBody user: User): ResponseEntity<*> {
        val dbUser: Optional<User> = userService.findUser(user.id)
        if (dbUser.isEmpty) {
            return ResponseEntity.ok().body(false)
        }

        if (!passwordEncoder.matches(user.password, dbUser.get().password)) {
            return ResponseEntity.ok().body(false)
        }

        return ResponseEntity.ok(userService.login(user))
    }
}