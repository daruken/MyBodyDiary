package com.daruken.mybodydiary.domain.event

import com.daruken.mybodydiary.domain.event.Event
import org.springframework.data.jpa.repository.JpaRepository
import java.time.LocalDate
import java.util.*

interface EventRepository : JpaRepository<Event, Long> {
    fun findById(id: String): List<Event>
    fun findByIdAndDate(id: String, date: LocalDate): Optional<Event>
}