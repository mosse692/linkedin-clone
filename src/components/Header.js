import styled from "styled-components";
import HomeLogo from "../images/home-logo.svg";
import SearchLogo from "../images/search-icon.svg";
import NavHome from "../images/nav-home.svg";
import NavJobs from "../images/nav-jobs.svg";
import NavMessaging from "../images/nav-messaging.svg";
import NavNetwork from "../images/nav-network.svg";
import NavNotifications from "../images/nav-notifications.svg";
import NavWork from "../images/nav-work.svg";
import User from "../images/user.svg";
import DownIcon from "../images/down-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutAPI } from "../actions";
import { useEffect } from "react";
// import store from "../store";

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  padding: 0 24px;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1300px;
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #0a66c2;
      vertical-align: text-top;
    }

    input:focus {
      outline: none;
      border: 2px solid #0a66c2;
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;

  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid #fff;
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }

    @media (max-width: 768px) {
      min-width: 70px;
    }
  }

  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 45px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 167ms;
  text-align: center;
  display: none;
  & > a {
    color: black;
  }
`;

const UserContainer = styled(NavList)`
  a > svg {
    width: 24px;
    border-radius: 50%;
  }

  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  span {
    display: flex;
    align-items: center;
  }

  &:hover {
    ${SignOut} {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
`;

const Work = styled(UserContainer)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

const Header = (props) => {
  const { user } = useSelector((state) => state.user);

  console.log(user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  localStorage.setItem("user", JSON.stringify(user));
  let user1 = JSON.parse(localStorage.getItem("user"));

  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(false));
    user1 = JSON.parse(localStorage.getItem("user"));
    dispatch(signOutAPI());
  };

  useEffect(() => {
    if (!user1) {
      navigate("/");
    }
  }, [user1, navigate]);

  return (
    <Container>
      <Content>
        <Logo>
          <a href="/home">
            <img src={HomeLogo} alt="Logo" />
          </a>
        </Logo>
        <Search>
          <div>
            <input type="text" placeholder="Search" className="input" />
          </div>
          <SearchIcon>
            <img src={SearchLogo} alt="search logo" />
          </SearchIcon>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className="active">
              <a href="/home">
                <img src={NavHome} alt="navImg" />
                <span>Home</span>
              </a>
            </NavList>

            <NavList>
              <a href="/home">
                <img src={NavNetwork} alt="navImg" />
                <span>My Network</span>
              </a>
            </NavList>

            <NavList>
              <a href="/home">
                <img src={NavJobs} alt="navImg" />
                <span>Jobs</span>
              </a>
            </NavList>

            <NavList>
              <a href="/home">
                <img src={NavMessaging} alt="navImg" />
                <span>Messaging</span>
              </a>
            </NavList>

            <NavList>
              <a href="/home">
                <img src={NavNotifications} alt="navImg" />
                <span>Notifications</span>
              </a>
            </NavList>

            <UserContainer>
              <a href=" ">
                {user && user.photoURL ? (
                  <img src={user.photoURL} alt="User logo" />
                ) : (
                  <img src={User} alt="User logo" />
                )}

                <span>
                  Me
                  <img src={DownIcon} alt="User logo" />
                </span>
              </a>

              <SignOut>
                <a href=" " onClick={handleSignOut}>
                  Sign Out
                </a>
              </SignOut>
            </UserContainer>

            <Work>
              <a href=" ">
                <img src={NavWork} alt="navImg" />
                <span>
                  Work
                  <img src={DownIcon} alt="Down icon" />
                </span>
              </a>
            </Work>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};

export default Header;