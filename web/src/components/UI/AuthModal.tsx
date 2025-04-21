import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
} from "@heroui/react";
import { FC } from "react";
import { Icon } from "@iconify/react";

interface AuthModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
}

const AuthModal: FC<AuthModalProps> = ({ isOpen, onOpenChange, onOpen }) => {
  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Open Modal
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  endContent={
                    <Icon
                      icon="solar:letter-bold"
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <Icon
                      icon="solar:lock-password-bold"
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
