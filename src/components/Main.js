import styled from "styled-components";
import User from "../images/user.svg";
import PhotoIcon from "../images/photo-icon.svg";
import VideoIcon from "../images/video-icon.svg";
import EventIcon from "../images/event-icon.svg";
import ArticleIcon from "../images/article-icon.svg";
import Ellipses from "../images/ellipses.svg";
import Car from "../images/Car.jpg";
import { FcLike } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import { FcShare } from "react-icons/fc";
import { BiSend } from "react-icons/bi";
import PostModal from "./PostModal";
import { useState } from "react";

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div:first-child {
    display: flex;
    align-items: center;
    margin: 10px 0;

    & > img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      padding: 8px 16px 0 16px;
    }

    & > button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: 1px solid rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;
      flex-grow: 0.95;
      border-radius: 35px;
      padding-left: 16px;
      background-color: white;
      text-align: left;
      font-weight: 700;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-around;
    padding-bottom: 4px;

    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;

      & > img {
        width: 35px;
        height: 35px;
        margin: 0 4px 0 -2px;
      }

      & > span {
        color: #70b5f9;
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;

  & > .iconsContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    font-size: 12px;
    margin-right: 10px;
    width: 70%;
    padding-left: 100px;

    & > button {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #0a66c2;
      border-radius: 10px;
      color: #0a66c2;
      font-weight: 600;

      @media (min-width: 768px) {
        span {
          margin-left: 8px;
        }
      }
    }

    /* & > .icons > img {
      width: 10px;
      height: 10px;
    } */
  }
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;

  a {
    margin: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    color: black;

    img {
      width: 48px;
      height: 48px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;

      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n + 1) {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background: #f9fafb;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;

  li {
    margin-right: 5px;
    font-size: 12px;

    button {
      display: flex;
    }
  }

  li:nth-child(2) > a {
    text-decoration: none;
    color: black;
  }
`;

const Main = (props) => {
  const [showModal, setShowModal] = useState("close");

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;

      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  return (
    <Container>
      <ShareBox>
        Share
        <div>
          <img src={User} alt="" />
          <button onClick={handleClick}>Start a post</button>
        </div>
        <div>
          <button>
            <img src={PhotoIcon} alt="" />
            <span>Photo</span>
          </button>

          <button>
            <img src={VideoIcon} alt="" />
            <span>Video</span>
          </button>

          <button>
            <img src={EventIcon} alt="" />
            <span>Event</span>
          </button>

          <button>
            <img src={ArticleIcon} alt="" />
            <span>Write article</span>
          </button>
        </div>
      </ShareBox>
      <div>
        <Article>
          <SharedActor>
            <a href=" ">
              <img src={User} alt="" />
              <div>
                <span>Title</span>
                <span>Info</span>
                <span>Date</span>
              </div>
            </a>
            <button>
              <img src={Ellipses} alt="Ellipses" />
            </button>
          </SharedActor>
          <Description>Description</Description>
          <SharedImg>
            <a href=" ">
              <img src={Car} alt="" />
            </a>
          </SharedImg>
          <SocialCounts>
            <li>
              <button>
                <img
                  src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                  alt=""
                />

                <img
                  src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f"
                  alt=""
                />

                <span>75</span>
              </button>
            </li>

            <li>
              <a href=" ">2 comments</a>
            </li>
          </SocialCounts>
          <div className="iconsContainer">
            <button className="icons">
              <FcLike />
              <span>Like</span>
            </button>

            <button className="icons">
              <FcComments />
              <span>Comment</span>
            </button>

            <button className="icons">
              <FcShare />
              <span>Share</span>
            </button>

            <button className="icons">
              <BiSend />
              <span>Send</span>
            </button>
          </div>
        </Article>
      </div>
      <PostModal showModal={showModal} handleClick={handleClick} />
    </Container>
  );
};

export default Main;
