export const Register = (props) => {
  const { user, setUser, password, setPassword } = props;

  const handleRegister = async () => {
    const payload = {
      name: user,
      password: password,
    };
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = res.json();
      if (!res.ok) {
        alert(data.message || "ログイン失敗");
        return;
      }
      alert(data.message || "ログイン成功");

      setPassword("");
      setUser("");
    } catch {
      alert("通信エラー");
    }
  };

  return (
    <div className="card">
      <h3>新規登録</h3>
      <div>
        <label>ユーザー名：</label>
        <input
          type="text"
          placeholder="ユーザー名"
          name="name"
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <div>
        <label>パスワード：</label>
        <input
          type="password"
          placeholder="パスワード"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>登録</button>
    </div>
  );
};
