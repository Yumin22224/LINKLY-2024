import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

// 모달 스타일을 위한 커스텀 스타일
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000, // 다른 요소들 위에 렌더링하기 위해 z-index 설정
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '20px',
    width: '80%',
    maxWidth: 'none',
  },
};

// 스타일 컴포넌트들
const AddButton = styled.button`
  // 스타일 정의
`;

const CloseButton = styled.button`
  // 스타일 정의
`;

const MemoTextArea = styled.textarea`
  width: 100%;
  height: 150px;
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

Modal.setAppElement('#root'); // 모달을 바인딩할 앱 요소 설정

const App: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [memo, setMemo] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <AddButton onClick={openModal}>+ 메모 추가</AddButton>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="메모 작성"
      >
        <CloseButton onClick={closeModal}>X</CloseButton>
        <h2>오늘의 질문질문질문</h2>
        <p>답변을 입력하세요.</p>
        <MemoTextArea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
        <button onClick={closeModal}>저장</button>
      </Modal>
    </div>
  );
};

export default App;
