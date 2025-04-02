import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow: hidden;
    align-items: center;
`;

export const Content = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    overflow: auto;
    width: 100%;
`;

export const FooterWrapper = styled.footer`
    margin-top: auto;
`;

export const MenuButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    background: #6200ea;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 8px;
    margin: 10px 0;
    transition: background 0.3s;
    
    &:hover {
        background: #3700b3;
    }
`;

export const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 200px;
`;