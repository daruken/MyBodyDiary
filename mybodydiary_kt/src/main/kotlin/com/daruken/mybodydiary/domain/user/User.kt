package com.daruken.mybodydiary.domain.user

import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "user_info", schema = "mybodydiary", catalog = "mybodydiary")
class User () {
    @Id
    @Column(name = "id")
    var id: String = ""

    @Column(name = "email")
    var email: String = ""

    @Column(name = "password")
    var password: String = ""

    @CreationTimestamp
    @Column(name = "createdAt")
    var createdAt: LocalDateTime = LocalDateTime.now()

    @UpdateTimestamp
    @Column(name = "updateTimestamp")
    var updateTimestamp: LocalDateTime = LocalDateTime.now()

    constructor(id: String, email: String, password: String) : this() {
        this.id = id
        this.email = email
        this.password = password
    }
}