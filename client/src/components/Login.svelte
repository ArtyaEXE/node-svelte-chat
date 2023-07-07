<script>
  let username = "";
  let password = "";

  async function handleLogin() {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        const user = data.user;
        const client = data.client;

        const tokens = user.token;
        tokens.forEach((token) => {
          localStorage.setItem(
            "token",
            JSON.stringify(token).replace(/^"(.*)"$/, "$1")
          );
        });
        window.location = "/";
      } else {
        console.error("Ошибка при входе", response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  }
</script>

<div class="login-block">
  <h1>Вход</h1>

  <form on:submit|preventDefault={handleLogin}>
    <input type="text" bind:value={username} placeholder="Имя пользователя" />
    <input type="password" bind:value={password} placeholder="Пароль" />
    <button type="submit" disabled={username === "" || password === ""}
      >Войти</button
    >
  </form>
</div>

<style>
  h1 {
    margin-bottom: 20px;
  }

  .login-block {
    margin-top: 50px;
    padding: 20px;
    background-color: #0e1621;
  }
</style>
