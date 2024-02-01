import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";
import {
  ChannelProps,
  RoleProps,
  SettingsProps,
  defaultChannels,
  defaultRole,
  defaultSettings,
} from "../utils/types";

interface AppContext {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  settings: SettingsProps;
  setSettings: Dispatch<SettingsProps>;
  channels: Array<ChannelProps>;
  setChannels: Dispatch<Array<ChannelProps>>;
  roles: Array<RoleProps>;
  setRoles: Dispatch<Array<RoleProps>>;
}

export const AppContext = createContext<AppContext>({
  drawerOpen: false,
  setDrawerOpen: () => {},
  settings: defaultSettings,
  setSettings: () => {},
  channels: [defaultChannels],
  setChannels: () => {},
  roles: [defaultRole],
  setRoles: () => {},
});

export const AppContextProvider = (props: React.PropsWithChildren) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<SettingsProps>(defaultSettings);
  const [channels, setChannels] = useState<Array<ChannelProps>>([
    defaultChannels,
  ]);
  const [roles, setRoles] = useState<Array<RoleProps>>([]);

  return (
    <AppContext.Provider
      value={{
        drawerOpen,
        setDrawerOpen,
        settings,
        setSettings,
        channels,
        setChannels,
        roles,
        setRoles,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};
