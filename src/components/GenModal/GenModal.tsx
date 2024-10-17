import React, { useState } from 'react';
import { Button, Modal} from 'antd';
import './GenModal.css';
import GenForm from './Form/Form';

const GenModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const showModal = () => {
    setIsModalOpen(true);
  };


  return (
    <>
      <Button
        type='primary'
        className="bg-color-3 px-4 py-2 rounded-md"
        onClick={showModal}
      >
        Generate key
      </Button>
      <Modal
        title="Key generation"
        centered
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
        className="custom-modal"
      >
        <div className='ml-6'>
          <GenForm />
        </div>
      </Modal>
    </>
  );
};

export default GenModal;