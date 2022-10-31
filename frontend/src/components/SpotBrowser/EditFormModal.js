import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpotForm from './EditSpotForm';

function EditFormModal({spot}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
   

        <Modal onClose={() => setShowModal(false)}>
         <EditSpotForm spot={spot}/>
        </Modal>
    </>
  );
}

export default EditFormModal