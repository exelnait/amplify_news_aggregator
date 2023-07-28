import React, { useState, Fragment, PropsWithChildren } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Loader } from '@aws-amplify/ui-react';

export interface IModalProps {
  title?: string;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
}

export function Modal({
  isOpen,
  isLoading,
  onClose,
  title,
  children,
}: PropsWithChildren<IModalProps>) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center relative">
            {isLoading && (
              <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-50 overflow-hidden bg-gray-700 opacity-30 flex flex-col items-center justify-center">
                <Loader />
              </div>
            )}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                {title && (
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 p-6 pb-0"
                  >
                    {title}
                  </Dialog.Title>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
