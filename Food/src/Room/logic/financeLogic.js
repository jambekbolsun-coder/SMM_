export const handleSubmit = ({
  authMode,
  name,
  email,
  password,
  confirmPassword,
  setError,
}) => {
  setError(""); // сброс ошибки

  if (!email || !password) {
    setError("Email и пароль обязательны");
    return;
  }

  if (authMode === "register") {
    if (!name) {
      setError("Введите имя");
      return;
    }
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    // Здесь можно добавить логику регистрации (API запрос)
    console.log("Регистрация:", { name, email, password });
  } else {
    // Логика входа (API запрос)
    console.log("Вход:", { email, password });
  }
};