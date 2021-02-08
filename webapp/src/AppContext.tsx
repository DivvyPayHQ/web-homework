import React from "react";

export enum LangEnum {
  English = "en",
  Spanish = "es",
}

export interface AppContextType {
  lang: LangEnum;
  setLang: (lang: LangEnum) => void;
}

export const AppContext = React.createContext<AppContextType>({
  lang: LangEnum.English,
  setLang: (lang: LangEnum) => console.log("No theme provider yet."),
});

export const useLang = () => React.useContext(AppContext);
