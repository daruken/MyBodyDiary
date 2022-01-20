package com.daruken.mybodydiary.entity

import com.fasterxml.jackson.annotation.JsonProperty
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.time.LocalDate
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "event_diary", schema = "mybodydiary", catalog = "mybodydiary")
class Event () {
    @Id
    @Column(name = "event_id")
    var eventId: Long = 0

    @Column(name = "id")
    @JsonProperty("id")
    var id: String = ""

    @Column(name = "date")
    @JsonProperty("date")
    var date: LocalDate = LocalDate.now()

    @Column(name = "title")
    @JsonProperty("title")
    var title: String = ""

    @Column(name = "content")
    @JsonProperty("content")
    var content: String = ""

    @CreationTimestamp
    @Column(name = "createdAt")
    var createdAt: LocalDateTime = LocalDateTime.now()

    @UpdateTimestamp
    @Column(name = "updateTimestamp")
    var updateTimestamp: LocalDateTime = LocalDateTime.now()

    constructor(id: String, date: LocalDate, title: String, content: String) : this() {
        this.id = id
        this.date = date
        this.title = title
        this.content = content
    }
}