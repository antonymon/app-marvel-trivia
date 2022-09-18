import { createGlobalStyle } from "styled-components";

export const Styles = createGlobalStyle`

    @font-face {
        font-family: "Marvel Regular";
        src: url("/fonts/Marvel-Regular.ttf") format("truetype");
        font-style: normal;
    }

    @font-face {
        font-family: "Marvel Bold";
        src: url("/fonts/Marvel-Bold.ttf") format("truetype");
        font-style: normal;
    }


    body,
    html,
    a {
        font-family: 'Marvel Regular', sans-serif;
    }


    body {
        margin:0;
        padding:0;
        border: 0;
        outline: 0;
        background: #2A2B38;
        overflow-x: hidden;
    }

    a:hover {
        color: #dfdee5;
    }

    input,
    textarea {
        border-radius: 4px;
        border: 0;
        background: rgb(241, 242, 243);
        transition: all 0.3s ease-in-out;  
        outline: none;
        width: 100%;  
        padding: 1rem 1.25rem;

        :focus-within {
            background: none;
            box-shadow: #dfdee5 0px 0px 0px 1px;
        }
    }

    h1,
    h2 {
         font-family: 'Marvel Bold', serif !important;
         color: #dfdee5;
    }
    h3,
    h4,
    h5,
    h6 {
        font-family: 'Marvel Bold', serif;
        color: #dfdee5;
        font-size: 56px;
        line-height: 1.18;

        @media only screen and (max-width: 890px) {
          font-size: 47px;
        }
      
        @media only screen and (max-width: 414px) {
          font-size: 32px;
        }
    }

    p {
        color: #dfdee5;
        font-size: 21px;        
        line-height: 1.41;
        font-family: 'Marvel Regular', sans-serif;
    }

    h1 {
        font-weight: 600;
    }

    ol {
        font-family: 'Marvel Regular', sans-serif;
    }

    li {
        font-family: 'Marvel Regular', sans-serif;
    }

    span {
        font-family: 'Marvel Regular', sans-serif !important;
    }

    a {
        text-decoration: none;
        outline: none;
        color: #dfdee5;

        :hover {
            color: #dfdee5;
        }
    }
    
    *:focus {
        outline: none;
    }

    .about-block-image svg {
        text-align: center;
    }

    .ant-drawer-body {
        display: flex;
        flex-direction: column;
        text-align: left;
        padding-top: 1.5rem;
    }

    .ant-drawer-content-wrapper {
        width: 300px !important;
    }

    .swal2-container{       
        button {
            font-family: 'Marvel Regular', sans-serif;
            font-size: 1.3rem !important;
            font-weight: 600;
        }
    }

    .titleAlert {
        font-family: 'Marvel Bold', sans-serif;
        font-size: 1.5rem;
        color: #2A2B38;
    }

    .SelectAlert {
        color: #2A2B38;
        font-family: 'Marvel Regular', sans-serif;
        font-size: 1.3rem;
        color: #2A2B38;
        display: flex;
        align-items: left;
        justify-content: left;

        .select {
            margin-left: 1rem;
        }
    }
    
    .conteinerQuestionsAlert {
        color: #2A2B38;
        font-family: 'Marvel Regular', sans-serif;
        font-size: 1.3rem;
        color: #2A2B38;
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: left;

        .question {
            display: flex;
            align-items: left;
            justify-content: left;
            margin-top: 1rem;
            label {
                width: 120px;
            }
            input {
                margin-left: 1rem;
            }
        }
        .answer { 
            display: flex;
            align-items: center;
            justify-content: left;
            margin-top: 1rem;   
            label {
                width: 120px;
            }    
            .form-check {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 1rem;
                border-radius: 4px;
                border: 0;
                background-color: rgb(241,242,243);
                transition: all 0.3s ease-in-out;
                outline: none;
                width: 100%;
                font-weight: 600;
            }
        }
    }
`;
