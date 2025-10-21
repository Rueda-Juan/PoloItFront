import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

/**
 * Un componente Modal genérico y reutilizable.
 * * @param {boolean} isOpen 
 * @param {function} onClose
 * @param {string} [title]
 * @param {React.ReactNode} children
 */
export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={onClose}>
        
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white/90 backdrop-blur-lg p-8 md:p-12 text-left align-middle shadow-xl transition-all">
                
                {title && (
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold text-center text-gray-800 mb-6"
                  >
                    {title}
                  </Dialog.Title>
                )}
                
                <div>
                  {children}
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}