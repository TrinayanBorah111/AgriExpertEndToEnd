import styled from "styled-components";

export const Buttonss = styled.button`
  border-radius: 6px;
  background: ${({ primary }) => (primary ? "#008000" : "#32cd32")};
  white-space: nowrap;
  padding: ${({ big }) => (big ? "12px 64px" : "10px 20px")};
  color: #fff;
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-out;
    background: "#008000";
    background: ${({ primary }) => (primary ? "#fff" : "")};
  }

  @media screen and (max-width: 960px) {
    width: 100%;
    display: grid;
  }
`;
