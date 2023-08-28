import React, { useState } from "react";

const MyComponent = () => {
  const [response, setResponse] = useState("");

  const handleClick = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/email/generate_date_nego",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // You can add a request body if needed
          body: JSON.stringify({ data: "some data" }),
        }
      );

      const data = await response.json();
      setResponse(JSON.stringify(data));
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Send POST Request</button>
      <div>Response: {response}</div>
    </div>
  );
};

export default MyComponent;
