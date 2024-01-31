import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { SettingsProps, defaultSettings } from "../utils/types";

interface AppContext {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  settings: SettingsProps;
  setSettings: Dispatch<SettingsProps>;
}

export const AppContext = createContext<AppContext>({
  drawerOpen: false,
  setDrawerOpen: () => {},
  settings: defaultSettings,
  setSettings: () => {},
});

export const AppContextProvider = (props: React.PropsWithChildren) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<SettingsProps>(defaultSettings);

  return (
    <AppContext.Provider
      value={{ drawerOpen, setDrawerOpen, settings, setSettings }}>
      {props.children}
    </AppContext.Provider>
  );
};
