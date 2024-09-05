for (let i = 0; i < 1000; i++) {
  fetch("http://localhost:3000/post")
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
