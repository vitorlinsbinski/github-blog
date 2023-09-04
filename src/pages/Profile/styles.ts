import styled from "styled-components";
import { textLink, textM } from "../../styles/typography";

export const ProfileSection = styled.section``;

export const ProfileCard = styled.div`
  background-color: ${(props) => props.theme["base-profile"]};
  width: 100%;
  padding: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-top: -8.3rem;
  z-index: 1;
  position: relative;

  & > img {
    width: 14.8rem;
    height: 14.8rem;
    border-radius: 8px;
  }

  .about {
    margin-left: 3.2rem;

    header {
      display: flex;
      align-content: center;
      justify-content: space-between;

      margin-bottom: 0.8rem;

      a {
        color: ${(props) => props.theme.blue};
        transition: color 0.2s;
        span {
          ${textLink}
          margin-right: .8rem;
        }

        svg {
          width: 1.2rem;
          height: 1.2rem;
        }

        &:hover {
          color: ${(props) => props.theme["base-text"]};
        }
      }
    }

    p {
      ${textM}
      color: ${(props) => props.theme["base-text"]};
      margin-bottom: 2.4rem;
    }

    footer {
      display: flex;
      align-items: center;
      gap: 2.4rem;

      & > div {
        svg {
          margin-right: 0.8rem;
          color: ${(props) => props.theme["base-label"]};
          width: 1.8rem;
          height: 1.8rem;
        }

        span {
          color: ${(props) => props.theme["base-subtitle"]};
          ${textM}
        }
      }
    }
  }
`;

export const SearchPostForm = styled.form``;

export const Posts = styled.div``;

export const PostCard = styled.div``;
