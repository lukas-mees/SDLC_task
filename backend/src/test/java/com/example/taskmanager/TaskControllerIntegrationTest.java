package com.example.taskmanager;

import com.example.taskmanager.model.Status;
import com.example.taskmanager.model.Task;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDate;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TaskControllerIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    private String baseUrl() {
        return "http://localhost:" + port + "/api/tasks";
    }

    @Test
    void testCrudFlow() {
        // Create
        Task t = new Task();
        t.setTitle("Integration Test Task");
        t.setDescription("Created by test");
        t.setStatus(Status.TODO);
        t.setDueDate(LocalDate.now().plusDays(3));

        ResponseEntity<Task> createRes = restTemplate.postForEntity(baseUrl(), t, Task.class);
        assertEquals(HttpStatus.CREATED, createRes.getStatusCode());
        Task created = createRes.getBody();
        assertNotNull(created);
        assertNotNull(created.getId());

        Long id = created.getId();

        // Read all
        ResponseEntity<Task[]> allRes = restTemplate.getForEntity(baseUrl(), Task[].class);
        assertEquals(HttpStatus.OK, allRes.getStatusCode());
        assertTrue(Arrays.stream(allRes.getBody()).anyMatch(x -> x.getId().equals(id)));

        // Read by id
        ResponseEntity<Task> getRes = restTemplate.getForEntity(baseUrl() + "/" + id, Task.class);
        assertEquals(HttpStatus.OK, getRes.getStatusCode());
        assertEquals("Integration Test Task", getRes.getBody().getTitle());

        // Update
        Task toUpdate = getRes.getBody();
        toUpdate.setTitle("Updated Title");
        restTemplate.put(baseUrl() + "/" + id, toUpdate);

        ResponseEntity<Task> updatedRes = restTemplate.getForEntity(baseUrl() + "/" + id, Task.class);
        assertEquals(HttpStatus.OK, updatedRes.getStatusCode());
        assertEquals("Updated Title", updatedRes.getBody().getTitle());

        // Delete
        restTemplate.delete(baseUrl() + "/" + id);

        // After delete, the task should no longer appear in the list
        ResponseEntity<Task[]> afterDeleteAll = restTemplate.getForEntity(baseUrl(), Task[].class);
        assertEquals(HttpStatus.OK, afterDeleteAll.getStatusCode());
        assertFalse(Arrays.stream(afterDeleteAll.getBody()).anyMatch(x -> x.getId().equals(id)));
    }
}
