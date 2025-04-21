import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
} from "@heroui/react";
import { FC, useState } from "react";
import { Icon } from "@iconify/react";
import ApiClient from "@/api";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { userStore } from "@/data/userStore";

export type AuthVariant = "LOGIN" | "SIGNUP";
interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  variant: AuthVariant;
  onVariantChange: (variant: AuthVariant) => void;
}

const apiClient = new ApiClient();

const AuthModal: FC<AuthModalProps> = ({
  isOpen,
  onOpenChange,
  variant,
  onVariantChange,
}) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = userStore();

  const isLogin = variant === "LOGIN";
  const title = isLogin ? "Anmelden" : "Registrieren";
  const buttonText = isLoading
    ? "Wird geladen..."
    : isLogin
    ? "Anmelden"
    : "Registrieren";
  const toggleText = isLogin ? "Noch kein Konto?" : "Bereits ein Konto?";
  const toggleAction = isLogin ? "Registrieren" : "Anmelden";

  const handleToggleVariant = () => {
    onVariantChange(isLogin ? "SIGNUP" : "LOGIN");
    setData({
      username: "",
      email: "",
      password: "",
      rememberMe: false,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    if (isLogin) {
      apiClient.auth.helper
        .login(data)
        .then((response) => {
          if (response.status) {
            toast.success("Erfolgreich angemeldet!");

            onOpenChange();
            setUser(response.data.user);
            Cookies.set("accessToken", response.data.accessToken, {
              expires: 1,
            });
            if (data.rememberMe) {
              Cookies.set("refreshToken", response.data.refreshToken, {
                expires: 7,
              });
            }
            setData({
              username: "",
              email: "",
              password: "",
              rememberMe: false,
            });
          } else {
            toast.error("Ihr Passwort oder Ihre E-Mail-Adresse ist falsch.");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      apiClient.auth.helper
        .register(data)
        .then((response) => {
          if (response.status) {
            toast.success("Erfolgreich registriert! Melden Sie sich an.");
            setData({
              username: "",
              email: "",
              password: "",
              rememberMe: false,
            });
            onVariantChange("LOGIN");
          } else {
            toast.error(
              "Es existiert bereits ein Konto mit dieser E-Mail-Adresse."
            );
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-emerald-600">
                {title}
              </ModalHeader>
              <form onSubmit={(event) => handleSubmit(event)}>
                <ModalBody>
                  {!isLogin && (
                    <Input
                      endContent={
                        <Icon
                          icon="solar:user-bold"
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      }
                      label="Name"
                      placeholder="Dein Name"
                      variant="bordered"
                      value={data.username}
                      onChange={(e) =>
                        setData({ ...data, username: e.target.value })
                      }
                    />
                  )}
                  <Input
                    endContent={
                      <Icon
                        icon="solar:letter-bold"
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                      />
                    }
                    label="E-Mail"
                    placeholder="Deine E-Mail-Adresse"
                    variant="bordered"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                  <Input
                    endContent={
                      <Icon
                        icon="solar:lock-password-bold"
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                      />
                    }
                    label="Passwort"
                    placeholder="Dein Passwort"
                    type="password"
                    variant="bordered"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                      isSelected={data.rememberMe}
                      onValueChange={(value) => {
                        setData({ ...data, rememberMe: value });
                      }}
                    >
                      Angemeldet bleiben
                    </Checkbox>
                  </div>
                </ModalBody>
                <ModalFooter className="flex flex-col items-center">
                  <Button
                    type="submit"
                    color="primary"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    isLoading={isLoading}
                  >
                    {buttonText}
                  </Button>
                  <div className="w-full text-center mt-4">
                    <span className="text-gray-600">{toggleText}</span>{" "}
                    <Button
                      variant="light"
                      className="p-0 text-emerald-600 font-semibold"
                      onPress={handleToggleVariant}
                    >
                      {toggleAction}
                    </Button>
                  </div>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
