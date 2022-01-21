package com.daruken.mybodydiary.domain.user;

import com.daruken.mybodydiary.domain.user.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, String> {

}