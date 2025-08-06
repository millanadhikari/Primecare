"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import WelcomeDialog from "@/components/onboarding/welcome-dialog";
interface OnboardingContextType {
  showWelcome: (userInfo: any) => void;
  hideWelcome: () => void;
}

// interface UserInfo {
//   firstName: string;
//   lastName: string;
//   role: string;
//   isFirstLogin: boolean;
// }

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}

interface OnboardingProviderProps {
  children: ReactNode;
}

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const showWelcome = (info) => {
    setUserInfo(info);
    setIsWelcomeOpen(true);
  };

  const hideWelcome = () => {
    setIsWelcomeOpen(false);
    setUserInfo(null);
  };

  return (
    <OnboardingContext.Provider value={{ showWelcome, hideWelcome }}>
      {children}
      {userInfo && (
        <WelcomeDialog
          isOpen={isWelcomeOpen}
          onClose={hideWelcome}
          userInfo={userInfo}
        />
      )}
    </OnboardingContext.Provider>
  );
}
