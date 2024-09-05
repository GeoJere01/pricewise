"use client"

import { FormEvent, Fragment, useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import Image from 'next/image'
import { addUserEmailProduct } from '@/lib/actions'

interface Props {
  productId: string
}

const Modal = ({ productId}: Props) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await addUserEmailProduct(productId, email);

    setIsSubmitting(false)
    setEmail('')
    closeModal()
  }

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button type="button" className="btn" onClick={openModal}>
        Track
      </button>

      <Transition appear show={isOpen} as={Fragment}>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="dialog-container relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            {/* <DialogTitle className="font-bold">Deactivate account</DialogTitle> */}
            <Description className="dialog-head_text">Stay updated with product pricing alerts right in your inbox!</Description>
            <p className="text-sm text-gray-600 mt-2">Never miss a bargain again with timely alerts.</p>

            <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className='dialog-input_container'>
                <Image
                  src="/assets/icons/mail.svg"
                  alt="mail"
                  width={18}
                  height={18} 
                />

                <input 
                  required
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="dialog-input"
                />
              </div>

              <button type="submit" className="dialog-btn">
                {isSubmitting ? 'Submitting...' : 'Track'}
              </button>
            </form>
            <div className="flex gap-4">
              <button className="" onClick={closeModal}>Cancel</button>
              {/* <button onClick={() => setIsOpen(false)}>Deactivate</button> */}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      </Transition>
      
    </>
  )
}

export default Modal
