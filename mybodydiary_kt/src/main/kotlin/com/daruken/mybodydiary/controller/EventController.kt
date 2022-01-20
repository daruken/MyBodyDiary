package com.daruken.mybodydiary.controller

import com.daruken.mybodydiary.entity.Event
import com.daruken.mybodydiary.service.EventService
import com.daruken.mybodydiary.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

@RestController
class EventController (private val userService: UserService,
    private val eventService: EventService) {

    @GetMapping("/api/events")
    fun getEvents(@RequestParam id: String): ResponseEntity<*> {
        return ResponseEntity.ok(eventService.findEventById(id))
    }

    @GetMapping("/api/event")
    fun getEvent(@RequestParam id: String, @RequestParam date: String): ResponseEntity<*> {
        return ResponseEntity.ok(eventService.findEventByIdAndDate(id, LocalDate.parse(date)))
    }

    @PostMapping("/api/events")
    fun setEvent(@RequestBody event: Event): ResponseEntity<*> {
        val localEvent: Event = Event(id = event.id, date = event.date, title = event.title, content = event.content)

        return ResponseEntity.ok(eventService.createEvent(localEvent))
    }
}