import React, { useState } from 'react';
import { Button, Modal} from 'antd';
import './GenModal.css';
import GenForm from './Form/Form';
import { GENERATE_KEY } from '../../shared/constants/global';
import { BUTTON_TEXT_GENERATE } from '../../shared/constants/messages';

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
        {GENERATE_KEY}
      </Button>
      <Modal
        title={BUTTON_TEXT_GENERATE}
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