import styled from "styled-components";
import Img from "../../assets/ProfilePage.png";

const ProfilePhoto = styled.div`
  background-image: url(${Img});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width:390px;
  height:100%;
  position:fixed;
  top:0;
  left:0;
`;

const Profile = () => {
  return <ProfilePhoto/>;
};

export default Profile;
