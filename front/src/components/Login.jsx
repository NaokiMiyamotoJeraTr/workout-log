import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = (props) => {
  let navigate = useNavigate();
  const { user, setUser, password, setPassword } = props;

  const handleLogin = async () => {
    if (!user || !password) {
      alert("ユーザー名とパスワードを入力してください");
      return;
    }

    const payload = {
      name: user,
      password: password,
    };
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "ログイン失敗");
        return;
      } else {
        setUser("");
        setPassword("");
        alert(data.message || "ログイン成功");
        // TOPページへ飛ばす機能を追加（navigate使用）
        navigate("/home");
      }
    } catch {
      alert("通信エラー");
    }
  };

  return (
    <div className="card">
      <h3>ログイン</h3>
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
      <button onClick={handleLogin}>ログイン</button>
      <Link to="/register">新規登録</Link>
    </div>
  );
};
