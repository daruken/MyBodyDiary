package com.daruken.mybodydiary.service

import com.daruken.mybodydiary.domain.event.Event
import com.daruken.mybodydiary.domain.event.EventRepository
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class EventService (private val eventRepository: EventRepository) {
    fun findEventById(id: String): ResponseEntity<*> {
        val events = eventRepository.findById(id)

        return ResponseEntity.ok(events)
    }

    fun findEventByIdAndDate(id: String, date: LocalDate): ResponseEntity<*> {
        val event = eventRepository.findByIdAndDate(id, date)

        return ResponseEntity.ok(event)
    }

    fun createEvent(event: Event): ResponseEntity<*> {
        eventRepository.save(event)

        return ResponseEntity.ok().body(true)
    }
}