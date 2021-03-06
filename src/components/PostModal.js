import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";
import user from "../images/user.svg";
import PhotoIcon from "../images/photo-icon.svg";
import VideoIcon from "../images/video-icon.svg";
import Comment from "../images/comments.svg";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { postArticleAPI } from "../actions";
import { Timestamp } from "firebase/firestore";
import { useDispatch } from "react-redux";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    svg {
      pointer-events: none;
      color: rgba(0, 0, 0, 0.15);
      width: 100%;
      height: 100%;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AttacheAssets = styled.div`
  padding-right: 8px;
  display: flex;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  width: auto;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
  margin-right: 5px;
  img {
    width: 30px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.8)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgba(1, 1, 1, 0.2)" : "white")};
  &:hover {
    background: ${(props) =>
      props.disabled ? "rgba(0, 0, 0, 0.08)" : "#004182"};
    cursor: pointer;
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const userGoogle = useSelector((state) => state.user);
  // console.log(userGoogle.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`not an image, the files a ${typeof image}`);
      return;
    }

    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postArticle = (e) => {
    console.log("it is being called");
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      console.log("also here");
      return;
    }

    const payload = {
      image: shareImage,
      video: videoLink,
      user: userGoogle.user,
      description: editorText,
      timestamp: Timestamp.now(),
      token: userGoogle.user.accessToken,
    };

    dispatch(postArticleAPI(payload));
    reset(e);
  };

  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);
  };

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a Post</h2>
              <button onClick={(e) => reset(e)}>
                <GrFormClose className="svg" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {userGoogle.user && userGoogle.user.photoURL ? (
                  <img src={userGoogle.user.photoURL} alt="user" />
                ) : (
                  <img src={user} alt="user" />
                )}
                <span>{userGoogle.user.displayName}</span>
              </UserInfo>

              <Editor>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows=""
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file">Select an Image to share</label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} alt="" />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="please input a video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <SharedCreation>
              <AttacheAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src={PhotoIcon} alt="icon" />
                </AssetButton>

                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src={VideoIcon} alt="icon" />
                </AssetButton>
              </AttacheAssets>
              <ShareComment>
                <AssetButton>
                  <img src={Comment} alt="" />
                  Anyone
                </AssetButton>
              </ShareComment>

              <PostButton
                disabled={!editorText ? true : false}
                onClick={(e) => postArticle(e)}
              >
                Post
              </PostButton>
            </SharedCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

export default PostModal;
