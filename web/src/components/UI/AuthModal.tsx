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
import { FC, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import ApiClient from "@/api";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { userStore } from "@/data/userStore";
import axios from "axios";

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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({
    username: false,
    email: false,
    password: false,
  });

  const isLogin = variant === "LOGIN";
  const title = isLogin ? "Anmelden" : "Registrieren";
  const buttonText = isLoading
    ? "Wird geladen..."
    : isLogin
    ? "Anmelden"
    : "Registrieren";
  const toggleText = isLogin ? "Noch kein Konto?" : "Bereits ein Konto?";
  const toggleAction = isLogin ? "Registrieren" : "Anmelden";

  useEffect(() => {
    resetForm();
  }, [variant, isOpen]);

  useEffect(() => {
    if (Object.values(touched).some(Boolean)) {
      validateForm();
    }
  }, [data, touched, isLogin]);

  const resetForm = () => {
    setData({
      username: "",
      email: "",
      password: "",
      rememberMe: false,
    });
    setErrors({});
    setTouched({
      username: false,
      email: false,
      password: false,
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!isLogin) {
      if (touched.username && !data.username) {
        newErrors.username = "Benutzername ist erforderlich";
      }

      if (touched.password && data.password) {
        if (data.password.length < 8) {
          newErrors.password = "Passwort muss mindestens 8 Zeichen lang sein";
        } else if (!/[A-Z]/.test(data.password)) {
          newErrors.password =
            "Passwort muss mindestens einen Großbuchstaben enthalten";
        } else if (!/[a-z]/.test(data.password)) {
          newErrors.password =
            "Passwort muss mindestens einen Kleinbuchstaben enthalten";
        } else if (!/[0-9]/.test(data.password)) {
          newErrors.password = "Passwort muss mindestens eine Ziffer enthalten";
        } else if (!/[\W_]/.test(data.password)) {
          newErrors.password =
            "Passwort muss mindestens ein Sonderzeichen enthalten";
        }
      }
    }

    if (touched.email && !data.email) {
      newErrors.email = "E-Mail ist erforderlich";
    } else if (touched.email && !/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Bitte gib eine gültige E-Mail-Adresse ein";
    }

    if (touched.password && !data.password) {
      newErrors.password = "Passwort ist erforderlich";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleToggleVariant = () => {
    onVariantChange(isLogin ? "SIGNUP" : "LOGIN");
    resetForm();
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const allTouched = Object.keys(touched).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);

    setTouched(allTouched);
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

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
              sameSite: "Lax",
              secure: false,
            });
            if (data.rememberMe) {
              Cookies.set("refreshToken", response.data.refreshToken, {
                expires: 7,
                sameSite: "Lax",
                secure: false,
              });
            }

            const accessToken = Cookies.get("accessToken");
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            resetForm();
          } else {
            toast.error("Ihr Passwort oder Ihre E-Mail-Adresse ist falsch.");
          }
        })
        .catch(() => {
          toast.error(
            "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
          );
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
            resetForm();
            onVariantChange("LOGIN");
          } else {
            toast.error(
              "Es existiert bereits ein Konto mit dieser E-Mail-Adresse."
            );
          }
        })
        .catch(() => {
          toast.error(
            "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const isSubmitDisabled =
    isLoading ||
    (!isLogin &&
      (!data.username ||
        !data.email ||
        !data.password ||
        Object.keys(errors).length > 0)) ||
    (isLogin && (!data.email || !data.password));

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
                      onBlur={() => handleBlur("username")}
                      isDisabled={isLoading}
                      isInvalid={!!errors.username}
                      errorMessage={errors.username}
                      isRequired
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
                    onBlur={() => handleBlur("email")}
                    isDisabled={isLoading}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email}
                    isRequired
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
                    onBlur={() => handleBlur("password")}
                    isDisabled={isLoading}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password}
                    isRequired
                  />
                  {!isLogin && (
                    <div className="bg-blue-50 p-3 rounded-md text-xs text-blue-700">
                      <p className="font-medium mb-1">
                        Passwort-Anforderungen:
                      </p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Mindestens 8 Zeichen</li>
                        <li>Mindestens ein Großbuchstabe (A-Z)</li>
                        <li>Mindestens ein Kleinbuchstabe (a-z)</li>
                        <li>Mindestens eine Ziffer (0-9)</li>
                        <li>Mindestens ein Sonderzeichen (!@#$%^&*...)</li>
                      </ul>
                    </div>
                  )}
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                      isSelected={data.rememberMe}
                      onValueChange={(value) => {
                        setData({ ...data, rememberMe: value });
                      }}
                      isDisabled={isLoading}
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
                    isDisabled={isSubmitDisabled}
                  >
                    {buttonText}
                  </Button>
                  <div className="w-full text-center mt-4">
                    <span className="text-gray-600">{toggleText}</span>{" "}
                    <Button
                      variant="light"
                      className="p-0 text-emerald-600 font-semibold"
                      onPress={handleToggleVariant}
                      isDisabled={isLoading}
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
