import React from "react";

interface ModalStateProviderProps {
  children: React.ReactNode;
}
interface ModalStateProviderState {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState: ModalStateProviderState = {
  isModalOpen: false,
  setIsModalOpen: () => {},
};

const ModalStateContext =
  React.createContext<ModalStateProviderState>(initialState);

export const ModalStateProvider: React.FC<ModalStateProviderProps> = ({
  children,
}: ModalStateProviderProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(
    initialState.isModalOpen
  );
  const value = {
    isModalOpen,
    setIsModalOpen,
  };
  return (
    <ModalStateContext.Provider value={value}>
      {children}
    </ModalStateContext.Provider>
  );
};

export const useModalState = () => {
  const context = React.useContext(ModalStateContext);
  if (context === undefined) {
    throw new Error("useModalState must be used within a ModalStateProvider");
  }
  return context;
};
