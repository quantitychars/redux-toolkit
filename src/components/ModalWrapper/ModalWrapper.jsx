import styled from "styled-components";
const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.25);
  max-width: 460px;
  width: min(90%, 460px);
  padding: 32px;
  position: relative;
`;
export default function ModalWrapper({ children, className = "" }) {
  return <Card className={`modal-wrapper ${className}`}>{children}</Card>;
}
