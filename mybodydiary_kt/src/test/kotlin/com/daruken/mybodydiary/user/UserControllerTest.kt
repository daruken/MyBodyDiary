package com.daruken.mybodydiary.user

import com.daruken.mybodydiary.domain.user.User
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultHandlers
import org.springframework.test.web.servlet.result.MockMvcResultMatchers


@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @Test
    fun getUsers() {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users"))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andDo(MockMvcResultHandlers.print())
    }

    @Test
    fun createUser() {
        val userRequest = User().apply {
            this.id = "test"
            this.password = "1234"
            this.email = "test@naver.com"
        }

        val objectMapper = ObjectMapper()
        objectMapper.registerModule(JavaTimeModule())
        val json = objectMapper.writeValueAsString(userRequest)

        mockMvc.perform(MockMvcRequestBuilders.post("/api/users").content(json)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andDo(MockMvcResultHandlers.print())
    }
}