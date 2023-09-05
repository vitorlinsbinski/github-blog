import styled from "styled-components";
import {
  textLink,
  textM,
  textS,
  titleL,
  titleM,
  titleS,
} from "../../styles/typography";

export const ProfileSection = styled.section`
  padding-bottom: 4rem;
`;

export const ProfileCard = styled.div`
  background-color: ${(props) => props.theme["base-profile"]};
  width: 100%;
  padding: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-top: -8rem;
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

      header {
        h1 {
          ${titleL}
          color: ${(props) => props.theme["base-title"]};
        }
      }

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

export const SearchPostForm = styled.form`
  margin-top: 7.2rem;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.2rem;

    label {
      color: ${(props) => props.theme["base-subtitle"]};
      ${titleS}
    }

    span {
      color: ${(props) => props.theme["base-span"]};
      ${textS}
    }
  }
`;

export const SearchInputForm = styled.input`
  width: 100%;
  height: 5rem;
  padding: 1.6rem;
  border-radius: 6px;
  background-color: ${(props) => props.theme["base-input"]};
  border: none;
  ${textM}
  color: ${(props) => props.theme["base-text"]};
  border: 1px solid ${(props) => props.theme["base-border"]};

  &::placeholder {
    color: ${(props) => props.theme["base-label"]};
  }
`;

export const Posts = styled.div`
  margin-top: 4.8rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3.2rem;
`;

export const PostCard = styled.div`
  background-color: ${(props) => props.theme["base-post"]};
  padding: 3.2rem;
  width: 100%;
  max-width: 41.6rem;
  border-radius: 10px;

  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 2rem;

    h3 {
      color: ${(props) => props.theme["base-title"]};
      ${titleM}
      width: 100%;
      max-width: 28.3rem;
    }

    span {
      color: ${(props) => props.theme["base-span"]};
      ${textS}
    }
  }

  p {
    color: ${(props) => props.theme["base-text"]};
    ${textM}
  }
`;
