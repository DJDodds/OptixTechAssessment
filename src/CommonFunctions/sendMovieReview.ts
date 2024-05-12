export const sendMovieReview = (message:string, setResponseMessageCallback: (message: string) => void) => {
    fetch("http://localhost:4321/submitReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({review: message}),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setResponseMessageCallback(json.message)
      })
      .catch((error) => {
        console.error("Failed to publish review", error);
      });
  }
