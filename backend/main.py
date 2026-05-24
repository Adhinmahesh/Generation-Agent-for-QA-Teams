import os
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerationRequest(BaseModel):
    source_code: str
    class_name: str

@app.post("/api/generate")
def run_agent(request: GenerationRequest):

    
    mock_java_code = f"""package com.example.demo;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class {request.class_name}Test {{

    @Test
    void testPositiveId() {{
        {request.class_name} service = new {request.class_name}();
        String result = service.getUserById(5);
        assertEquals("User5", result);
    }}

    @Test
    void testNegativeIdThrowsException() {{
        {request.class_name} service = new {request.class_name}();
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {{
            service.getUserById(-1);
        }});
        assertEquals("ID must be positive", exception.getMessage());
    }}
}}"""

    return {
        "status": "success",
        "attempts": 2,
        "final_code": mock_java_code,
        "logs": f"Agent analyzed {request.class_name}.java.\nDetected edge cases: Negative ID, Zero ID.\nGenerated Mockito/JUnit5 tests.\nCompilation passed."
    }
