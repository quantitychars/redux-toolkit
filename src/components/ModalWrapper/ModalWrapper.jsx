import styled from "styled-components";
import { createPortal } from "react-dom";

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.25);
  max-width: 460px;
  width: min(90%, 460px);
  padding: 32px;
  position: relative;
`;
export default function ModalWrapper({ children, className = "", onClose }) {
  return createPortal(
    <Card
      className={`modal-wrapper ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </Card>,
    document.body
  );
}
