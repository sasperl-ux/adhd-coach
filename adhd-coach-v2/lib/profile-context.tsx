"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { buildMiiSVG, SKIN_TONES } from "@/lib/mii";

type ProfileState = {
  name: string;
  job: string;
  styleIdx: number;
  skinIdx: number;
  hairIdx: number;
};

type ProfileContextType = {
  profile: ProfileState;
  setProfile: (p: Partial<ProfileState>) => void;
  avatarSVG: string;
};

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<ProfileState>({
    name: "", job: "", styleIdx: 0, skinIdx: 0, hairIdx: 0,
  });

  function setProfile(partial: Partial<ProfileState>) {
    setProfileState(prev => ({ ...prev, ...partial }));
  }

  const avatarSVG = buildMiiSVG(profile.styleIdx, SKIN_TONES[profile.skinIdx], profile.hairIdx);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, avatarSVG }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
