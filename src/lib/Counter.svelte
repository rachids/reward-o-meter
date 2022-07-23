<script>
  let count = 0
  const increment = () => {
    count += 1

    let body = {
      envPrivate: import.meta.env.TEST,
      envPublic: import.meta.env.VITE_TEST,
      test: 'coucou'
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
            .then((response) => response.json())
            .then((json) => console.log(json));
  }
</script>

<button on:click={increment}>
  count is {count}
</button>
