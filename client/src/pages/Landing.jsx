import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
const Landing = () => {
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: "test@gmail.com",
      password: "secret123",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("Take a test drive");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            這個sideProject主要是當兵時看了React官方文件之後決定製作的sideProject
          </p>
          <p>功能包含了</p>
          <p>
            前端：
            <p>
              react hook、styled
              component、recharts、localStorage、cookie、基本的form Validation
            </p>
          </p>
          <p>
            後端：
            <p>password hash、multer、CRUD API、cloudinary</p>
          </p>
          <p>
            這個sideProject
            算是本人真正意義上的第一個全手工全端作品，中間也發生了挺多荒謬跟崩潰的瞬間，也有挺多想要接著這個sideProject延伸的功能跟優化。
          </p>
          <p>歡迎面試官聊聊！</p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn ">
            Login / Demo User
          </Link>
          <button
            type="button"
            className="btn explore-link"
            onClick={loginDemoUser}
          >
            <b> no Account Just see see</b>
          </button>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
