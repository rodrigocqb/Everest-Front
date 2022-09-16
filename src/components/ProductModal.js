import styled from "styled-components";

export default function ProductModal({ setShowModal }) {
  return (
    <ModalWrappler onClick={() => setShowModal(false)}>
      <Modal>
        <img alt="" />
      </Modal>
    </ModalWrappler>
  );
}

const ModalWrappler = styled.div`
  z-index: 2;
  width: 100vw;
  height: 100vh;
  background-color: rgb(154, 140, 152, 0.9);
  position: fixed;
  justify-content: center;
  display: flex;
`;
const Modal = styled.div`
  margin-top: 20px;
  width: 80%;
  height: 80%;
  border-radius: 30px;
  background-color: #f2e9e4;
  img {
    width: 500px;
    height: 500px;
    margin: 70px;
  }
`;
