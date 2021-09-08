const sendData = (data) => {
  fetch("http://localhost:5000/write-todos", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(data),
  }).then(function (response) {
    return response.json();
  });
};

export default sendData;
