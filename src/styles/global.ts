import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: 0;

        box-shadow: 0 0 0 2px ${(props) => props.theme.blue};
    }

    html {
        font-size: 62.5%;
    }

    body {
        background-color: ${(props) => props.theme["base-background"]};
        color: ${(props) => props.theme["base-text"]};
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: 'Nunito', sans-serif;
        font-size: 1.6rem;
        font-weight: 400;
    }

    img {
        display: block;
        max-width: 100%;
    }

    a {
        text-decoration: none;
        display: block;
    }

    ul {
        list-style: none;
    }

    button {
        display: block;
        outline: 0;
        border: none;
    }

    @media(max-width: 768px) {
        html {
            font-size: 58%;
        }
    }
`;
