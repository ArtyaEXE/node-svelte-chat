<script>
  let username = "";
  let password = "";
  let confirmPassword = "";

  async function handleSignup() {
    try {
      if (password !== confirmPassword) {
        console.log("Пароли не совпадают");
        return;
      }

      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        window.location = "/";
      }
    } catch (e) {
      console.log(e);
    }
  }
</script>

<div class="signup-block">
  <h1>Регистрация</h1>

  <form on:submit|preventDefault={handleSignup}>
    <input type="text" bind:value={username} placeholder="Имя пользователя" />
    <input type="password" bind:value={password} placeholder="Пароль" />
    <input
      type="password"
      bind:value={confirmPassword}
      placeholder="Подтвердите пароль"
    />
    <button
      type="submit"
      disabled={username === "" || password === "" || confirmPassword === ""}
      >Создать аккаунт</button
    >
  </form>
</div>

<style>
  h1 {
    margin-bottom: 20px;
  }

  .signup-block {
    margin-top: 50px;
    padding: 20px;
    background-color: #0e1621;
  }
</style>
