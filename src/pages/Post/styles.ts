import styled from "styled-components";
import { textLink, textM, titleL, titleM } from "../../styles/typography";

export const PostSection = styled.section``;

export const PostHeader = styled.header`
  background-color: ${(props) => props.theme["base-profile"]};
  width: 100%;
  padding: 3.2rem;
  border-radius: 10px;

  display: flex;
  flex-direction: column;

  margin-top: -8rem;
  position: relative;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;

    a {
      color: ${(props) => props.theme.blue};
      ${textLink}
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
    }
  }

  h1 {
    color: ${(props) => props.theme["base-title"]};
    ${titleL}
    margin-bottom: .8rem;
    width: 100%;
    max-width: 80%;
  }

  footer {
    display: flex;
    align-items: center;
    gap: 3.2rem;

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;

      span {
        ${textM}
        color: ${(props) => props.theme["base-span"]};
      }

      svg {
        font-size: 1.8rem;
        color: ${(props) => props.theme["base-label"]};
      }
    }
  }
`;

export const PostContent = styled.div`
  padding: 4rem 3.2rem;
  p {
    ${textM}
    &:not(:first-child) {
      margin-top: 1rem;
      color: ${(props) => props.theme["base-text"]};
    }
  }

  h1,
  h2,
  h3 {
    margin-top: 4rem;
    color: ${(props) => props.theme["blue"]};
  }

  h1 {
    ${titleL}
  }

  h2 {
    ${titleM}
  }

  h3 {
    ${titleL}
  }

  a {
    color: ${(props) => props.theme.blue};
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.6;
    text-decoration: underline;

    &:hover {
      color: ${(props) => props.theme.blue};
    }
  }

  img {
    border-radius: 8px;
    margin: 2rem 0 4rem 0;
  }
`;
