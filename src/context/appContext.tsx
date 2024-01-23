import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface AppContext {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContext>({
  drawerOpen: false,
  setDrawerOpen: () => {},
});

export const AppContextProvider = (props: React.PropsWithChildren) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ drawerOpen, setDrawerOpen }}>
      {props.children}
    </AppContext.Provider>
  );
};
