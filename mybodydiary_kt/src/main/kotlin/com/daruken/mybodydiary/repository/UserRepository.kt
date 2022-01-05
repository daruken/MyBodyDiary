package com.daruken.mybodydiary.repository;

import com.daruken.mybodydiary.entity.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, String> {

}